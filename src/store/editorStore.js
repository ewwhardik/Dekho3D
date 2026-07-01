import { create } from 'zustand';
import { generateId } from '../lib/idGen.js';
import { createObjectRecord } from '../lib/primitives.js';
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
  selectedId: null,
  hoveredLibraryType: null, // used to preview a shape while dragging

  // ---- Tool state ---------------------------------------------------------
  transformMode: 'translate', // 'translate' | 'rotate' | 'scale'
  snapEnabled: true,
  snap: { ...SNAP_DEFAULTS },
  showGrid: true,
  colorCounter: 0,

  // ---- History -------------------------------------------------------------
  past: [],
  future: [],

  // ---------------------------------------------------------------------------
  // History management
  // ---------------------------------------------------------------------------
  pushHistory: () => {
    const { objects, selectedId, past } = get();
    const snapshot = { objects: cloneObjects(objects), selectedId };
    const nextPast = [...past, snapshot].slice(-MAX_HISTORY);
    set({ past: nextPast, future: [] });
  },

  undo: () => {
    const { past, future, objects, selectedId } = get();
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, -1);
    const currentSnapshot = { objects: cloneObjects(objects), selectedId };
    set({
      objects: previous.objects,
      selectedId: previous.selectedId,
      past: newPast,
      future: [currentSnapshot, ...future].slice(0, MAX_HISTORY)
    });
  },

  redo: () => {
    const { past, future, objects, selectedId } = get();
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    const currentSnapshot = { objects: cloneObjects(objects), selectedId };
    set({
      objects: next.objects,
      selectedId: next.selectedId,
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
    const record = createObjectRecord({
      type,
      id: generateId(type),
      position,
      colorIndex: colorCounter
    });
    set({
      objects: [...objects, record],
      selectedId: record.id,
      colorCounter: colorCounter + 1
    });
    return record.id;
  },

  removeObject: (id) => {
    get().pushHistory();
    const { objects, selectedId } = get();
    set({
      objects: objects.filter((o) => o.id !== id),
      selectedId: selectedId === id ? null : selectedId
    });
  },

  removeSelected: () => {
    const { selectedId } = get();
    if (selectedId) get().removeObject(selectedId);
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
      colorCounter: colorCounter + 1
    });
    return copy.id;
  },

  duplicateSelected: () => {
    const { selectedId } = get();
    if (selectedId) return get().duplicateObject(selectedId);
    return null;
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
    set({ objects: [], selectedId: null });
  },

  // ---------------------------------------------------------------------------
  // Selection & tool state
  // ---------------------------------------------------------------------------
  selectObject: (id) => set({ selectedId: id }),
  clearSelection: () => set({ selectedId: null }),
  setTransformMode: (mode) => set({ transformMode: mode }),
  toggleSnap: () => set({ snapEnabled: !get().snapEnabled }),
  setSnap: (partial) => set({ snap: { ...get().snap, ...partial } }),
  toggleGrid: () => set({ showGrid: !get().showGrid }),
  setHoveredLibraryType: (type) => set({ hoveredLibraryType: type })
}));
