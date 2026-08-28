import type { NextConfig } from "next";

// A static export (for GitHub Pages) is produced only when STATIC_EXPORT=true,
// so the normal dev server and server build are unaffected. On Pages the site
// is served from /<repo>/, so basePath comes from NEXT_PUBLIC_BASE_PATH.
const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      basePath,
      trailingSlash: true,
      // A custom loader (not `unoptimized`) so basePath is applied to every
      // <Image> src — see image-loader.ts.
      images: { loader: "custom", loaderFile: "./image-loader.ts" },
    }
  : {};

export default nextConfig;
