export const SNAP_DEFAULTS = {
  translate: 0.5,   // world units
  rotateDeg: 15,     // degrees
  scale: 0.1
};

export function snapValue(value, step) {
  if (!step) return value;
  return Math.round(value / step) * step;
}

export function snapVector3(vec, step) {
  return [snapValue(vec[0], step), snapValue(vec[1], step), snapValue(vec[2], step)];
}

export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}
