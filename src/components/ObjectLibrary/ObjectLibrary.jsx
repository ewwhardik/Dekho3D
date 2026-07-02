import { PRIMITIVE_LIST } from '../../lib/primitives.js';
import { LIGHT_LIST } from '../../lib/lights.js';
import { useEditorStore } from '../../store/editorStore.js';
import { ShapeCard } from './ShapeCard.jsx';
import './ObjectLibrary.css';

export function ObjectLibrary() {
  const addObject = useEditorStore((s) => s.addObject);

  function handleAdd(type) {
    addObject(type);
  }

  return (
    <section className="library">
      <div className="library__header">
        <span className="panel-title">Object library</span>
      </div>
      <p className="library__hint">Drag a shape into the scene, or click to drop it at the origin.</p>
      <div className="library__grid">
        {PRIMITIVE_LIST.map((p) => (
          <ShapeCard key={p.type} type={p.type} label={p.label} onAdd={handleAdd} />
        ))}
      </div>

      <div className="library__subheader">
        <span className="panel-title">Lights</span>
      </div>
      <div className="library__grid">
        {LIGHT_LIST.map((l) => (
          <ShapeCard key={l.type} type={l.type} label={l.label} onAdd={handleAdd} />
        ))}
      </div>
    </section>
  );
}
