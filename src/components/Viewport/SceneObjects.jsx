import { SceneObject } from './SceneObject.jsx';
import { LightObject } from './LightObject.jsx';

export function SceneObjects({ objects, selectedIds, refsMap }) {
  function registerRef(id, node) {
    if (node) {
      refsMap.current.set(id, node);
    } else {
      refsMap.current.delete(id);
    }
  }

  return (
    <group name="dekho3d-user-objects">
      {objects.map((obj) => {
        const isSelected = selectedIds.includes(obj.id);
        const isPrimary = obj.id === selectedIds[selectedIds.length - 1];
        return obj.category === 'light' ? (
          <LightObject
            key={obj.id}
            obj={obj}
            isSelected={isSelected}
            isPrimary={isPrimary}
            registerRef={registerRef}
          />
        ) : (
          <SceneObject
            key={obj.id}
            obj={obj}
            isSelected={isSelected}
            isPrimary={isPrimary}
            registerRef={registerRef}
          />
        );
      })}
    </group>
  );
}
