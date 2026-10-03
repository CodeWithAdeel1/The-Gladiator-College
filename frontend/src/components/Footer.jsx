import { Mail, MapPin, Phone } from 'lucide-react';
import logo from '../assets/logo.jpeg';

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', borderTop: '4px solid #f59e0b', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img src={logo} alt="The Gladiators Logo" style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover' }} />
              <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 900, margin: 0 }}>THE GLADIATORS</h2>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>School and College Kalu Khan Campus. Committed to providing quality education and character building.</p>
            <strong style={{ fontSize: '0.85rem', color: '#f59e0b' }}>"Let's learn and spread."</strong>
          </div>
          <div>
            <h2 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '1rem' }}>Academic Programs</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'grid', gap: '0.5rem' }}>
              <li>FSc Pre-Medical &amp; Pre-Engineering</li><li>FA Humanities</li><li>Diploma in IT (DIT)</li><li>English Language Courses</li><li>5th to 10th Class Prep Academy</li>
            </ul>
          </div>
          <div>
            <h2 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '1rem' }}>Campus Address</h2>
            <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', gap: '0.6rem' }}><MapPin size={18} color="#f59e0b" /><span>Main Road, Kalu Khan, District Swabi / Mardan Region, KPK, Pakistan</span></div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}><Phone size={18} color="#f59e0b" /><span>+92 (0937) 555-0123 / 0300-1234567</span></div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}><Mail size={18} color="#f59e0b" /><span>info@gladiators.edu.pk</span></div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1.25rem', textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
          © {currentYear} The Gladiators School &amp; College Kalu Khan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
