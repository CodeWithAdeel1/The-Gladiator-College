import { useEffect, useState } from 'react';
import axios from 'axios';
import { BookOpen, GraduationCap, Upload, User } from 'lucide-react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import PageFooter from './Footer';
import PageHeader from './HeaderNav';
import DocumentsStep from './admission/DocumentsStep';
import EducationStep from './admission/EducationStep';
import PersonalInfoStep from './admission/PersonalInfoStep';
import ProgramStep from './admission/ProgramStep';
import SuccessStep from './admission/SuccessStep';
import StatusToast from './admission/StatusToast';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import HomePage from '../pages/HomePage';
import ProgramsPage from '../pages/ProgramsPage';
const API_BASE_URL ='http://localhost:5000' || 'https://the-gladiator-college.vercel.app';
const admissionSteps = [
  { step: 1, label: '1. Personal Profile', icon: User },
  { step: 2, label: '2. Program Choice', icon: BookOpen },
  { step: 3, label: '3. Educational Details', icon: GraduationCap },
  { step: 4, label: '4. Documents Upload', icon: Upload },
];

function AdmissionForm({ isActive }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    cnic: '',
    fatherName: '',
    fatherPhone: '',
    gender: 'Male',
  });
  const [programType, setProgramType] = useState('FSc');
  const [programDetail, setProgramDetail] = useState('FSc Pre-Medical');
  const [educationList, setEducationList] = useState([
    { degree: 'SSC', customDegree: '', field: '', organization: '', board: '' },
  ]);
  const [files, setFiles] = useState({
    dmc: null,
    domicile: null,
    cnicOrFormB: null,
    fatherCnic: null,
  });

  useEffect(() => {
    if (!isActive) return undefined;

    const frame = requestAnimationFrame(() => {
      const section = document.getElementById('admission-form');
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const firstField = section?.querySelector('input:not([type="file"]), select');
      firstField?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [currentStep, isActive]);

  const showError = (text) => setStatusMessage({ type: 'error', text });
  const clearError = () => setStatusMessage(null);

  const handlePhoneChange = (field, value) => {
    clearError();
    const cleaned = value.replace(/\D/g, '').slice(0, 11);
    setPersonalInfo((previous) => ({ ...previous, [field]: cleaned }));
    setErrors((previous) => ({
      ...previous,
      [field]: cleaned.length > 0 && cleaned.length < 11
        ? 'Phone number must be exactly 11 digits (e.g., 03001234567)'
        : null,
    }));
  };

  const handleCnicChange = (value) => {
    clearError();
    const digits = value.replace(/\D/g, '').slice(0, 13);
    let formatted = digits;
    if (digits.length > 5 && digits.length <= 12) {
      formatted = `${digits.slice(0, 5)}-${digits.slice(5)}`;
    } else if (digits.length > 12) {
      formatted = `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
    }

    setPersonalInfo((previous) => ({ ...previous, cnic: formatted }));
    setErrors((previous) => ({
      ...previous,
      cnic: digits.length > 0 && digits.length < 13 ? 'CNIC / Form-B must contain 13 digits' : null,
    }));
  };

  const handleEmailChange = (value) => {
    clearError();
    setPersonalInfo((previous) => ({ ...previous, email: value }));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors((previous) => ({
      ...previous,
      email: value && !emailRegex.test(value) ? 'Please enter a valid email address' : null,
    }));
  };

  const handleProgramCategoryChange = (event) => {
    const category = event.target.value;
    setProgramType(category);
    clearError();
    if (category === 'FA') setProgramDetail('FA Humanities');
    else if (category === 'FSc') setProgramDetail('FSc Pre-Medical');
    else setProgramDetail('N/A');
  };

  const handleEducationChange = (index, key, value) => {
    setEducationList((previous) => previous.map((item, itemIndex) => (
      itemIndex === index ? { ...item, [key]: value } : item
    )));
    clearError();
  };

  const addEducationRow = () => {
    setEducationList((previous) => [
      ...previous,
      { degree: 'HSSC', customDegree: '', field: '', organization: '', board: '' },
    ]);
  };

  const removeEducationRow = (index) => {
    setEducationList((previous) => previous.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleFileChange = (event, key) => {
    setFiles((previous) => ({ ...previous, [key]: event.target.files[0] }));
    clearError();
  };

  const validateStep1 = () => {
    const { fullName, email, phone, cnic, fatherName, fatherPhone } = personalInfo;
    if (!fullName.trim() || !email.trim() || !phone.trim() || !cnic.trim() || !fatherName.trim() || !fatherPhone.trim()) {
      showError('Please fill out all required personal profile fields.');
      return false;
    }
    if (phone.length !== 11 || fatherPhone.length !== 11) {
      showError('Phone numbers must be exactly 11 digits.');
      return false;
    }
    if (cnic.replace(/\D/g, '').length !== 13) {
      showError('CNIC / Form-B must contain 13 digits.');
      return false;
    }
    clearError();
    return true;
  };

  const validateStep2 = () => {
    if (!programType) {
      showError('Please select a program.');
      return false;
    }
    clearError();
    return true;
  };

  const validateStep3 = () => {
    if (programType === 'FA' || programType === 'FSc') {
      const matricRecord = educationList.find((item) => item.degree === 'SSC');
      if (!matricRecord || !matricRecord.field.trim() || !matricRecord.organization.trim() || !matricRecord.board.trim()) {
        showError('Please provide your Matric (SSC) field, school, and board details.');
        return false;
      }
    }
    clearError();
    return true;
  };

  const validateStep4 = () => {
    if ((programType === 'FA' || programType === 'FSc') && !files.dmc) {
      showError('Educational DMC / Transcript upload is required for FA/FSc.');
      return false;
    }
    if (!files.cnicOrFormB || !files.fatherCnic) {
      showError('Applicant Form-B / CNIC and father CNIC uploads are required.');
      return false;
    }
    clearError();
    return true;
  };

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    setCurrentStep((previous) => previous + 1);
  };

  const previousStep = () => {
    clearError();
    setCurrentStep((previous) => previous - 1);
  };

  const submitApplication = async () => {
    if (!validateStep4()) return;
    setLoading(true);
    setStatusMessage(null);

    const education = educationList
      .filter((item) => item.customDegree.trim() || item.field.trim() || item.organization.trim() || item.board.trim())
      .map((item) => ({
      degree: item.degree === 'Other' ? item.customDegree : item.degree,
      field: item.field,
      organization: item.organization,
      board: item.degree === 'SSC' || item.degree === 'HSSC' ? item.board : '',
      }));
    const formData = new FormData();
    const payload = {
      programType,
      programDetail: programType === 'FA' || programType === 'FSc' ? programDetail : 'General',
      personalInfo,
      education,
    };

    formData.append('data', JSON.stringify(payload));
    if (files.dmc) formData.append('dmc', files.dmc);
    if (files.domicile) formData.append('domicile', files.domicile);
    if (files.cnicOrFormB) formData.append('cnicOrFormB', files.cnicOrFormB);
    if (files.fatherCnic) formData.append('fatherCnic', files.fatherCnic);

    try {
      await axios.post(`${API_BASE_URL}/api/applications`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatusMessage({ type: 'success', text: 'Application submitted successfully!' });
      setCurrentStep(5);
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Failed to submit application. Check backend server connection.';
      setStatusMessage({ type: 'error', text: serverMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="admission-form" style={{ padding: '3rem 2rem', backgroundColor: '#fff', minHeight: '600px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#1d4ed8', margin: 0 }}>Online Admission Application Form</h2>
          <p style={{ color: '#64748b', margin: '0.25rem 0 0', fontSize: '0.95rem' }}>Please fill out all required fields accurately. Fields marked with (*) are mandatory.</p>
        </div>
        {currentStep <= 4 && <AdmissionProgress currentStep={currentStep} />}
        <StatusToast message={statusMessage} onClose={clearError} />
        {currentStep === 1 && <PersonalInfoStep personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} errors={errors} onClearError={clearError} onEmailChange={handleEmailChange} onPhoneChange={handlePhoneChange} onCnicChange={handleCnicChange} onContinue={nextStep} />}
        {currentStep === 2 && <ProgramStep programType={programType} programDetail={programDetail} onCategoryChange={handleProgramCategoryChange} onDetailChange={setProgramDetail} onBack={previousStep} onContinue={nextStep} />}
        {currentStep === 3 && <EducationStep programType={programType} educationList={educationList} onEducationChange={handleEducationChange} onAddEducation={addEducationRow} onRemoveEducation={removeEducationRow} onBack={previousStep} onContinue={nextStep} />}
        {currentStep === 4 && <DocumentsStep programType={programType} files={files} loading={loading} onFileChange={handleFileChange} onBack={previousStep} onSubmit={submitApplication} />}
        {currentStep === 5 && <SuccessStep />}
      </div>
    </section>
  );
}

function AdmissionProgress({ currentStep }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      {admissionSteps.map(({ step, label, icon: StepIcon }) => {
        const isCurrent = currentStep === step;
        const isComplete = currentStep > step;
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', backgroundColor: isCurrent ? '#1d4ed8' : isComplete ? '#eff6ff' : '#fff', color: isCurrent ? '#fff' : isComplete ? '#1d4ed8' : '#64748b', border: isCurrent ? '2px solid #1d4ed8' : '1px solid #cbd5e1', fontWeight: isCurrent || isComplete ? 800 : 600 }}>
            <StepIcon size={20} /><span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function ApplicationForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmissions = location.pathname === '/admissions';

  useEffect(() => {
    if (isAdmissions) return undefined;

    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, isAdmissions]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#fff', color: '#1e293b', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageHeader />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage id="page-home" onApply={() => navigate('/admissions')} />} />
          <Route path="/about" element={<AboutPage id="page-about" />} />
          <Route path="/programs" element={<ProgramsPage id="page-programs" />} />
          <Route path="/admissions" element={null} />
          <Route path="/contact" element={<ContactPage id="page-contact" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <div style={{ display: isAdmissions ? 'block' : 'none' }}>
          <AdmissionForm isActive={isAdmissions} />
        </div>
      </main>
      <PageFooter />
    </div>
  );
}

export default ApplicationForm;
