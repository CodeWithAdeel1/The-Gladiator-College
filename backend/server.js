require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const { Resend } = require('resend');

const { createFinalApplicationPackage } = require('./utils/pdfGenerator');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// 1. CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://the-gladiator-college.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Express handling for preflight OPTIONS requests
app.options('*', cors());

app.use(express.json());

// 2. Temp upload configuration (Vercel serverless compatible)
const UPLOAD_DIR = os.tmpdir();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ 
  storage,
  limits: { fileSize: 4 * 1024 * 1024 } // 4MB per file limit
});

const cleanupFiles = async (files) => {
  if (!files) return;
  const fileKeys = ['dmc', 'domicile', 'cnicOrFormB', 'fatherCnic'];
  for (const key of fileKeys) {
    if (files[key] && files[key][0]) {
      try {
        await fs.remove(files[key][0].path);
      } catch (err) {
        console.error('Error removing file:', err);
      }
    }
  }
};

// 3. Application Submission Logic
const handleApplicationSubmission = async (req, res) => {
  try {
    const rawData = JSON.parse(req.body.data);
    const { personalInfo, programType, education } = rawData;

    // Validation: Check required personal info
    if (
      !personalInfo?.fullName ||
      !personalInfo?.email ||
      !personalInfo?.phone ||
      !personalInfo?.cnic ||
      !personalInfo?.fatherName ||
      !personalInfo?.fatherPhone
    ) {
      await cleanupFiles(req.files);
      return res.status(400).json({ success: false, message: 'All personal profile fields are strictly required.' });
    }

    // Validation: FA/FSc requirements
    if (programType === 'FA' || programType === 'FSc') {
      if (!Array.isArray(education) || education.length === 0) {
        await cleanupFiles(req.files);
        return res.status(400).json({ success: false, message: 'At least one education record is required for FA / FSc applicants.' });
      }

      const hasSSC = education.some((edu) => edu.degree === 'SSC' || edu.degree?.toLowerCase().includes('matric'));
      if (!hasSSC) {
        await cleanupFiles(req.files);
        return res.status(400).json({ success: false, message: 'Matric (SSC) record is required for FA / FSc applicants.' });
      }

      if (!req.files || !req.files.dmc) {
        await cleanupFiles(req.files);
        return res.status(400).json({ success: false, message: 'DMC / Transcript PDF upload is required for FA / FSc applicants.' });
      }
    }

    // Generate Combined PDF Package
    const pdfBuffer = await createFinalApplicationPackage(rawData, req.files);
    const studentName = rawData.personalInfo?.fullName || 'Applicant';

    // Send email via Resend API
    const { data, error } = await resend.emails.send({
      from: 'Admission System <onboarding@resend.dev>',
      to: [process.env.RECIPIENT_EMAIL],
      subject: `New Application: ${studentName} - ${rawData.programType}`,
      html: `
        <h3>New Admission Form Submitted</h3>
        <p><strong>Applicant Name:</strong> ${studentName}</p>
        <p><strong>Email:</strong> ${rawData.personalInfo?.email || 'N/A'}</p>
        <p><strong>Phone:</strong> ${rawData.personalInfo?.phone || 'N/A'}</p>
        <p><strong>Stream:</strong> ${rawData.programType}</p>
        <p><strong>Track:</strong> ${rawData.programDetail}</p>
        <br/>
        <p>The compiled PDF containing all personal details and merged uploaded attachments is attached below.</p>
      `,
      attachments: [
        {
          filename: `Application_${studentName.replace(/\s+/g, '_')}.pdf`,
          content: pdfBuffer
        }
      ]
    });

    if (error) {
      throw new Error(error.message);
    }

    // Clean up temporary uploaded files
    await cleanupFiles(req.files);

    res.status(200).json({ success: true, message: 'Application submitted and emailed successfully!' });
  } catch (error) {
    await cleanupFiles(req.files);
    console.error('Submission Error:', error);
    res.status(500).json({ success: false, message: 'Server error processing application', error: error.message });
  }
};

const uploadFields = upload.fields([
  { name: 'dmc', maxCount: 1 },
  { name: 'domicile', maxCount: 1 },
  { name: 'cnicOrFormB', maxCount: 1 },
  { name: 'fatherCnic', maxCount: 1 }
]);

// Route handlers - registered under both paths for Vercel rewrite resilience
app.post('/api/applications', uploadFields, handleApplicationSubmission);
app.post('/applications', uploadFields, handleApplicationSubmission);

// Health Check Endpoints
app.get('/api/health', (req, res) => res.json({ status: 'ok', serverTime: new Date() }));
app.get('/health', (req, res) => res.json({ status: 'ok', serverTime: new Date() }));

// Local development listener
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export app for Vercel Serverless
module.exports = app;