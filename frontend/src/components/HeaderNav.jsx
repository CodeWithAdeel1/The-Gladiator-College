import { useState } from 'react';
import { Mail, Menu, Phone, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/programs', label: 'Programs Offered' },
  { path: '/admissions', label: 'Online Admission' },
  { path: '/contact', label: 'Contact Us' },
];

function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header style={{ backgroundColor: '#1d4ed8', color: '#fff', fontSize: '0.8rem', padding: '0.4rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <strong>Admissions Open for Academic Session 2026-2027</strong>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Phone size={13} /> +92 (0937) 555-0123</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Mail size={13} /> info@gladiators.edu.pk</span>
          </div>
        </div>
      </header>
      <div
       className="sticky-navigation" 
      // style={{position="sticky"}}
      >
        <div className="sticky-navigation-inner ">
          <Link className="school-brand" to="/" onClick={() => setMobileMenuOpen(false)}>
            <img src={logo} alt="The Gladiators Logo" />
            <span>
              <strong>THE GLADIATORS</strong>
              <span>SCHOOL AND COLLEGE KALU KHAN</span>
              <em>&quot;Let's learn and spread.&quot;</em>
            </span>
          </Link>
          <nav className="desktop-nav-menu" aria-label="Main navigation">
            {navItems.map(({ path, label }) => (
              <Link key={path} to={path}>{label}</Link>
            ))}
          </nav>
          <button type="button" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-hamburger-btn">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav className="mobile-drawer" aria-label="Mobile navigation">
            {navItems.map(({ path, label }) => (
              <Link key={path} to={path} onClick={() => setMobileMenuOpen(false)}>{label}</Link>
            ))}
          </nav>
        )}
      </div>
    </>
  );
}

export default HeaderNav;
                    