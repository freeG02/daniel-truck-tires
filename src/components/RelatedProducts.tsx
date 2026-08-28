import { getRelatedProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

/** "You might also like" row shown below a product's details. */
export function RelatedProducts({ currentHref }: { currentHref: string }) {
  const related = getRelatedProducts(currentHref, 4);
  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-brand-navy-dark sm:text-3xl">
        También te puede interesar
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {related.map((p) => (
          <ProductCard
            key={p.href}
            compact
            href={p.href}
            title={p.title}
            image={p.image}
            whatsappLabel={p.whatsappLabel}
          />
        ))}
      </div>
    </section>
  );
}
