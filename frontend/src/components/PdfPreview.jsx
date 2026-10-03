// import React from 'react';

// // Refined Emblem Component with cleanly integrated text
// const GladiatorsEmblem = ({ width = 120, height = 120 }) => (
//   <svg width={width} height={height} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <defs>
//       {/* Curved path perfectly centered inside the top golden arc */}
//       <path id="topArcTextPath" d="M 28,66 Q 100,28 172,66" fill="none" />

//       {/* Curved path centered inside the bottom red ribbon */}
//       <path id="mottoTextPath" d="M 28,175 Q 100,165 172,175" fill="none" />
//     </defs>

//     {/* Sunburst Rays */}
//     <path d="M100 8 L107 24 L93 24 Z" fill="#F59E0B" />
//     <path d="M135 14 L131 30 L120 24 Z" fill="#F59E0B" />
//     <path d="M65 14 L80 24 L69 30 Z" fill="#F59E0B" />
//     <path d="M165 30 L150 43 L142 34 Z" fill="#F59E0B" />
//     <path d="M35 30 L58 34 L50 43 Z" fill="#F59E0B" />

//     {/* Thickened Top Golden Arc Band */}
//     <path d="M 20,72 C 55,30 145,30 180,72 C 160,48 40,48 20,72 Z" fill="#F59E0B" />

//     {/* School Name Text - Centered inside the Thick Arc */}
//     <text fontSize="7.5" fontWeight="900" fill="#1E1B4B" letterSpacing="0.3">
//       <textPath href="#topArcTextPath" startOffset="50%" textAnchor="middle">
//         THE GLADIATORS SCHOOL & COLLEGE
//       </textPath>
//     </text>

//     {/* KALU-KHAN SWABI Badge */}
//     <g transform="translate(0, -2)">
//       <rect x="50" y="74" width="100" height="15" rx="7.5" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="1.2" />
//       <text x="100" y="85" fontSize="7.5" fontWeight="800" fill="#FFFFFF" textAnchor="middle" letterSpacing="0.8">
//         KALU-KHAN SWABI
//       </text>
//     </g>

//     {/* Human Figures */}
//     {/* Left - Green */}
//     <circle cx="72" cy="106" r="6.5" fill="#0D9488" />
//     <path d="M72 114 C58 110, 52 118, 50 128 C62 131, 75 139, 80 148 C82 135, 78 122, 72 114 Z" fill="#0D9488" />

//     {/* Center - Blue */}
//     <circle cx="100" cy="96" r="7.5" fill="#1D4ED8" />
//     <path d="M100 105 C80 102, 70 112, 68 123 C84 128, 94 145, 100 160 C106 145, 116 128, 132 123 C130 112, 120 102, 100 105 Z" fill="#1D4ED8" />

//     {/* Right - Red */}
//     <circle cx="128" cy="106" r="6.5" fill="#E11D48" />
//     <path d="M128 114 C135 114, 139 122, 150 128 C138 131, 125 139, 120 148 C118 135, 122 122, 128 114 Z" fill="#E11D48" />

//     {/* Golden Laurel Base */}
//     <path d="M 30,108 C 30,150 70,168 100,168 C 130,168 170,150 170,108 C 154,138 126,155 100,155 C 74,155 46,138 30,108 Z" fill="#F59E0B" />

//     {/* Bottom Red Motto Ribbon */}
//     <path d="M 15,168 C 55,158 145,158 185,168 L 176,182 C 138,172 62,172 24,182 Z" fill="#E11D48" />

//     {/* Motto Text Centered Inside Red Ribbon */}
//     <text fontSize="7.5" fontStyle="italic" fontWeight="800" fill="#FFFFFF" letterSpacing="0.2">
//       <textPath href="#mottoTextPath" startOffset="50%" textAnchor="middle">
//         Let's learn and spread.
//       </textPath>
//     </text>
//   </svg>
// );

// const dummyData = {
//   personalInfo: {
//     fullName: 'MUHAMMAD ADEEL',
//     email: 'codewithadeel1@gmail.com',
//     phone: '+92 349 4556907',
//     cnic: '17301-1234567-1',
//     gender: 'Male',
//     fatherName: 'Muhammad Saeed',
//     fatherPhone: '+92 315 5429639',
//   },
//   programType: 'Intermediate',
//   programDetail: 'FSc Pre-Engineering',
//   education: [
//     { degree: 'SSC (Matric)', field: 'Science', organization: 'BISE Mardan' },
//     { degree: 'HSSC (FSc)', field: 'Pre-Engineering', organization: 'The Gladiators College Kalukhan' },
//   ],
// };

