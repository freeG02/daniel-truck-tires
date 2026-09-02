"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { rims } from "@/data/rims";
import { BuyActions } from "@/components/BuyActions";
import { RelatedProducts } from "@/components/RelatedProducts";
import { useLang } from "@/lib/i18n";
import { formatRD } from "@/lib/pricing";

export function RimDetail({ slug }: { slug: string }) {
  const { t } = useLang();
  const rim = rims.find((item) => item.slug === slug);
  if (!rim) notFound();
  const loc = t.catalog.rims[rim.slug as keyof typeof t.catalog.rims];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden bg-brand-navy">
        <Image
          src={rim.image ?? "/products/aros.jpg"}
          alt={loc.name}
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>
      <span className="w-fit bg-brand-yellow px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-navy-dark">
        {t.catalog.material[rim.material]}
      </span>
      <h1 className="mt-3 text-3xl font-extrabold text-brand-navy-dark">
        {loc.name}
      </h1>
      <p className="mt-1 text-sm font-semibold text-black/60">
        {t.catalog.sizesLabel} {rim.sizes.join(", ")}
      </p>
      <p className="mt-4 text-black/70">{loc.description}</p>
      <p className="mt-6 text-2xl font-extrabold text-brand-navy-dark">
        {formatRD(rim.priceRD)}
        <span className="ml-2 align-middle text-sm font-medium text-black/50">
          {t.catalog.perUnit}
        </span>
      </p>
      <BuyActions
        productId={`/aros/${rim.slug}`}
        productLabel={rim.name}
        className="mt-3 max-w-md"
      />

      <RelatedProducts currentHref={`/aros/${rim.slug}`} />
    </div>
  );
}
