/** Simplified Dominican Republic flag (quadrants + white cross). */
export function DominicanFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={className}
      role="img"
      aria-label="República Dominicana"
    >
      <rect width="30" height="20" fill="#fff" />
      <rect x="0" y="0" width="12.5" height="8" fill="#002d62" />
      <rect x="17.5" y="0" width="12.5" height="8" fill="#ce1126" />
      <rect x="0" y="12" width="12.5" height="8" fill="#ce1126" />
      <rect x="17.5" y="12" width="12.5" height="8" fill="#002d62" />
    </svg>
  );
}
