// A small, hand-picked set of line icons so the app has no runtime icon-font
// dependency. Every icon takes the usual `size` and `className` props and
// inherits color via `currentColor`.

const base = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
});

export function SelectIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 3l6.5 15.5 2-6.5 6.5-2L5 3z" />
    </svg>
  );
}

export function MoveIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3v18M3 12h18M7 7l-4 5 4 5M17 7l4 5-4 5M7 17l5 4 5-4M7 7l5-4 5 4" />
    </svg>
  );
}

export function RotateIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  );
}

export function ScaleIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 16V4h12M4 20h16V8" />
      <path d="M4 4l16 16" strokeOpacity="0" />
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

export function DuplicateIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M4 16V6a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

export function TrashIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" />
    </svg>
  );
}

export function GridIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  );
}

export function MagnetIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 4v7a6 6 0 0 0 12 0V4" />
      <path d="M6 4h4M14 4h4M6 8h4M14 8h4" />
    </svg>
  );
}

export function UndoIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M9 14L4 9l5-5" />
      <path d="M4 9h10a6 6 0 0 1 0 12H9" />
    </svg>
  );
}

export function RedoIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M15 4l5 5-5 5" />
      <path d="M20 9H10a6 6 0 0 0 0 12h5" />
    </svg>
  );
}

export function DownloadIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3v12M7 10l5 5 5-5" />
      <path d="M4 19h16" />
    </svg>
  );
}

export function EyeIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a13.6 13.6 0 0 1-3.1 3.9M6.3 6.3C4 8 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 3.4-.6" />
      <path d="M9.5 9.6a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

export function TrashSmallIcon(props) {
  return <TrashIcon {...props} />;
}

export function ChevronDownIcon({ size = 14, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function PlusIcon({ size = 14, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function FrameIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 8V4h4M17 4h4v4M21 16v4h-4M7 20H3v-4" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

export function AxisIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3v18M4 8l8-5 8 5M4 8v9l8 5M20 8v9l-8 5" />
    </svg>
  );
}

export function WireframeIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 3v18M4 7.5l8 4.5 8-4.5M4 16.5l8-4.5 8 4.5M4 7.5v9M20 7.5v9" />
    </svg>
  );
}

export function PaletteIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.8 2-1.8 0-.5-.2-.9-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H16a5 5 0 0 0 5-5c0-3.9-4-6.8-9-6.8z" />
      <circle cx="7.3" cy="10.5" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="9.8" cy="6.8" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="14.6" cy="6.8" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="17" cy="10.5" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function AlignIcon({ size = 14, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 2v20" />
      <rect x="5" y="6" width="4" height="4" rx="1" />
      <rect x="15" y="14" width="4" height="4" rx="1" />
    </svg>
  );
}

export function DistributeIcon({ size = 14, className }) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="9" width="4" height="6" rx="1" />
      <rect x="10" y="6" width="4" height="12" rx="1" />
      <rect x="17" y="9" width="4" height="6" rx="1" />
    </svg>
  );
}

export function LogoMark({ size = 22, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" fill="var(--accent)" opacity="0.9" />
      <path d="M12 2v20M3.5 7l8.5 5 8.5-5" stroke="#0b0c0f" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Primitive preview icons — used on the object library cards. Simple
   isometric-ish line renderings, not full 3D, but instantly recognizable.
   ------------------------------------------------------------------------- */
export function ShapeIcon({ type, size = 30, className }) {
  const props = { ...base(size), strokeWidth: 1.4 };
  switch (type) {
    case 'cube':
      return (
        <svg {...props} className={className}>
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
          <path d="M12 3v18M4 7.5l8 4.5 8-4.5" />
        </svg>
      );
    case 'sphere':
      return (
        <svg {...props} className={className}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12c2 2.6 5.2 4 8.5 4s6.5-1.4 8.5-4M3.5 12c2-2.6 5.2-4 8.5-4s6.5 1.4 8.5 4" opacity="0.6" />
        </svg>
      );
    case 'cone':
      return (
        <svg {...props} className={className}>
          <path d="M12 3l6.5 15.5H5.5L12 3z" />
          <ellipse cx="12" cy="18.5" rx="6.5" ry="1.6" />
        </svg>
      );
    case 'cylinder':
      return (
        <svg {...props} className={className}>
          <ellipse cx="12" cy="5.5" rx="7" ry="2.2" />
          <ellipse cx="12" cy="18.5" rx="7" ry="2.2" />
          <path d="M5 5.5v13M19 5.5v13" />
        </svg>
      );
    case 'torus':
      return (
        <svg {...props} className={className}>
          <ellipse cx="12" cy="12" rx="9" ry="5.5" />
          <ellipse cx="12" cy="12" rx="4" ry="2.2" />
        </svg>
      );
    case 'plane':
      return (
        <svg {...props} className={className}>
          <path d="M3 15l5-5h13l-5 5H3z" />
        </svg>
      );
    case 'capsule':
      return (
        <svg {...props} className={className}>
          <path d="M8 3.5a4 4 0 0 1 8 0v17a4 4 0 0 1-8 0v-17z" />
          <path d="M8 7.5h8M8 16.5h8" opacity="0.6" />
        </svg>
      );
    case 'icosphere':
      return (
        <svg {...props} className={className}>
          <path d="M12 2.5l8 5v9l-8 5-8-5v-9l8-5z" />
          <path d="M12 2.5v19M4 7.5l8 4.5 8-4.5M4 16.5l8-4.5 8 4.5" opacity="0.6" />
        </svg>
      );
    case 'torusKnot':
      return (
        <svg {...props} className={className}>
          <path d="M12 3c4 0 6 2.5 6 5.5S15 13 12 13s-5-1.5-5-4 2-4 5-4 6 2 6 5.5-3 6-6 6-7-2.7-7-6.3" />
        </svg>
      );
    case 'tetrahedron':
      return (
        <svg {...props} className={className}>
          <path d="M12 3l8.5 16H3.5L12 3z" />
          <path d="M12 3l-3 16M12 3l3 16M3.5 19l8.5-6 8.5 6" opacity="0.6" />
        </svg>
      );
    case 'pointLight':
      return (
        <svg {...props} className={className}>
          <circle cx="12" cy="11" r="5.5" />
          <path d="M9.5 18.5h5M10 21h4" />
          <path d="M12 2v2M4 5l1.5 1.5M20 5l-1.5 1.5M2.5 11h2M19.5 11h2" opacity="0.7" />
        </svg>
      );
    case 'spotLight':
      return (
        <svg {...props} className={className}>
          <path d="M9 3h6l1.5 5h-9L9 3z" />
          <path d="M7.5 8l-3 13h15l-3-13" />
          <path d="M12 8v6" opacity="0.6" />
        </svg>
      );
    case 'directionalLight':
      return (
        <svg {...props} className={className}>
          <circle cx="12" cy="9" r="4" />
          <path d="M12 1.5v2M5 4.5l1.4 1.4M19 4.5l-1.4 1.4M3 9h2M19 9h2" opacity="0.7" />
          <path d="M8 17l8-6M8 20l10-7.5M8 14l5-3.7" opacity="0.55" />
        </svg>
      );
    default:
      return null;
  }
}
