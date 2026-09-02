import type { Metadata } from "next";
import { tires } from "@/data/tires";
import { TireDetail } from "@/components/catalog/TireDetail";

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
  return <TireDetail slug={slug} />;
}
