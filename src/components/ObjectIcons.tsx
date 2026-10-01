interface IconProps {
  className?: string;
}

function Chair({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11h14" />
      <path d="M5 11V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5" />
      <path d="M5 11v8" />
      <path d="M19 11v8" />
      <path d="M9 11v4h6v-4" />
    </svg>
  );
}

function Bed({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h20" />
      <path d="M2 20v-8" />
      <path d="M22 20v-8" />
      <path d="M2 12V8a2 2 0 0 1 2-2h4v6" />
      <path d="M8 6h12a2 2 0 0 1 2 2v4" />
    </svg>
  );
}

function Table({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="3" rx="1" />
      <path d="M5 11v8" />
      <path d="M19 11v8" />
    </svg>
  );
}

function Plant({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V10" />
      <path d="M8 22h8" />
      <path d="M7 10c0-3 2-5 5-5s5 2 5 5" />
      <path d="M12 5C9 2 5 3 4 6c3-1 5 0 8 4" />
      <path d="M12 5c3-3 7-2 8 1-3-1-5 0-8 4" />
    </svg>
  );
}

function Tv({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="13" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 18v3" />
    </svg>
  );
}

function Shelf({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M4 9h16" />
      <path d="M4 15h16" />
      <path d="M12 3v18" />
    </svg>
  );
}

function Window({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 3v18" />
      <path d="M3 12h18" />
    </svg>
  );
}

function Rug({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="10" rx="1" />
      <path d="M6 7v10" />
      <path d="M18 7v10" />
      <path d="M3 10h3" />
      <path d="M3 14h3" />
      <path d="M18 10h3" />
      <path d="M18 14h3" />
    </svg>
  );
}

function Desk({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="3" rx="1" />
      <path d="M4 10v8" />
      <path d="M20 10v8" />
      <path d="M8 10v4h8v-4" />
    </svg>
  );
}

function Sofa({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
      <path d="M2 12v4a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
      <path d="M4 17v2" />
      <path d="M20 17v2" />
    </svg>
  );
}

function Lamp({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4h8l-2 8h-4L8 4z" />
      <path d="M12 12v6" />
      <path d="M8 18h8" />
    </svg>
  );
}

function Sink({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h18" />
      <path d="M5 12v4a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-4" />
      <path d="M12 4v4" />
      <path d="M10 8h4" />
    </svg>
  );
}

function Stove({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <circle cx="8" cy="11" r="2" />
      <circle cx="16" cy="11" r="2" />
      <path d="M3 16h18" />
    </svg>
  );
}

function Fridge({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M5 10h14" />
      <path d="M15 5v3" />
      <path d="M15 13v4" />
    </svg>
  );
}

function Easel({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="12" rx="1" />
      <path d="M12 15v6" />
      <path d="M7 21l5-6 5 6" />
    </svg>
  );
}

function Piano({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M6 5v9" />
      <path d="M10 5v9" />
      <path d="M14 5v9" />
      <path d="M18 5v9" />
      <path d="M2 14h20" />
    </svg>
  );
}

function Barrel({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <ellipse cx="12" cy="19" rx="7" ry="3" />
      <path d="M5 5v14" />
      <path d="M19 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function Crate({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="14" rx="1" />
      <path d="M3 6l9-4 9 4" />
      <path d="M12 2v18" />
      <path d="M3 13h18" />
    </svg>
  );
}

function Box({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="16" height="12" rx="1" />
      <path d="M4 8l8-4 8 4" />
      <path d="M12 4v6" />
      <path d="M8 8v0" />
      <path d="M16 8v0" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.FC<IconProps>> = {
  chair: Chair,
  bed: Bed,
  table: Table,
  plant: Plant,
  tv: Tv,
  shelf: Shelf,
  window: Window,
  rug: Rug,
  desk: Desk,
  sofa: Sofa,
  lamp: Lamp,
  sink: Sink,
  stove: Stove,
  fridge: Fridge,
  easel: Easel,
  piano: Piano,
  barrel: Barrel,
  crate: Crate,
  box: Box,
  bench: Chair,
};

interface ObjectIconProps {
  type: string;
  className?: string;
}

export default function ObjectIcon({ type, className = "" }: ObjectIconProps) {
  const Icon = ICON_MAP[type];
  if (!Icon) return <span className={className}>?</span>;
  return <Icon className={className} />;
}
