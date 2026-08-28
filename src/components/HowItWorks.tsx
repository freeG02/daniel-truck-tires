"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const steps = [
  {
    title: "Escríbenos por WhatsApp",
    description:
      "Elige el producto y toca el botón de WhatsApp. Se abre un chat con los detalles listos para enviar.",
    image: "/products/gomas.jpg",
  },
  {
    title: "Confirmamos tu pedido",
    description:
      "Te confirmamos la disponibilidad, las medidas y el precio de importador.",
    image: "/products/camiones.jpg",
  },
  {
    title: "Realiza el pago",
    description:
      "Paga por transferencia bancaria o con el enlace de pago que te enviamos.",
    image: "/products/aros.jpg",
  },
  {
    title: "Coordina la entrega",
    description:
      "Al confirmar el pago, coordinamos la entrega de tu pedido.",
    image: "/hero.jpg",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Scroll-driven progress: fill height + active step.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = containerRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      if (fillRef.current) fillRef.current.style.height = `${p * 100}%`;
      const a = Math.min(steps.length - 1, Math.floor(p * steps.length + 0.0001));
      setActive((prev) => (prev === a ? prev : a));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Wipe the active image in whenever the step changes, in either direction.
  const imagesRef = useRef<HTMLDivElement>(null);
  const prevActiveRef = useRef(0);
  useEffect(() => {
    const container = imagesRef.current;
    if (!container) return;
    const imgs = Array.from(container.querySelectorAll<HTMLElement>("img"));
    const prev = prevActiveRef.current;
    prevActiveRef.current = active;

    imgs.forEach((img, i) => {
      if (i === active && prev !== active) {
        // Scrolling down: wipe up from the bottom. Scrolling up: wipe down from the top.
        img.style.transition = "none";
        img.style.clipPath =
          active > prev ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)";
        img.style.zIndex = "20";
        void img.offsetWidth; // force reflow so the transition runs
        img.style.transition = "";
        img.style.clipPath = "inset(0 0 0 0)";
      } else if (i === active) {
        img.style.transition = "none";
        img.style.clipPath = "inset(0 0 0 0)";
        img.style.zIndex = "20";
      } else if (i === prev) {
        img.style.transition = "none";
        img.style.clipPath = "inset(0 0 0 0)";
        img.style.zIndex = "10";
      } else {
        img.style.transition = "none";
        img.style.clipPath = "inset(100% 0 0 0)";
        img.style.zIndex = "0";
      }
    });
  }, [active]);

  // Size the track so it runs exactly from the first number to the last.
  useEffect(() => {
    const setTrack = () => {
      const list = stepsRef.current;
      const track = trackRef.current;
      if (!list || !track) return;
      const boxes = list.querySelectorAll<HTMLElement>("[data-num]");
      if (boxes.length < 2) return;
      const first = boxes[0];
      const last = boxes[boxes.length - 1];
      const top = first.offsetTop + first.offsetHeight / 2;
      const bottom = last.offsetTop + last.offsetHeight / 2;
      track.style.top = `${top}px`;
      track.style.height = `${bottom - top}px`;
    };
    setTrack();
    window.addEventListener("resize", setTrack);
    return () => window.removeEventListener("resize", setTrack);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${steps.length * 80}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-white">
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-4 py-10 sm:px-6">
          {/* Header */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-navy-dark/70">
                <span className="text-brand-red">•</span> Proceso simple
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-brand-navy-dark sm:text-5xl">
                Así de fácil es
                <br />
                hacer tu pedido
              </h2>
            </div>
            <p className="max-w-sm leading-relaxed text-black/60">
              Todavía no vendemos en línea. Coordinamos todo por WhatsApp, de
              forma rápida y clara, desde el primer mensaje hasta la entrega.
            </p>
          </div>

          {/* Body: steps + image */}
          <div className="mt-8 grid min-h-0 flex-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Steps with progress bar */}
            <div ref={stepsRef} className="relative">
              <div
                ref={trackRef}
                className="absolute left-5 w-0.5 -translate-x-1/2 bg-brand-navy-dark/10"
                style={{ top: 0, height: 0 }}
              >
                <div ref={fillRef} className="w-full bg-brand-navy-dark" style={{ height: "0%" }} />
              </div>

              {steps.map((step, i) => {
                const isActive = i === active;
                return (
                  <div key={step.title} className="flex gap-5 py-4">
                    <span
                      data-num
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center font-display text-lg font-bold transition-colors duration-300 ${
                        isActive
                          ? "bg-brand-navy-dark text-white"
                          : "border border-brand-navy-dark/15 bg-white text-brand-navy-dark/40"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div
                      className={`transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      <h3 className="font-display text-xl font-bold uppercase tracking-tight text-brand-navy-dark">
                        {step.title}
                      </h3>
                      <p className="mt-1 max-w-xs text-sm leading-relaxed text-black/60">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Image: the active one wipes in (direction follows the scroll) */}
            <div
              ref={imagesRef}
              className="relative hidden h-full min-h-[320px] overflow-hidden bg-brand-navy-dark lg:block"
            >
              {steps.map((step) => (
                <Image
                  key={step.image}
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="hiw-image object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
