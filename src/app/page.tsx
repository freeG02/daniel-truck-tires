"use client";

import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";
import { useLang } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HeroSidebar } from "@/components/HeroSidebar";
import { HeroCard } from "@/components/HeroCard";
import { ProductGrid } from "@/components/ProductGrid";
import { WhyUs } from "@/components/WhyUs";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";

const h2Class =
  "font-display text-3xl font-extrabold uppercase tracking-tight text-brand-navy-dark sm:text-4xl";

export default function Home() {
  const { t } = useLang();

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate flex h-screen overflow-hidden text-brand-cream">
        {/* Background carousel (photos + title/subtitle) with parallax */}
        <HeroCarousel />

        {/* Fixed left rail: rotated label + social icons, fills white on scroll */}
        <HeroSidebar />

        {/* Bottom-right feature card: rotates through what DTT sells */}
        <HeroCard />
      </section>

      {/* Below-hero content sits to the right of the fixed left rail (lg+) */}
      <div className="lg:pl-14">
        {/* Statement */}
        <section className="bg-brand-cream">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <p className="font-display text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-brand-navy-dark sm:text-6xl lg:text-7xl xl:text-8xl">
              {t.home.statement.map((seg, i) => (
                <span key={i} className={seg.hl ? "text-brand-red" : undefined}>
                  {seg.t}
                </span>
              ))}
            </p>
            <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-black/60">
              {t.home.complement}
            </p>
          </div>
        </section>

        {/* Productos */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className={h2Class}>{t.home.productsHeading}</h2>
          <ProductGrid />
        </section>

        {/* ¿Por qué comprar? */}
        <WhyUs />

        {/* ¿Cómo funciona? (scroll-pinned) */}
        <HowItWorks />

        {/* Testimonios (placeholders) */}
        <Testimonials />

        {/* Preguntas frecuentes */}
        <Faq />

        {/* CTA final */}
        <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className={h2Class}>{t.home.ctaHeading}</h2>
          <p className="mx-auto mt-2 max-w-xl text-black/60">{t.home.ctaBody}</p>
          <a
            href={buildGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sweep relative mt-6 inline-flex h-14 items-center justify-center gap-2 bg-brand-yellow px-8 text-sm font-semibold text-brand-navy-dark"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span>{t.home.ctaButton}</span>
          </a>
        </section>
      </div>
    </div>
  );
}
