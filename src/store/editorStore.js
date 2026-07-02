import { create } from 'zustand';
import { generateId } from '../lib/idGen.js';
import { createObjectRecord } from '../lib/primitives.js';
import { createLightRecord, isLightType } from '../lib/lights.js';
import { SNAP_DEFAULTS } from '../lib/snapping.js';

const MAX_HISTORY = 60;

function cloneObjects(objects) {
  return objects.map((o) => ({
    ...o,
    position: [...o.position],
    rotation: [...o.rotation],
    scale: [...o.scale]
  }));
}

export const useEditorStore = create((set, get) => ({
  // ---- Scene state -------------------------------------------------------
  objects: [],
  selectedId: null, // "active" object — drives the Inspector + transform gizmo
  selectedIds: [], // full multi-selection (Figma-style shift/ctrl click)
  hoveredLibraryType: null, // used to preview a shape while dragging

  // ---- Tool state ---------------------------------------------------------
  transformMode: 'translate', // 'translate' | 'rotate' | 'scale'
  transformSpace: 'world', // 'world' | 'local' — Blender-style space toggle (X)
  wireframe: false,
  theme: 'studio', // world/lighting preset — see lib/themes.js
  snapEnabled: true,
  snap: { ...SNAP_DEFAULTS },
  snapSteps: [0.25, 0.5, 1, 2],
  showGrid: true,
  colorCounter: 0,
  viewCommand: null, // { action: 'frame' | 'preset', preset?, token } — read by CameraRig

  // ---- History -------------------------------------------------------------
  past: [],
  future: [],

  // ---------------------------------------------------------------------------
  // History management
  // ---------------------------------------------------------------------------
  pushHistory: () => {
    const { objects, selectedId, selectedIds, past } = get();
    const snapshot = { objects: cloneObjects(objects), selectedId, selectedIds: [...selectedIds] };
    const nextPast = [...past, snapshot].slice(-MAX_HISTORY);
    set({ past: nextPast, future: [] });
  },

  undo: () => {
    const { past, future, objects, selectedId, selectedIds } = get();
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, -1);
    const currentSnapshot = { objects: cloneObjects(objects), selectedId, selectedIds: [...selectedIds] };
    set({
      objects: previous.objects,
      selectedId: previous.selectedId,
      selectedIds: previous.selectedIds ?? (previous.selectedId ? [previous.selectedId] : []),
      past: newPast,
      future: [currentSnapshot, ...future].slice(0, MAX_HISTORY)
    });
  },

  redo: () => {
    const { past, future, objects, selectedId, selectedIds } = get();
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    const currentSnapshot = { objects: cloneObjects(objects), selectedId, selectedIds: [...selectedIds] };
    set({
      objects: next.objects,
      selectedId: next.selectedId,
      selectedIds: next.selectedIds ?? (next.selectedId ? [next.selectedId] : []),
      past: [...past, currentSnapshot].slice(-MAX_HISTORY),
      future: newFuture
    });
  },

  // ---------------------------------------------------------------------------
  // Object CRUD
  // ---------------------------------------------------------------------------
  addObject: (type, position) => {
    get().pushHistory();
    const { objects, colorCounter } = get();
    const record = isLightType(type)
      ? createLightRecord({ type, id: generateId(type), position })
      : createObjectRecord({
          type,
          id: generateId(type),
          position,
          colorIndex: colorCounter
        });
    set({
      objects: [...objects, record],
      selectedId: record.id,
      selectedIds: [record.id],
      colorCounter: isLightType(type) ? colorCounter : colorCounter + 1
    });
    return record.id;
  },

  removeObject: (id) => {
    get().pushHistory();
    const { objects, selectedId, selectedIds } = get();
    set({
      objects: objects.filter((o) => o.id !== id),
      selectedId: selectedId === id ? null : selectedId,
      selectedIds: selectedIds.filter((i) => i !== id)
    });
  },

  // Multi-select aware: falls back to the single active object when nothing
  // else is multi-selected, so every old single-object call site still works.
  removeSelected: () => {
    const { selectedId, selectedIds, objects } = get();
    const ids = selectedIds.length ? selectedIds : selectedId ? [selectedId] : [];
    if (!ids.length) return;
    get().pushHistory();
    set({
      objects: objects.filter((o) => !ids.includes(o.id)),
      selectedId: null,
      selectedIds: []
    });
  },

  duplicateObject: (id) => {
    get().pushHistory();
    const { objects, colorCounter } = get();
    const src = objects.find((o) => o.id === id);
    if (!src) return;
    const copy = {
      ...src,
      id: generateId(src.type),
      name: `${src.name} Copy`,
      position: [src.position[0] + 0.6, src.position[1], src.position[2] + 0.6],
      rotation: [...src.rotation],
      scale: [...src.scale]
    };
    set({
      objects: [...objects, copy],
      selectedId: copy.id,
      selectedIds: [copy.id],
      colorCounter: colorCounter + 1
    });
    return copy.id;
  },

  duplicateSelected: () => {
    const { selectedId, selectedIds, objects, colorCounter } = get();
    const ids = selectedIds.length ? selectedIds : selectedId ? [selectedId] : [];
    if (!ids.length) return null;
    get().pushHistory();
    let counter = colorCounter;
    const copies = [];
    ids.forEach((id) => {
      const src = objects.find((o) => o.id === id);
      if (!src) return;
      copies.push({
        ...src,
        id: generateId(src.type),
        name: `${src.name} Copy`,
        position: [src.position[0] + 0.6, src.position[1], src.position[2] + 0.6],
        rotation: [...src.rotation],
        scale: [...src.scale]
      });
      counter += 1;
    });
    if (!copies.length) return null;
    const lastId = copies[copies.length - 1].id;
    set({
      objects: [...objects, ...copies],
      selectedIds: copies.map((c) => c.id),
      selectedId: lastId,
      colorCounter: counter
    });
    return lastId;
  },

  // Live update (drag in progress) — does NOT push history, keeps interaction smooth.
  updateObjectLive: (id, patch) => {
    set({
      objects: get().objects.map((o) => (o.id === id ? { ...o, ...patch } : o))
    });
  },

  // Committed update (drag end, inspector field commit) — pushes history first.
  updateObject: (id, patch) => {
    get().pushHistory();
    set({
      objects: get().objects.map((o) => (o.id === id ? { ...o, ...patch } : o))
    });
  },

  renameObject: (id, name) => {
    get().pushHistory();
    set({
      objects: get().objects.map((o) => (o.id === id ? { ...o, name } : o))
    });
  },

  toggleVisibility: (id) => {
    get().pushHistory();
    set({
      objects: get().objects.map((o) => (o.id === id ? { ...o, visible: !o.visible } : o))
    });
  },

  clearScene: () => {
    if (get().objects.length === 0) return;
    get().pushHistory();
    set({ objects: [], selectedId: null, selectedIds: [] });
  },

  // ---------------------------------------------------------------------------
  // Selection & tool state
  // ---------------------------------------------------------------------------
  // Pass { additive: true } for shift/ctrl-click to build a Figma-style
  // multi-selection instead of replacing it.
  selectObject: (id, opts = {}) => {
    if (opts.additive) {
      const { selectedIds } = get();
      const exists = selectedIds.includes(id);
      const nextIds = exists ? selectedIds.filter((i) => i !== id) : [...selectedIds, id];
      set({ selectedIds: nextIds, selectedId: nextIds.length ? nextIds[nextIds.length - 1] : null });
    } else {
      set({ selectedIds: [id], selectedId: id });
    }
  },
  selectAll: () => {
    const ids = get().objects.map((o) => o.id);
    set({ selectedIds: ids, selectedId: ids.length ? ids[ids.length - 1] : null });
  },
  clearSelection: () => set({ selectedId: null, selectedIds: [] }),
  setTransformMode: (mode) => set({ transformMode: mode }),
  toggleTransformSpace: () =>
    set({ transformSpace: get().transformSpace === 'world' ? 'local' : 'world' }),
  toggleWireframe: () => set({ wireframe: !get().wireframe }),
  setTheme: (theme) => set({ theme }),
  toggleSnap: () => set({ snapEnabled: !get().snapEnabled }),
  setSnap: (partial) => set({ snap: { ...get().snap, ...partial } }),
  cycleSnapTranslate: () => {
    const { snap, snapSteps } = get();
    const idx = snapSteps.indexOf(snap.translate);
    const next = snapSteps[(idx + 1) % snapSteps.length] ?? snapSteps[0];
    set({ snap: { ...snap, translate: next } });
  },
  toggleGrid: () => set({ showGrid: !get().showGrid }),
  setHoveredLibraryType: (type) => set({ hoveredLibraryType: type }),

  // ---------------------------------------------------------------------------
  // Camera — Blender-style framing / numpad view presets, consumed by
  // <CameraRig> inside the canvas.
  // ---------------------------------------------------------------------------
  requestFrame: () => set({ viewCommand: { action: 'frame', token: Date.now() } }),
  requestView: (preset) => set({ viewCommand: { action: 'preset', preset, token: Date.now() } }),

  // ---------------------------------------------------------------------------
  // Align & distribute — Figma-style layout tools for a multi-selection.
  // Positions only (this app has no rotated bounding-box math), which still
  // covers the common "line these up" case cleanly.
  // ---------------------------------------------------------------------------
  alignSelected: (axis) => {
    const { objects, selectedIds } = get();
    if (selectedIds.length < 2) return;
    const axisIndex = { x: 0, y: 1, z: 2 }[axis];
    const selected = objects.filter((o) => selectedIds.includes(o.id));
    const avg =
      selected.reduce((sum, o) => sum + o.position[axisIndex], 0) / selected.length;
    get().pushHistory();
    set({
      objects: objects.map((o) => {
        if (!selectedIds.includes(o.id)) return o;
        const next = [...o.position];
        next[axisIndex] = avg;
        return { ...o, position: next };
      })
    });
  },

  distributeSelected: (axis) => {
    const { objects, selectedIds } = get();
    if (selectedIds.length < 3) return;
    const axisIndex = { x: 0, y: 1, z: 2 }[axis];
    const selected = objects
      .filter((o) => selectedIds.includes(o.id))
      .sort((a, b) => a.position[axisIndex] - b.position[axisIndex]);
    const min = selected[0].position[axisIndex];
    const max = selected[selected.length - 1].position[axisIndex];
    const step = (max - min) / (selected.length - 1);
    const posMap = new Map(selected.map((o, i) => [o.id, min + step * i]));
    get().pushHistory();
    set({
      objects: objects.map((o) => {
        if (!posMap.has(o.id)) return o;
        const next = [...o.position];
        next[axisIndex] = posMap.get(o.id);
        return { ...o, position: next };
      })
    });
  }
}));
