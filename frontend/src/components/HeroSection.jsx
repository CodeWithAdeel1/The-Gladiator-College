import { ArrowRight, Check } from 'lucide-react';

function HeroSection({ onApplyNow }) {
  return (
    <section style={{ backgroundColor: '#1d4ed8', color: '#fff', padding: '3.5rem 2rem', backgroundImage: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 60%, #f59e0b 150%)', borderBottom: '4px solid #f59e0b' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <span style={{ backgroundColor: '#f59e0b', color: '#0f172a', padding: '0.35rem 0.9rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800 }}>OFFICIAL ADMISSION PORTAL 2026-2027</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '1rem 0 0.75rem', lineHeight: 1.15 }}>Welcome to The Gladiators School &amp; College</h2>
          <p style={{ fontSize: '1.1rem', color: '#fef3c7', marginBottom: '1.5rem', lineHeight: 1.6, maxWidth: '650px' }}>Kalu Khan Campus. Dedicated to empowering students with modern educational standards, discipline, and strong moral values.</p>
          <button onClick={onApplyNow} style={{ backgroundColor: '#dc2626', color: '#fff', border: 0, padding: '0.85rem 2rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Start Admission Application <ArrowRight size={18} />
          </button>
        </div>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', minWidth: '280px' }}>
          <h3 style={{ color: '#f59e0b', margin: '0 0 0.75rem', fontSize: '1.1rem', fontWeight: 800 }}>Campus Highlights</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', display: 'grid', gap: '0.5rem' }}>
            <li><Check size={16} color="#f59e0b" /> Experienced &amp; Qualified Faculty</li>
            <li><Check size={16} color="#f59e0b" /> Science &amp; Computer Laboratories</li>
            <li><Check size={16} color="#f59e0b" /> DIT &amp; English Language Coaching</li>
            <li><Check size={16} color="#f59e0b" /> Academy Classes for 5th to 10th</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
