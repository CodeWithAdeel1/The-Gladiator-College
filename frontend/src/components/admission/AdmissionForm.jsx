import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  GraduationCap,
  Loader2,
  Plus,
  Send,
  Trash2,
  Upload,
  User,
  X,
} from 'lucide-react';
import { SITE } from '../../config/site';

const initialPersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  cnic: '',
  fatherName: '',
  fatherPhone: '',
  gender: 'Male',
};

const initialEducation = [
  {
    degree: 'SSC',
    customDegree: '',
    field: '',
    organization: '',
    board: '',
  },
];

const initialFiles = {
  dmc: null,
  domicile: null,
  cnicOrFormB: null,
  fatherCnic: null,
};

const admissionSteps = [
  { step: 1, label: '1. Personal Profile', icon: User },
  { step: 2, label: '2. Program Choice', icon: BookOpen },
  { step: 3, label: '3. Educational Details', icon: GraduationCap },
  { step: 4, label: '4. Documents Upload', icon: Upload },
];

function Field({ label, required = false, hint, children }) {
  return (
    <label className="form-field">
      <span>
        {label}
        {required && ' *'}
      </span>
      {children}
      {hint && <small className="form-help">{hint}</small>}
    </label>
  );
}

function FieldHint({ children }) {
  return <small className="form-help">{children}</small>;
}

function StatusMessage({ status, onClose }) {
  if (!status?.message) return null;

  return (
    <div className={`form-status ${status.type}`} role="alert" aria-live="assertive">
      <span>{status.type === 'success' ? <CheckCircle2 size={20} /> : <X size={20} />}</span>
      <span>{status.message}</span>
      <button type="button" onClick={onClose} aria-label="Close message">
        <X size={18} />
      </button>
    </div>
  );
}

