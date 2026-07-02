import { useEditorStore } from '../../store/editorStore.js';
import { Vector3Row } from './Vector3Row.jsx';
import { ColorField } from './ColorField.jsx';
import { SliderField } from './SliderField.jsx';
import { ShapeIcon, DuplicateIcon, TrashIcon, AlignIcon, DistributeIcon } from '../common/Icons.jsx';
import { IconButton } from '../common/IconButton.jsx';
import { radToDeg, degToRad } from '../../lib/snapping.js';
import './Inspector.css';

const MATERIAL_PRESETS = [
  { label: 'Matte', metalness: 0, roughness: 0.9 },
  { label: 'Plastic', metalness: 0.1, roughness: 0.35 },
  { label: 'Glossy', metalness: 0.3, roughness: 0.1 },
  { label: 'Metal', metalness: 1, roughness: 0.25 },
  { label: 'Rubber', metalness: 0, roughness: 1 },
  { label: 'Chrome', metalness: 1, roughness: 0.02 }
];

export function Inspector() {
  const objects = useEditorStore((s) => s.objects);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectedIds = useEditorStore((s) => s.selectedIds);
  const updateObjectLive = useEditorStore((s) => s.updateObjectLive);
  const updateObject = useEditorStore((s) => s.updateObject);
  const pushHistory = useEditorStore((s) => s.pushHistory);
  const duplicateSelected = useEditorStore((s) => s.duplicateSelected);
  const removeSelected = useEditorStore((s) => s.removeSelected);
  const alignSelected = useEditorStore((s) => s.alignSelected);
  const distributeSelected = useEditorStore((s) => s.distributeSelected);

  const obj = objects.find((o) => o.id === selectedId);

  // Multi-selection: Figma-style align/distribute panel instead of the
  // single-object transform fields (a shared gizmo across N objects with
  // different rotations gets murky fast, so this stays focused on layout).
  if (selectedIds.length > 1) {
    return (
      <section className="inspector fade-in">
        <div className="inspector__header">
          <div className="inspector__title-row">
            <span className="inspector__name">{selectedIds.length} objects selected</span>
          </div>
          <div className="inspector__header-actions">
            <IconButton label="Duplicate all" size="sm" onClick={duplicateSelected}>
              <DuplicateIcon size={14} />
            </IconButton>
            <IconButton label="Delete all" size="sm" danger onClick={removeSelected}>
              <TrashIcon size={14} />
            </IconButton>
          </div>
        </div>

        <div className="inspector__section">
          <div className="vec3-row__title" style={{ marginBottom: 8 }}>Align centers</div>
          <div className="align-grid">
            <button type="button" className="align-btn" onClick={() => alignSelected('x')}>
              <AlignIcon /> X
            </button>
            <button type="button" className="align-btn" onClick={() => alignSelected('y')}>
              <AlignIcon /> Y
            </button>
            <button type="button" className="align-btn" onClick={() => alignSelected('z')}>
              <AlignIcon /> Z
            </button>
          </div>
        </div>

        <div className="inspector__section">
          <div className="vec3-row__title" style={{ marginBottom: 8 }}>
            Distribute evenly <span className="inspector__hint-inline">(3+ objects)</span>
          </div>
          <div className="align-grid">
            <button
              type="button"
              className="align-btn"
              disabled={selectedIds.length < 3}
              onClick={() => distributeSelected('x')}
            >
              <DistributeIcon /> X
            </button>
            <button
              type="button"
              className="align-btn"
              disabled={selectedIds.length < 3}
              onClick={() => distributeSelected('y')}
            >
              <DistributeIcon /> Y
            </button>
            <button
              type="button"
              className="align-btn"
              disabled={selectedIds.length < 3}
              onClick={() => distributeSelected('z')}
            >
              <DistributeIcon /> Z
            </button>
          </div>
        </div>

        <div className="inspector__placeholder-sub" style={{ padding: '4px 4px 0' }}>
          Tip: drag the gizmo on the active (last-clicked) object to move the whole selection together.
        </div>
      </section>
    );
  }

  if (!obj) {
    return (
      <section className="inspector inspector--empty">
        <div className="panel-title">Inspector</div>
        <div className="inspector__placeholder">
          <p>Nothing selected.</p>
          <p className="inspector__placeholder-sub">Click an object in the scene or the hierarchy to edit it. Shift-click to select more than one.</p>
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

  if (obj.category === 'light') {
    const needsRotation = obj.type === 'spotLight' || obj.type === 'directionalLight';
    const needsRange = obj.type === 'pointLight' || obj.type === 'spotLight';

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

        {needsRotation && (
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
        )}

        <hr className="divider" />

        <div className="inspector__section">
          <div className="vec3-row__title" style={{ marginBottom: 8 }}>Light</div>
          <ColorField value={obj.color} onChange={(c) => updateObject(obj.id, { color: c })} />
        </div>

        <div className="inspector__section inspector__section--gap">
          <SliderField
            label="Intensity"
            value={obj.intensity}
            min={0}
            max={obj.type === 'directionalLight' ? 6 : 40}
            step={0.1}
            onChange={(v) => updateObjectLive(obj.id, { intensity: v })}
            onDragStart={pushHistory}
          />

          {needsRange && (
            <>
              <SliderField
                label="Distance (0 = infinite)"
                value={obj.distance}
                min={0}
                max={40}
                step={0.5}
                onChange={(v) => updateObjectLive(obj.id, { distance: v })}
                onDragStart={pushHistory}
              />
              <SliderField
                label="Decay"
                value={obj.decay}
                min={0}
                max={4}
                step={0.1}
                onChange={(v) => updateObjectLive(obj.id, { decay: v })}
                onDragStart={pushHistory}
              />
            </>
          )}

          {obj.type === 'spotLight' && (
            <>
              <SliderField
                label="Cone angle"
                value={obj.angle}
                min={0.05}
                max={1.4}
                step={0.01}
                onChange={(v) => updateObjectLive(obj.id, { angle: v })}
                onDragStart={pushHistory}
              />
              <SliderField
                label="Penumbra (edge softness)"
                value={obj.penumbra}
                min={0}
                max={1}
                step={0.01}
                onChange={(v) => updateObjectLive(obj.id, { penumbra: v })}
                onDragStart={pushHistory}
              />
            </>
          )}
        </div>

        <div className="inspector__section">
          <label className="light-shadow-toggle">
            <input
              type="checkbox"
              checked={obj.castShadow}
              onChange={(e) => updateObject(obj.id, { castShadow: e.target.checked })}
            />
            Cast shadows
          </label>
        </div>
      </section>
    );
  }

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
        <SliderField
          label="Opacity"
          value={obj.opacity ?? 1}
          onChange={(v) => updateObjectLive(obj.id, { opacity: v })}
          onDragStart={pushHistory}
        />
      </div>

      <div className="inspector__section">
        <div className="vec3-row__title" style={{ marginBottom: 8 }}>Glow (emissive)</div>
        <ColorField
          value={obj.emissive || '#000000'}
          onChange={(c) => updateObject(obj.id, { emissive: c })}
        />
        <SliderField
          label="Glow strength"
          value={obj.emissiveIntensity ?? 0}
          min={0}
          max={4}
          step={0.05}
          onChange={(v) => updateObjectLive(obj.id, { emissiveIntensity: v })}
          onDragStart={pushHistory}
        />
      </div>

      <div className="inspector__section">
        <div className="vec3-row__title" style={{ marginBottom: 8 }}>Material presets</div>
        <div className="material-presets">
          {MATERIAL_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className="material-preset-btn"
              onClick={() => {
                pushHistory();
                updateObject(obj.id, { metalness: preset.metalness, roughness: preset.roughness });
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
