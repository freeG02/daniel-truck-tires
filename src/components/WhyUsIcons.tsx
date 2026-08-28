type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function PriceIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <line x1="12" y1="1.5" x2="12" y2="22.5" />
      <path d="M17 5.5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export function NewIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M22 11.1V12a10 10 0 1 1-5.9-9.1" />
      <polyline points="22 4 12 14 9 11" />
    </svg>
  );
}

export function BoxIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.3 7 12 12 20.7 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="1" y="4" width="14" height="12" />
      <polygon points="15 8 19 8 22 11 22 16 15 16 15 8" />
      <circle cx="5.5" cy="18.5" r="2" />
      <circle cx="17.5" cy="18.5" r="2" />
    </svg>
  );
}
