"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// The card rotates through the different things DTT sells, cycling through
// blue, yellow and white.
const cards = [
  {
    text: "Te importamos tu camión desde Canadá, con y sin camarote.",
    href: "/camiones",
    label: "Ver camiones importados",
    bg: "bg-brand-navy-dark",
    fg: "text-brand-cream",
    border: "border-white/15",
    sweep: "card-sweep-navy",
  },
  {
    text: "Gomas de camión nuevas, no recauchadas, en todas las medidas.",
    href: "/gomas",
    label: "Ver gomas de camión",
    bg: "bg-brand-yellow",
    fg: "text-brand-navy-dark",
    border: "border-black/15",
    sweep: "card-sweep-yellow",
  },
  {
    text: "Aros de aluminio y de hierro para cada medida de goma.",
    href: "/aros",
    label: "Ver aros",
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
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((v) => (v + 1) % cards.length),
      INTERVAL,
    );
    return () => clearInterval(id);
  }, [paused]);

  const card = cards[index];

  return (
    <div
      className={`intro-card absolute bottom-0 right-0 z-20 hidden w-[360px] overflow-hidden transition-colors duration-500 md:block lg:w-1/4 ${card.bg} ${card.fg}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div key={index} className="hero-card-content">
        <div className="p-6">
          <p className="min-h-[3.5rem] text-[15px] font-medium leading-snug">
            {card.text}
          </p>
        </div>
        <Link
          href={card.href}
          className={`btn-sweep relative flex h-14 items-center border-t px-6 font-display text-sm font-bold uppercase tracking-wide ${card.border} ${card.sweep}`}
        >
          <span>{card.label}</span>
        </Link>
      </div>
    </div>
  );
}
