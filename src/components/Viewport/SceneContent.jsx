import { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useEditorStore } from '../../store/editorStore.js';
import { Lighting } from './Lighting.jsx';
import { GridFloor } from './GridFloor.jsx';
import { SceneObjects } from './SceneObjects.jsx';
import { TransformGizmo } from './TransformGizmo.jsx';

export function SceneContent({ exportGroupRef }) {
  const objects = useEditorStore((s) => s.objects);
  const selectedId = useEditorStore((s) => s.selectedId);
  const showGrid = useEditorStore((s) => s.showGrid);

  const refsMap = useRef(new Map());
  const orbitControlsRef = useRef();

  const selectedObject3D = selectedId ? refsMap.current.get(selectedId) : null;

  return (
    <>
      <color attach="background" args={['#0b0c0f']} />
      <fog attach="fog" args={['#0b0c0f', 22, 48]} />

      <Lighting />
      <GridFloor visible={showGrid} />

      <group ref={exportGroupRef}>
        <SceneObjects objects={objects} selectedId={selectedId} refsMap={refsMap} />
      </group>

      {selectedObject3D && (
        <TransformGizmo target={selectedObject3D} orbitControlsRef={orbitControlsRef} />
      )}

      <OrbitControls
        ref={orbitControlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={2}
        maxDistance={60}
        maxPolarAngle={Math.PI / 2 - 0.02}
      />
    </>
  );
}
