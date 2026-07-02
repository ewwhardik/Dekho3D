/**
 * Registry of every light Dekho3D can place in the scene. Mirrors
 * lib/primitives.js in shape but light records carry photometric fields
 * (intensity, distance, angle, ...) instead of a material.
 */

export const LIGHT_TYPES = {
  pointLight: 'pointLight',
  spotLight: 'spotLight',
  directionalLight: 'directionalLight'
};

export const LIGHT_LIST = [
  {
    type: LIGHT_TYPES.pointLight,
    label: 'Point Light',
    defaultPosition: [2, 3, 2]
  },
  {
    type: LIGHT_TYPES.spotLight,
    label: 'Spot Light',
    defaultPosition: [2, 4, 2]
  },
  {
    type: LIGHT_TYPES.directionalLight,
    label: 'Sun',
    defaultPosition: [4, 5, 2]
  }
];

export function isLightType(type) {
  return Object.prototype.hasOwnProperty.call(LIGHT_TYPES, type);
}

/**
 * Returns a brand-new light record for the given light type. Every light
 * shares position + rotation (rotation orients spot/sun lights via a
 * target offset — see LightObject.jsx) and a handful of type-specific
 * photometric fields with sane, visible-by-default values.
 */
export function createLightRecord({ type, id, name, position }) {
  const def = LIGHT_LIST.find((l) => l.type === type);
  if (!def) throw new Error(`Unknown light type: ${type}`);

  const base = {
    id,
    type,
    category: 'light',
    name: name || def.label,
    position: position || [...def.defaultPosition],
    rotation: [-0.6, 0.5, 0],
    scale: [1, 1, 1],
    color: '#ffffff',
    intensity: 1.2,
    visible: true,
    castShadow: true
  };

  switch (type) {
    case LIGHT_TYPES.pointLight:
      return { ...base, intensity: 8, distance: 12, decay: 2 };
    case LIGHT_TYPES.spotLight:
      return { ...base, intensity: 10, distance: 16, decay: 2, angle: 0.5, penumbra: 0.35 };
    case LIGHT_TYPES.directionalLight:
      return { ...base, intensity: 1.4 };
    default:
      return base;
  }
}
