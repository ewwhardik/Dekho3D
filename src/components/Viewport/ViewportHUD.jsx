import { useEditorStore } from '../../store/editorStore.js';
import { FrameIcon } from '../common/Icons.jsx';
import { VIEW_PRESET_ORDER, VIEW_PRESETS } from '../../lib/viewPresets.js';
import './ViewportHUD.css';

export function ViewportHUD() {
  const snapEnabled = useEditorStore((s) => s.snapEnabled);
  const transformMode = useEditorStore((s) => s.transformMode);
  const transformSpace = useEditorStore((s) => s.transformSpace);
  const objectCount = useEditorStore((s) => s.objects.length);
  const selectedCount = useEditorStore((s) => s.selectedIds.length);
  const requestView = useEditorStore((s) => s.requestView);
  const requestFrame = useEditorStore((s) => s.requestFrame);

  const modeLabel = { translate: 'Move', rotate: 'Rotate', scale: 'Scale' }[transformMode];

  return (
    <>
      <div className="viewport-hud fade-in">
        <div className="viewport-hud__chip">
          <span className="viewport-hud__dot" />
          {modeLabel} · {transformSpace === 'world' ? 'Global' : 'Local'}
        </div>
        <div className="viewport-hud__chip">
          {objectCount} object{objectCount === 1 ? '' : 's'}
          {selectedCount > 1 ? ` · ${selectedCount} selected` : ''}
        </div>
        <div className={`viewport-hud__chip ${snapEnabled ? 'viewport-hud__chip--on' : ''}`}>
          Snap {snapEnabled ? 'on' : 'off'}
        </div>
        <div className="viewport-hud__hint">
          Left-drag orbit · Scroll zoom · Right-drag pan · Shift+A add · F frame
        </div>
      </div>

      <div className="view-switcher fade-in">
        {VIEW_PRESET_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            className="view-switcher__btn"
            title={`${VIEW_PRESETS[key].label} view`}
            onClick={() => requestView(key)}
          >
            {VIEW_PRESETS[key].label.slice(0, 1)}
          </button>
        ))}
        <button
          type="button"
          className="view-switcher__btn view-switcher__btn--frame"
          title="Frame selected (F)"
          onClick={requestFrame}
        >
          <FrameIcon size={14} />
        </button>
      </div>
    </>
  );
}
