import HeroSection from '../components/HeroSection';

function HomePage({ id, onApply }) {
  return (
    <div id={id} className="page-section">
      <HeroSection onApplyNow={onApply} />
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', color: '#1d4ed8', fontWeight: 900 }}>Welcome to The Gladiators Campus Portal</h2>
        <p style={{ color: '#64748b', maxWidth: '600px', margin: '1rem auto' }}>Explore our modern academic programs and join our community of learners in Kalu Khan.</p>
        <button onClick={onApply} style={{ backgroundColor: '#f59e0b', color: '#0f172a', border: 0, padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>Apply Online Now</button>
      </section>
    </div>
  );
}

export default HomePage;
