import type { Lang } from "@/data/dictionary";

/** Simplified Dominican Republic flag (quadrants + white cross). */
export function DominicanFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="Español">
      <rect width="30" height="20" fill="#fff" />
      <rect x="0" y="0" width="12.5" height="8" fill="#002d62" />
      <rect x="17.5" y="0" width="12.5" height="8" fill="#ce1126" />
      <rect x="0" y="12" width="12.5" height="8" fill="#ce1126" />
      <rect x="17.5" y="12" width="12.5" height="8" fill="#002d62" />
    </svg>
  );
}

/** Simplified Union Jack, used for the English option. */
export function UKFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="English">
      <rect width="30" height="20" fill="#012169" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#fff" strokeWidth="4" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="2" />
      <path d="M15,0 V20 M0,10 H30" stroke="#fff" strokeWidth="6" />
      <path d="M15,0 V20 M0,10 H30" stroke="#C8102E" strokeWidth="3.5" />
    </svg>
  );
}

/** French tricolor. */
export function FranceFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="Français">
      <rect width="10" height="20" fill="#0055A4" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#EF4135" />
    </svg>
  );
}

export const FLAGS: Record<Lang, (props: { className?: string }) => React.ReactElement> = {
  es: DominicanFlag,
  en: UKFlag,
  fr: FranceFlag,
};
