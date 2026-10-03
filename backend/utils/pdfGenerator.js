const PDFDocument = require('pdfkit');
const { PDFDocument: PDFLibDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

// function drawGladiatorsEmblem(doc, originX, originY) {
//   const logoPath = path.resolve(process.cwd(), 'logo', 'logo.jpeg');

//   if (fs.existsSync(logoPath)) {
//     // 1. Set dimensions (smaller size)
//     const diameter = 70; // Adjust diameter to make it smaller/larger
//     const radius = diameter / 2;
//     const centerX = originX + radius;
//     const centerY = originY + radius;

//     // 2. Save graphics context
//     doc.save();

//     // 3. Create a circular clipping mask
//     doc.circle(centerX, centerY, radius).clip();

//     // 4. Draw the image inside the clipped circle
//     doc.image(logoPath, originX, originY, {
//       width: diameter,
//       height: diameter
//     });

//     // 5. Restore graphics context so subsequent drawing isn't clipped
//     doc.restore();
//   } else {
//     console.warn(`Logo not found at ${logoPath}`);
//   }
// }
function drawGladiatorsEmblem(doc, originX, originY) {
  // const logoPath = path.join(__dirname, 'logo', 'logo.jpeg');
  const logoPath = path.resolve(process.cwd(), 'logo', 'logo.jpeg');

  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, originX, originY, {
      fit: [140, 90],
      align: 'center',
      valign: 'center'
    });
  }
}

function drawSectionHeader(doc, startY, titleText, rightText) {
  const x = 40;
  const width = 515;
  const height = 30;

  doc
    .roundedRect(x, startY, width, height, 5)
    .fill('#F1F5F9');

  doc
    .fillColor('#1E293B')
    .fontSize(10)
    .font('Helvetica-Bold')
    .text(titleText.toUpperCase(), x + 14, startY + 10, {
      width: 300,
      lineBreak: false
    });

  if (rightText) {
    doc
      .fillColor('#64748B')
      .fontSize(7.8)
      .font('Helvetica')
      .text(rightText, x + 330, startY + 11, {
        width: 170,
        align: 'right',
        lineBreak: false
      });
  }

  doc
    .moveTo(x, startY + height)
    .lineTo(x + width, startY + height)
    .strokeColor('#E2E8F0')
    .lineWidth(0.8)
    .stroke();
}

