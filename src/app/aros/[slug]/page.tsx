import type { Metadata } from "next";
import { rims } from "@/data/rims";
import { RimDetail } from "@/components/catalog/RimDetail";

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
  return <RimDetail slug={slug} />;
}
