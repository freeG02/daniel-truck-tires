import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { rims } from "@/data/rims";
import { BuyActions } from "@/components/BuyActions";
import { RelatedProducts } from "@/components/RelatedProducts";

export function generateStaticParams() {
  return rims.map((rim) => ({ slug: rim.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const rim = rims.find((r) => r.slug === slug);
  if (!rim) return {};
  return {
    title: rim.name,
    description: rim.description,
  };
}

export default async function RimDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rim = rims.find((r) => r.slug === slug);
  if (!rim) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden bg-brand-navy">
        <Image
          src={rim.image ?? "/products/aros.jpg"}
          alt={rim.name}
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>
      <span className="w-fit bg-brand-yellow px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-navy-dark">
        {rim.material}
      </span>
      <h1 className="mt-3 text-3xl font-extrabold text-brand-navy-dark">
        {rim.name}
      </h1>
      <p className="mt-1 text-sm font-semibold text-black/60">
        Medidas disponibles: {rim.sizes.join(", ")}
      </p>
      <p className="mt-4 text-black/70">{rim.description}</p>
      <p className="mt-6 text-lg font-semibold text-brand-navy-dark">
        Consultar disponibilidad
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
