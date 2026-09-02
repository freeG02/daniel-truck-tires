"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useLang } from "@/lib/i18n";

const eyebrow =
  "font-display text-sm font-bold uppercase tracking-widest text-brand-navy-dark/60";

// Story section imagery (two photos: a truck on the road + the warehouse).
const collage: { src: string; aspect: string }[] = [
  { src: "/hero.jpg", aspect: "aspect-[4/5]" },
  { src: "/products/gomas.jpg", aspect: "aspect-[4/5]" },
];

const memberPhotos = ["/team/1.jpg", "/team/2.jpg", "/team/3.jpg", "/team/4.jpg"];

export function NosotrosContent() {
  const { t } = useLang();
  const n = t.nosotros;
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Parallax the hero image on scroll (same feel as the homepage hero).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

  return (
    <div>
      {/* Hero band: title over an image with scroll parallax */}
      <section className="relative flex h-[42vh] min-h-[300px] w-full items-center justify-center overflow-hidden bg-brand-navy-dark">
        <div
          ref={parallaxRef}
          className="absolute inset-x-0 top-[-15%] h-[130%] will-change-transform"
        >
          <Image
            src="/hero-2.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-brand-navy-dark/55" />
        <h1 className="relative px-4 text-center font-display text-6xl font-extrabold uppercase tracking-tight text-brand-cream sm:text-7xl lg:text-8xl">
          {n.missionTag}
        </h1>
      </section>

      {/* Story: intro + collage */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            {/* Left: heading + intro */}
            <div className="lg:pt-6">
              <h2 className="font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-brand-navy-dark sm:text-5xl">
                {n.missionHeading}
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-black/60">
                {n.missionIntro}
              </p>
            </div>

            {/* Right: photo collage (masonry) */}
            <div className="columns-2 gap-3 sm:gap-4 [&>*]:mb-3 sm:[&>*]:mb-4">
              {collage.map((c) => (
                <div
                  key={c.src}
                  className={`relative ${c.aspect} w-full break-inside-avoid overflow-hidden bg-brand-navy-dark`}
                >
                  <Image
                    src={c.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, 45vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Story beats */}
          <div className="mt-14 border-t border-black/10 sm:mt-20">
            {n.values.map((v) => (
              <div
                key={v.title}
                className="grid gap-2 border-b border-black/10 py-7 sm:grid-cols-[240px_1fr] sm:gap-12 sm:py-9"
              >
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-brand-navy-dark">
                  {v.title}
                </h3>
                <p className="max-w-xl leading-relaxed text-black/60">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* People / team */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="text-center">
            <span className={eyebrow}>{n.teamTag}</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight text-brand-navy-dark sm:text-5xl lg:text-6xl">
              {n.teamHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-black/60">
              {n.teamIntro}
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {n.roles.map((role, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden border border-black/10 bg-white"
              >
                <div className="relative aspect-[3/4] w-full bg-brand-navy-dark">
                  <Image
                    src={memberPhotos[i]}
                    alt={n.memberName}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="font-display text-lg font-bold uppercase tracking-tight text-brand-navy-dark">
                    {n.memberName}
                  </p>
                  <p className="text-sm text-black/45">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className={eyebrow}>{n.ctaTag}</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-brand-navy-dark sm:text-5xl lg:text-6xl">
            {n.ctaHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-black/60">
            {n.ctaBody}
          </p>
          <a
            href={buildGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sweep relative mt-8 inline-flex h-14 items-center justify-center gap-2 bg-brand-yellow px-8 text-sm font-semibold text-brand-navy-dark"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span>{n.ctaButton}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
