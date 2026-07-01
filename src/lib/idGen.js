let counter = 0;

/**
 * Generates a short, human-friendly unique id.
 * Not cryptographically unique — fine for a client-only scene graph.
 */
export function generateId(prefix = 'obj') {
  counter += 1;
  const rand = Math.random().toString(36).slice(2, 7);
  return `${prefix}_${Date.now().toString(36)}_${counter}_${rand}`;
}
