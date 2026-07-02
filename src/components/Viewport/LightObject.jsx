import { useRef } from 'react';
import { Outlines } from '@react-three/drei';
import { useEditorStore } from '../../store/editorStore.js';

const GIZMO_SIZE = 0.16;

/**
 * Lights have no visible geometry of their own, so each one gets a small
 * wireframe gizmo (an octahedron, Blender's own light-icon shape) that is
 * clickable/selectable and always renders in the light's own color.
 *
 * Direction for spot/sun lights is controlled the same way the transform
 * gizmo controls everything else — by rotating the wrapping <group> — via
 * a child "target" object three.js's light.target points at. That target
 * is parented under the same group, so it inherits the group's rotation
 * automatically and the light aims wherever the gizmo is rotated to.
 */
export function LightObject({ obj, isSelected, isPrimary, registerRef }) {
  const targetRef = useRef();
  const selectObject = useEditorStore((s) => s.selectObject);

  if (!obj.visible) return null;

  const needsTarget = obj.type === 'spotLight' || obj.type === 'directionalLight';

  function handleTargetReady(light) {
    if (light && targetRef.current && light.target !== undefined) {
      light.target = targetRef.current;
    }
  }

  return (
    <group
      ref={(node) => registerRef(obj.id, node)}
      position={obj.position}
      rotation={obj.rotation}
      userData={{ dekhoId: obj.id }}
    >
      {obj.type === 'pointLight' && (
        <pointLight
          color={obj.color}
          intensity={obj.intensity}
          distance={obj.distance}
          decay={obj.decay}
          castShadow={obj.castShadow}
        />
      )}

      {obj.type === 'spotLight' && (
        <spotLight
          ref={handleTargetReady}
          color={obj.color}
          intensity={obj.intensity}
          distance={obj.distance}
          decay={obj.decay}
          angle={obj.angle}
          penumbra={obj.penumbra}
          castShadow={obj.castShadow}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      )}

      {obj.type === 'directionalLight' && (
        <directionalLight
          ref={handleTargetReady}
          color={obj.color}
          intensity={obj.intensity}
          castShadow={obj.castShadow}
          shadow-mapSize-width={1536}
          shadow-mapSize-height={1536}
          shadow-camera-near={0.5}
          shadow-camera-far={30}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
      )}

      {needsTarget && <object3D ref={targetRef} position={[0, -2, 0]} />}

      <mesh
        userData={{ dekhoId: obj.id, dekhoHelper: true }}
        onClick={(e) => {
          e.stopPropagation();
          selectObject(obj.id, { additive: e.shiftKey || e.ctrlKey || e.metaKey });
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <octahedronGeometry args={[GIZMO_SIZE, 0]} />
        <meshBasicMaterial color={obj.color} wireframe toneMapped={false} />
        {isSelected && (
          <Outlines
            thickness={isPrimary ? 2.5 : 1.6}
            color={isPrimary ? '#7c5cff' : '#33dba0'}
            transparent
            opacity={0.9}
          />
        )}
      </mesh>
    </group>
  );
}
