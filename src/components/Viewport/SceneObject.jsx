import { useRef } from 'react';
import { Outlines } from '@react-three/drei';
import { GeometryFor } from './geometryFor.jsx';
import { useEditorStore } from '../../store/editorStore.js';

export function SceneObject({ obj, isSelected, registerRef }) {
  const meshRef = useRef();
  const selectObject = useEditorStore((s) => s.selectObject);

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
        selectObject(obj.id);
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
        side={obj.type === 'plane' ? 2 : 0}
      />
      {isSelected && <Outlines thickness={2.5} color="#7c5cff" transparent opacity={0.9} />}
    </mesh>
  );
}
