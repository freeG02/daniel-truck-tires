// Custom next/image loader for the static (GitHub Pages) build. next/image with
// `unoptimized` does not prepend basePath to string srcs, so do it here — this
// runs for every <Image>, keeping components basePath-agnostic. On dev / Vercel
// NEXT_PUBLIC_BASE_PATH is empty, so srcs are returned unchanged.
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function imageLoader({ src }: { src: string }): string {
  if (src.startsWith("http") || (base && src.startsWith(base))) return src;
  return `${base}${src}`;
}
