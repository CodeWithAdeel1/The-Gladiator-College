import { AlertCircle, X } from 'lucide-react';

function StatusToast({ message, onClose }) {
  if (!message || message.type !== 'error') return null;

  return (
    <div className="status-toast" role="alert" aria-live="assertive">
      <AlertCircle size={22} aria-hidden="true" />
      <p>{message.text}</p>
      <button type="button" onClick={onClose} aria-label="Dismiss error message">
        <X size={18} />
      </button>
    </div>
  );
}

export default StatusToast;
