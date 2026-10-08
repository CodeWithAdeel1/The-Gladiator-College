import { Link } from 'react-router-dom';
import { MapPin, BookOpen, ArrowRight } from 'lucide-react';
import { SITE } from '../../config/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <img src="/logo.jpeg" alt="The Gladiators School and College Kalu Khan" />
            <div>
              <strong>THE GLADIATORS</strong>
              <span>SCHOOL AND COLLEGE KALU KHAN</span>
            </div>
          </div>
          <p>
            The Gladiators School and College Kalu Khan provides academic
            programs with a focus on learning, discipline, character building,
            and student development.
          </p>
          <p className="tagline">{SITE.tagline}</p>
        </div>

        <div>
          <h2>Academic Programs</h2>
          <ul>
            <li>FSc Pre-Medical</li>
            <li>FSc Pre-Engineering</li>
            <li>FA Humanities</li>
            <li>Diploma in IT (DIT)</li>
            <li>English Language</li>
            <li>5th-10th Academy</li>
          </ul>
        </div>

        <div>
          <h2>Quick Links</h2>
          <Link to="/about">About the College <ArrowRight size={15} /></Link>
          <Link to="/programs">Programs Offered <ArrowRight size={15} /></Link>
          <Link to="/admissions">Online Admission <ArrowRight size={15} /></Link>
          <Link to="/contact">Contact Information <ArrowRight size={15} /></Link>
        </div>

        <div>
          <h2>Location</h2>
          <p className="footer-location">
            <MapPin size={18} />
            Main Road, Kalu Khan, Khyber Pakhtunkhwa, Pakistan
          </p>
          <p className="footer-note">
            <BookOpen size={18} />
            Please contact the college directly for current admission dates,
            fees, and official contact details.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          © {new Date().getFullYear()} {SITE.name} Kalu Khan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
