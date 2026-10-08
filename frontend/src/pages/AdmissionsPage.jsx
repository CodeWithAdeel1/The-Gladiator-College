import SEO from '../seo/SEO';
import AdmissionForm from '../components/admission/AdmissionForm';

export default function AdmissionsPage() {
  return (
    <>
      <SEO
        title="Online Admissions 2026-2027 | The Gladiators College Kalu Khan"
        description="Apply online to The Gladiators School and College Kalu Khan for the 2026-2027 academic session. Complete the admission form and upload required documents."
        path="/admissions"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Admissions', path: '/admissions' },
        ]}
      />
      <main className="page-container">
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">ADMISSIONS 2026-2027</span>
            <h1>Online Admission — The Gladiators School and College Kalu Khan</h1>
            <p>
              Complete the form below and submit your admission application
              through the official online portal.
            </p>
          </div>
        </section>
        <AdmissionForm />
      </main>
    </>
  );
}
