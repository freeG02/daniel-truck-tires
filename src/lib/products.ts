import { tires } from "@/data/tires";
import { rims } from "@/data/rims";
import { trucks } from "@/data/trucks";

export type ProductSummary = {
  href: string;
  title: string;
  image: string;
  whatsappLabel: string;
  category: "gomas" | "aros" | "camiones";
};

/** Every product across categories, in a shape the cards can render directly. */
export const allProducts: ProductSummary[] = [
  ...tires.map((t) => ({
    href: `/gomas/${t.slug}`,
    title: t.name,
    image: t.image ?? "/products/gomas.jpg",
    whatsappLabel: `Goma ${t.size}`,
    category: "gomas" as const,
  })),
  ...rims.map((r) => ({
    href: `/aros/${r.slug}`,
    title: r.name,
    image: r.image ?? "/products/aros.jpg",
    whatsappLabel: r.name,
    category: "aros" as const,
  })),
  ...trucks.map((t) => ({
    href: `/camiones/${t.slug}`,
    title: t.name,
    image: t.image ?? "/products/camiones.jpg",
    whatsappLabel: t.name,
    category: "camiones" as const,
  })),
];

/**
 * Suggestions for a product detail page: same-category items first (most
 * relevant), then other categories to fill up to `limit`.
 */
export function getRelatedProducts(currentHref: string, limit = 4): ProductSummary[] {
  const current = allProducts.find((p) => p.href === currentHref);
  const others = allProducts.filter((p) => p.href !== currentHref);
  if (!current) return others.slice(0, limit);
  const sameCategory = others.filter((p) => p.category === current.category);
  const otherCategory = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...otherCategory].slice(0, limit);
}
