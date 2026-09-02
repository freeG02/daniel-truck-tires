"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

export function Faq() {
  const { t } = useLang();
  const faqs = t.faq.items;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-brand-navy-dark sm:text-4xl">
        {t.faq.heading}
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
