import { useEffect, useRef } from 'react';
import { TransformControls } from '@react-three/drei';
import { useEditorStore } from '../../store/editorStore.js';
import { degToRad } from '../../lib/snapping.js';

export function TransformGizmo({ target, orbitControlsRef }) {
  const transformMode = useEditorStore((s) => s.transformMode);
  const snapEnabled = useEditorStore((s) => s.snapEnabled);
  const snap = useEditorStore((s) => s.snap);
  const selectedId = useEditorStore((s) => s.selectedId);
  const pushHistory = useEditorStore((s) => s.pushHistory);
  const updateObjectLive = useEditorStore((s) => s.updateObjectLive);

  const controlsRef = useRef();
  const draggingRef = useRef(false);

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
      }
    }

    function onObjectChange() {
      if (!target || !selectedId) return;
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
  }, [target, selectedId]);

  if (!target) return null;

  return (
    <TransformControls
      ref={controlsRef}
      object={target}
      mode={transformMode}
      translationSnap={snapEnabled ? snap.translate : null}
      rotationSnap={snapEnabled ? degToRad(snap.rotateDeg) : null}
      scaleSnap={snapEnabled ? snap.scale : null}
      size={0.85}
    />
  );
}
