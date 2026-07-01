import { useEditorStore } from '../../store/editorStore.js';
import { Vector3Row } from './Vector3Row.jsx';
import { ColorField } from './ColorField.jsx';
import { SliderField } from './SliderField.jsx';
import { ShapeIcon, DuplicateIcon, TrashIcon } from '../common/Icons.jsx';
import { IconButton } from '../common/IconButton.jsx';
import { radToDeg, degToRad } from '../../lib/snapping.js';
import './Inspector.css';

export function Inspector() {
  const objects = useEditorStore((s) => s.objects);
  const selectedId = useEditorStore((s) => s.selectedId);
  const updateObjectLive = useEditorStore((s) => s.updateObjectLive);
  const updateObject = useEditorStore((s) => s.updateObject);
  const pushHistory = useEditorStore((s) => s.pushHistory);
  const duplicateSelected = useEditorStore((s) => s.duplicateSelected);
  const removeSelected = useEditorStore((s) => s.removeSelected);

  const obj = objects.find((o) => o.id === selectedId);

  if (!obj) {
    return (
      <section className="inspector inspector--empty">
        <div className="panel-title">Inspector</div>
        <div className="inspector__placeholder">
          <p>Nothing selected.</p>
          <p className="inspector__placeholder-sub">Click an object in the scene or the hierarchy to edit it.</p>
        </div>
      </section>
    );
  }

  function setAxisLive(field, axis, value) {
    const next = [...obj[field]];
    next[axis] = value;
    updateObjectLive(obj.id, { [field]: next });
  }

  function commitAxis(field, axis, value) {
    const next = [...obj[field]];
    next[axis] = value;
    updateObject(obj.id, { [field]: next });
  }

  const rotationDeg = obj.rotation.map(radToDeg);

  return (
    <section className="inspector fade-in">
      <div className="inspector__header">
        <div className="inspector__title-row">
          <ShapeIcon type={obj.type} size={18} />
          <span className="inspector__name">{obj.name}</span>
        </div>
        <div className="inspector__header-actions">
          <IconButton label="Duplicate" size="sm" onClick={duplicateSelected}>
            <DuplicateIcon size={14} />
          </IconButton>
          <IconButton label="Delete" size="sm" danger onClick={removeSelected}>
            <TrashIcon size={14} />
          </IconButton>
        </div>
      </div>

      <div className="inspector__type-badge">{obj.type}</div>

      <div className="inspector__section">
        <Vector3Row
          title="Position"
          values={obj.position}
          step={0.1}
          precision={2}
          onChangeAxis={(axis, v) => setAxisLive('position', axis, v)}
          onCommitAxis={(axis, v) => commitAxis('position', axis, v)}
          onDragStart={pushHistory}
        />
      </div>

      <div className="inspector__section">
        <Vector3Row
          title="Rotation (°)"
          values={rotationDeg}
          step={1}
          precision={0}
          onChangeAxis={(axis, v) => {
            const next = [...obj.rotation];
            next[axis] = degToRad(v);
            updateObjectLive(obj.id, { rotation: next });
          }}
          onCommitAxis={(axis, v) => {
            const next = [...obj.rotation];
            next[axis] = degToRad(v);
            updateObject(obj.id, { rotation: next });
          }}
          onDragStart={pushHistory}
        />
      </div>

      <div className="inspector__section">
        <Vector3Row
          title="Scale"
          values={obj.scale}
          step={0.05}
          precision={2}
          onChangeAxis={(axis, v) => setAxisLive('scale', axis, v)}
          onCommitAxis={(axis, v) => commitAxis('scale', axis, v)}
          onDragStart={pushHistory}
        />
      </div>

      <hr className="divider" />

      <div className="inspector__section">
        <div className="vec3-row__title" style={{ marginBottom: 8 }}>Appearance</div>
        <ColorField value={obj.color} onChange={(c) => updateObject(obj.id, { color: c })} />
      </div>

      <div className="inspector__section inspector__section--gap">
        <SliderField
          label="Metalness"
          value={obj.metalness}
          onChange={(v) => updateObjectLive(obj.id, { metalness: v })}
          onDragStart={pushHistory}
        />
        <SliderField
          label="Roughness"
          value={obj.roughness}
          onChange={(v) => updateObjectLive(obj.id, { roughness: v })}
          onDragStart={pushHistory}
        />
      </div>
    </section>
  );
}
