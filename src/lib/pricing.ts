/**
 * Peso formatting and container math shared across the catalog and the cart.
 * The MOQ (minimum order quantity) is half of a 40' container per tire model.
 */

/** Formats a peso amount as "RD$7,300" (no decimals). */
export function formatRD(amount: number): string {
  return `RD$${amount.toLocaleString("en-US")}`;
}

/** Minimum order quantity for a tire model: half of a 40' container. */
export function halfContainer(perContainer: number): number {
  return Math.round(perContainer / 2);
}
