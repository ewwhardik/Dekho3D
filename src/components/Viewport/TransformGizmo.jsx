import { useEffect, useRef } from 'react';
import { TransformControls } from '@react-three/drei';
import * as THREE from 'three';
import { useEditorStore } from '../../store/editorStore.js';
import { degToRad } from '../../lib/snapping.js';

export function TransformGizmo({ target, orbitControlsRef, selectedIds = [] }) {
  const transformMode = useEditorStore((s) => s.transformMode);
  const transformSpace = useEditorStore((s) => s.transformSpace);
  const snapEnabled = useEditorStore((s) => s.snapEnabled);
  const snap = useEditorStore((s) => s.snap);
  const selectedId = useEditorStore((s) => s.selectedId);
  const pushHistory = useEditorStore((s) => s.pushHistory);
  const updateObjectLive = useEditorStore((s) => s.updateObjectLive);

  const controlsRef = useRef();
  const draggingRef = useRef(false);
  const lastPosRef = useRef(new THREE.Vector3());

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    function onDraggingChanged(event) {
      draggingRef.current = event.value;
      if (orbitControlsRef.current) {
        orbitControlsRef.current.enabled = !event.value;
      }
      if (event.value) {
        pushHistory();
        if (target) lastPosRef.current.copy(target.position);
      }
    }

    function onObjectChange() {
      if (!target || !selectedId) return;

      // Translate with 2+ objects selected: move every other selected
      // object by the same world-space delta as the "active" one — the
      // Blender/Figma group-move behaviour.
      if (transformMode === 'translate' && selectedIds.length > 1) {
        const delta = target.position.clone().sub(lastPosRef.current);
        lastPosRef.current.copy(target.position);
        updateObjectLive(selectedId, { position: target.position.toArray() });
        if (delta.lengthSq() > 0) {
          const { objects } = useEditorStore.getState();
          selectedIds.forEach((id) => {
            if (id === selectedId) return;
            const obj = objects.find((o) => o.id === id);
            if (!obj) return;
            updateObjectLive(id, {
              position: [
                obj.position[0] + delta.x,
                obj.position[1] + delta.y,
                obj.position[2] + delta.z
              ]
            });
          });
        }
        return;
      }

      updateObjectLive(selectedId, {
        position: target.position.toArray(),
        rotation: [target.rotation.x, target.rotation.y, target.rotation.z],
        scale: target.scale.toArray()
      });
    }

    controls.addEventListener('dragging-changed', onDraggingChanged);
    controls.addEventListener('objectChange', onObjectChange);
    return () => {
      controls.removeEventListener('dragging-changed', onDraggingChanged);
      controls.removeEventListener('objectChange', onObjectChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, selectedId, transformMode, selectedIds]);

  if (!target) return null;

  return (
    <TransformControls
      ref={controlsRef}
      object={target}
      mode={transformMode}
      space={transformSpace}
      translationSnap={snapEnabled ? snap.translate : null}
      rotationSnap={snapEnabled ? degToRad(snap.rotateDeg) : null}
      scaleSnap={snapEnabled ? snap.scale : null}
      size={0.85}
    />
  );
}
