import { useEditorStore } from '../../store/editorStore.js';
import { IconButton } from '../common/IconButton.jsx';
import {
  LogoMark,
  MoveIcon,
  RotateIcon,
  ScaleIcon,
  DuplicateIcon,
  TrashIcon,
  MagnetIcon,
  GridIcon,
  UndoIcon,
  RedoIcon,
  DownloadIcon
} from '../common/Icons.jsx';
import './Toolbar.css';

export function Toolbar({ onExport, exporting }) {
  const {
    transformMode,
    setTransformMode,
    snapEnabled,
    toggleSnap,
    showGrid,
    toggleGrid,
    selectedId,
    duplicateSelected,
    removeSelected,
    undo,
    redo,
    past,
    future
  } = useEditorStore();

  return (
    <header className="toolbar">
      <div className="toolbar__brand">
        <LogoMark />
        <span className="toolbar__brand-name">Dekho3D</span>
      </div>

      <div className="toolbar__divider" />

      <div className="toolbar__group" role="group" aria-label="Transform tools">
        <IconButton
          label="Move (W)"
          active={transformMode === 'translate'}
          onClick={() => setTransformMode('translate')}
        >
          <MoveIcon />
        </IconButton>
        <IconButton
          label="Rotate (E)"
          active={transformMode === 'rotate'}
          onClick={() => setTransformMode('rotate')}
        >
          <RotateIcon />
        </IconButton>
        <IconButton
          label="Scale (S)"
          active={transformMode === 'scale'}
          onClick={() => setTransformMode('scale')}
        >
          <ScaleIcon />
        </IconButton>
      </div>

      <div className="toolbar__divider" />

      <div className="toolbar__group" role="group" aria-label="Object actions">
        <IconButton label="Duplicate (Ctrl+D)" disabled={!selectedId} onClick={duplicateSelected}>
          <DuplicateIcon />
        </IconButton>
        <IconButton label="Delete (Del)" danger disabled={!selectedId} onClick={removeSelected}>
          <TrashIcon />
        </IconButton>
      </div>

      <div className="toolbar__divider" />

      <div className="toolbar__group" role="group" aria-label="Grid and snapping">
        <IconButton label="Toggle grid" active={showGrid} onClick={toggleGrid}>
          <GridIcon />
        </IconButton>
        <IconButton label="Snap to grid (G)" active={snapEnabled} onClick={toggleSnap}>
          <MagnetIcon />
        </IconButton>
      </div>

      <div className="toolbar__divider" />

      <div className="toolbar__group" role="group" aria-label="History">
        <IconButton label="Undo (Ctrl+Z)" disabled={past.length === 0} onClick={undo}>
          <UndoIcon />
        </IconButton>
        <IconButton label="Redo (Ctrl+Shift+Z)" disabled={future.length === 0} onClick={redo}>
          <RedoIcon />
        </IconButton>
      </div>

      <div className="toolbar__spacer" />

      <button className="toolbar__export" onClick={onExport} disabled={exporting} type="button">
        <DownloadIcon size={15} />
        {exporting ? 'Exporting…' : 'Export GLB'}
      </button>
    </header>
  );
}
