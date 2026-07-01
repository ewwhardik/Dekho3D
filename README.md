# Dekho3D

Dekho3D is a browser-based 3D scene builder. Drag primitives onto an infinite
grid, move/rotate/scale them with on-screen gizmos, tweak color and material
in a live inspector, and export the result as a `.glb` file — all in a dark,
distraction-free interface that runs entirely in your browser.

![Dekho3D](https://img.shields.io/badge/stack-React%20%2B%20Three.js-7c5cff)

## Features

- **Object library** — drag-and-drop or click-to-add primitives: cube, sphere,
  cone, cylinder, torus, plane
- **Selection & transform** — move, rotate, and scale with interactive 3D
  gizmos, plus a numeric inspector for exact values
- **Duplicate & delete** — via toolbar buttons or keyboard shortcuts
- **Snap to grid** — toggleable, with adjustable translate/rotate/scale steps
- **Hierarchy panel** — see every object in the scene, rename, hide, or delete
- **Inspector panel** — position, rotation, scale, color, metalness, roughness
- **Undo / redo** — full history stack (`Ctrl+Z` / `Ctrl+Shift+Z`)
- **Infinite grid, orbit camera, real-time shadows and lighting**
- **GLTF/GLB export** — one click, downloads straight to your machine
- Sleek dark UI, smooth animations, and a clean, scalable React codebase

## Keyboard shortcuts

| Key                 | Action              |
|----------------------|--------------------|
| `W`                  | Move tool          |
| `E`                  | Rotate tool        |
| `S`                  | Scale tool         |
| `G`                  | Toggle snap to grid|
| `Ctrl` + `D`         | Duplicate selected |
| `Delete` / `Backspace` | Delete selected  |
| `Ctrl` + `Z`         | Undo               |
| `Ctrl` + `Shift` + `Z` | Redo             |
| `Esc`                | Deselect           |

Left-drag to orbit the camera, scroll to zoom, right-drag to pan.

---

## Running on Windows

These steps assume a normal Windows 10/11 machine with no prior setup.

### 1. Install Node.js

Dekho3D needs Node.js 18 or newer (it includes `npm`, the package manager
used to install everything else).

1. Go to **https://nodejs.org**
2. Download the **LTS** installer (the button on the left, e.g. "20.x.x LTS")
3. Run the downloaded `.msi` file and click through the installer with the
   default options (it's fine to leave every checkbox as-is)
4. Restart your computer if the installer asks you to

Verify it worked by opening **Command Prompt** (press `Win`, type `cmd`,
press Enter) and running:

```bat
node -v
npm -v
```

You should see version numbers printed (e.g. `v20.11.0` and `10.2.4`). If you
see an error instead, restart your computer and try again — Windows
sometimes needs a restart to pick up the new `PATH` entry.

### 3. Install dependencies

Open Command Prompt and navigate into the extracted folder. For example, if
you extracted to `Documents\dekho3d`:

```bat
cd C:\Users\%USERNAME%\Documents\dekho3d
npm install
```

This downloads everything the app needs (React, Three.js, etc.) into a
`node_modules` folder. It only needs to be done once (or again if you delete
that folder). It can take a minute or two the first time.

> **Tip:** if you'd rather not use Command Prompt, you can open the project
> folder in **File Explorer**, click the address bar, type `cmd`, and press
> Enter — this opens Command Prompt already inside that folder.

### 4. Start the app

Still inside the project folder, run:

```bat
npm run dev
```

You'll see output ending in something like:

```
  VITE ready in 400 ms

  ➜  Local:   http://localhost:5173/
```

Your default browser should open automatically to that address. If it
doesn't, open any modern browser (Chrome, Edge, or Firefox) and go to
**http://localhost:5173**.

To stop the app, go back to the Command Prompt window and press `Ctrl+C`.

### 5. (Optional) Build a production version

If you want a standalone, optimized version of the app you can host
anywhere (no `npm run dev` needed):

```bat
npm run build
```

This creates a `dist` folder with plain HTML/CSS/JS files. You can preview
that build locally with:

```bat
npm run preview
```

or upload the contents of `dist` to any static web host.

---

## Project structure

```
dekho3d/
├── index.html                 Vite entry HTML (loads fonts, mounts React)
├── package.json                Dependencies and npm scripts
├── vite.config.js              Build tool configuration
└── src/
    ├── main.jsx                 React root
    ├── App.jsx                  Top-level layout + export wiring
    ├── App.css / index.css       Layout + global design tokens
    ├── store/
    │   └── editorStore.js        Zustand store: objects, selection, undo/redo
    ├── lib/
    │   ├── primitives.js         Primitive metadata + default object factory
    │   ├── snapping.js           Grid/rotation/scale snapping helpers
    │   ├── exportGLTF.js         GLTF/GLB export + download
    │   └── idGen.js              Unique id generator
    ├── hooks/
    │   └── useKeyboardShortcuts.js
    └── components/
        ├── Toolbar/               Top toolbar (tools, history, export)
        ├── ObjectLibrary/         Draggable primitive cards
        ├── Hierarchy/             Scene object list
        ├── Inspector/             Transform + material editor
        ├── Viewport/              R3F Canvas, lighting, grid, gizmo
        └── common/                Icons, buttons, toasts
```

The app uses **React + [react-three-fiber](https://docs.pmnd.rs/react-three-fiber)**
(a React renderer for Three.js) and **[drei](https://github.com/pmndrs/drei)**
for camera controls, the grid, and the transform gizmo. State lives in a
single [Zustand](https://github.com/pmndrs/zustand) store so any panel can
read or update the scene without prop-drilling, and every mutating action
snapshots history for undo/redo.

## Troubleshooting

- **`npm install` fails with permission errors** — make sure you extracted
  the project somewhere inside your user folder (like `Documents`), not
  directly in `C:\Program Files`.
- **Port 5173 already in use** — close any other `npm run dev` windows, or
  edit the `port` value in `vite.config.js`.
- **Blank page in the browser** — open the browser's developer console
  (`F12`) and check for red error text; make sure `npm install` finished
  without errors first.
- **Export button does nothing** — you need at least one object in the scene
  before exporting; Dekho3D will show a small notification if the scene is
  empty.

## License

This project is provided as-is for you to use, modify, and extend.
