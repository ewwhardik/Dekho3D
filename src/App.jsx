import { useRef, useState, useCallback } from 'react';
import { Toolbar } from './components/Toolbar/Toolbar.jsx';
import { ObjectLibrary } from './components/ObjectLibrary/ObjectLibrary.jsx';
import { Hierarchy } from './components/Hierarchy/Hierarchy.jsx';
import { Inspector } from './components/Inspector/Inspector.jsx';
import { Viewport } from './components/Viewport/Viewport.jsx';
import { Toast } from './components/common/Toast.jsx';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts.js';
import { exportSceneToGLTF } from './lib/exportGLTF.js';
import { useEditorStore } from './store/editorStore.js';
import './App.css';

let toastCounter = 0;

export default function App() {
  useKeyboardShortcuts();

  const exportGroupRef = useRef();
  const objects = useEditorStore((s) => s.objects);
  const [exporting, setExporting] = useState(false);
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((message, type = 'success') => {
    const id = ++toastCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  async function handleExport() {
    if (objects.length === 0) {
      pushToast('Add an object before exporting.', 'error');
      return;
    }
    setExporting(true);
    try {
      await exportSceneToGLTF(exportGroupRef.current, { binary: true, fileName: 'dekho3d-scene' });
      pushToast('Scene exported as dekho3d-scene.glb');
    } catch (err) {
      pushToast(err.message || 'Export failed.', 'error');
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="app-shell">
      <Toolbar onExport={handleExport} exporting={exporting} />

      <div className="app-shell__body">
        <aside className="app-shell__left">
          <ObjectLibrary />
          <hr className="divider" />
          <Hierarchy />
        </aside>

        <main className="app-shell__center">
          <Viewport exportGroupRef={exportGroupRef} />
        </main>

        <aside className="app-shell__right">
          <Inspector />
        </aside>
      </div>

      <Toast toasts={toasts} />
    </div>
  );
}
