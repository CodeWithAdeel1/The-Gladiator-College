function ContactPage({ id }) {
  return (
    <section id={id} className="page-section" style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h2 style={{ fontSize: '2rem', color: '#1d4ed8', fontWeight: 900 }}>Contact Information</h2>
      <p style={{ color: '#475569' }}>Main Road, Kalu Khan Campus, KPK, Pakistan</p>
      <p style={{ color: '#475569' }}>Phone: +92 (0937) 555-0123</p>
    </section>
  );
}

export default ContactPage;
