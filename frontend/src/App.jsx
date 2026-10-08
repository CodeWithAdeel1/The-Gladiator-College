import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderNav from './components/layout/HeaderNav';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import ContactPage from './pages/ContactPage';

function NotFound() {
  return (
    <main className="not-found page-container">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <a className="btn btn-primary" href="/">Go to Home</a>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <HeaderNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
