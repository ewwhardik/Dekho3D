import { useRef } from 'react';
import { Outlines } from '@react-three/drei';
import { GeometryFor } from './geometryFor.jsx';
import { useEditorStore } from '../../store/editorStore.js';

export function SceneObject({ obj, isSelected, isPrimary, registerRef }) {
  const meshRef = useRef();
  const selectObject = useEditorStore((s) => s.selectObject);
  const wireframe = useEditorStore((s) => s.wireframe);

  if (!obj.visible) return null;

  return (
    <mesh
      ref={(node) => {
        meshRef.current = node;
        registerRef(obj.id, node);
      }}
      position={obj.position}
      rotation={obj.rotation}
      scale={obj.scale}
      castShadow
      receiveShadow
      userData={{ dekhoId: obj.id }}
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
      <GeometryFor type={obj.type} />
      <meshStandardMaterial
        color={obj.color}
        metalness={obj.metalness}
        roughness={obj.roughness}
        emissive={obj.emissive || '#000000'}
        emissiveIntensity={obj.emissiveIntensity ?? 0}
        opacity={obj.opacity ?? 1}
        transparent={(obj.opacity ?? 1) < 1}
        wireframe={wireframe}
        side={obj.type === 'plane' ? 2 : 0}
      />
      {isSelected && (
        <Outlines
          thickness={isPrimary ? 2.5 : 1.6}
          color={isPrimary ? '#7c5cff' : '#33dba0'}
          transparent
          opacity={0.9}
        />
      )}
    </mesh>
  );
}
