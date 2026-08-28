import { site } from "@/data/site";

/**
 * Builds a wa.me link pre-filled with a message about a specific product.
 * This is the "buy" flow for out-of-stock products: instead of checkout,
 * the customer is routed to WhatsApp with the product details attached.
 */
export function buildProductWhatsAppLink(productLabel: string) {
  const message = `Hola, estoy interesado en: ${productLabel}. ¿Está disponible?`;
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
export function buildCartWhatsAppLink(items: { label: string; qty: number }[]) {
  const lines = items.map((i) => `- ${i.label} (x${i.qty})`).join("\n");
  const message = `Hola, quiero comprar los siguientes productos:\n${lines}\n\n¿Me confirman disponibilidad y precio de importador?`;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
