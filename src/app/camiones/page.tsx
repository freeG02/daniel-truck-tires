import type { Metadata } from "next";
import { CamionesList } from "@/components/catalog/CamionesList";

export const metadata: Metadata = {
  title: "Camiones importados desde Canadá",
  description:
    "Camiones con y sin camarote, importados directamente desde Canadá al mejor precio del mercado.",
};

export default function CamionesPage() {
  return <CamionesList />;
}
