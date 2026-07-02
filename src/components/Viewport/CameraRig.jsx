import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useEditorStore } from '../../store/editorStore.js';
import { VIEW_PRESETS } from '../../lib/viewPresets.js';

/**
 * Listens for viewCommand changes in the store (set by toolbar/HUD buttons
 * or the F / 1 / 3 / 7 / 0 keyboard shortcuts) and smoothly tweens the
 * camera + OrbitControls target toward the requested view — Blender's
 * numpad views and "frame selected", without needing a physics/animation lib.
 */
export function CameraRig({ orbitControlsRef, refsMap }) {
  const { camera } = useThree();
  const viewCommand = useEditorStore((s) => s.viewCommand);
  const selectedIds = useEditorStore((s) => s.selectedIds);

  const anim = useRef(null);

  useEffect(() => {
    if (!viewCommand) return;
    const controls = orbitControlsRef.current;
    if (!controls) return;

    let endPos;
    let endTarget;

    if (viewCommand.action === 'preset') {
      const preset = VIEW_PRESETS[viewCommand.preset] || VIEW_PRESETS.perspective;
      endPos = new THREE.Vector3(...preset.position);
      endTarget = new THREE.Vector3(...preset.target);
    } else if (viewCommand.action === 'frame') {
      const box = new THREE.Box3();
      let found = false;
      const ids = selectedIds.length ? selectedIds : Array.from(refsMap.current.keys());
      ids.forEach((id) => {
        const node = refsMap.current.get(id);
        if (node) {
          box.expandByObject(node);
          found = true;
        }
      });
      if (!found) return;
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const radius = Math.max(size.length() * 0.65, 2.5);
      const dir = camera.position.clone().sub(controls.target);
      dir.lengthSq() < 0.0001 ? dir.set(1, 0.8, 1) : dir.normalize();
      endTarget = center;
      endPos = center.clone().add(dir.multiplyScalar(radius * 2));
    } else {
      return;
    }

    anim.current = {
      startPos: camera.position.clone(),
      startTarget: controls.target.clone(),
      endPos,
      endTarget,
      t0: performance.now(),
      duration: 450
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewCommand]);

  useFrame(() => {
    const a = anim.current;
    if (!a) return;
    const controls = orbitControlsRef.current;
    if (!controls) return;
    const t = Math.min(1, (performance.now() - a.t0) / a.duration);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    camera.position.lerpVectors(a.startPos, a.endPos, eased);
    controls.target.lerpVectors(a.startTarget, a.endTarget, eased);
    controls.update();
    if (t >= 1) anim.current = null;
  });

  return null;
}