export default function AdmissionForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [programType, setProgramType] = useState('FSc');
  const [programDetail, setProgramDetail] = useState('FSc Pre-Medical');
  const [educationList, setEducationList] = useState(initialEducation);
  const [files, setFiles] = useState(initialFiles);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const section = document.getElementById('admission-form');
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const firstField = section?.querySelector(
        'input:not([type="file"]), select'
      );
      firstField?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [currentStep]);

  const clearStatus = () => setStatus({ type: '', message: '' });

  const showError = (message) => {
    setStatus({ type: 'error', message });
  };

  const updatePersonal = (key, value) => {
    setPersonalInfo((current) => ({ ...current, [key]: value }));
    clearStatus();
  };

  const handleEmailChange = (value) => {
    updatePersonal('email', value);
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setErrors((current) => ({
      ...current,
      email: value && !valid ? 'Please enter a valid email address.' : null,
    }));
  };

  const handlePhoneChange = (field, value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 11);
    updatePersonal(field, cleaned);
    setErrors((current) => ({
      ...current,
      [field]:
        cleaned.length > 0 && cleaned.length < 11
          ? 'Phone number must be exactly 11 digits (e.g., 03001234567).'
          : null,
    }));
  };

  const handleCnicChange = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 13);
    let formatted = digits;

    if (digits.length > 5 && digits.length <= 12) {
      formatted = `${digits.slice(0, 5)}-${digits.slice(5)}`;
    } else if (digits.length > 12) {
      formatted = `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
    }

    updatePersonal('cnic', formatted);
    setErrors((current) => ({
      ...current,
      cnic:
        digits.length > 0 && digits.length < 13
          ? 'CNIC / Form-B must contain 13 digits.'
          : null,
    }));
  };

  const handleProgramChange = (event) => {
    const type = event.target.value;
    setProgramType(type);
    clearStatus();

    if (type === 'FA') {
      setProgramDetail('FA Humanities');
    } else if (type === 'FSc') {
      setProgramDetail('FSc Pre-Medical');
    } else if (type === 'DIT') {
      setProgramDetail('Diploma in IT (DIT)');
    } else if (type === 'EnglishLanguage') {
      setProgramDetail('English Language');
    } else {
      setProgramDetail('5th to 10th Class Academy');
    }
  };

  const updateEducation = (index, key, value) => {
    setEducationList((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      )
    );
    clearStatus();
  };

  const addEducation = () => {
    setEducationList((current) => [
      ...current,
      {
        degree: 'HSSC',
        customDegree: '',
        field: '',
        organization: '',
        board: '',
      },
    ]);
  };

  const removeEducation = (index) => {
    setEducationList((current) =>
      current.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleFile = (key, file) => {
    setFiles((current) => ({ ...current, [key]: file || null }));
    clearStatus();
  };

  const validateStep1 = () => {
    const { fullName, email, phone, cnic, fatherName, fatherPhone } = personalInfo;

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !cnic.trim() ||
      !fatherName.trim() ||
      !fatherPhone.trim()
    ) {
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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      showError('Please enter a valid email address.');
      return false;
    }

    clearStatus();
    return true;
  };

  const validateStep2 = () => {
    if (!programType) {
      showError('Please select a program.');
      return false;
    }

    clearStatus();
    return true;
  };

  const validateStep3 = () => {
    if (programType === 'FA' || programType === 'FSc') {
      const matricRecord = educationList.find((item) => item.degree === 'SSC');

      if (
        !matricRecord ||
        !matricRecord.field.trim() ||
        !matricRecord.organization.trim() ||
        !matricRecord.board.trim()
      ) {
        showError(
          'Please provide your Matric (SSC) field, school, and board details.'
        );
        return false;
      }
    }

    clearStatus();
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

    const pdfFiles = Object.entries(files).filter(([, file]) => file);
    const invalidFile = pdfFiles.find(
      ([, file]) => file.type !== 'application/pdf'
    );

    if (invalidFile) {
      showError('All uploaded admission documents must be PDF files.');
      return false;
    }

    clearStatus();
    return true;
  };

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    setCurrentStep((current) => current + 1);
  };

  const previousStep = () => {
    clearStatus();
    setCurrentStep((current) => Math.max(1, current - 1));
  };

  const submit = async () => {
    if (!validateStep4()) return;

    setLoading(true);
    clearStatus();

    const education = educationList
      .filter(
        (item) =>
          item.customDegree.trim() ||
          item.field.trim() ||
          item.organization.trim() ||
          item.board.trim()
      )
      .map((item) => ({
        degree: item.degree === 'Other' ? item.customDegree : item.degree,
        field: item.field,
        organization: item.organization,
        board:
          item.degree === 'SSC' || item.degree === 'HSSC' ? item.board : '',
      }));

    const payload = {
      programType,
      programDetail:
        programType === 'FA' || programType === 'FSc'
          ? programDetail
          : 'General',
      personalInfo,
      education,
    };

    const data = new FormData();
    data.append('data', JSON.stringify(payload));

    Object.entries(files).forEach(([key, file]) => {
      if (file) data.append(key, file);
    });

    try {
      // const response = await axios.post(
      //   `${SITE.apiBaseUrl}/api/applications`,
      //   data
      // );
      const response = await axios.post(
        `${SITE.apiBaseUrl}/api/applications`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || 'Application could not be submitted.'
        );
      }

      setStatus({
        type: 'success',
        message:
          response.data?.message ||
          'Your application has been submitted successfully.',
      });
      setCurrentStep(5);
    } catch (error) {
      let message =
        'Failed to submit application. Check backend server connection.';

      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.status === 413) {
        message =
          'The uploaded files are too large. Please reduce the file sizes and try again.';
      } else if (error.response?.status === 404) {
        message = 'Application API endpoint was not found on the backend.';
      } else if (error.response?.status === 500) {
        message = 'Backend server error while processing the application.';
      } else if (!error.response) {
        message =
          'Could not connect to the backend server. Please check the API URL and CORS settings.';
      } else if (error.message) {
        message = error.message;
      }

      setStatus({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setPersonalInfo({ ...initialPersonalInfo });
    setProgramType('FSc');
    setProgramDetail('FSc Pre-Medical');
    setEducationList(initialEducation.map((item) => ({ ...item })));
    setFiles({ ...initialFiles });
    setErrors({});
    clearStatus();
  };

  if (currentStep === 5) {
    return (
      <section className="section admission-section" id="admission-form">
        <div className="container success-card">
          <CheckCircle2 size={64} />
          <h2>Application Submitted Successfully</h2>
          <p>
            Thank you for applying to <strong>The Gladiators School &amp; College Kalu Khan</strong>.
            Your application details and uploaded documents have been received.
          </p>
          <button className="btn btn-primary" type="button" onClick={resetForm}>
            Submit Another Application
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section admission-section" id="admission-form">
      <div className="container">
        <div className="form-intro">
          <div>
            <span className="eyebrow">OFFICIAL ONLINE ADMISSION PORTAL 2026-2027</span>
            <h2>Online Admission Application Form</h2>
            <p>
              Apply to The Gladiators School and College Kalu Khan. Please fill out all required
              fields accurately. Fields marked with (*) are mandatory.
            </p>
          </div>
          <FileText size={42} aria-hidden="true" />
        </div>

        <AdmissionProgress currentStep={currentStep} />

        <StatusMessage status={status} onClose={clearStatus} />

        {currentStep === 1 && (
          <PersonalStep
            personalInfo={personalInfo}
            errors={errors}
            updatePersonal={updatePersonal}
            handleEmailChange={handleEmailChange}
            handlePhoneChange={handlePhoneChange}
            handleCnicChange={handleCnicChange}
            onContinue={nextStep}
          />
        )}

        {currentStep === 2 && (
          <ProgramStep
            programType={programType}
            programDetail={programDetail}
            onProgramChange={handleProgramChange}
            onDetailChange={setProgramDetail}
            onBack={previousStep}
            onContinue={nextStep}
          />
        )}

        {currentStep === 3 && (
          <EducationStep
            programType={programType}
            educationList={educationList}
            updateEducation={updateEducation}
            addEducation={addEducation}
            removeEducation={removeEducation}
            onBack={previousStep}
            onContinue={nextStep}
          />
        )}

        {currentStep === 4 && (
          <DocumentsStep
            programType={programType}
            files={files}
            loading={loading}
            handleFile={handleFile}
            onBack={previousStep}
            onSubmit={submit}
          />
        )}
      </div>
    </section>
  );
}

function AdmissionProgress({ currentStep }) {
  return (
    <div className="admission-progress" aria-label="Admission application progress">
      {admissionSteps.map(({ step, label, icon: Icon }) => {
        const current = currentStep === step;
        const complete = currentStep > step;

        return (
          <div
            key={step}
            className={`admission-progress-item ${current ? 'current' : ''} ${complete ? 'complete' : ''}`}
          >
            <Icon size={20} aria-hidden="true" />
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function PersonalStep({
  personalInfo,
  errors,
  updatePersonal,
  handleEmailChange,
  handlePhoneChange,
  handleCnicChange,
  onContinue,
}) {
  return (
    <div>
      <h3 className="form-step-title">Personal Profile</h3>
      <div className="form-grid">
        <Field
          label="Student Full Name"
          required
          hint="Enter the name exactly as it appears on official documents."
        >
          <input
            value={personalInfo.fullName}
            autoComplete="name"
            onChange={(e) => updatePersonal('fullName', e.target.value)}
            placeholder="Full Name"
          />
        </Field>

        <Field label="Email Address" required hint="Use an email address you can check for admission updates.">
          <input
            type="email"
            value={personalInfo.email}
            autoComplete="email"
            inputMode="email"
            className={errors.email ? 'input-error' : ''}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="student@example.com"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </Field>

        <Field label="Student Mobile No. (11 Digits)" required hint="Example: 03001234567">
          <input
            type="tel"
            value={personalInfo.phone}
            autoComplete="tel"
            inputMode="numeric"
            maxLength={11}
            className={errors.phone ? 'input-error' : ''}
            onChange={(e) => handlePhoneChange('phone', e.target.value)}
            placeholder="03001234567"
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </Field>

        <Field label="CNIC / Form-B (13 Digits)" required hint="Enter 13 digits; hyphens are added automatically.">
          <input
            value={personalInfo.cnic}
            inputMode="numeric"
            maxLength={15}
            className={errors.cnic ? 'input-error' : ''}
            onChange={(e) => handleCnicChange(e.target.value)}
            placeholder="17301-1234567-1"
          />
          {errors.cnic && <span className="field-error">{errors.cnic}</span>}
        </Field>

        <Field label="Father's Full Name" required hint="Enter the full name as shown on the father's CNIC.">
          <input
            value={personalInfo.fatherName}
            onChange={(e) => updatePersonal('fatherName', e.target.value)}
            placeholder="Father's Name"
          />
        </Field>

        <Field label="Father's Mobile No. (11 Digits)" required hint="Example: 03007654321">
          <input
            type="tel"
            value={personalInfo.fatherPhone}
            inputMode="numeric"
            maxLength={11}
            className={errors.fatherPhone ? 'input-error' : ''}
            onChange={(e) => handlePhoneChange('fatherPhone', e.target.value)}
            placeholder="03007654321"
          />
          {errors.fatherPhone && <span className="field-error">{errors.fatherPhone}</span>}
        </Field>

        <Field label="Gender" required>
          <select value={personalInfo.gender} onChange={(e) => updatePersonal('gender', e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </Field>
      </div>

      <div className="form-actions end">
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          Continue to Program Choice <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function ProgramStep({
  programType,
  programDetail,
  onProgramChange,
  onDetailChange,
  onBack,
  onContinue,
}) {
  return (
    <div>
      <h3 className="form-step-title">Program Selection</h3>
      <div className="form-grid">
        <Field label="Select Main Program" required hint="Requirements update based on your selected program.">
          <select value={programType} onChange={onProgramChange}>
            <option value="FSc">FSc Program (Faculty of Science)</option>
            <option value="FA">FA Program (Faculty of Arts)</option>
            <option value="EnglishLanguage">English Language Course</option>
            <option value="Academy">5th to 10th Class Academy</option>
            <option value="DIT">Diploma in IT (DIT)</option>
          </select>
        </Field>

        {(programType === 'FSc' || programType === 'FA') && (
          <Field label="Specialization Stream" required>
            <select value={programDetail} onChange={(e) => onDetailChange(e.target.value)}>
              {programType === 'FA' && <option value="FA Humanities">FA Humanities</option>}
              {programType === 'FSc' && (
                <>
                  <option value="FSc Pre-Medical">FSc Pre-Medical</option>
                  <option value="FSc Pre-Engineering">FSc Pre-Engineering</option>
                  <option value="FSc General Science / Computer Science">
                    FSc General Science / Computer Science
                  </option>
                </>
              )}
            </select>
          </Field>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          Continue to Education <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function EducationStep({
  programType,
  educationList,
  updateEducation,
  addEducation,
  removeEducation,
  onBack,
  onContinue,
}) {
  const matricRequired = programType === 'FA' || programType === 'FSc';
  const requirementLabel = matricRequired ? '*' : '(Optional)';

  return (
    <div>
      <h3 className="form-step-title">Educational History</h3>

      {educationList.map((item, index) => (
        <article className="education-row" key={index}>
          <Field label={`Degree Level ${requirementLabel}`}>
            <select
              value={item.degree}
              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
            >
              <option value="SSC">SSC (Matriculation)</option>
              <option value="HSSC">HSSC (Intermediate)</option>
              <option value="BS">BS / Bachelors</option>
              <option value="Other">Other Certificate</option>
            </select>
          </Field>

          {item.degree === 'Other' && (
            <Field label="Custom Degree Title" required>
              <input
                value={item.customDegree}
                onChange={(e) => updateEducation(index, 'customDegree', e.target.value)}
                placeholder="Specify Degree Title"
              />
            </Field>
          )}

          <Field label={`Field / Major ${requirementLabel}`}>
            <input
              list={`study-field-suggestions-${index}`}
              value={item.field}
              onChange={(e) => updateEducation(index, 'field', e.target.value)}
              placeholder="e.g. Science, Pre-Medical"
            />
            <datalist id={`study-field-suggestions-${index}`}>
              <option value="Science" />
              <option value="Pre-Medical" />
              <option value="Pre-Engineering" />
              <option value="Computer Science" />
              <option value="Arts" />
              <option value="Humanities" />
            </datalist>
            <FieldHint>Choose a suggestion or enter your own subject.</FieldHint>
          </Field>

          <Field label={`School / Institute ${requirementLabel}`}>
            <input
              list={`school-suggestions-${index}`}
              value={item.organization}
              onChange={(e) => updateEducation(index, 'organization', e.target.value)}
              placeholder="Start typing your school or college name"
            />
            <datalist id={`school-suggestions-${index}`}>
              <option value="The Gladiators School & College Kalu Khan" />
              <option value="Government High School Kalu Khan" />
              <option value="Government Higher Secondary School Kalu Khan" />
            </datalist>
            <FieldHint>Start typing to see suggestions, or enter your institute name.</FieldHint>
          </Field>

          {(item.degree === 'SSC' || item.degree === 'HSSC') && (
            <Field label={`Board Name ${requirementLabel}`}>
              <input
                list={`board-suggestions-${index}`}
                value={item.board}
                onChange={(e) => updateEducation(index, 'board', e.target.value)}
                placeholder="Start typing a board name, e.g. BISE"
              />
              <datalist id={`board-suggestions-${index}`}>
                <option value="BISE Mardan" />
                <option value="BISE Peshawar" />
                <option value="BISE Swat" />
                <option value="BISE Abbottabad" />
                <option value="BISE Malakand" />
                <option value="BISE Kohat" />
                <option value="BISE Bannu" />
                <option value="BISE Dera Ismail Khan" />
              </datalist>
              <FieldHint>Choose your examination board or enter its full name.</FieldHint>
            </Field>
          )}

          {educationList.length > 1 && (
            <button
              type="button"
              className="remove-education-btn"
              onClick={() => removeEducation(index)}
            >
              <Trash2 size={16} /> Remove Qualifications Entry
            </button>
          )}
        </article>
      ))}

      <button type="button" className="add-education-btn" onClick={addEducation}>
        <Plus size={18} /> Add Additional Academic Qualification
      </button>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          Continue to Documents <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function DocumentsStep({
  programType,
  files,
  loading,
  handleFile,
  onBack,
  onSubmit,
}) {
  const labels = {
    dmc: `Educational DMC / Transcript ${programType === 'FA' || programType === 'FSc' ? '*' : '(Optional)'}`,
    domicile: 'Domicile Certificate (Optional)',
    cnicOrFormB: 'Applicant CNIC / Form-B Copy *',
    fatherCnic: "Father's CNIC Copy *",
  };

  return (
    <div>
      <h3 className="form-step-title">Required Documents Upload</h3>

      <div className="file-grid">
        {Object.keys(labels).map((key) => (
          <Field key={key} label={labels[key]}>
            <div className="document-picker">
              <Upload size={30} aria-hidden="true" />
              <strong>{files[key] ? files[key].name : 'Click to Select PDF File'}</strong>
              <small>PDF files only. Maximum server upload size applies.</small>
              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={(e) => handleFile(key, e.target.files?.[0])}
              />
            </div>
          </Field>
        ))}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <button className="btn btn-primary submit-btn" type="button" disabled={loading} onClick={onSubmit}>
          {loading ? (
            <>
              <Loader2 className="spin" size={19} /> Submitting Form...
            </>
          ) : (
            <>
              <Send size={19} /> Submit Application Now
            </>
          )}
        </button>
      </div>
    </div>
  );
}
