export function handleFieldKeyNavigation(event) {
  const field = event.target;
  if (!field.matches('input, select, textarea') || field.matches('[type="file"], textarea')) return;

  const isTextField = field.matches('input:not([type="file"]):not([type="checkbox"]):not([type="radio"])');
  const isFormControl = isTextField || field.matches('select');
  const direction = (event.key === 'Enter' && isFormControl) || (isTextField && event.key === 'ArrowDown')
    ? 1
    : isTextField && event.key === 'ArrowUp'
      ? -1
      : 0;

  if (!direction) return;

  event.preventDefault();
  const fields = [...event.currentTarget.querySelectorAll('input:not([type="file"]):not([disabled]), select:not([disabled]), textarea:not([disabled])')]
    .filter((candidate) => candidate.getClientRects().length > 0);
  const currentIndex = fields.indexOf(field);
  const nextField = fields[currentIndex + direction];
  nextField?.focus();
}
