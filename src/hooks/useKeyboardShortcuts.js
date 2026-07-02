import { useEffect } from 'react';
import { useEditorStore } from '../store/editorStore.js';

/**
 * Global keyboard shortcuts. Ignored while the user is typing in an
 * input/textarea so inspector fields stay editable.
 */
export function useKeyboardShortcuts() {
  const {
    selectedId,
    removeSelected,
    duplicateSelected,
    setTransformMode,
    toggleTransformSpace,
    undo,
    redo,
    toggleSnap,
    clearSelection,
    selectAll,
    requestFrame,
    requestView
  } = useEditorStore();

  useEffect(() => {
    function isEditableTarget(target) {
      const tag = target.tagName?.toLowerCase();
      return tag === 'input' || tag === 'textarea' || target.isContentEditable;
    }

    function onKeyDown(e) {
      if (isEditableTarget(e.target)) return;

      const isMod = e.metaKey || e.ctrlKey;

      if (isMod && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }
      if (isMod && (e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
        return;
      }
      if (isMod && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        duplicateSelected();
        return;
      }
      if (isMod && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        selectAll();
        return;
      }
      // Shift+A is reserved for the viewport's quick-add radial menu.
      if (e.shiftKey && e.key.toLowerCase() === 'a') return;

      switch (e.key.toLowerCase()) {
        case 'delete':
        case 'backspace':
          if (selectedId) {
            e.preventDefault();
            removeSelected();
          }
          break;
        case 'w':
        case 't':
          setTransformMode('translate');
          break;
        case 'e':
        case 'r':
          setTransformMode('rotate');
          break;
        case 's':
          setTransformMode('scale');
          break;
        case 'x':
          toggleTransformSpace();
          break;
        case 'g':
          toggleSnap();
          break;
        case 'f':
          requestFrame();
          break;
        case '1':
          requestView('front');
          break;
        case '3':
          requestView('right');
          break;
        case '7':
          requestView('top');
          break;
        case '0':
          requestView('perspective');
          break;
        case 'escape':
          clearSelection();
          break;
        default:
          break;
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    selectedId,
    removeSelected,
    duplicateSelected,
    setTransformMode,
    toggleTransformSpace,
    undo,
    redo,
    toggleSnap,
    clearSelection,
    selectAll,
    requestFrame,
    requestView
  ]);
}
