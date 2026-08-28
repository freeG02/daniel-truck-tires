import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { trucks } from "@/data/trucks";
import { BuyActions } from "@/components/BuyActions";
import { RelatedProducts } from "@/components/RelatedProducts";

export function generateStaticParams() {
  return trucks.map((truck) => ({ slug: truck.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const truck = trucks.find((t) => t.slug === slug);
  if (!truck) return {};
  return {
    title: truck.name,
    description: truck.description,
  };
}

export default async function TruckDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const truck = trucks.find((t) => t.slug === slug);
  if (!truck) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden bg-brand-navy">
        <Image
          src={truck.image ?? "/products/camiones.jpg"}
          alt={truck.name}
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>
      <span className="w-fit bg-brand-yellow px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-navy-dark">
        {truck.cabType}
      </span>
      <h1 className="mt-3 text-3xl font-extrabold text-brand-navy-dark">
        {truck.name}
      </h1>
      <p className="mt-4 text-black/70">{truck.description}</p>
      <p className="mt-6 text-lg font-semibold text-brand-navy-dark">
        Consultar disponibilidad
      </p>
      <BuyActions
        productId={`/camiones/${truck.slug}`}
        productLabel={truck.name}
        className="mt-3 max-w-md"
      />

      <RelatedProducts currentHref={`/camiones/${truck.slug}`} />
    </div>
  );
}
