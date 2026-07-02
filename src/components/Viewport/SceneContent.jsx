import { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useEditorStore } from '../../store/editorStore.js';
import { Lighting } from './Lighting.jsx';
import { GridFloor } from './GridFloor.jsx';
import { SceneObjects } from './SceneObjects.jsx';
import { TransformGizmo } from './TransformGizmo.jsx';
import { CameraRig } from './CameraRig.jsx';
import { THEMES } from '../../lib/themes.js';

export function SceneContent({ exportGroupRef }) {
  const objects = useEditorStore((s) => s.objects);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectedIds = useEditorStore((s) => s.selectedIds);
  const showGrid = useEditorStore((s) => s.showGrid);
  const theme = THEMES[useEditorStore((s) => s.theme)] || THEMES.studio;

  const refsMap = useRef(new Map());
  const orbitControlsRef = useRef();

  const selectedObject3D = selectedId ? refsMap.current.get(selectedId) : null;

  return (
    <>
      <color attach="background" args={[theme.bg]} />
      <fog attach="fog" args={theme.fog} />

      <Lighting theme={theme} />
      <GridFloor visible={showGrid} theme={theme} />

      <group ref={exportGroupRef}>
        <SceneObjects objects={objects} selectedIds={selectedIds} refsMap={refsMap} />
      </group>

      {selectedObject3D && (
        <TransformGizmo
          target={selectedObject3D}
          orbitControlsRef={orbitControlsRef}
          selectedIds={selectedIds}
        />
      )}

      <CameraRig orbitControlsRef={orbitControlsRef} refsMap={refsMap} />

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
