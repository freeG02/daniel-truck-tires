export type Tire = {
  slug: string;
  size: string;
  name: string;
  position: string;
  description: string;
  /** Optional product photo; falls back to the category image. */
  image?: string;
  /** Precio de referencia por unidad, en pesos dominicanos (RD$). */
  priceRD: number;
  /** Cantidad aproximada de unidades que llenan un contenedor de 40'. */
  perContainer: number;
  /** Tipo de vehículo al que corresponde la medida. */
  vehicle: "camion" | "liviano";
};

// TODO: reemplazar con las medidas, marcas y descripciones reales del inventario.
// NOTA: las gomas son como nuevas (no recauchadas), con fechas de fabricación desde 2020.
export const tires: Tire[] = [
  {
    slug: "12r22-5",
    image: "/products/goma-12r22-5.jpg",
    size: "12R22.5",
    name: "Goma de camión 12R22.5",
    position: "Dirección / Tracción",
    description:
      "Goma como nueva (no recauchada) medida 12R22.5, ideal para eje direccional o de tracción en camiones y tractocamiones.",
    priceRD: 7300,
    perContainer: 230,
    vehicle: "camion",
  },
  {
    slug: "11r22-5",
    image: "/products/goma-11r22-5.jpg",
    size: "11R22.5",
    name: "Goma de camión 11R22.5",
    position: "Dirección / Tracción / Arrastre",
    description:
      "Goma como nueva (no recauchada) medida 11R22.5, una de las medidas más usadas en camiones de carga y remolques.",
    priceRD: 5800,
    perContainer: 300,
    vehicle: "camion",
  },
  {
    slug: "11r24-5",
    image: "/products/goma-11r24-5.jpg",
    size: "11R24.5",
    name: "Goma de camión 11R24.5",
    position: "Tracción / Arrastre",
    description:
      "Goma como nueva (no recauchada) medida 11R24.5, recomendada para ejes de tracción y remolques de carga pesada.",
    priceRD: 7300,
    perContainer: 270,
    vehicle: "camion",
  },
  {
    slug: "315-80r22-5",
    image: "/products/goma-315-80r22-5.jpg",
    size: "315/80R22.5",
    name: "Goma de camión 315/80R22.5",
    position: "Dirección / Tracción",
    description:
      "Goma como nueva (no recauchada) medida 315/80R22.5, alta durabilidad para uso en carretera y carga pesada.",
    priceRD: 7300,
    // TODO: confirmar. El cliente no indicó unidades por contenedor para esta
    // medida; se estima igual a la 12R22.5 por su tamaño similar.
    perContainer: 230,
    vehicle: "camion",
  },
  {
    slug: "r15-80",
    size: "R15/80",
    name: "Goma para vehículos livianos R15/80",
    position: "Vehículos livianos",
    description:
      "Goma como nueva (no recauchada) para vehículos livianos, medida R15/80. Ideal para autos, jeepetas y camionetas ligeras.",
    priceRD: 1300,
    perContainer: 230,
    vehicle: "liviano",
  },
];
