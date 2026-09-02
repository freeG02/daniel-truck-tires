import Link from "next/link";
import Image from "next/image";
import { BuyActions } from "@/components/BuyActions";

export function ProductCard({
  href,
  badge,
  title,
  image,
  description,
  whatsappLabel,
  price,
  priceNote,
  consultLabel = "Consultar disponibilidad",
  tire,
  hideBuy = false,
  compact = false,
}: {
  href: string;
  badge?: string;
  title: string;
  /** Product photo shown at the top of the card. */
  image: string;
  description?: string;
  whatsappLabel: string;
  /** Formatted reference price (e.g. "RD$7,300"). */
  price?: string;
  /** Small note under the price (e.g. "por unidad · mín. 1/2 contenedor"). */
  priceNote?: string;
  /** Shown in place of a price when the product has none (e.g. trucks). */
  consultLabel?: string;
  /** When set, this is a tire: add-to-cart opens the container-amount picker. */
  tire?: { perHalf: number; size: string; name?: string; priceRD?: number };
  /** Hide the buy control (e.g. trucks, which use the quote form instead). */
  hideBuy?: boolean;
  /** Minimal card everywhere (image + name + add-to-cart), for suggestions. */
  compact?: boolean;
}) {
  // In the default (listing) card the extra details are hidden on mobile so the
  // 2-up grid stays compact, then shown from `sm`. A compact card hides them
  // at every size.
  const detailClass = compact ? "hidden" : "hidden sm:block";

  return (
    <div className="flex flex-col overflow-hidden border border-black/10">
      <Link href={href} className="block">
        <div
          className={`relative overflow-hidden bg-brand-navy ${
            compact ? "h-32" : "h-32 sm:h-44"
          }`}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </Link>
      <div className={`flex flex-1 flex-col gap-2 ${compact ? "p-3" : "p-3 sm:p-4"}`}>
        {badge && (
          <span
            className={`w-fit bg-brand-yellow px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-navy-dark ${detailClass}`}
          >
            {badge}
          </span>
        )}
        <Link
          href={href}
          className="line-clamp-2 text-sm font-bold hover:text-brand-blue sm:text-base"
        >
          {title}
        </Link>
        {description && (
          <p className={`text-sm text-black/60 ${detailClass}`}>{description}</p>
        )}
        {price ? (
          <div className={detailClass}>
            <p className="text-base font-bold text-brand-navy-dark">{price}</p>
            {priceNote && (
              <p className="text-xs text-black/50">{priceNote}</p>
            )}
          </div>
        ) : (
          <p
            className={`text-sm font-semibold text-brand-navy-dark ${detailClass}`}
          >
            {consultLabel}
          </p>
        )}
        {/* mt-auto pins the buy button to the bottom so it lines up across cards. */}
        {!hideBuy && (
          <BuyActions
            productId={href}
            productLabel={whatsappLabel}
            className="mt-auto pt-2"
            mode={compact ? "add-only" : "responsive"}
            tire={tire}
          />
        )}
      </div>
    </div>
  );
}
