import type { Metadata } from "next";
import { ArosList } from "@/components/catalog/ArosList";

export const metadata: Metadata = {
  title: "Aros para camión",
  description:
    "Aros de aluminio y hierro para camión, en las medidas que corresponden a cada goma. Al mejor precio del mercado.",
};

export default function ArosPage() {
  return <ArosList />;
}
