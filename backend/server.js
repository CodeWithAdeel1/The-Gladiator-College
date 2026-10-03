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

// app.use(cors());
// const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://the-gladiator-college-frontend.vercel.app' // Replace with your actual frontend Vercel URL
  ],
  credentials: true
}));
app.use(express.json());

// Use system temp directory for Vercel Serverless compatibility
const UPLOAD_DIR = os.tmpdir();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

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

app.post('/api/applications', upload.fields([
  { name: 'dmc', maxCount: 1 },
  { name: 'domicile', maxCount: 1 },
  { name: 'cnicOrFormB', maxCount: 1 },
  { name: 'fatherCnic', maxCount: 1 }
]), async (req, res) => {
  try {
    const rawData = JSON.parse(req.body.data);
    const { personalInfo, programType, education } = rawData;

    // 1. BACKEND VALIDATION: Check required personal info
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

    // 2. BACKEND VALIDATION: Strict Matric requirement for FA/FSc
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

      // Strict DMC file requirement for FA/FSc
      if (!req.files || !req.files.dmc) {
        await cleanupFiles(req.files);
        return res.status(400).json({ success: false, message: 'DMC / Transcript PDF upload is required for FA / FSc applicants.' });
      }
    }

    // 4. Generate Combined PDF Package
    const pdfBuffer = await createFinalApplicationPackage(rawData, req.files);

    const studentName = rawData.personalInfo?.fullName || 'Applicant';

    // 5. Send via Resend API
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

    // 6. Clean up temporary uploaded files from disk
    await cleanupFiles(req.files);

    res.status(200).json({ success: true, message: 'Application submitted and emailed successfully!' });
  } catch (error) {
    await cleanupFiles(req.files);
    console.error('Submission Error:', error);
    res.status(500).json({ success: false, message: 'Server error processing application', error: error.message });
  }
});

// Run local listener during development
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT} with Resend Email API`));
}

// Export express app handler for Vercel serverless deployment
module.exports = app;