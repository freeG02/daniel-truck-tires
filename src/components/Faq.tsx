"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Las gomas son nuevas o recauchadas?",
    a: "Todas nuestras gomas son nuevas. No vendemos gomas recauchadas.",
  },
  {
    q: "¿Puedo comprar una sola unidad?",
    a: "Sí. Vendemos desde una sola unidad hasta contenedores completos, siempre a precio de importador.",
  },
  {
    q: "¿Qué formas de pago aceptan?",
    a: "Puedes pagar por transferencia bancaria o mediante un enlace de pago que te enviamos al confirmar tu pedido.",
  },
  {
    q: "¿Cuánto tarda importar un camión desde Canadá?",
    a: "El tiempo depende del modelo y la disponibilidad. Escríbenos por WhatsApp y te damos un estimado para tu caso.",
  },
  {
    q: "¿Hacen entregas?",
    a: "Sí. Al confirmar el pago coordinamos la entrega de tu pedido. Escríbenos para conocer las opciones según tu ubicación.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-brand-navy-dark sm:text-4xl">
        Preguntas frecuentes
      </h2>

      <div className="mt-6 border-t border-black/10">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-black/10">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-display text-lg font-bold uppercase tracking-tight text-brand-navy-dark"
              >
                {f.q}
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-2xl leading-none text-brand-red transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {/* Animated container: grid rows go 0fr -> 1fr to expand smoothly */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="mb-4 bg-brand-navy-dark p-5 text-sm font-medium uppercase leading-relaxed tracking-wide text-brand-cream">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
