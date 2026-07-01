import { ShapeIcon } from '../common/Icons.jsx';
import './ShapeCard.css';

export function ShapeCard({ type, label, onAdd }) {
  function handleDragStart(e) {
    e.dataTransfer.setData('application/dekho3d-shape', type);
    e.dataTransfer.effectAllowed = 'copy';
    // A tiny transparent drag ghost keeps the browser's default drag image
    // from clashing with our own drop-preview cursor in the viewport.
    const ghost = document.createElement('div');
    ghost.style.width = '1px';
    ghost.style.height = '1px';
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    requestAnimationFrame(() => document.body.removeChild(ghost));
  }

  return (
    <button
      className="shape-card"
      draggable
      onDragStart={handleDragStart}
      onClick={() => onAdd(type)}
      type="button"
      title={`Add ${label} (click) or drag into the scene`}
    >
      <span className="shape-card__icon">
        <ShapeIcon type={type} size={26} />
      </span>
      <span className="shape-card__label">{label}</span>
    </button>
  );
}
