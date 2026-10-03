import { Award } from 'lucide-react';

const programs = ['FSc Pre-Medical', 'FSc Pre-Engineering', 'FA Humanities', 'Diploma in IT (DIT)', 'English Language', '5th-10th Academy'];

function ProgramsPage({ id }) {
  return (
    <section id={id} className="page-section" style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h2 style={{ fontSize: '2rem', color: '#1d4ed8', fontWeight: 900, marginBottom: '2rem' }}>Programs Offered</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {programs.map((program) => (
          <article key={program} style={{ border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '10px', backgroundColor: '#f8fafc' }}>
            <Award color="#f59e0b" size={32} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0.5rem 0' }}>{program}</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Complete curriculum aligned with board standards.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProgramsPage;
