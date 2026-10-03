import { ArrowRight } from 'lucide-react';
import { handleFieldKeyNavigation } from './keyboardNavigation';

const fieldStyle = { width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' };

function PersonalInfoStep({ personalInfo, setPersonalInfo, errors, onClearError, onEmailChange, onPhoneChange, onCnicChange, onContinue }) {
  const fields = [
    { label: 'Student Full Name *', name: 'fullName', placeholder: 'Full Name', type: 'text', autoComplete: 'name', hint: 'Enter the name as it appears on official documents.' },
  ];

  return (
    <div onKeyDown={handleFieldKeyNavigation}>
      <h3 style={{ color: '#0f172a', fontWeight: 800, marginBottom: '1.25rem', fontSize: '1.2rem' }}>Personal Profile</h3>
      <div className="personal-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {fields.map(({ label, name, placeholder, type, autoComplete, hint }) => (
          <div key={name}>
            <label style={labelStyle}>{label}</label>
            <input type={type} name={name} autoComplete={autoComplete} style={fieldStyle} value={personalInfo[name]} onChange={(event) => { setPersonalInfo({ ...personalInfo, [name]: event.target.value }); onClearError(); }} placeholder={placeholder} />
            <FieldHint>{hint}</FieldHint>
          </div>
        ))}
        <div>
          <label style={labelStyle}>Email Address *</label>
          <input type="email" name="email" autoComplete="email" inputMode="email" style={{ ...fieldStyle, border: errors.email ? '1px solid #dc2626' : fieldStyle.border }} value={personalInfo.email} onChange={(event) => onEmailChange(event.target.value)} placeholder="student@example.com" />
          {errors.email && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.email}</span>}
          <FieldHint>Use an email address you can check for admission updates.</FieldHint>
        </div>
        <PhoneField label="Student Mobile No. (11 Digits) *" name="phone" value={personalInfo.phone} error={errors.phone} onChange={onPhoneChange} placeholder="03001234567" autoComplete="tel" hint="Enter 11 digits, for example 03001234567." />
        <div>
          <label style={labelStyle}>CNIC / Form-B (13 Digits) *</label>
          <input type="text" name="cnic" autoComplete="off" inputMode="numeric" style={{ ...fieldStyle, border: errors.cnic ? '1px solid #dc2626' : fieldStyle.border }} value={personalInfo.cnic} onChange={(event) => onCnicChange(event.target.value)} placeholder="17301-1234567-1" maxLength={15} />
          {errors.cnic && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.cnic}</span>}
          <FieldHint>Enter all 13 digits; hyphens are added automatically.</FieldHint>
        </div>
        <div>
          <label style={labelStyle}>Father's Full Name *</label>
          <input type="text" name="fatherName" autoComplete="off" style={fieldStyle} value={personalInfo.fatherName} onChange={(event) => { setPersonalInfo({ ...personalInfo, fatherName: event.target.value }); onClearError(); }} placeholder="Father's Name" />
          <FieldHint>Enter the full name as shown on the father's CNIC.</FieldHint>
        </div>
        <PhoneField label="Father's Mobile No. (11 Digits) *" name="fatherPhone" value={personalInfo.fatherPhone} error={errors.fatherPhone} onChange={onPhoneChange} placeholder="03007654321" autoComplete="off" hint="Enter 11 digits, for example 03007654321." />
        <div>
          <label style={labelStyle}>Gender *</label>
          <select style={{ ...fieldStyle, backgroundColor: '#fff' }} value={personalInfo.gender} onChange={(event) => setPersonalInfo({ ...personalInfo, gender: event.target.value })}>
            <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
        <button type="button" onClick={onContinue} style={{ backgroundColor: '#1d4ed8', color: '#fff', border: 0, padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Continue to Program Choice <ArrowRight size={18} /></button>
      </div>
    </div>
  );
}

function PhoneField({ label, name, value, error, onChange, placeholder, autoComplete, hint }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type="tel" name={name} autoComplete={autoComplete} inputMode="numeric" style={{ ...fieldStyle, border: error ? '1px solid #dc2626' : fieldStyle.border }} value={value} onChange={(event) => onChange(name, event.target.value)} placeholder={placeholder} maxLength={11} />
      {error && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{error}</span>}
      <FieldHint>{hint}</FieldHint>
    </div>
  );
}

function FieldHint({ children }) {
  return <small style={{ display: 'block', color: '#64748b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{children}</small>;
}

export default PersonalInfoStep;
