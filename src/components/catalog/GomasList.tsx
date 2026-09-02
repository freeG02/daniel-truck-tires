"use client";

import { tires } from "@/data/tires";
import { ProductCard } from "@/components/ProductCard";
import { useLang } from "@/lib/i18n";
import { formatRD, halfContainer } from "@/lib/pricing";

export function GomasList() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-brand-navy-dark">
        {t.catalog.gomas.h1}
      </h1>
      <p className="mt-2 max-w-2xl text-black/60">{t.catalog.gomas.intro}</p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-3">
        {tires.map((tire) => {
          const loc = t.catalog.tires[tire.slug as keyof typeof t.catalog.tires];
          return (
            <ProductCard
              key={tire.slug}
              href={`/gomas/${tire.slug}`}
              badge={t.catalog.noRetread}
              title={loc.name}
              image={tire.image ?? "/products/gomas.jpg"}
              description={loc.description}
              whatsappLabel={`Goma ${tire.size}`}
              price={formatRD(tire.priceRD)}
              priceNote={t.catalog.priceNote(halfContainer(tire.perContainer))}
              tire={{
                perHalf: halfContainer(tire.perContainer),
                size: tire.size,
                name: loc.name,
                priceRD: tire.priceRD,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
