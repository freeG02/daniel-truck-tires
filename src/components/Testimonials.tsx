"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { useLang } from "@/lib/i18n";

// TODO: reemplazar con testimonios reales (nombre, cargo, foto y texto).
// One photo per testimonial (not translatable), matched to the dictionary by index.
const testimonialImages = ["/testimonials/1.jpg", "/testimonials/2.jpg", "/testimonials/3.jpg"];

export function Testimonials() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const { t } = useLang();
  const testimonials = t.testimonials.items;

  return (
    <section className="bg-brand-navy-dark py-16 text-brand-cream sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-cream/60">
          <span className="text-brand-yellow">•</span> {t.testimonials.tag}
        </span>
        <h2 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
          {t.testimonials.heading}
        </h2>

        <div ref={ref} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`reveal-up ${inView ? "is-visible" : ""}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <figure className="group flex h-full flex-col bg-white/[.05] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:bg-white/[.08] hover:shadow-2xl hover:shadow-black/30">
                <div className="flex flex-1 flex-col p-7">
                  <span className="font-display text-lg font-bold text-brand-cream/30 transition-colors duration-300 group-hover:text-brand-yellow/70">
                    0{i + 1}
                  </span>
                  <blockquote className="mt-6 text-lg leading-relaxed text-brand-cream">
                    {item.quote}
                  </blockquote>
                </div>

                <div className="flex items-stretch border-t border-white/10">
                  <figcaption className="flex flex-1 flex-col justify-center p-4">
                    <span className="text-sm font-semibold text-brand-cream">
                      {item.name}
                    </span>
                    <span className="text-xs text-brand-cream/50">{item.role}</span>
                  </figcaption>
                  <div className="relative w-14 shrink-0 overflow-hidden bg-white/[.06]">
                    <Image
                      src={testimonialImages[i]}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                    />
                  </div>
                </div>

                <div className="h-1 origin-bottom bg-brand-yellow transition-transform duration-300 ease-out group-hover:scale-y-[2]" />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