const createApplicationPDFBuffer = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 40
      });

      const buffers = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      const info = data.personalInfo || {};
      const eduList = data.education || [];

      doc
        .roundedRect(25, 25, 545, 792, 7)
        .fillAndStroke('#FFFFFF', '#E2E8F0');

      // Drawn at (40, 18) to align cleanly alongside header text
      drawGladiatorsEmblem(doc, 40, 18);

      const headerX = 190;

      doc
        .fillColor('#1E1B4B')
        .fontSize(13.5)
        .font('Helvetica-Bold')
        .text('THE GLADIATORS SCHOOL AND COLLEGE', headerX, 29, {
          width: 325,
          lineBreak: false
        });

      doc
        .fillColor('#0369A1')
        .fontSize(9.5)
        .font('Helvetica-Bold')
        .text('KALUKHAN SWABI', headerX, 49, {
          width: 325,
          lineBreak: false
        });

      doc
        .roundedRect(headerX, 69, 235, 22, 5)
        .fill('#312E81');

      doc
        .fillColor('#FFFFFF')
        .fontSize(8.2)
        .font('Helvetica-Bold')
        .text('ADMISSION APPLICATION FORM', headerX, 76, {
          width: 235,
          align: 'center',
          lineBreak: false
        });

      const currentDate = new Date().toLocaleDateString();

      doc
        .fillColor('#475569')
        .fontSize(7.8)
        .font('Helvetica-Bold')
        .text('Application Date', 445, 31, {
          width: 105,
          align: 'right',
          lineBreak: false
        });

      doc
        .fillColor('#0F172A')
        .fontSize(8.5)
        .font('Helvetica')
        .text(currentDate, 445, 44, {
          width: 105,
          align: 'right',
          lineBreak: false
        });

      doc
        .moveTo(40, 113)
        .lineTo(555, 113)
        .strokeColor('#334155')
        .lineWidth(1.2)
        .stroke();

      let cursorY = 128;

      drawSectionHeader(doc, cursorY, '1. Personal Profile', 'Student Details');

      const profileCardY = cursorY + 38;
      const profileCardHeight = 163;

      doc
        .roundedRect(40, profileCardY, 515, profileCardHeight, 5)
        .fillAndStroke('#FFFFFF', '#E2E8F0');

      const col1X = 56;
      const col2X = 308;
      const col1Width = 220;
      const col2Width = 230;

      const drawProfileField = (label, value, x, y, width) => {
        doc
          .fillColor('#64748B')
          .fontSize(7.8)
          .font('Helvetica')
          .text(label, x, y, { width, lineBreak: false });

        doc
          .fillColor('#0F172A')
          .fontSize(9)
          .font('Helvetica-Bold')
          .text(String(value || 'N/A'), x, y + 13, {
            width,
            lineBreak: false,
            ellipsis: true
          });

        doc
          .moveTo(x, y + 34)
          .lineTo(x + width, y + 34)
          .strokeColor('#E2E8F0')
          .lineWidth(0.6)
          .stroke();
      };

      drawProfileField('Full Name', info.fullName, col1X, profileCardY + 16, col1Width);
      drawProfileField("Father's Name", info.fatherName, col2X, profileCardY + 16, col2Width);
      drawProfileField('Email Address', info.email, col1X, profileCardY + 54, col1Width);
      drawProfileField('CNIC / Form-B', info.cnic, col2X, profileCardY + 54, col2Width);
      drawProfileField('Applicant Phone', info.phone, col1X, profileCardY + 92, col1Width);
      drawProfileField("Father's Phone", info.fatherPhone, col2X, profileCardY + 92, col2Width);

      doc
        .fillColor('#64748B')
        .fontSize(7.8)
        .font('Helvetica')
        .text('Gender', col1X, profileCardY + 130);

      doc
        .fillColor('#0F172A')
        .fontSize(9)
        .font('Helvetica-Bold')
        .text(info.gender || 'N/A', col1X, profileCardY + 143, {
          width: col1Width,
          lineBreak: false
        });

      cursorY = profileCardY + profileCardHeight + 13;

      drawSectionHeader(doc, cursorY, '2. Program Applied For', 'Academic Selection');

      const programCardY = cursorY + 38;
      const programCardHeight = 57;

      doc
        .roundedRect(40, programCardY, 515, programCardHeight, 5)
        .fillAndStroke('#FFFFFF', '#E2E8F0');

      const programFieldY = programCardY + 14;

      doc
        .fillColor('#64748B')
        .fontSize(7.8)
        .font('Helvetica')
        .text('Academic Stream / Level', col1X, programFieldY, { lineBreak: false });

      doc
        .roundedRect(col1X, programFieldY + 14, 125, 18, 4)
        .fill('#EEF2FF');

      doc
        .fillColor('#3730A3')
        .fontSize(8.5)
        .font('Helvetica-Bold')
        .text(data.programType || 'N/A', col1X, programFieldY + 19, {
          width: 125,
          align: 'center',
          lineBreak: false
        });

      doc
        .fillColor('#64748B')
        .fontSize(7.8)
        .font('Helvetica')
        .text('Specialization Track', col2X, programFieldY, { lineBreak: false });

      doc
        .fillColor('#0F172A')
        .fontSize(9.2)
        .font('Helvetica-Bold')
        .text(data.programDetail || 'N/A', col2X, programFieldY + 15, {
          width: col2Width,
          lineBreak: false,
          ellipsis: true
        });

      cursorY = programCardY + programCardHeight + 13;

      drawSectionHeader(doc, cursorY, '3. Education Level', 'Academic Record');

      const card3Height = Math.max(70, eduList.length * 38 + 20);
      const educationCardY = cursorY + 38;

      doc
        .roundedRect(40, educationCardY, 515, card3Height, 5)
        .fillAndStroke('#FFFFFF', '#E2E8F0');

      let eduY = educationCardY + 11;

      if (eduList.length === 0) {
        doc
          .fillColor('#64748B')
          .fontSize(9)
          .font('Helvetica')
          .text('No educational records uploaded.', col1X, eduY + 5, { lineBreak: false });
      } else {
        eduList.forEach((edu) => {
          doc
            .roundedRect(50, eduY, 495, 30, 4)
            .fill('#F8FAFC');

          doc
            .roundedRect(50, eduY, 495, 30, 4)
            .strokeColor('#F1F5F9')
            .lineWidth(0.8)
            .stroke();

          doc
            .fillColor('#1E293B')
            .fontSize(9)
            .font('Helvetica-Bold')
            .text(edu.degree || 'N/A', 62, eduY + 5, {
              width: 160,
              lineBreak: false,
              ellipsis: true
            });

          doc
            .fillColor('#64748B')
            .fontSize(8)
            .font('Helvetica')
            .text(edu.field || 'General', 225, eduY + 6, {
              width: 120,
              lineBreak: false,
              ellipsis: true
            });

          doc
            .fillColor('#64748B')
            .fontSize(7.5)
            .font('Helvetica')
            .text('Board / Institution', 360, eduY + 4, {
              width: 85,
              lineBreak: false
            });

          doc
            .fillColor('#334155')
            .fontSize(7.8)
            .font('Helvetica-Bold')
            .text(edu.organization || 'N/A', 360, eduY + 15, {
              width: 165,
              lineBreak: false,
              ellipsis: true
            });

          eduY += 38;
        });
      }

      const footerY = 730;

      doc
        .moveTo(40, footerY)
        .lineTo(555, footerY)
        .strokeColor('#E2E8F0')
        .lineWidth(1)
        .stroke();

      doc
        .fillColor('#0F172A')
        .fontSize(8)
        .font('Helvetica-Bold')
        .text('Declaration:', 40, footerY + 13, { continued: true });

      doc
        .fillColor('#64748B')
        .fontSize(8)
        .font('Helvetica')
        .text(
          ' I hereby confirm that all particulars provided in this application form are true and accurate to the best of my knowledge.',
          { width: 330, lineGap: 2 }
        );

      const sigX = 410;

      doc
        .moveTo(sigX, footerY + 46)
        .lineTo(sigX + 135, footerY + 46)
        .strokeColor('#94A3B8')
        .lineWidth(1)
        .stroke();

      doc
        .fillColor('#475569')
        .fontSize(8.5)
        .font('Helvetica-Bold')
        .text('Applicant Signature', sigX, footerY + 51, {
          width: 135,
          align: 'center',
          lineBreak: false
        });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

