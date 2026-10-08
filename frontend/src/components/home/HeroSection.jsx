import { ArrowRight, Award, GraduationCap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-pattern" />
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="eyebrow">OFFICIAL ADMISSION PORTAL 2026-2027</span>
          <h1>
            The Gladiators School and College
            <span>Kalu Khan</span>
          </h1>
          <p className="hero-lead">
            Explore academic programs, learn about our college, and submit
            your online admission application for the 2026-2027 academic session.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/admissions">
              Start Admission <ArrowRight size={19} />
            </Link>
            <Link className="btn btn-light" to="/programs">
              View Programs
            </Link>
          </div>

          <div className="hero-stats">
            <div><GraduationCap size={22} /><span>Academic Programs</span></div>
            <div><Award size={22} /><span>Student Development</span></div>
            <div><Users size={22} /><span>Learning Community</span></div>
          </div>
        </div>

        <div className="hero-card">
          <img src="/logo.jpeg" alt="The Gladiators School and College Kalu Khan logo" />
          <h2>Let's learn and spread.</h2>
          <p>School and college education in Kalu Khan with a focus on academic growth and character building.</p>
          <Link to="/about">Learn about the college →</Link>
        </div>
      </div>
    </section>
  );
}
