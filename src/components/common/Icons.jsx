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
    default:
      return null;
  }
}
