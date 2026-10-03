import { ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { handleFieldKeyNavigation } from './keyboardNavigation';

const inputStyle = { width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' };

function EducationStep({ programType, educationList, onEducationChange, onAddEducation, onRemoveEducation, onBack, onContinue }) {
  const matricRequired = programType === 'FA' || programType === 'FSc';
  const requirementLabel = matricRequired ? '*' : '(Optional)';

  return (
    <div onKeyDown={handleFieldKeyNavigation}>
      <h3 style={{ color: '#0f172a', fontWeight: 800, marginBottom: '1.25rem', fontSize: '1.2rem' }}>Educational History</h3>
      {educationList.map((education, index) => (
        <article key={index} style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
          <div className="education-fields-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Degree Level {requirementLabel}</label>
              <select style={{ ...inputStyle, backgroundColor: '#fff' }} value={education.degree} onChange={(event) => onEducationChange(index, 'degree', event.target.value)}>
                <option value="SSC">SSC (Matriculation)</option><option value="HSSC">HSSC (Intermediate)</option><option value="BS">BS / Bachelors</option><option value="Other">Other Certificate</option>
              </select>
              {education.degree === 'Other' && <input type="text" style={{ ...inputStyle, marginTop: '0.5rem' }} value={education.customDegree} onChange={(event) => onEducationChange(index, 'customDegree', event.target.value)} placeholder="Specify Degree Title" aria-label="Specify degree title" />}
            </div>
            <div>
              <label style={labelStyle}>Field / Major {requirementLabel}</label>
              <input type="text" list={`study-field-suggestions-${index}`} style={inputStyle} value={education.field} onChange={(event) => onEducationChange(index, 'field', event.target.value)} placeholder="e.g. Science, Pre-Med" />
              <datalist id={`study-field-suggestions-${index}`}><option value="Science" /><option value="Pre-Medical" /><option value="Pre-Engineering" /><option value="Computer Science" /><option value="Arts" /><option value="Humanities" /></datalist>
              <FieldHint>Choose a suggestion or enter your own subject.</FieldHint>
            </div>
          </div>
          <div className="education-fields-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>School / Institute {requirementLabel}</label>
              <input type="text" list={`school-suggestions-${index}`} style={inputStyle} value={education.organization} onChange={(event) => onEducationChange(index, 'organization', event.target.value)} placeholder="Start typing your school or college name" />
              <datalist id={`school-suggestions-${index}`}><option value="The Gladiators School & College Kalu Khan" /><option value="Government High School Kalu Khan" /><option value="Government Higher Secondary School Kalu Khan" /></datalist>
              <FieldHint>Start typing to see suggestions, or enter your institute name.</FieldHint>
            </div>
            {(education.degree === 'SSC' || education.degree === 'HSSC') && (
              <div>
                <label style={labelStyle}>Board Name {requirementLabel}</label>
                <input type="text" list={`board-suggestions-${index}`} style={inputStyle} value={education.board} onChange={(event) => onEducationChange(index, 'board', event.target.value)} placeholder="Start typing a board name, e.g. BISE" />
                <datalist id={`board-suggestions-${index}`}><option value="BISE Mardan" /><option value="BISE Peshawar" /><option value="BISE Swat" /><option value="BISE Abbottabad" /><option value="BISE Malakand" /><option value="BISE Kohat" /><option value="BISE Bannu" /><option value="BISE Dera Ismail Khan" /></datalist>
                <FieldHint>Choose your examination board or enter its full name.</FieldHint>
              </div>
            )}
          </div>
          {educationList.length > 1 && (
            <div style={{ textAlign: 'right', marginTop: '1rem' }}>
              <button type="button" onClick={() => onRemoveEducation(index)} style={{ color: '#dc2626', background: 'transparent', border: 0, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Trash2 size={16} /> Remove Qualifications Entry</button>
            </div>
          )}
        </article>
      ))}
      <button type="button" onClick={onAddEducation} style={{ width: '100%', padding: '0.85rem', backgroundColor: '#f1f5f9', border: '2px dashed #cbd5e1', borderRadius: '10px', color: '#1d4ed8', fontWeight: 800, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><Plus size={18} /> Add Additional Academic Qualification</button>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
        <button type="button" onClick={onBack} style={{ backgroundColor: '#fff', color: '#475569', border: '1px solid #cbd5e1', padding: '0.75rem 1.75rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowLeft size={18} /> Back</button>
        <button type="button" onClick={onContinue} style={{ backgroundColor: '#1d4ed8', color: '#fff', border: 0, padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Continue to Documents <ArrowRight size={18} /></button>
      </div>
    </div>
  );
}

function FieldHint({ children }) {
  return <small style={{ display: 'block', color: '#64748b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{children}</small>;
}

export default EducationStep;
