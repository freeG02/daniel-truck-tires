export type Rim = {
  slug: string;
  material: "Aluminio" | "Hierro";
  sizes: string[];
  name: string;
  description: string;
  /** Optional product photo; falls back to the category image. */
  image?: string;
  /** Precio de referencia por unidad, en pesos dominicanos (RD$). */
  priceRD: number;
};

// TODO: reemplazar con los modelos y medidas reales de aros disponibles.
export const rims: Rim[] = [
  {
    slug: "aro-aluminio-22-5",
    image: "/products/aro-aluminio.jpg",
    material: "Aluminio",
    sizes: ["22.5\"", "24.5\""],
    name: "Aro de aluminio para camión",
    description:
      "Aro de aluminio para camión, disponible en las medidas que corresponden a cada goma (22.5\" y 24.5\"). Mayor duración y menor peso.",
    priceRD: 7000,
  },
  {
    slug: "aro-hierro-22-5",
    image: "/products/aro-hierro.jpg",
    material: "Hierro",
    sizes: ["22.5\"", "24.5\""],
    name: "Aro de hierro para camión",
    description:
      "Aro de hierro (acero) para camión, disponible en las medidas que corresponden a cada goma (22.5\" y 24.5\"). Opción resistente a precio de importador.",
    priceRD: 4500,
  },
];
