import type { Metadata } from "next";
import { trucks } from "@/data/trucks";
import { TruckDetail } from "@/components/catalog/TruckDetail";

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
  return <TruckDetail slug={slug} />;
}
