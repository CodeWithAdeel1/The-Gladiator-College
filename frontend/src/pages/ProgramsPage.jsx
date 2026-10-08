import { ArrowRight, Award, BookOpen, Code2, Languages, FlaskConical, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';

const programs = [
  {
    name: 'FSc Pre-Medical',
    icon: FlaskConical,
    description: 'A science-focused college pathway for students interested in medical and health-related higher education.',
  },
  {
    name: 'FSc Pre-Engineering',
    icon: GraduationCap,
    description: 'A science and mathematics-focused pathway for students preparing for engineering and related fields.',
  },
  {
    name: 'FA Humanities',
    icon: BookOpen,
    description: 'A humanities-focused program covering subjects that support broad academic and social understanding.',
  },
  {
    name: 'Diploma in IT (DIT)',
    icon: Code2,
    description: 'Information technology studies covering practical digital and computing skills.',
  },
  {
    name: 'English Language',
    icon: Languages,
    description: 'English language learning designed to support communication and academic development.',
  },
  {
    name: '5th-10th Academy',
    icon: Award,
    description: 'Academic preparation and support for students from class 5 through class 10.',
  },
];

export default function ProgramsPage() {
  return (
    <>
      <SEO
        title="Programs Offered | The Gladiators School and College Kalu Khan"
        description="Explore programs at The Gladiators School and College Kalu Khan including FSc Pre-Medical, FSc Pre-Engineering, FA Humanities, DIT, English Language and 5th-10th Academy."
        path="/programs"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Programs', path: '/programs' },
        ]}
      />

      <main className="page-container">
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">ACADEMIC PROGRAMS</span>
            <h1>Programs Offered at The Gladiators College Kalu Khan</h1>
            <p>
              Explore school and college-level academic opportunities and
              choose the program that matches your educational goals.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="program-grid">
              {programs.map(({ name, icon: Icon, description }) => (
                <article className="program-card" key={name}>
                  <div className="program-icon"><Icon size={30} /></div>
                  <h2>{name}</h2>
                  <p>{description}</p>
                  <Link to="/admissions">Apply for this program <ArrowRight size={17} /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-box">
            <div>
              <span className="eyebrow">ONLINE ADMISSION</span>
              <h2>Choose your program and apply online</h2>
              <p>Complete the admission form and upload the required documents.</p>
            </div>
            <Link className="btn btn-primary" to="/admissions">Start Application <ArrowRight size={18} /></Link>
          </div>
        </section>
      </main>
    </>
  );
}
