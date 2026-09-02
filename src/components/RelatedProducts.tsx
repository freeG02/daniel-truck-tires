"use client";

import { getRelatedProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useLang } from "@/lib/i18n";
import { localizeProductName } from "@/lib/localize";
import { tires } from "@/data/tires";
import { halfContainer } from "@/lib/pricing";

/** "You might also like" row shown below a product's details. */
export function RelatedProducts({ currentHref }: { currentHref: string }) {
  const { t } = useLang();
  const related = getRelatedProducts(currentHref, 4);
  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-brand-navy-dark sm:text-3xl">
        {t.catalog.relatedHeading}
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {related.map((p) => {
          const tire =
            p.category === "gomas"
              ? tires.find((item) => `/gomas/${item.slug}` === p.href)
              : undefined;
          return (
            <ProductCard
              key={p.href}
              compact
              href={p.href}
              title={localizeProductName(p.href, t) || p.title}
              image={p.image}
              whatsappLabel={p.whatsappLabel}
              tire={
                tire
                  ? {
                      perHalf: halfContainer(tire.perContainer),
                      size: tire.size,
                      name: localizeProductName(p.href, t) || p.title,
                      priceRD: tire.priceRD,
                    }
                  : undefined
              }
              hideBuy={p.category === "camiones"}
            />
          );
        })}
      </div>
    </section>
  );
}
