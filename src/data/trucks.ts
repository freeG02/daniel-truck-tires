export type Truck = {
  slug: string;
  cabType: "Con camarote" | "Sin camarote";
  name: string;
  description: string;
  /** Optional product photo; falls back to the category image. */
  image?: string;
};

// TODO: reemplazar con los modelos, años y fotos reales de camiones disponibles para importar.
export const trucks: Truck[] = [
  {
    slug: "camion-con-camarote",
    image: "/products/camion-con-camarote.jpg",
    cabType: "Con camarote",
    name: "Camión con camarote (sleeper)",
    description:
      "Camiones importados directamente desde Canadá con camarote (sleeper cab), ideales para rutas largas. Precio de importador, disponibilidad bajo pedido.",
  },
  {
    slug: "camion-sin-camarote",
    image: "/products/camion-sin-camarote.jpg",
    cabType: "Sin camarote",
    name: "Camión sin camarote (day cab)",
    description:
      "Camiones importados directamente desde Canadá sin camarote (day cab), ideales para distribución local y regional. Precio de importador, disponibilidad bajo pedido.",
  },
];
