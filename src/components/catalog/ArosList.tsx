"use client";

import { rims } from "@/data/rims";
import { ProductCard } from "@/components/ProductCard";
import { useLang } from "@/lib/i18n";
import { formatRD } from "@/lib/pricing";

export function ArosList() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-brand-navy-dark">
        {t.catalog.aros.h1}
      </h1>
      <p className="mt-2 max-w-2xl text-black/60">{t.catalog.aros.intro}</p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
        {rims.map((rim) => {
          const loc = t.catalog.rims[rim.slug as keyof typeof t.catalog.rims];
          return (
            <ProductCard
              key={rim.slug}
              href={`/aros/${rim.slug}`}
              badge={t.catalog.material[rim.material]}
              title={loc.name}
              image={rim.image ?? "/products/aros.jpg"}
              description={loc.description}
              whatsappLabel={rim.name}
              price={formatRD(rim.priceRD)}
              priceNote={t.catalog.perUnit}
            />
          );
        })}
      </div>
    </div>
  );
}
