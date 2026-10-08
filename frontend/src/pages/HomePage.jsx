import { ArrowRight, BookOpen, CheckCircle2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';
import HeroSection from '../components/home/HeroSection';

export default function HomePage() {
  return (
    <>
      <SEO
        title="The Gladiators School and College Kalu Khan | Admissions 2026-2027"
        description="Official website of The Gladiators School and College Kalu Khan. Explore FSc, FA, DIT, English Language and academy programs and apply online for 2026-2027."
        path="/"
      />

      <main>
        <HeroSection />

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">WELCOME TO THE COLLEGE</span>
              <h2>The Gladiators School and College Kalu Khan</h2>
              <p>
                The Gladiators School and College is an educational institution
                serving students in Kalu Khan and the surrounding community.
                Explore our programs and use the online admission portal to
                begin your application.
              </p>
            </div>

            <div className="feature-grid">
              <article className="feature-card">
                <BookOpen />
                <h3>Academic Programs</h3>
                <p>Explore FSc, FA, DIT, English Language and academy programs.</p>
              </article>
              <article className="feature-card">
                <CheckCircle2 />
                <h3>Online Admissions</h3>
                <p>Submit your admission information and required documents online.</p>
              </article>
              <article className="feature-card">
                <MapPin />
                <h3>Kalu Khan Campus</h3>
                <p>Find college information and location details for students and families.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container two-column">
            <div>
              <span className="eyebrow">WHY CHOOSE US</span>
              <h2>Learning, discipline and character building</h2>
              <p>
                Our website provides information about The Gladiators School and
                College, its academic programs, and the online admission process
                for students looking to study in Kalu Khan.
              </p>
            </div>
            <div className="info-list">
              <div><CheckCircle2 /> Clear academic program information</div>
              <div><CheckCircle2 /> Online admission application</div>
              <div><CheckCircle2 /> Student-focused learning environment</div>
              <div><CheckCircle2 /> School and college level opportunities</div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-box">
            <div>
              <span className="eyebrow">ADMISSIONS 2026-2027</span>
              <h2>Ready to start your application?</h2>
              <p>Review the requirements and submit your online admission form.</p>
            </div>
            <Link className="btn btn-primary" to="/admissions">
              Apply Online <ArrowRight size={19} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