// const PdfPreviewFrontend = () => {
//   return (
//     <div style={{ maxWidth: '850px', margin: '2rem auto', padding: '1rem', fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
//       <div
//         style={{
//           backgroundColor: '#FFFFFF',
//           color: '#1E293B',
//           boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
//           borderRadius: '8px',
//           padding: '2.5rem',
//           minHeight: '900px',
//           border: '1px solid #E2E8F0',
//         }}
//       >
//         {/* ================= HEADER SECTION ================= */}
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             borderBottom: '2px solid #334155',
//             paddingBottom: '1rem',
//             marginBottom: '1.8rem',
//           }}
//         >
//           {/* Logo & College Details */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
//             <GladiatorsEmblem />
//             <div>
//               <h1 style={{ fontSize: '19px', fontWeight: '800', color: '#1E1B4B', margin: 0, letterSpacing: '-0.2px' }}>
//                 THE GLADIATORS SCHOOL AND COLLEGE
//               </h1>
//               <p style={{ margin: '3px 0 0 0', fontSize: '13px', color: '#0369A1', fontWeight: '700' }}>
//                 KALUKHAN SWABI
//               </p>
//               <span style={{ display: 'inline-block', marginTop: '6px', backgroundColor: '#312E81', color: '#FFF', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '4px', letterSpacing: '0.5px' }}>
//                 ADMISSION APPLICATION FORM
//               </span>
//             </div>
//           </div>

//           {/* Submission Date */}
//           <div style={{ textAlign: 'right', fontSize: '11px', color: '#64748B' }}>
//             <div><strong style={{ color: '#334155' }}>Application Date:</strong></div>
//             <div style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A', marginTop: '2px' }}>{new Date().toLocaleDateString()}</div>
//           </div>
//         </div>

//         {/* ================= 1. PERSONAL PROFILE ================= */}
//         <div
//           style={{
//             borderRadius: '6px',
//             border: '1px solid #E2E8F0',
//             backgroundColor: '#FFFFFF',
//             marginBottom: '1.2rem',
//             overflow: 'hidden',
//           }}
//         >
//           <div style={{ backgroundColor: '#F1F5F9', padding: '0.6rem 1rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <h3 style={{ margin: 0, fontSize: '12.5px', color: '#1E293B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//               1. Personal Profile
//             </h3>
//             <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '500' }}>Student Details</span>
//           </div>

//           <div style={{ padding: '1.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 1.8rem', fontSize: '12.5px' }}>
//             <div style={{ borderBottom: '1px dashed #F1F5F9', paddingBottom: '4px' }}>
//               <span style={{ color: '#64748B', display: 'block', fontSize: '11px', marginBottom: '2px' }}>Full Name</span>
//               <strong style={{ color: '#0F172A', fontSize: '13px' }}>{dummyData.personalInfo.fullName}</strong>
//             </div>
//             <div style={{ borderBottom: '1px dashed #F1F5F9', paddingBottom: '4px' }}>
//               <span style={{ color: '#64748B', display: 'block', fontSize: '11px', marginBottom: '2px' }}>Father's Name</span>
//               <strong style={{ color: '#0F172A', fontSize: '13px' }}>{dummyData.personalInfo.fatherName}</strong>
//             </div>
//             <div style={{ borderBottom: '1px dashed #F1F5F9', paddingBottom: '4px' }}>
//               <span style={{ color: '#64748B', display: 'block', fontSize: '11px', marginBottom: '2px' }}>Email Address</span>
//               <span style={{ color: '#334155', fontWeight: '600' }}>{dummyData.personalInfo.email}</span>
//             </div>
//             <div style={{ borderBottom: '1px dashed #F1F5F9', paddingBottom: '4px' }}>
//               <span style={{ color: '#64748B', display: 'block', fontSize: '11px', marginBottom: '2px' }}>CNIC / Form-B</span>
//               <span style={{ color: '#334155', fontWeight: '600' }}>{dummyData.personalInfo.cnic}</span>
//             </div>
//             <div>
//               <span style={{ color: '#64748B', display: 'block', fontSize: '11px', marginBottom: '2px' }}>Applicant Phone</span>
//               <span style={{ color: '#334155', fontWeight: '600' }}>{dummyData.personalInfo.phone}</span>
//             </div>
//             <div>
//               <span style={{ color: '#64748B', display: 'block', fontSize: '11px', marginBottom: '2px' }}>Father's Phone</span>
//               <span style={{ color: '#334155', fontWeight: '600' }}>{dummyData.personalInfo.fatherPhone}</span>
//             </div>
//             <div>
//               <span style={{ color: '#64748B', display: 'block', fontSize: '11px', marginBottom: '2px' }}>Gender</span>
//               <span style={{ color: '#334155', fontWeight: '600' }}>{dummyData.personalInfo.gender}</span>
//             </div>
//           </div>
//         </div>

