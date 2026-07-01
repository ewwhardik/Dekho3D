import { useEditorStore } from '../../store/editorStore.js';
import './ViewportHUD.css';

export function ViewportHUD() {
  const snapEnabled = useEditorStore((s) => s.snapEnabled);
  const transformMode = useEditorStore((s) => s.transformMode);
  const objectCount = useEditorStore((s) => s.objects.length);

  const modeLabel = { translate: 'Move', rotate: 'Rotate', scale: 'Scale' }[transformMode];

  return (
    <div className="viewport-hud fade-in">
      <div className="viewport-hud__chip">
        <span className="viewport-hud__dot" />
        {modeLabel}
      </div>
      <div className="viewport-hud__chip">{objectCount} object{objectCount === 1 ? '' : 's'}</div>
      <div className={`viewport-hud__chip ${snapEnabled ? 'viewport-hud__chip--on' : ''}`}>
        Snap {snapEnabled ? 'on' : 'off'}
      </div>
      <div className="viewport-hud__hint">Left-drag orbit · Scroll zoom · Right-drag pan</div>
    </div>
  );
}
