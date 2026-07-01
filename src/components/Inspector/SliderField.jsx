import './SliderField.css';

export function SliderField({ label, value, onChange, onDragStart, min = 0, max = 1, step = 0.01 }) {
  return (
    <div className="slider-field">
      <div className="slider-field__top">
        <span className="slider-field__label">{label}</span>
        <span className="slider-field__value mono">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        onMouseDown={() => onDragStart?.()}
        onTouchStart={() => onDragStart?.()}
        className="slider-field__input"
      />
    </div>
  );
}
