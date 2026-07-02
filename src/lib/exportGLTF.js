import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

/**
 * Exports a THREE.Object3D (typically the group holding all user-created
 * scene objects) to a .gltf or .glb file and triggers a browser download.
 */
export function exportSceneToGLTF(rootObject, { binary = true, fileName = 'dekho3d-scene' } = {}) {
  return new Promise((resolve, reject) => {
    if (!rootObject) {
      reject(new Error('Nothing to export yet — add some objects to the scene first.'));
      return;
    }

    // Editor-only helpers (light selection gizmos, etc.) are tagged with
    // userData.dekhoHelper so they render in the viewport but never end up
    // baked into the exported file. GLTFExporter's `onlyVisible` flag does
    // the filtering, so this just toggles them off for the duration of
    // the export, then restores whatever they were before.
    const helperNodes = [];
    rootObject.traverse((node) => {
      if (node.userData?.dekhoHelper) helperNodes.push(node);
    });
    const previousVisibility = helperNodes.map((n) => n.visible);
    helperNodes.forEach((n) => {
      n.visible = false;
    });

    function restoreHelpers() {
      helperNodes.forEach((n, i) => {
        n.visible = previousVisibility[i];
      });
    }

    const exporter = new GLTFExporter();

    exporter.parse(
      rootObject,
      (result) => {
        restoreHelpers();
        try {
          if (binary) {
            const blob = new Blob([result], { type: 'application/octet-stream' });
            downloadBlob(blob, `${fileName}.glb`);
          } else {
            const output = JSON.stringify(result, null, 2);
            const blob = new Blob([output], { type: 'application/json' });
            downloadBlob(blob, `${fileName}.gltf`);
          }
          resolve();
        } catch (err) {
          reject(err);
        }
      },
      (error) => {
        restoreHelpers();
        reject(error);
      },
      { binary, onlyVisible: true }
    );
  });
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
