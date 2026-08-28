import type { Metadata } from "next";
import { rims } from "@/data/rims";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Aros para camión",
  description:
    "Aros de aluminio y hierro para camión, en las medidas que corresponden a cada goma. Precio de importador.",
};

export default function ArosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-brand-navy-dark">Aros</h1>
      <p className="mt-2 max-w-2xl text-black/60">
        Aros de aluminio y de hierro para cada tipo de goma de camión, a
        precio de importador.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
        {rims.map((rim) => (
          <ProductCard
            key={rim.slug}
            href={`/aros/${rim.slug}`}
            badge={rim.material}
            title={rim.name}
            image={rim.image ?? "/products/aros.jpg"}
            description={rim.description}
            whatsappLabel={rim.name}
          />
        ))}
      </div>
    </div>
  );
}
