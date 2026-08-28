export type Tire = {
  slug: string;
  size: string;
  name: string;
  position: string;
  description: string;
  /** Optional product photo; falls back to the category image. */
  image?: string;
};

// TODO: reemplazar con las medidas, marcas y descripciones reales del inventario.
export const tires: Tire[] = [
  {
    slug: "12r22-5",
    image: "/products/goma-12r22-5.jpg",
    size: "12R22.5",
    name: "Goma de camión 12R22.5",
    position: "Dirección / Tracción",
    description:
      "Goma nueva (no recauchada) medida 12R22.5, ideal para eje direccional o de tracción en camiones y tractocamiones.",
  },
  {
    slug: "11r22-5",
    image: "/products/goma-11r22-5.jpg",
    size: "11R22.5",
    name: "Goma de camión 11R22.5",
    position: "Dirección / Tracción / Arrastre",
    description:
      "Goma nueva (no recauchada) medida 11R22.5, una de las medidas más usadas en camiones de carga y remolques.",
  },
  {
    slug: "11r24-5",
    image: "/products/goma-11r24-5.jpg",
    size: "11R24.5",
    name: "Goma de camión 11R24.5",
    position: "Tracción / Arrastre",
    description:
      "Goma nueva (no recauchada) medida 11R24.5, recomendada para ejes de tracción y remolques de carga pesada.",
  },
  {
    slug: "315-80r22-5",
    image: "/products/goma-315-80r22-5.jpg",
    size: "315/80R22.5",
    name: "Goma de camión 315/80R22.5",
    position: "Dirección / Tracción",
    description:
      "Goma nueva (no recauchada) medida 315/80R22.5, alta durabilidad para uso en carretera y carga pesada.",
  },
];
