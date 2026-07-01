import './IconButton.css';

export function IconButton({
  children,
  active = false,
  danger = false,
  disabled = false,
  label,
  onClick,
  size = 'md'
}) {
  return (
    <button
      className={[
        'icon-btn',
        `icon-btn--${size}`,
        active ? 'icon-btn--active' : '',
        danger ? 'icon-btn--danger' : ''
      ].join(' ')}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}
