"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

// The card rotates through the different things DTT sells, cycling through
// navy, yellow and white. Text/label come from the dictionary, matched by index.
const cardMeta = [
  {
    href: "/camiones",
    bg: "bg-brand-navy-dark",
    fg: "text-brand-cream",
    border: "border-white/15",
    sweep: "card-sweep-navy",
  },
  {
    href: "/gomas",
    bg: "bg-brand-yellow",
    fg: "text-brand-navy-dark",
    border: "border-black/15",
    sweep: "card-sweep-yellow",
  },
  {
    href: "/aros",
    bg: "bg-white",
    fg: "text-brand-navy-dark",
    border: "border-black/10",
    sweep: "card-sweep-white",
  },
];

const INTERVAL = 7500;

/**
 * Bottom-right hero card. Rises from the bottom on load (.intro-card), then
 * rotates through the product highlights, each a different color, animating
 * every change. Sits on the tile grid (25% column on lg+). Pauses on hover.
 */
export function HeroCard() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((v) => (v + 1) % cardMeta.length),
      INTERVAL,
    );
    return () => clearInterval(id);
  }, [paused]);

  const card = cardMeta[index];
  const content = t.heroCard.items[index];

  return (
    <div
      className={`intro-card absolute bottom-0 right-0 z-20 hidden w-[360px] overflow-hidden transition-colors duration-500 md:block lg:w-1/4 ${card.bg} ${card.fg}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div key={index} className="hero-card-content">
        <div className="p-6">
          <p className="min-h-[3.5rem] text-[15px] font-medium leading-snug">
            {content.text}
          </p>
        </div>
        <Link
          href={card.href}
          className={`btn-sweep relative flex h-14 items-center border-t px-6 font-display text-sm font-bold uppercase tracking-wide ${card.border} ${card.sweep}`}
        >
          <span>{content.label}</span>
        </Link>
      </div>
    </div>
  );
}
