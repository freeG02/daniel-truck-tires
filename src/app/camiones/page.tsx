import type { Metadata } from "next";
import { trucks } from "@/data/trucks";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Camiones importados desde Canadá",
  description:
    "Camiones con y sin camarote, importados directamente desde Canadá a precio de importador.",
};

export default function CamionesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-brand-navy-dark">
        Camiones importados
      </h1>
      <p className="mt-2 max-w-2xl text-black/60">
        Te importamos tu camión directamente desde Canadá, con camarote o sin
        camarote, a precio de importador.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6">
        {trucks.map((truck) => (
          <ProductCard
            key={truck.slug}
            href={`/camiones/${truck.slug}`}
            badge={truck.cabType}
            title={truck.name}
            image={truck.image ?? "/products/camiones.jpg"}
            description={truck.description}
            whatsappLabel={truck.name}
          />
        ))}
      </div>
    </div>
  );
}
