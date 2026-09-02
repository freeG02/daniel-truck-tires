"use client";

import { trucks } from "@/data/trucks";
import { ProductCard } from "@/components/ProductCard";
import { useLang } from "@/lib/i18n";

export function CamionesList() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-brand-navy-dark">
        {t.catalog.camiones.h1}
      </h1>
      <p className="mt-2 max-w-2xl text-black/60">{t.catalog.camiones.intro}</p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6">
        {trucks.map((truck) => {
          const loc = t.catalog.trucks[truck.slug as keyof typeof t.catalog.trucks];
          return (
            <ProductCard
              key={truck.slug}
              href={`/camiones/${truck.slug}`}
              badge={t.catalog.cab[truck.cabType]}
              title={loc.name}
              image={truck.image ?? "/products/camiones.jpg"}
              description={loc.description}
              whatsappLabel={truck.name}
              consultLabel={t.truckForm.cta}
              hideBuy
            />
          );
        })}
      </div>
    </div>
  );
}
