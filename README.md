# Dekho3D

Dekho3D is a browser-based 3D scene builder. Drag primitives onto an infinite
grid, move/rotate/scale them with on-screen gizmos, tweak color and material
in a live inspector, and export the result as a `.glb` file — all in a dark,
distraction-free interface that runs entirely in your browser. It now also
ships with a small marketing landing page at `/` that leads into the actual
builder at `/app`.

![Dekho3D](https://img.shields.io/badge/stack-React%20%2B%20Three.js-7c5cff)

## Features

- **Object library** — drag-and-drop or click-to-add primitives: cube, sphere,
  cone, cylinder, torus, plane, capsule, ico sphere, torus knot, tetrahedron
- **Quick-add radial menu** — hover the viewport and hit `Shift+A` to drop a
  new shape right under the cursor, Blender-style
- **Multi-select** — shift/ctrl-click objects in the viewport or hierarchy to
  build a selection; `Ctrl+A` selects everything
- **Group move** — drag the gizmo on the active object and every other
  selected object follows along with the same delta
- **Align & distribute** — a Figma-style panel appears in the Inspector
  whenever 2+ objects are selected: align centers on X/Y/Z, distribute evenly
- **Selection & transform** — move, rotate, and scale with interactive 3D
  gizmos, a **local/world space toggle** (`X`), plus a numeric inspector for
  exact values
- **Camera tools** — numpad-style view presets (Front/Right/Top/Perspective)
  and **Frame Selected** (`F`), all smoothly animated
- **World themes** — Studio / Sunset / Night / Void lighting + background
  presets, switchable from the toolbar
- **Wireframe shading toggle**
- **Material presets** — Matte, Plastic, Glossy, Metal, Rubber, Chrome
  one-click material shortcuts in the Inspector
- **Duplicate & delete** — via toolbar buttons or keyboard shortcuts, works
  across a multi-selection too
- **Snap to grid** — toggleable, with adjustable translate/rotate/scale steps
- **Hierarchy panel** — see every object in the scene, rename, hide, or delete
- **Inspector panel** — position, rotation, scale, color, metalness, roughness
- **Undo / redo** — full history stack (`Ctrl+Z` / `Ctrl+Shift+Z`)
- **Infinite grid, orbit camera, real-time shadows and lighting**
- **GLTF/GLB export** — one click, downloads straight to your machine
- Sleek dark UI, smooth animations, and a clean, scalable React codebase

## Keyboard shortcuts

| Key                    | Action                              |
|-------------------------|-------------------------------------|
| `W`                     | Move tool                           |
| `E`                     | Rotate tool                         |
| `S`                     | Scale tool                          |
| `X`                     | Toggle local/world transform space  |
| `G`                     | Toggle snap to grid                 |
| `F`                     | Frame selected (or whole scene)     |
| `1` / `3` / `7` / `0`   | Front / Right / Top / Perspective view |
| `Shift` + `A` (in viewport) | Quick-add shape menu at cursor  |
| `Shift`/`Ctrl` + click  | Add object to selection             |
| `Ctrl` + `A`            | Select all                          |
| `Ctrl` + `D`            | Duplicate selected                  |
| `Delete` / `Backspace`  | Delete selected                     |
| `Ctrl` + `Z`            | Undo                                |
| `Ctrl` + `Shift` + `Z`  | Redo                                |
| `Esc`                   | Deselect                            |

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

### 2. Get the project files

If you received this project as a `.zip` file:

1. Right-click the `dekho3d.zip` file
2. Choose **Extract All…**
3. Pick a simple destination like `C:\Users\<you>\Documents\dekho3d`
4. Click **Extract**

If you're cloning from Git instead, open Command Prompt and run:

```bat
git clone <repository-url>
cd dekho3d
```

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
    ├── main.jsx                 React root — routes "/" to Landing, "/app" to the builder
    ├── App.jsx                  Builder top-level layout + export wiring
    ├── App.css / index.css       Layout + global design tokens
    ├── pages/
    │   └── Landing/               Marketing landing page + tube-cursor hero
    ├── store/
    │   └── editorStore.js        Zustand store: objects, selection, undo/redo, tools
    ├── lib/
    │   ├── primitives.js         Primitive metadata + default object factory
    │   ├── snapping.js           Grid/rotation/scale snapping helpers
    │   ├── themes.js             World/lighting presets
    │   ├── viewPresets.js        Numpad-style camera view presets
    │   ├── exportGLTF.js         GLTF/GLB export + download
    │   └── idGen.js              Unique id generator
    ├── hooks/
    │   └── useKeyboardShortcuts.js
    └── components/
        ├── Toolbar/               Top toolbar (tools, history, theme, export)
        ├── ObjectLibrary/         Draggable primitive cards
        ├── Hierarchy/             Scene object list (multi-select aware)
        ├── Inspector/             Transform + material editor + align panel
        ├── Viewport/              R3F Canvas, lighting, grid, gizmo, camera rig
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
