import { NumberField } from './NumberField.jsx';
import './Vector3Row.css';

const AXIS_COLORS = { X: '#ff6b81', Y: '#5ee39a', Z: '#5ea8ff' };

export function Vector3Row({ title, values, step, precision, onChangeAxis, onCommitAxis, onDragStart }) {
  return (
    <div className="vec3-row">
      <div className="vec3-row__title">{title}</div>
      <div className="vec3-row__fields">
        {['X', 'Y', 'Z'].map((axis, i) => (
          <NumberField
            key={axis}
            label={axis}
            accent={AXIS_COLORS[axis]}
            value={values[i]}
            step={step}
            precision={precision}
            onChange={(v) => onChangeAxis(i, v)}
            onCommit={(v) => onCommitAxis(i, v)}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}
