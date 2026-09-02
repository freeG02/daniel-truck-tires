import type { Metadata } from "next";
import { GomasList } from "@/components/catalog/GomasList";

export const metadata: Metadata = {
  title: "Gomas como nuevas de camión",
  description:
    "Gomas como nuevas, no recauchadas, en medidas 11R22.5, 11R24.5, 12R22.5 y 315/80R22.5, más medida para vehículos livianos. Importadas desde Canadá al mejor precio del mercado.",
};

export default function GomasPage() {
  return <GomasList />;
}
