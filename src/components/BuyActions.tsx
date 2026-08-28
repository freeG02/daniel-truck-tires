"use client";

import { buildProductWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { CartIcon, PlusIcon } from "@/components/CartIcons";
import { useCart } from "@/lib/cart";

/**
 * Buy control. Modes:
 * - "full": add-to-cart (1/3) + "Comprar ahora" (2/3) at all sizes (detail page).
 * - "responsive": add-to-cart only on mobile (full width), split on desktop
 *   (listing cards — keeps mobile cards compact).
 * - "add-only": just the add-to-cart button (compact suggestion cards).
 */
export function BuyActions({
  productId,
  productLabel,
  className = "",
  mode = "full",
}: {
  productId: string;
  productLabel: string;
  className?: string;
  mode?: "full" | "responsive" | "add-only";
}) {
  const { add } = useCart();

  const addWidth =
    mode === "full" ? "w-1/3" : mode === "responsive" ? "w-full sm:w-1/3" : "w-full";
  const buyClass =
    mode === "full"
      ? "flex w-2/3"
      : mode === "responsive"
        ? "hidden sm:flex sm:w-2/3"
        : "hidden";

  return (
    <div className={`flex w-full ${className}`}>
      <button
        type="button"
        onClick={() => add({ id: productId, label: productLabel })}
        aria-label={`Agregar ${productLabel} al carrito`}
        title="Agregar al carrito"
        className={`group relative flex h-14 items-center justify-center gap-1 bg-brand-navy-dark text-brand-cream ${addWidth}`}
      >
        {/* On hover: cart fills yellow, plus turns yellow. */}
        <CartIcon className="h-5 w-5 transition-colors duration-200 group-hover:fill-brand-yellow group-hover:stroke-brand-yellow" />
        <PlusIcon className="h-3.5 w-3.5 transition-colors duration-200 group-hover:stroke-brand-yellow" />
      </button>
      <a
        href={buildProductWhatsAppLink(productLabel)}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-sweep relative h-14 items-center justify-center gap-2 bg-brand-yellow text-sm font-semibold text-brand-navy-dark ${buyClass}`}
      >
        <WhatsAppIcon className="h-5 w-5" />
        <span>Comprar ahora</span>
      </a>
    </div>
  );
}
