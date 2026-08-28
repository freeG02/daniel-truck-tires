"use client";

import Link from "next/link";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const categories = [
  {
    href: "/gomas",
    title: "Gomas de camión",
    description: "Gomas nuevas, no recauchadas, en las medidas más usadas.",
    image: "/products/gomas.jpg",
  },
  {
    href: "/aros",
    title: "Aros",
    description: "Aros de aluminio y hierro para cada medida de goma.",
    image: "/products/aros.jpg",
  },
  {
    href: "/camiones",
    title: "Camiones importados",
    description: "Con y sin camarote, importados directamente desde Canadá.",
    image: "/products/camiones.jpg",
  },
];

/**
 * Product category cards: bordered, square, with a product photo on top and a
 * navy rectangle that rises behind the label on hover. The cards reveal in a
 * left-to-right sequence when scrolled into view.
 */
export function ProductGrid() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="mt-8 grid gap-6 sm:grid-cols-3">
      {categories.map((category, i) => (
        <Link
          key={category.href}
          href={category.href}
          className={`product-card reveal-up relative flex flex-col overflow-hidden border border-black/10 bg-white ${
            inView ? "is-visible" : ""
          }`}
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-brand-navy-dark">
            <Image
              src={category.image}
              alt={category.title}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Navy block that rises from the bottom-left corner on hover */}
          <span className="product-card__shape" />

          <div className="relative z-10 flex flex-1 flex-col p-6 pb-16">
            <h3 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-brand-navy-dark">
              {category.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-black/60">
              {category.description}
            </p>
          </div>

          <span className="product-card__label z-20 font-display text-sm font-bold uppercase tracking-wide text-brand-navy-dark">
            Ver productos
          </span>
        </Link>
      ))}
    </div>
  );
}
