import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { tires } from "@/data/tires";
import { rims } from "@/data/rims";
import { trucks } from "@/data/trucks";

// Emit as a static file (required for `output: export`).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/gomas", "/aros", "/camiones", "/nosotros"];

  const productRoutes = [
    ...tires.map((t) => `/gomas/${t.slug}`),
    ...rims.map((r) => `/aros/${r.slug}`),
    ...trucks.map((t) => `/camiones/${t.slug}`),
  ];

  return [...staticRoutes, ...productRoutes].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
}
