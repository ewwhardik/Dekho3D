import { useCallback } from 'react';
import { TubesBackground } from './TubesBackground.jsx';
import { Reveal } from './Reveal.jsx';
import { useScrollProgress } from '../../hooks/useScrollReveal.js';
import {
  LogoMark,
  MoveIcon,
  RotateIcon,
  DownloadIcon,
  ShapeIcon,
  PaletteIcon,
  AxisIcon
} from '../../components/common/Icons.jsx';
import './Landing.css';

const BLOBS = [
  { shape: 'squircle', color: 'pink', top: '10%', left: '27%', size: 190, depth: 26 },
  { shape: 'blob', color: 'blue', top: '4%', left: '54%', size: 150, depth: 14 },
  { shape: 'hex', color: 'amber', top: '16%', left: '74%', size: 110, depth: 34 },
  { shape: 'dot', color: 'amber', top: '26%', left: '20%', size: 62, depth: 46 },
  { shape: 'pent', color: 'pink', top: '38%', left: '78%', size: 76, depth: 40 },
  { shape: 'squircle', color: 'blue', top: '46%', left: '8%', size: 180, depth: 18 },
  { shape: 'triangle', color: 'green', top: '46%', left: '68%', size: 150, depth: 22 },
  { shape: 'hex', color: 'blue', top: '10%', left: '90%', size: 150, depth: 12 },
  { shape: 'cube', color: 'blue', top: '60%', left: '84%', size: 96, depth: 30 },
  { shape: 'cube', color: 'blue', top: '18%', left: '4%', size: 62, depth: 50 }
];

const TRUST_STRIP = [
  'Numpad view snapping',
  'Shift+A quick-add',
  '.glb export',
  'Undo / redo history',
  'Zero install',
  'Zero login wall'
];

const FEATURES = [
  {
    icon: MoveIcon,
    title: "Blender's brain",
    body: 'Numpad-style view snapping, a Shift+A quick-add menu, local/world gizmo toggling. All the muscle memory, none of the 400-page manual.'
  },
  {
    icon: PaletteIcon,
    title: "Figma's manners",
    body: 'Shift-click multi-select, align & distribute, drag-and-drop from a shape library that does not require a PhD to find.'
  },
  {
    icon: DownloadIcon,
    title: 'Actually free',
    body: 'No account wall, no "upgrade to export" ambush. Build the thing, export the .glb, go live your life.'
  }
];

const STEPS = [
  {
    shapeType: 'cube',
    tag: '01',
    title: 'Drag in a primitive',
    body: 'Cubes, spheres, tori, torus knots — grab one from the shape library and drop it straight into the viewport.'
  },
  {
    icon: MoveIcon,
    tag: '02',
    title: 'Move, rotate, scale',
    body: 'Grab the gizmo or hit G/R/S like Blender taught you. Snap to grid or magnet-snap to other objects when precision matters.'
  },
  {
    icon: RotateIcon,
    tag: '03',
    title: 'Arrange the scene',
    body: 'Multi-select, align, distribute, duplicate, and reorder in the hierarchy panel until it stops looking like a crime scene.'
  },
  {
    icon: DownloadIcon,
    tag: '04',
    title: 'Export and ship',
    body: 'One click bakes everything into a clean .glb — ready for your game engine, AR viewer, or that portfolio site you keep promising to finish.'
  }
];

