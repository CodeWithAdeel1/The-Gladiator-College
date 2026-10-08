require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs-extra');
const os = require('os');
const { Resend } = require('resend');

const { createFinalApplicationPackage } = require('./utils/pdfGenerator');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// ==========================================
// 1. CORS CONFIGURATION
// ==========================================

const allowedOrigins = [
  'http://localhost:5173',
  'https://the-gladiators-college.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an Origin header
      // such as Postman/server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn('Blocked CORS origin:', origin);
      return callback(null, false);
    },

    credentials: true,

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
    ],
  })
);

// Explicit preflight handling
app.options('/api/applications', cors());
app.options('/applications', cors());

// JSON parser
app.use(express.json());

// ==========================================
// 2. TEMPORARY FILE UPLOAD CONFIGURATION
// ==========================================

const UPLOAD_DIR = os.tmpdir();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },

  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');

    cb(
      null,
      `${Date.now()}-${safeName}`
    );
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 4 * 1024 * 1024, // 4 MB per file
  },
});

// ==========================================
// 3. TEMP FILE CLEANUP
// ==========================================

const cleanupFiles = async (files) => {
  if (!files) {
    return;
  }

  const fileKeys = [
    'dmc',
    'domicile',
    'cnicOrFormB',
    'fatherCnic',
  ];

  for (const key of fileKeys) {
    if (
      files[key] &&
      files[key][0] &&
      files[key][0].path
    ) {
      try {
        await fs.remove(files[key][0].path);

        console.log(
          `Temporary file removed: ${files[key][0].originalname}`
        );
      } catch (err) {
        console.error(
          `Error removing temporary file ${key}:`,
          err.message
        );
      }
    }
  }
};

// ==========================================
// 4. APPLICATION SUBMISSION
// ==========================================

const handleApplicationSubmission = async (req, res) => {
  try {
    console.log('----------------------------------------');
    console.log('New admission application received');
    console.log('----------------------------------------');

    // --------------------------------------
    // Check request data
    // --------------------------------------

    if (!req.body?.data) {
      await cleanupFiles(req.files);

      return res.status(400).json({
        success: false,
        message: 'Application data is missing.',
      });
    }

    let rawData;

    try {
      rawData = JSON.parse(req.body.data);
    } catch (parseError) {
      await cleanupFiles(req.files);

      console.error(
        'JSON parsing error:',
        parseError.message
      );

      return res.status(400).json({
        success: false,
        message: 'Invalid application data.',
      });
    }

    const {
      personalInfo,
      programType,
      education,
    } = rawData;

    // --------------------------------------
    // Validate personal information
    // --------------------------------------

    if (
      !personalInfo?.fullName ||
      !personalInfo?.email ||
      !personalInfo?.phone ||
      !personalInfo?.cnic ||
      !personalInfo?.fatherName ||
      !personalInfo?.fatherPhone
    ) {
      await cleanupFiles(req.files);

      return res.status(400).json({
        success: false,
        message:
          'All personal profile fields are strictly required.',
      });
    }

    // --------------------------------------
    // Validate FA / FSc
    // --------------------------------------

    if (
      programType === 'FA' ||
      programType === 'FSc'
    ) {
      if (
        !Array.isArray(education) ||
        education.length === 0
      ) {
        await cleanupFiles(req.files);

        return res.status(400).json({
          success: false,
          message:
            'At least one education record is required for FA / FSc applicants.',
        });
      }

      const hasSSC = education.some(
        (edu) =>
          edu.degree === 'SSC' ||
          edu.degree
            ?.toLowerCase()
            .includes('matric')
      );

      if (!hasSSC) {
        await cleanupFiles(req.files);

        return res.status(400).json({
          success: false,
          message:
            'Matric (SSC) record is required for FA / FSc applicants.',
        });
      }

      if (
        !req.files ||
        !req.files.dmc ||
        !req.files.dmc[0]
      ) {
        await cleanupFiles(req.files);

        return res.status(400).json({
          success: false,
          message:
            'DMC / Transcript PDF upload is required for FA / FSc applicants.',
        });
      }
    }

    // --------------------------------------
    // Validate required documents
    // --------------------------------------

    if (
      !req.files ||
      !req.files.cnicOrFormB ||
      !req.files.cnicOrFormB[0]
    ) {
      await cleanupFiles(req.files);

      return res.status(400).json({
        success: false,
        message:
          'Applicant CNIC / Form-B PDF upload is required.',
      });
    }

    if (
      !req.files.fatherCnic ||
      !req.files.fatherCnic[0]
    ) {
      await cleanupFiles(req.files);

      return res.status(400).json({
        success: false,
        message:
          "Father's CNIC PDF upload is required.",
      });
    }

    // --------------------------------------
    // Generate final application PDF
    // --------------------------------------

    console.log('Generating final application PDF...');

    const pdfBuffer =
      await createFinalApplicationPackage(
        rawData,
        req.files
      );

    console.log(
      'PDF generated successfully.'
    );

    console.log(
      'Final PDF size:',
      pdfBuffer.length,
      'bytes'
    );

    // --------------------------------------
    // Student name
    // --------------------------------------

    const studentName =
      rawData.personalInfo?.fullName ||
      'Applicant';

    const safeStudentName =
      studentName
        .replace(/[^a-zA-Z0-9-_ ]/g, '')
        .trim()
        .replace(/\s+/g, '_') ||
      'Applicant';

    // ======================================
    // 5. SEND EMAIL
    // ======================================

    let emailSent = false;
    let emailErrorMessage = null;

    /*
      IMPORTANT:

      We intentionally do NOT allow an email
      failure to turn the application into
      HTTP 500.

      The application has already reached the
      backend and the PDF has been generated.

      If Resend fails, we still return success
      for the application submission.
    */

    const skipEmail =
      String(process.env.SKIP_EMAIL).toLowerCase() === 'true';

    if (skipEmail) {
      console.log(
        'SKIP_EMAIL=true - email sending skipped.'
      );
    } else {
      try {
        console.log(
          'Preparing PDF attachment for Resend...'
        );

        // Convert Buffer to Base64.
        // This is more explicit/reliable for
        // email attachment transmission.
        const pdfBase64 =
          pdfBuffer.toString('base64');

        console.log(
          'PDF converted to Base64.'
        );

        console.log(
          'Base64 attachment length:',
          pdfBase64.length
        );

        console.log(
          'Sending application email through Resend...'
        );

        const {
          data: resendData,
          error: resendError,
        } = await resend.emails.send({
          from:
            'Admission System <onboarding@resend.dev>',

          to: [
            process.env.RECIPIENT_EMAIL,
          ],

          subject:
            `New Application: ${studentName} - ${rawData.programType}`,

          html: `
            <h3>New Admission Form Submitted</h3>

            <p>
              <strong>Applicant Name:</strong>
              ${studentName}
            </p>

            <p>
              <strong>Email:</strong>
              ${rawData.personalInfo?.email || 'N/A'}
            </p>

            <p>
              <strong>Phone:</strong>
              ${rawData.personalInfo?.phone || 'N/A'}
            </p>

            <p>
              <strong>Stream:</strong>
              ${rawData.programType || 'N/A'}
            </p>

            <p>
              <strong>Track:</strong>
              ${rawData.programDetail || 'N/A'}
            </p>

            <br />

            <p>
              The compiled PDF containing the
              application details and uploaded
              documents is attached.
            </p>
          `,

          attachments: [
            {
              filename:
                `Application_${safeStudentName}.pdf`,

              content: pdfBase64,
            },
          ],
        });

        if (resendError) {
          emailErrorMessage =
            resendError.message ||
            'Unknown Resend error';

          console.error(
            '----------------------------------------'
          );

          console.error(
            'RESEND EMAIL FAILED'
          );

          console.error(
            resendError
          );

          console.error(
            '----------------------------------------'
          );
        } else {
          emailSent = true;

          console.log(
            '----------------------------------------'
          );

          console.log(
            'APPLICATION EMAIL SENT SUCCESSFULLY'
          );

          console.log(
            'Resend response:',
            resendData
          );

          console.log(
            '----------------------------------------'
          );
        }
      } catch (emailError) {
        emailErrorMessage =
          emailError.message ||
          'Unknown email error';

        console.error(
          '----------------------------------------'
        );

        console.error(
          'EMAIL SENDING EXCEPTION'
        );

        console.error(
          emailError
        );

        console.error(
          '----------------------------------------'
        );

        /*
          DO NOT THROW HERE.

          We want the application itself
          to remain successful even if
          Resend fails.
        */
      }
    }

    // ======================================
    // 6. CLEANUP UPLOADED FILES
    // ======================================

    await cleanupFiles(req.files);

    // ======================================
    // 7. RETURN SUCCESS
    // ======================================

    if (emailSent) {
      return res.status(200).json({
        success: true,

        emailSent: true,

        message:
          'Application submitted and emailed successfully!',
      });
    }

    return res.status(200).json({
      success: true,

      emailSent: false,

      message:
        'Application submitted successfully. Your application was received, but the notification email could not be sent right now.',
    });

  } catch (error) {
    // --------------------------------------
    // Unexpected application error
    // --------------------------------------

    await cleanupFiles(req.files);

    console.error(
      '========================================'
    );

    console.error(
      'APPLICATION SUBMISSION ERROR'
    );

    console.error(
      error
    );

    console.error(
      '========================================'
    );

    return res.status(500).json({
      success: false,
      message:
        'Server error processing application.',
      error:
        process.env.NODE_ENV === 'production'
          ? undefined
          : error.message,
    });
  }
};

