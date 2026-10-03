import { ArrowLeft, Upload } from 'lucide-react';

const documentKeys = ['dmc', 'cnicOrFormB', 'fatherCnic', 'domicile'];

function DocumentsStep({ programType, files, loading, onFileChange, onBack, onSubmit }) {
  const labels = {
    dmc: `Educational DMC / Transcript ${(programType === 'FA' || programType === 'FSc') ? '*' : '(Optional)'}`,
    domicile: 'Domicile Certificate (Optional)',
    cnicOrFormB: 'Applicant CNIC / Form-B Copy *',
    fatherCnic: "Father's CNIC Copy *",
  };

  return (
    <div>
      <h3 style={{ color: '#0f172a', fontWeight: 800, marginBottom: '1.25rem', fontSize: '1.2rem' }}>Required Documents Upload</h3>
      <div className="document-upload-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {documentKeys.map((key) => (
          <div key={key} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#334155', marginBottom: '0.75rem' }}>{labels[key]}</label>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #cbd5e1', borderRadius: '10px', padding: '1.5rem', cursor: 'pointer', backgroundColor: '#fff' }}>
              <Upload size={32} style={{ color: '#1d4ed8', marginBottom: '0.5rem' }} />
              <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600, textAlign: 'center' }}>{files[key] ? files[key].name : 'Click to Select PDF File'}</span>
              <input type="file" accept="application/pdf" style={{ display: 'none' }} onChange={(event) => onFileChange(event, key)} />
            </label>
            <small style={{ display: 'block', color: '#64748b', fontSize: '0.75rem', marginTop: '0.5rem' }}>Choose a PDF file. Fields marked * are required.</small>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
        <button onClick={onBack} style={{ backgroundColor: '#fff', color: '#475569', border: '1px solid #cbd5e1', padding: '0.75rem 1.75rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowLeft size={18} /> Back</button>
        <button onClick={onSubmit} disabled={loading} style={{ backgroundColor: '#dc2626', color: '#fff', border: 0, padding: '0.85rem 2.25rem', borderRadius: '8px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{loading ? 'Submitting Form...' : 'Submit Application Now'}</button>
      </div>
    </div>
  );
}

export default DocumentsStep;
