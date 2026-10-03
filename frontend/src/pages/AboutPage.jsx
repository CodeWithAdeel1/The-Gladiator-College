function AboutPage({ id }) {
  return (
    <section id={id} className="page-section" style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h2 style={{ fontSize: '2rem', color: '#1d4ed8', fontWeight: 900 }}>About Our College</h2>
      <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: '800px' }}>The Gladiators School and College Kalu Khan is dedicated to high-quality education and character building under our motto <strong>"Let's learn and spread."</strong></p>
    </section>
  );
}

export default AboutPage;
