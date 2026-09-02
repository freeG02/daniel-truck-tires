import { site } from "@/data/site";

/**
 * Builds a wa.me link pre-filled with a message about a specific product.
 * This is the "buy" flow for out-of-stock products: instead of checkout,
 * the customer is routed to WhatsApp with the product details attached.
 */
export function buildProductWhatsAppLink(productLabel: string, note?: string) {
  const extra = note ? ` (${note})` : "";
  const message = `Hola, estoy interesado en: ${productLabel}${extra}. ¿Está disponible?`;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a wa.me link for a truck quote request. Field labels stay Spanish
 * (read by the customer-service team). This is also the payload that will be
 * saved to the business database once the Supabase backend is wired up.
 */
export function buildTruckInquiryWhatsAppLink(data: {
  name: string;
  phone?: string;
  brand?: string;
  model?: string;
  year?: string;
  condition?: string;
  cab?: string;
  color?: string;
  mileage?: string;
  transmission?: string;
  budget?: string;
  notes?: string;
}) {
  const rows: [string, string | undefined][] = [
    ["Nombre", data.name],
    ["Teléfono", data.phone],
    ["Marca", data.brand],
    ["Modelo", data.model],
    ["Año", data.year],
    ["Condición", data.condition],
    ["Cabina", data.cab],
    ["Color", data.color],
    ["Kilometraje máx.", data.mileage],
    ["Transmisión", data.transmission],
    ["Presupuesto", data.budget],
    ["Notas", data.notes],
  ];
  const lines = rows
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n");
  const message = `Solicitud de cotización de camión:\n${lines}`;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppLink(message?: string) {
  const text = message ?? "Hola, quisiera más información sobre sus productos.";
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds a wa.me link for a whole cart: one message listing every item with
 * its quantity, so the customer can order several products in one go.
 */
export function buildCartWhatsAppLink(
  items: {
    label: string;
    qty: number;
    kind?: "tire" | "other";
    perHalf?: number;
  }[],
) {
  const lines = items
    .map((i) =>
      i.kind === "tire" && i.perHalf
        ? `- ${i.label}: ${i.qty} x 1/2 contenedor (${i.qty * i.perHalf} uds.)`
        : `- ${i.label} (x${i.qty})`,
    )
    .join("\n");
  const message = `Hola, quiero comprar los siguientes productos:\n${lines}\n\n¿Me confirman disponibilidad y precio de importador?`;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
