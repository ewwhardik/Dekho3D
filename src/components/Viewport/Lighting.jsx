export function Lighting({ theme }) {
  return (
    <>
      <ambientLight intensity={theme.ambient} />
      <hemisphereLight args={theme.hemi} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={theme.dirIntensity}
        color={theme.dirColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-6, 4, -6]} intensity={theme.rimIntensity} color={theme.rimColor} />
    </>
  );
}
