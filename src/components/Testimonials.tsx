"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

// TODO: reemplazar con testimonios reales (nombre, cargo, foto y texto).
const testimonials = [
  {
    quote:
      "Compré un juego de gomas y el precio fue mucho mejor que en la calle. Todo por WhatsApp, rápido y claro.",
    name: "Nombre del cliente",
    role: "Transportista",
    image: "/testimonials/1.jpg",
  },
  {
    quote:
      "Me importaron el camión desde Canadá tal como lo pedí, con camarote. Excelente comunicación en todo el proceso.",
    name: "Nombre del cliente",
    role: "Empresa de carga",
    image: "/testimonials/2.jpg",
  },
  {
    quote:
      "Pedí aros para mi flota y llegaron en la medida correcta. Volveré a comprar sin duda.",
    name: "Nombre del cliente",
    role: "Flota de camiones",
    image: "/testimonials/3.jpg",
  },
];

export function Testimonials() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="bg-brand-navy-dark py-16 text-brand-cream sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-cream/60">
          <span className="text-brand-yellow">•</span> Testimonios
        </span>
        <h2 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
          Lo que dicen nuestros clientes
        </h2>

        <div ref={ref} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
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
                    {t.quote}
                  </blockquote>
                </div>

                <div className="flex items-stretch border-t border-white/10">
                  <figcaption className="flex flex-1 flex-col justify-center p-4">
                    <span className="text-sm font-semibold text-brand-cream">
                      {t.name}
                    </span>
                    <span className="text-xs text-brand-cream/50">{t.role}</span>
                  </figcaption>
                  <div className="relative w-14 shrink-0 overflow-hidden bg-white/[.06]">
                    <Image
                      src={t.image}
                      alt={t.name}
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
