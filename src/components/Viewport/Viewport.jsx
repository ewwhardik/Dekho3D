import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useEditorStore } from '../../store/editorStore.js';
import { PRIMITIVE_LIST } from '../../lib/primitives.js';
import { LIGHT_LIST } from '../../lib/lights.js';
import { ShapeIcon } from '../common/Icons.jsx';
import { SceneContent } from './SceneContent.jsx';
import { ViewportHUD } from './ViewportHUD.jsx';
import './Viewport.css';

export function Viewport({ exportGroupRef }) {
  const addObject = useEditorStore((s) => s.addObject);
  const clearSelection = useEditorStore((s) => s.clearSelection);
  const snapEnabled = useEditorStore((s) => s.snapEnabled);
  const snap = useEditorStore((s) => s.snap);

  const [dragOver, setDragOver] = useState(false);
  const [quickAdd, setQuickAdd] = useState(null); // { screenX, screenY, worldPos }
  const threeRef = useRef({ camera: null, gl: null });
  const raycaster = useRef(new THREE.Raycaster());
  const groundPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
  const wrapperRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);

  const computeDropPosition = useCallback(
    (clientX, clientY) => {
      const { camera, gl } = threeRef.current;
      if (!camera || !gl) return [0, 0.5, 0];

      const rect = gl.domElement.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );

      raycaster.current.setFromCamera(ndc, camera);
      const point = new THREE.Vector3();
      const hit = raycaster.current.ray.intersectPlane(groundPlane.current, point);
      if (!hit) return [0, 0.5, 0];

      let x = point.x;
      let z = point.z;
      if (snapEnabled) {
        x = Math.round(x / snap.translate) * snap.translate;
        z = Math.round(z / snap.translate) * snap.translate;
      }
      return [x, 0.5, z];
    },
    [snapEnabled, snap]
  );

  // Blender's signature "Shift+A" — pop a quick-add menu right at the
  // cursor instead of forcing a trip to the sidebar library.
  useEffect(() => {
    function onKeyDown(e) {
      if (!hoveringRef.current) return;
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        const { x, y } = pointerRef.current;
        setQuickAdd({
          screenX: x,
          screenY: y,
          worldPos: computeDropPosition(x, y)
        });
      } else if (e.key === 'Escape') {
        setQuickAdd(null);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [computeDropPosition]);

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const type = e.dataTransfer.getData('application/dekho3d-shape');
    if (!type) return;
    const position = computeDropPosition(e.clientX, e.clientY);
    addObject(type, position);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOver(true);
  }

  function handlePointerMove(e) {
    pointerRef.current = { x: e.clientX, y: e.clientY };
  }

  function handleQuickAddPick(type) {
    if (quickAdd) addObject(type, quickAdd.worldPos);
    setQuickAdd(null);
  }

  return (
    <div
      ref={wrapperRef}
      className={`viewport ${dragOver ? 'viewport--drag' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setDragOver(false)}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        hoveringRef.current = true;
      }}
      onPointerLeave={() => {
        hoveringRef.current = false;
      }}
    >
      <Canvas
        shadows
        camera={{ position: [6, 5, 8], fov: 45, near: 0.1, far: 200 }}
        onCreated={({ camera, gl }) => {
          threeRef.current.camera = camera;
          threeRef.current.gl = gl;
        }}
        onPointerMissed={() => clearSelection()}
      >
        <SceneContent exportGroupRef={exportGroupRef} />
      </Canvas>

      <ViewportHUD />

      {dragOver && (
        <div className="viewport__drop-overlay">
          <span>Drop to add to the scene</span>
        </div>
      )}

      {quickAdd && (
        <>
          <div className="quick-add__backdrop" onClick={() => setQuickAdd(null)} />
          <div
            className="quick-add pop-in"
            style={{ left: quickAdd.screenX, top: quickAdd.screenY }}
          >
            <div className="quick-add__title">Add shape</div>
            <div className="quick-add__grid">
              {PRIMITIVE_LIST.map((p) => (
                <button
                  key={p.type}
                  type="button"
                  className="quick-add__item"
                  onClick={() => handleQuickAddPick(p.type)}
                >
                  <ShapeIcon type={p.type} size={20} />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
            <div className="quick-add__title quick-add__title--secondary">Add light</div>
            <div className="quick-add__grid">
              {LIGHT_LIST.map((l) => (
                <button
                  key={l.type}
                  type="button"
                  className="quick-add__item"
                  onClick={() => handleQuickAddPick(l.type)}
                >
                  <ShapeIcon type={l.type} size={20} />
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
