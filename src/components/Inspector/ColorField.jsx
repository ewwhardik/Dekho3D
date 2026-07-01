import './ColorField.css';

export function ColorField({ value, onChange }) {
  return (
    <label className="color-field">
      <span className="color-field__swatch" style={{ background: value }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="color-field__input"
        />
      </span>
      <span className="color-field__hex mono">{value.toUpperCase()}</span>
    </label>
  );
}
