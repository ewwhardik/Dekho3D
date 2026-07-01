import { useCallback, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useEditorStore } from '../../store/editorStore.js';
import { SceneContent } from './SceneContent.jsx';
import { ViewportHUD } from './ViewportHUD.jsx';
import './Viewport.css';

export function Viewport({ exportGroupRef }) {
  const addObject = useEditorStore((s) => s.addObject);
  const clearSelection = useEditorStore((s) => s.clearSelection);
  const snapEnabled = useEditorStore((s) => s.snapEnabled);
  const snap = useEditorStore((s) => s.snap);

  const [dragOver, setDragOver] = useState(false);
  const threeRef = useRef({ camera: null, gl: null });
  const raycaster = useRef(new THREE.Raycaster());
  const groundPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));

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

  return (
    <div
      className={`viewport ${dragOver ? 'viewport--drag' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setDragOver(false)}
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
    </div>
  );
}
