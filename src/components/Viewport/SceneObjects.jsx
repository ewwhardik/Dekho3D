import { SceneObject } from './SceneObject.jsx';

export function SceneObjects({ objects, selectedId, refsMap }) {
  function registerRef(id, node) {
    if (node) {
      refsMap.current.set(id, node);
    } else {
      refsMap.current.delete(id);
    }
  }

  return (
    <group name="dekho3d-user-objects">
      {objects.map((obj) => (
        <SceneObject
          key={obj.id}
          obj={obj}
          isSelected={obj.id === selectedId}
          registerRef={registerRef}
        />
      ))}
    </group>
  );
}
