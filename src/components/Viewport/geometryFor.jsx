/**
 * Returns the JSX geometry element for a given primitive type.
 * Kept separate from SceneObject so geometry tuning lives in one place.
 */
export function GeometryFor({ type }) {
  switch (type) {
    case 'cube':
      return <boxGeometry args={[1, 1, 1]} />;
    case 'sphere':
      return <sphereGeometry args={[0.5, 32, 24]} />;
    case 'cone':
      return <coneGeometry args={[0.5, 1, 32]} />;
    case 'cylinder':
      return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
    case 'torus':
      return <torusGeometry args={[0.4, 0.16, 20, 48]} />;
    case 'plane':
      return <planeGeometry args={[1, 1]} />;
    default:
      return <boxGeometry args={[1, 1, 1]} />;
  }
}
