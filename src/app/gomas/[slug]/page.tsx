import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { tires } from "@/data/tires";
import { BuyActions } from "@/components/BuyActions";
import { RelatedProducts } from "@/components/RelatedProducts";

export function generateStaticParams() {
  return tires.map((tire) => ({ slug: tire.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tire = tires.find((t) => t.slug === slug);
  if (!tire) return {};
  return {
    title: tire.name,
    description: tire.description,
  };
}

export default async function TireDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tire = tires.find((t) => t.slug === slug);
  if (!tire) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden bg-brand-navy">
        <Image
          src={tire.image ?? "/products/gomas.jpg"}
          alt={tire.name}
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>
      <span className="w-fit bg-brand-yellow px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-navy-dark">
        No recauchada
      </span>
      <h1 className="mt-3 text-3xl font-extrabold text-brand-navy-dark">
        {tire.name}
      </h1>
      <p className="mt-1 text-sm font-semibold text-black/60">
        Posición recomendada: {tire.position}
      </p>
      <p className="mt-4 text-black/70">{tire.description}</p>
      <p className="mt-6 text-lg font-semibold text-brand-navy-dark">
        Consultar disponibilidad
      </p>
      <BuyActions
        productId={`/gomas/${tire.slug}`}
        productLabel={`Goma ${tire.size}`}
        className="mt-3 max-w-md"
      />

      <RelatedProducts currentHref={`/gomas/${tire.slug}`} />
    </div>
  );
}
