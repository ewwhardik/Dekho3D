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

    const exporter = new GLTFExporter();

    exporter.parse(
      rootObject,
      (result) => {
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
      (error) => reject(error),
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
