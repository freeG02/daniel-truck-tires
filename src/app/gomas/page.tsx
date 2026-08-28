import type { Metadata } from "next";
import { tires } from "@/data/tires";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Gomas de camión nuevas",
  description:
    "Gomas de camión nuevas, no recauchadas, en medidas 11R22.5, 11R24.5, 12R22.5 y 315/80R22.5. Precio de importador.",
};

export default function GomasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-brand-navy-dark">
        Gomas de camión
      </h1>
      <p className="mt-2 max-w-2xl text-black/60">
        Gomas nuevas, no recauchadas, a precio de importador. Vendemos desde
        una unidad hasta contenedores completos.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-3">
        {tires.map((tire) => (
          <ProductCard
            key={tire.slug}
            href={`/gomas/${tire.slug}`}
            badge="No recauchada"
            title={tire.name}
            image={tire.image ?? "/products/gomas.jpg"}
            description={tire.description}
            whatsappLabel={`Goma ${tire.size}`}
          />
        ))}
      </div>
    </div>
  );
}
