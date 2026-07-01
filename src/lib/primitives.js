/**
 * Central registry of every primitive Dekho3D can place in the scene.
 * Each entry describes how to build geometry, sane defaults, and how the
 * object library card should render its preview icon.
 */

export const PRIMITIVE_TYPES = {
  cube: 'cube',
  sphere: 'sphere',
  cone: 'cone',
  cylinder: 'cylinder',
  torus: 'torus',
  plane: 'plane'
};

export const PRIMITIVE_LIST = [
  {
    type: PRIMITIVE_TYPES.cube,
    label: 'Cube',
    defaultScale: [1, 1, 1],
    defaultPosition: [0, 0.5, 0],
    defaultRotation: [0, 0, 0]
  },
  {
    type: PRIMITIVE_TYPES.sphere,
    label: 'Sphere',
    defaultScale: [1, 1, 1],
    defaultPosition: [0, 0.5, 0],
    defaultRotation: [0, 0, 0]
  },
  {
    type: PRIMITIVE_TYPES.cone,
    label: 'Cone',
    defaultScale: [1, 1, 1],
    defaultPosition: [0, 0.5, 0],
    defaultRotation: [0, 0, 0]
  },
  {
    type: PRIMITIVE_TYPES.cylinder,
    label: 'Cylinder',
    defaultScale: [1, 1, 1],
    defaultPosition: [0, 0.5, 0],
    defaultRotation: [0, 0, 0]
  },
  {
    type: PRIMITIVE_TYPES.torus,
    label: 'Torus',
    defaultScale: [1, 1, 1],
    defaultPosition: [0, 0.5, 0],
    defaultRotation: [0, 0, 0]
  },
  {
    type: PRIMITIVE_TYPES.plane,
    label: 'Plane',
    defaultScale: [2, 2, 1],
    defaultPosition: [0, 0.001, 0],
    defaultRotation: [-Math.PI / 2, 0, 0]
  }
];

// A calm, varied default palette so newly dropped shapes never collide visually.
export const DEFAULT_COLORS = [
  '#7c5cff', '#33dba0', '#ffb648', '#ff5c72', '#4ea1ff', '#e5a6ff'
];

export function pickDefaultColor(index) {
  return DEFAULT_COLORS[index % DEFAULT_COLORS.length];
}

/**
 * Returns a brand-new object record for the given primitive type.
 * Position may be overridden (e.g. drop location on the grid).
 */
export function createObjectRecord({ type, id, name, position, colorIndex = 0 }) {
  const def = PRIMITIVE_LIST.find((p) => p.type === type);
  if (!def) throw new Error(`Unknown primitive type: ${type}`);

  return {
    id,
    type,
    name: name || def.label,
    position: position || [...def.defaultPosition],
    rotation: [...def.defaultRotation],
    scale: [...def.defaultScale],
    color: pickDefaultColor(colorIndex),
    metalness: 0.15,
    roughness: 0.55,
    visible: true,
    castShadow: true
  };
}
