import { ArrowLeft, ArrowRight } from 'lucide-react';
import { handleFieldKeyNavigation } from './keyboardNavigation';

const buttonBaseStyle = { borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' };
const selectStyle = { width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' };

function ProgramStep({ programType, programDetail, onCategoryChange, onDetailChange, onBack, onContinue }) {
  return (
    <div onKeyDown={handleFieldKeyNavigation}>
      <h3 style={{ color: '#0f172a', fontWeight: 800, marginBottom: '1.25rem', fontSize: '1.2rem' }}>Program Selection</h3>
      <div className="program-step-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Select Main Program *</label>
          <select style={selectStyle} value={programType} onChange={onCategoryChange}>
            <option value="FSc">FSc Program (Faculty of Science)</option><option value="FA">FA Program (Faculty of Arts)</option><option value="EnglishLanguage">English Language Course</option><option value="Academy">5th to 10th Class Academy</option><option value="DIT">Diploma in IT (DIT)</option>
          </select>
          <small style={{ display: 'block', color: '#64748b', fontSize: '0.75rem', marginTop: '0.3rem' }}>Choose the course you are applying for. Requirements update based on your choice.</small>
        </div>
        {(programType === 'FSc' || programType === 'FA') && (
          <div>
            <label style={labelStyle}>Specialization Stream *</label>
            <select style={selectStyle} value={programDetail} onChange={(event) => onDetailChange(event.target.value)}>
              {programType === 'FA' && <option value="FA Humanities">FA Humanities</option>}
              {programType === 'FSc' && <><option value="FSc Pre-Medical">FSc Pre-Medical</option><option value="FSc Pre-Engineering">FSc Pre-Engineering</option><option value="FSc General Science">FSc General Science / Computer Science</option></>}
            </select>
            <small style={{ display: 'block', color: '#64748b', fontSize: '0.75rem', marginTop: '0.3rem' }}>Select your intended study stream.</small>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
        <button type="button" onClick={onBack} style={{ ...buttonBaseStyle, backgroundColor: '#fff', color: '#475569', border: '1px solid #cbd5e1', padding: '0.75rem 1.75rem', fontWeight: 700 }}><ArrowLeft size={18} /> Back</button>
        <button type="button" onClick={onContinue} style={{ ...buttonBaseStyle, backgroundColor: '#1d4ed8', color: '#fff', border: 0, padding: '0.75rem 2rem' }}>Continue to Education <ArrowRight size={18} /></button>
      </div>
    </div>
  );
}

export default ProgramStep;
