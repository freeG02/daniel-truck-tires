"use client";

import { useCart } from "@/lib/cart";
import { CartIcon } from "@/components/CartIcons";

/**
 * Header cart trigger: a flush square cell (matching the header height) with a
 * cart icon and a live item-count badge. Opens the cart drawer.
 */
export function CartButton({
  whiteBar,
  lineBg,
  className = "",
  style,
}: {
  whiteBar: boolean;
  lineBg: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { count, open } = useCart();

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Abrir carrito${count > 0 ? ` (${count})` : ""}`}
      className={`nav-cart-sweep relative flex items-center overflow-hidden px-4 transition-colors hover:text-brand-cream sm:px-5 ${
        whiteBar ? "text-brand-navy-dark/70" : "text-brand-cream/80"
      } ${className}`}
      style={style}
    >
      <span
        className={`intro-line-y pointer-events-none absolute left-0 top-0 h-full w-px ${lineBg}`}
        style={{ animationDelay: "0.66s" }}
      />
      <CartIcon className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute right-1.5 top-2 z-[1] flex h-4 min-w-4 items-center justify-center bg-brand-red px-1 text-[10px] font-bold leading-none text-white sm:right-2">
          {count}
        </span>
      )}
    </button>
  );
}