//         {/* ================= 2. PROGRAM APPLIED FOR ================= */}
//         <div
//           style={{
//             borderRadius: '6px',
//             border: '1px solid #E2E8F0',
//             backgroundColor: '#FFFFFF',
//             marginBottom: '1.2rem',
//             overflow: 'hidden',
//           }}
//         >
//           <div style={{ backgroundColor: '#F1F5F9', padding: '0.6rem 1rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <h3 style={{ margin: 0, fontSize: '12.5px', color: '#1E293B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//               2. Program Applied For
//             </h3>
//             <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '500' }}>Academic Selection</span>
//           </div>

//           <div style={{ padding: '1.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 1.8rem', fontSize: '12.5px' }}>
//             <div>
//               <span style={{ color: '#64748B', display: 'block', fontSize: '11px', marginBottom: '4px' }}>Academic Stream / Level</span>
//               <span style={{ backgroundColor: '#EEF2FF', color: '#3730A3', padding: '4px 10px', borderRadius: '4px', fontWeight: '700', fontSize: '12px' }}>
//                 {dummyData.programType}
//               </span>
//             </div>
//             <div>
//               <span style={{ color: '#64748B', display: 'block', fontSize: '11px', marginBottom: '4px' }}>Specialization Track</span>
//               <strong style={{ color: '#0F172A', fontSize: '13px' }}>{dummyData.programDetail}</strong>
//             </div>
//           </div>
//         </div>

//         {/* ================= 3. EDUCATION LEVEL ================= */}
//         <div
//           style={{
//             borderRadius: '6px',
//             border: '1px solid #E2E8F0',
//             backgroundColor: '#FFFFFF',
//             marginBottom: '1.8rem',
//             overflow: 'hidden',
//           }}
//         >
//           <div style={{ backgroundColor: '#F1F5F9', padding: '0.6rem 1rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <h3 style={{ margin: 0, fontSize: '12.5px', color: '#1E293B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//               3. Education Level
//             </h3>
//             <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '500' }}>Academic Record</span>
//           </div>

//           <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
//             {dummyData.education.map((edu, i) => (
//               <div
//                 key={i}
//                 style={{
//                   backgroundColor: '#F8FAFC',
//                   padding: '0.8rem 1rem',
//                   borderRadius: '6px',
//                   border: '1px solid #F1F5F9',
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                 }}
//               >
//                 <div>
//                   <div style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B' }}>
//                     {edu.degree} <span style={{ color: '#64748B', fontWeight: '500' }}>({edu.field})</span>
//                   </div>
//                   <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
//                     Board / Institution: <strong style={{ color: '#334155' }}>{edu.organization}</strong>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ================= FOOTER & SIGNATURE ================= */}
//         <div style={{ marginTop: '2.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
//           <div style={{ fontSize: '10.5px', color: '#64748B', maxWidth: '380px', lineHeight: '1.4' }}>
//             <strong>Declaration:</strong> I hereby confirm that all particulars provided in this application form are true and accurate to the best of my knowledge.
//           </div>
//           <div style={{ textAlign: 'center', width: '160px' }}>
//             <div style={{ borderBottom: '1px solid #94A3B8', height: '35px', marginBottom: '4px' }}></div>
//             <span style={{ fontSize: '10.5px', color: '#475569', fontWeight: '600' }}>Applicant Signature</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PdfPreviewFrontend;