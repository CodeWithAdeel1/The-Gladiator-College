import { CheckCircle } from 'lucide-react';

function SuccessStep() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
        <CheckCircle size={48} />
      </div>
      <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 900, marginBottom: '0.5rem' }}>Application Submitted!</h2>
      <p style={{ color: '#64748b', maxWidth: '550px', margin: '0 auto 2rem', lineHeight: 1.6, fontSize: '1rem' }}>Thank you for applying to <strong>The Gladiators School &amp; College Kalu Khan</strong>. Your application details have been received.</p>
      <button onClick={() => window.location.reload()} style={{ backgroundColor: '#1d4ed8', color: '#fff', border: 0, padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>Submit Another Application</button>
    </div>
  );
}

export default SuccessStep;
