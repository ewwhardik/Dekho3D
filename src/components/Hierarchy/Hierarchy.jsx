import { useState } from 'react';
import { useEditorStore } from '../../store/editorStore.js';
import { ShapeIcon, EyeIcon, EyeOffIcon, TrashSmallIcon } from '../common/Icons.jsx';
import './Hierarchy.css';

export function Hierarchy() {
  const objects = useEditorStore((s) => s.objects);
  const selectedIds = useEditorStore((s) => s.selectedIds);
  const selectObject = useEditorStore((s) => s.selectObject);
  const toggleVisibility = useEditorStore((s) => s.toggleVisibility);
  const removeObject = useEditorStore((s) => s.removeObject);
  const renameObject = useEditorStore((s) => s.renameObject);

  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState('');

  function startRename(obj) {
    setEditingId(obj.id);
    setDraft(obj.name);
  }

  function commitRename() {
    if (editingId && draft.trim()) {
      renameObject(editingId, draft.trim());
    }
    setEditingId(null);
  }

  return (
    <section className="hierarchy">
      <div className="hierarchy__header">
        <span className="panel-title">Hierarchy</span>
        <span className="hierarchy__count mono">{objects.length}</span>
      </div>

      {objects.length === 0 ? (
        <div className="hierarchy__empty">
          <p>No objects yet.</p>
          <p className="hierarchy__empty-sub">Add a shape from the library to get started.</p>
        </div>
      ) : (
        <ul className="hierarchy__list">
          {objects.map((obj) => (
            <li
              key={obj.id}
              className={`hierarchy__item ${selectedIds.includes(obj.id) ? 'hierarchy__item--selected' : ''}`}
              onClick={(e) => selectObject(obj.id, { additive: e.shiftKey || e.ctrlKey || e.metaKey })}
            >
              <span className="hierarchy__icon">
                <ShapeIcon type={obj.type} size={16} />
              </span>

              {editingId === obj.id ? (
                <input
                  className="hierarchy__rename-input"
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={commitRename}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitRename();
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span
                  className="hierarchy__name"
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    startRename(obj);
                  }}
                >
                  {obj.name}
                </span>
              )}

              <span className="hierarchy__swatch" style={{ background: obj.color }} />

              <button
                className="hierarchy__action"
                title={obj.visible ? 'Hide' : 'Show'}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVisibility(obj.id);
                }}
                type="button"
              >
                {obj.visible ? <EyeIcon size={14} /> : <EyeOffIcon size={14} />}
              </button>

              <button
                className="hierarchy__action hierarchy__action--danger"
                title="Delete"
                onClick={(e) => {
                  e.stopPropagation();
                  removeObject(obj.id);
                }}
                type="button"
              >
                <TrashSmallIcon size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
