import { useRef, useState } from 'react';
import './NumberField.css';

/**
 * A compact numeric field styled like professional 3D tools: click the
 * label and drag horizontally to scrub the value, or click the number
 * itself to type an exact one.
 */
export function NumberField({ label, value, onChange, onCommit, onDragStart, step = 0.1, precision = 2, accent }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const dragState = useRef(null);

  function formatted(v) {
    return Number(v.toFixed(precision));
  }

  function handlePointerDown(e) {
    if (editing) return;
    dragState.current = { startX: e.clientX, startValue: value };
    onDragStart?.();
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e) {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const sensitivity = e.shiftKey ? step * 4 : step;
    const next = formatted(dragState.current.startValue + dx * sensitivity * 0.1);
    onChange(next);
  }

  function handlePointerUp(e) {
    if (!dragState.current) return;
    dragState.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  function startEditing() {
    setDraft(String(formatted(value)));
    setEditing(true);
  }

  function commitDraft() {
    const parsed = parseFloat(draft);
    if (!Number.isNaN(parsed)) {
      onCommit?.(parsed);
    }
    setEditing(false);
  }

  return (
    <div className="num-field">
      <div
        className="num-field__label"
        style={accent ? { color: accent } : undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {label}
      </div>
      {editing ? (
        <input
          className="num-field__input"
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitDraft}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitDraft();
            if (e.key === 'Escape') setEditing(false);
          }}
        />
      ) : (
        <button className="num-field__value mono" onClick={startEditing} type="button">
          {formatted(value)}
        </button>
      )}
    </div>
  );
}
