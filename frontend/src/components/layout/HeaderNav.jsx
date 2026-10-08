import { Menu, X, Phone, Mail } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { SITE } from '../../config/site';

export default function HeaderNav() {
  const [open, setOpen] = useState(false);

  const links = [
    ['/', 'Home'],
    ['/about', 'About Us'],
    ['/programs', 'Programs'],
    ['/admissions', 'Online Admission'],
    ['/contact', 'Contact'],
  ];

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>Admissions Open for Academic Session {SITE.session}</span>
          <div className="top-contact">
            <span><Phone size={14} /> Contact the college for admission information</span>
            <span><Mail size={14} /> Official admission portal</span>
          </div>
        </div>
      </div>

      <nav className="navbar" aria-label="Main navigation">
        <div className="container navbar-inner">
          <Link className="brand" to="/" onClick={() => setOpen(false)}>
            <img src="/logo.jpeg" alt="The Gladiators School and College Kalu Khan logo" />
            <span className="brand-copy">
              <strong>THE GLADIATORS</strong>
              <small>SCHOOL AND COLLEGE KALU KHAN</small>
              <em>{SITE.tagline}</em>
            </span>
          </Link>

          <div className="desktop-nav">
            {links.map(([path, label]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                {label}
              </NavLink>
            ))}
          </div>

          <button
            className="menu-button"
            type="button"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {open && (
          <div className="mobile-nav">
            <div className="container">
              {links.map(([path, label]) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setOpen(false)}
                  className="mobile-nav-link"
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