const createFinalApplicationPackage = async (rawData, files) => {
  const mainPdfBuffer = await createApplicationPDFBuffer(rawData);
  const mergedPdf = await PDFLibDocument.create();

  const baseDoc = await PDFLibDocument.load(mainPdfBuffer);
  const basePages = await mergedPdf.copyPages(baseDoc, baseDoc.getPageIndices());

  basePages.forEach((page) => mergedPdf.addPage(page));

// AFTER
const fileKeys = ['dmc', 'domicile', 'cnicOrFormB', 'fatherCnic']; // <--- ADD fatherCnic HERE
  for (const key of fileKeys) {
    if (files && files[key] && files[key][0]) {
      try {
        const filePath = files[key][0].path;
        const fileBuffer = fs.readFileSync(filePath);
        const attachmentPdf = await PDFLibDocument.load(fileBuffer);

        const pages = await mergedPdf.copyPages(
          attachmentPdf,
          attachmentPdf.getPageIndices()
        );

        pages.forEach((page) => mergedPdf.addPage(page));
      } catch (e) {
        console.error(`Could not append file key ${key}:`, e.message);
      }
    }
  }

  const mergedBytes = await mergedPdf.save();
  return Buffer.from(mergedBytes);
};

module.exports = {
  createFinalApplicationPackage
};