export default function Landing() {
  const { barRef, navRef } = useScrollProgress();

  const handlePointerMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    e.currentTarget.style.setProperty('--mx', mx.toFixed(3));
    e.currentTarget.style.setProperty('--my', my.toFixed(3));
  }, []);

  return (
    <div className="landing">
      <div className="landing__progress" aria-hidden="true">
        <div className="landing__progress-bar" ref={barRef} />
      </div>

      <header className="landing__nav" ref={navRef}>
        <div className="landing__brand">
          <LogoMark size={22} />
          <span>Dekho3D</span>
        </div>
        <nav className="landing__nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
        </nav>
        <a className="landing__nav-cta" href="/app">
          Open Studio
        </a>
      </header>

      <section className="landing__hero" onMouseMove={handlePointerMove}>
        <TubesBackground />

        <div className="landing__blobs" aria-hidden="true">
          {BLOBS.map((b, i) => (
            <span
              key={i}
              className={`blob blob--${b.shape} blob--${b.color}`}
              style={{
                top: b.top,
                left: b.left,
                width: b.size,
                height: b.size,
                '--depth': b.depth,
                '--float-delay': `${(i % 5) * 0.6}s`
              }}
            />
          ))}
        </div>

        <div className="landing__hero-content">
          <div className="landing__eyebrow hero-stagger" style={{ '--i': 0 }}>
            A slightly too honest 3D scene builder
          </div>
          <h1 className="landing__title hero-stagger" style={{ '--i': 1 }}>
            Build 3D scenes
            <br />
            without losing your sanity
          </h1>
          <p className="landing__subtitle hero-stagger" style={{ '--i': 2 }}>
            Dekho3D borrows Blender's power tools and Figma's good manners, then
            crams them into a browser tab. Drag in a cube, argue with a torus knot,
            ship something that looks vaguely professional — all before your coffee
            gets cold.
          </p>
          <div className="landing__cta-row hero-stagger" style={{ '--i': 3 }}>
            <a className="landing__cta-primary" href="/app">
              Launch the Studio — it's free
              <span className="landing__cta-arrow">→</span>
            </a>
            <span className="landing__cta-note">No install. No login wall. No catch.</span>
          </div>
        </div>

        <a className="landing__hint" href="#features" aria-label="Scroll to features">
          <span>Move your mouse. Everything here is nosy.</span>
          <span className="landing__hint-chevron" aria-hidden="true" />
        </a>
      </section>

      <div className="landing__trust-strip" aria-hidden="true">
        <div className="landing__trust-track">
          {[...TRUST_STRIP, ...TRUST_STRIP].map((t, i) => (
            <span className="landing__trust-item" key={i}>
              {t}
              <span className="landing__trust-dot" />
            </span>
          ))}
        </div>
      </div>

      <section className="landing__features" id="features">
        <Reveal as="div" className="landing__section-head">
          <div className="landing__section-eyebrow">Why bother</div>
          <h2 className="landing__section-title">Three good reasons, no fine print</h2>
        </Reveal>

        <div className="landing__features-grid">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal as="div" key={f.title} delay={i * 90} className="feature-card">
                <div className="feature-card__icon">
                  <Icon size={20} />
                </div>
                <div className="feature-card__title">{f.title}</div>
                <p className="feature-card__body">{f.body}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="landing__how" id="how-it-works">
        <Reveal as="div" className="landing__section-head">
          <div className="landing__section-eyebrow">The whole workflow</div>
          <h2 className="landing__section-title">From empty scene to .glb in four steps</h2>
        </Reveal>

        <div className="landing__steps">
          <div className="landing__steps-line" aria-hidden="true" />
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal as="div" key={s.tag} delay={i * 110} className="step-card">
                <div className="step-card__icon">
                  {Icon ? <Icon size={22} /> : <ShapeIcon type={s.shapeType} size={26} />}
                </div>
                <div className="step-card__tag">{s.tag}</div>
                <div className="step-card__title">{s.title}</div>
                <p className="step-card__body">{s.body}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="landing__banner">
        <Reveal as="div" className="landing__banner-inner">
          <AxisIcon size={26} className="landing__banner-icon" />
          <h2 className="landing__banner-title">Stop paying for a gizmo you use twice a year</h2>
          <p className="landing__banner-body">
            No render farm, no subscription, no seventeen-step onboarding flow.
            Open a tab and start dragging cubes around like it's 2011 and Google
            SketchUp was still cool.
          </p>
          <a className="landing__cta-primary" href="/app">
            Launch the Studio — it's free
            <span className="landing__cta-arrow">→</span>
          </a>
        </Reveal>
      </section>

      <footer className="landing__about">
        <div className="landing__about-inner">
          <div className="landing__about-col">
            <div className="landing__brand landing__brand--footer">
              <LogoMark size={20} />
              <span>Dekho3D</span>
            </div>
            <p className="landing__about-copy">
              A browser-based 3D scene builder for people who peaked at Minecraft
              and never quite recovered. Drag some shapes around. Export a .glb.
              Tell everyone it was a whole "creative process."
            </p>
          </div>

          <div className="landing__about-col landing__about-col--credits">
            <div className="landing__about-label">About</div>
            <p className="landing__about-line">
              Dev: <strong>Hardik</strong> — tested every button personally, mostly
              on purpose.
            </p>
            <p className="landing__about-line">
              &copy; <strong>poop Organization</strong>, 2026. Yes, that's really
              the name. We're not proud. We're just committed.
            </p>
          </div>
        </div>
        <div className="landing__about-bottom">
          Made with three.js, react-three-fiber, and an unreasonable number of undo presses.
        </div>
      </footer>
    </div>
  );
}
