"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { tires } from "@/data/tires";
import { BuyActions } from "@/components/BuyActions";
import { RelatedProducts } from "@/components/RelatedProducts";
import { useLang } from "@/lib/i18n";
import { formatRD, halfContainer } from "@/lib/pricing";

export function TireDetail({ slug }: { slug: string }) {
  const { t } = useLang();
  const tire = tires.find((item) => item.slug === slug);
  if (!tire) notFound();
  const loc = t.catalog.tires[tire.slug as keyof typeof t.catalog.tires];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden bg-brand-navy">
        <Image
          src={tire.image ?? "/products/gomas.jpg"}
          alt={loc.name}
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>
      <span className="w-fit bg-brand-yellow px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-navy-dark">
        {t.catalog.noRetread}
      </span>
      <h1 className="mt-3 text-3xl font-extrabold text-brand-navy-dark">
        {loc.name}
      </h1>
      <p className="mt-1 text-sm font-semibold text-black/60">
        {t.catalog.positionLabel} {loc.position}
      </p>
      <p className="mt-4 text-black/70">{loc.description}</p>
      <p className="mt-6 text-2xl font-extrabold text-brand-navy-dark">
        {formatRD(tire.priceRD)}
        <span className="ml-2 align-middle text-sm font-medium text-black/50">
          {t.catalog.perUnit}
        </span>
      </p>
      <p className="mt-1 text-sm text-black/50">
        {t.catalog.moqNote(halfContainer(tire.perContainer), tire.perContainer)}
      </p>
      <BuyActions
        productId={`/gomas/${tire.slug}`}
        productLabel={`Goma ${tire.size}`}
        className="mt-3 max-w-md"
        tire={{
          perHalf: halfContainer(tire.perContainer),
          size: tire.size,
          name: loc.name,
          priceRD: tire.priceRD,
        }}
      />

      <RelatedProducts currentHref={`/gomas/${tire.slug}`} />
    </div>
  );
}
