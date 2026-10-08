import { MapPin, MessageCircle, Clock } from 'lucide-react';
import SEO from '../seo/SEO';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact The Gladiators School and College Kalu Khan"
        description="Find location and admission contact information for The Gladiators School and College Kalu Khan."
        path="/contact"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />

      <main className="page-container">
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">CONTACT</span>
            <h1>Contact The Gladiators School and College Kalu Khan</h1>
            <p>For official admission dates, fees, documents and current contact details, please contact the college directly.</p>
          </div>
        </section>

        <section className="section">
          <div className="container contact-grid">
            <article className="contact-card">
              <MapPin />
              <h2>Campus Location</h2>
              <p>Main Road, Kalu Khan, Khyber Pakhtunkhwa, Pakistan</p>
            </article>

            <article className="contact-card">
              <MessageCircle />
              <h2>Admission Questions</h2>
              <p>Use the online admission portal or contact the college for current admission guidance.</p>
            </article>

            <article className="contact-card">
              <Clock />
              <h2>Admission Session</h2>
              <p>Academic Session 2026-2027. Confirm deadlines and requirements with the college.</p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
