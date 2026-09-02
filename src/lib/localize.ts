import type { Dict } from "@/data/dictionary";

/**
 * Localized display name for a product, resolved from its page path
 * (e.g. "/gomas/12r22-5"). Falls back to an empty string if unknown.
 */
export function localizeProductName(href: string, t: Dict): string {
  const [cat, slug] = href.split("/").filter(Boolean);
  if (cat === "gomas") {
    return t.catalog.tires[slug as keyof typeof t.catalog.tires]?.name ?? "";
  }
  if (cat === "aros") {
    return t.catalog.rims[slug as keyof typeof t.catalog.rims]?.name ?? "";
  }
  if (cat === "camiones") {
    return t.catalog.trucks[slug as keyof typeof t.catalog.trucks]?.name ?? "";
  }
  return "";
}
