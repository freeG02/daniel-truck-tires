"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { formatRD } from "@/lib/pricing";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { CloseIcon, MinusIcon, PlusIcon } from "@/components/CartIcons";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" strokeWidth="1.6" />
      <path d="M7.5 12.5l3 3 6-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Formats half-container units as containers: 1 -> "½", 2 -> "1", 3 -> "1½". */
function fmtContainers(halves: number): string {
  const whole = Math.floor(halves / 2);
  const isHalf = halves % 2 === 1;
  if (isHalf) return whole > 0 ? `${whole}½` : "½";
  return `${whole}`;
}

export function AddTireDialog({
  tire,
  onClose,
}: {
  tire: {
    id: string;
    label: string;
    size: string;
    perHalf: number;
    name?: string;
    priceRD?: number;
  };
  onClose: () => void;
}) {
  const { add, open } = useCart();
  const { t } = useLang();
  const [halves, setHalves] = useState(1); // 1 half-container = the MOQ
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const tires = halves * tire.perHalf;
  const total = tire.priceRD ? tire.priceRD * tires : null;
  const heading = tire.name ?? tire.label;

  const confirm = () => {
    add({
      id: tire.id,
      label: tire.label,
      kind: "tire",
      perHalf: tire.perHalf,
      size: tire.size,
      qty: halves,
    });
    setAdded(true);
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={heading}
        className="relative w-full max-w-sm overflow-hidden bg-white shadow-2xl"
      >
        {added ? (
          /* Step 2: confirmation */
          <div className="flex flex-col items-center px-6 py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy-dark text-brand-yellow">
              <CheckIcon className="h-9 w-9" />
            </div>
            <p className="mt-5 font-display text-xl font-bold uppercase tracking-tight text-brand-navy-dark">
              {t.addTire.added}
            </p>
            <p className="mt-1 text-sm text-black/50">
              {heading} · {halves} × {t.containers.half} · {t.addTire.tires(tires)}
            </p>
            <div className="mt-6 flex w-full flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  open();
                  onClose();
                }}
                className="btn-sweep relative flex h-12 w-full items-center justify-center gap-2 bg-brand-yellow text-sm font-semibold text-brand-navy-dark"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>{t.addTire.viewCart}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="h-11 w-full text-sm font-medium text-black/50 transition-colors hover:text-brand-navy-dark"
              >
                {t.addTire.keepShopping}
              </button>
            </div>
          </div>
        ) : (
          /* Step 1: choose amount */
          <>
            <div className="flex items-center justify-between bg-brand-navy-dark px-5 py-4 text-brand-cream">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide">
                {t.addTire.title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.cart.close}
                className="text-brand-cream/70 transition-colors hover:text-brand-cream"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <p className="font-display text-lg font-bold uppercase tracking-tight text-brand-navy-dark">
                {heading}
              </p>
              {tire.priceRD != null && (
                <p className="text-sm text-black/50">
                  {formatRD(tire.priceRD)} {t.catalog.perUnit}
                </p>
              )}
              <p className="mt-1 text-xs text-black/40">{t.containers.halfNote}</p>

              {/* Container selector */}
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-navy-dark/70">
                  {t.addTire.containersLabel}
                </p>
                <div className="mt-2 flex items-center justify-between border border-black/15">
                  <button
                    type="button"
                    onClick={() => setHalves((h) => Math.max(1, h - 1))}
                    disabled={halves <= 1}
                    aria-label="-"
                    className="flex h-14 w-14 items-center justify-center text-brand-navy-dark transition-colors hover:bg-brand-navy-dark hover:text-white disabled:pointer-events-none disabled:opacity-30"
                  >
                    <MinusIcon className="h-5 w-5" />
                  </button>
                  <span className="font-display text-3xl font-extrabold text-brand-navy-dark">
                    {fmtContainers(halves)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setHalves((h) => h + 1)}
                    aria-label="+"
                    className="flex h-14 w-14 items-center justify-center text-brand-navy-dark transition-colors hover:bg-brand-navy-dark hover:text-white"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-2 text-center text-sm text-black/60">
                  {t.addTire.tires(tires)} ({halves} × {t.containers.half})
                  {total != null && (
                    <span className="block font-semibold text-brand-navy-dark">
                      {formatRD(total)}
                    </span>
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={confirm}
                className="btn-sweep relative mt-6 flex h-14 w-full items-center justify-center gap-2 bg-brand-yellow text-sm font-semibold text-brand-navy-dark"
              >
                {t.buy.addToCart}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