// ==========================================
// 8. MULTER FIELD CONFIGURATION
// ==========================================

const uploadFields = upload.fields([
  {
    name: 'dmc',
    maxCount: 1,
  },
  {
    name: 'domicile',
    maxCount: 1,
  },
  {
    name: 'cnicOrFormB',
    maxCount: 1,
  },
  {
    name: 'fatherCnic',
    maxCount: 1,
  },
]);

// ==========================================
// 9. APPLICATION ROUTES
// ==========================================

app.post(
  '/api/applications',
  uploadFields,
  handleApplicationSubmission
);

app.post(
  '/applications',
  uploadFields,
  handleApplicationSubmission
);

// ==========================================
// 10. HEALTH CHECK
// ==========================================

app.get(
  '/api/health',
  (req, res) => {
    res.json({
      status: 'ok',
      serverTime: new Date(),
    });
  }
);

app.get(
  '/health',
  (req, res) => {
    res.json({
      status: 'ok',
      serverTime: new Date(),
    });
  }
);

// ==========================================
// 11. MULTER ERROR HANDLER
// ==========================================

app.use(
  (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
      console.error(
        'Multer error:',
        error
      );

      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
          success: false,
          message:
            'One of the uploaded files is larger than the 4 MB limit.',
        });
      }

      return res.status(400).json({
        success: false,
        message:
          `File upload error: ${error.message}`,
      });
    }

    next(error);
  }
);

// ==========================================
// 12. LOCAL DEVELOPMENT SERVER
// ==========================================

const PORT =
  process.env.PORT || 5000;

if (
  process.env.NODE_ENV !== 'production'
) {
  app.listen(
    PORT,
    () => {
      console.log(
        `Server running on port ${PORT}`
      );
    }
  );
}

// ==========================================
// 13. VERCEL EXPORT
// ==========================================

module.exports = app;