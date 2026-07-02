/**
 * Blender-style "numpad" camera views. Positions are relative to the
 * origin; CameraRig tweens the live camera + orbit target toward these
 * whenever the user requests a preset view.
 */
export const VIEW_PRESETS = {
  perspective: { position: [6, 5, 8], target: [0, 0, 0], label: 'Perspective' },
  top: { position: [0, 14, 0.001], target: [0, 0, 0], label: 'Top' },
  front: { position: [0, 2.6, 13], target: [0, 0, 0], label: 'Front' },
  right: { position: [13, 2.6, 0], target: [0, 0, 0], label: 'Right' }
};

export const VIEW_PRESET_ORDER = ['perspective', 'top', 'front', 'right'];
