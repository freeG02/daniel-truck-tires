import type { Metadata } from "next";
import { NosotrosContent } from "@/components/catalog/NosotrosContent";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Somos importadores directos de gomas de camión como nuevas, aros y camiones desde Canadá, al mejor precio del mercado en República Dominicana.",
};

export default function NosotrosPage() {
  return <NosotrosContent />;
}
