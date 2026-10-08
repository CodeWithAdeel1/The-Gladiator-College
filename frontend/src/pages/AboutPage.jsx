import { BookOpen, Target, Users, Award } from 'lucide-react';
import SEO from '../seo/SEO';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About The Gladiators School and College Kalu Khan"
        description="Learn about The Gladiators School and College Kalu Khan, its educational focus, academic programs, student development and college mission."
        path="/about"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />

      <main className="page-container">
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">ABOUT THE COLLEGE</span>
            <h1>About The Gladiators School and College Kalu Khan</h1>
            <p>
              Learn more about our educational focus, academic opportunities,
              and student-centered approach.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container two-column">
            <div>
              <span className="eyebrow">OUR STORY</span>
              <h2>Education with purpose</h2>
              <p>
                The Gladiators School and College Kalu Khan is focused on
                providing students with opportunities for academic learning,
                personal development, discipline, and character building.
              </p>
              <p>
                Students and families can use this official college portal to
                explore available programs, learn about admissions, and find
                important information about studying at the Kalu Khan campus.
              </p>
            </div>
            <div className="about-highlight">
              <img src="/logo.jpeg" alt="The Gladiators School and College logo" />
              <strong>“Let's learn and spread.”</strong>
              <span>The Gladiators School and College Kalu Khan</span>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">OUR FOCUS</span>
              <h2>Supporting student growth</h2>
            </div>
            <div className="feature-grid">
              <article className="feature-card"><BookOpen /><h3>Learning</h3><p>Academic opportunities across school and college programs.</p></article>
              <article className="feature-card"><Target /><h3>Discipline</h3><p>A learning environment that values responsibility and consistency.</p></article>
              <article className="feature-card"><Users /><h3>Community</h3><p>Supporting students and families through clear information and guidance.</p></article>
              <article className="feature-card"><Award /><h3>Development</h3><p>Encouraging academic, personal and character development.</p></article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
