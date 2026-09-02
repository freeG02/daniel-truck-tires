"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

// Photo + focal point per slide (not translatable). Text comes from the
// dictionary, matched by index.
const slideMeta = [
  { image: "/hero.jpg", position: "68% center" },
  { image: "/hero-2.jpg", position: "center" },
];

const INTERVAL = 7000;

// Raw CSS url() paths are not rewritten by Next's basePath, so prefix them for
// the static (GitHub Pages) build. Empty in dev / on Vercel.
const ASSET_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Hero background carousel. Cross-fades between slides (each a photo + title +
 * subtitle) with a parallax effect on scroll. On first load the title/subtitle
 * rise in synced with the intro curtain; later slide changes animate at once.
 */
export function HeroCarousel() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [initial, setInitial] = useState(true);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.3}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((v) => (v + 1) % slideMeta.length);
      setInitial(false);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  const slide = t.hero.slides[index];

  return (
    <>
      {/* Background photos: parallax wrapper, cross-fading layers */}
      <div
        ref={parallaxRef}
        className="absolute inset-x-0 top-[-15%] -z-20 h-[130%] will-change-transform"
      >
        {slideMeta.map((s, i) => (
          <div
            key={s.image}
            className="absolute inset-0 bg-cover transition-opacity duration-[900ms]"
            style={{
              backgroundImage: `url('${ASSET_PREFIX}${s.image}')`,
              backgroundPosition: s.position,
              opacity: i === index ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Dark navy overlay, darker on the left for text legibility */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(1,15,40,0.88) 0%, rgba(1,15,40,0.60) 32%, rgba(1,15,40,0.18) 62%, rgba(1,15,40,0.12) 100%)",
        }}
      />

      {/* Content: title + subtitle for the active slide */}
      <div className="relative z-10 mx-auto flex w-full max-w-[100rem] flex-col justify-center px-6 pb-[12vh] pt-20 lg:justify-end lg:pb-[16vh] lg:pt-24 lg:pl-24">
        <div key={index}>
          <h1
            className="hero-rise font-display text-6xl font-extrabold uppercase leading-[1.02] tracking-tight text-brand-cream sm:text-7xl lg:text-8xl lg:leading-[0.95] xl:text-[7.5rem]"
            style={{ animationDelay: initial ? "1s" : "0s" }}
          >
            {slide.lines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
                {i === slide.lines.length - 1 && (
                  <span className="text-brand-yellow">.</span>
                )}
              </span>
            ))}
          </h1>

          <p
            className="hero-rise mt-6 max-w-md text-lg font-medium uppercase leading-relaxed tracking-wide text-brand-cream/90"
            style={{ animationDelay: initial ? "1.15s" : "0.1s" }}
          >
            {slide.subtitle}
          </p>
        </div>
      </div>
    </>
  );
}
