import { Grid } from '@react-three/drei';

export function GridFloor({ visible, theme }) {
  if (!visible) return null;
  return (
    <>
      <Grid
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor={theme?.gridCell || '#2a2f3b'}
        sectionSize={5}
        sectionThickness={1}
        sectionColor={theme?.gridSection || '#454b5c'}
        fadeDistance={38}
        fadeStrength={1.2}
        followCamera={false}
        infiniteGrid
        position={[0, 0, 0]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <shadowMaterial opacity={0.28} />
      </mesh>
    </>
  );
}
