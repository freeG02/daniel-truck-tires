"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { buildCartWhatsAppLink } from "@/lib/whatsapp";
import { containerStats } from "@/lib/containers";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  CloseIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  CartIcon,
} from "@/components/CartIcons";

function BoxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M3 7l9-4 9 4-9 4-9-4z" strokeLinejoin="round" />
      <path d="M3 7v10l9 4 9-4V7" strokeLinejoin="round" />
      <path d="M12 11v10" />
    </svg>
  );
}

export function CartDrawer() {
  const { items, count, isOpen, close, add, setQty, remove, clear } = useCart();
  const { t } = useLang();
  const [showContainers, setShowContainers] = useState(true);

  const stats = containerStats(items);
  const hasTires = stats.containers.length > 0;

  // Close on Escape while the drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t.cart.title}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-brand-navy-dark px-5 py-4 text-brand-cream">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold uppercase tracking-wide">
            <CartIcon className="h-5 w-5" />
            {t.cart.title}
            {count > 0 && (
              <span className="ml-1 bg-brand-yellow px-2 text-sm font-bold text-brand-navy-dark">
                {count}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label={t.cart.close}
            className="text-brand-cream/70 transition-colors hover:text-brand-cream"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <CartIcon className="h-10 w-10 text-black/20" />
            <p className="font-display text-lg font-bold uppercase tracking-tight text-brand-navy-dark">
              {t.cart.empty1}
            </p>
            <p className="text-sm text-black/50">{t.cart.empty2}</p>
          </div>
        ) : (
          <div data-lenis-prevent className="flex-1 overflow-y-auto">
            {/* Mis contenedores */}
            {hasTires && (
              <div className="border-b border-black/10 bg-brand-cream/40">
                <button
                  type="button"
                  onClick={() => setShowContainers((v) => !v)}
                  aria-expanded={showContainers}
                  className="flex w-full items-center justify-between px-5 py-3"
                >
                  <span className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-brand-navy-dark">
                    <BoxIcon className="h-5 w-5" />
                    {t.containers.title}
                    <span className="bg-brand-navy-dark px-1.5 text-xs font-bold text-brand-cream">
                      {stats.fullCount}/{stats.containers.length}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 12 12"
                    className={`h-3 w-3 text-brand-navy-dark transition-transform ${showContainers ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {showContainers && (
                  <div className="space-y-3 px-5 pb-4">
                    <p className="text-xs leading-relaxed text-black/50">
                      {t.containers.subtitle}
                    </p>
                    {stats.containers.map((c, i) => (
                      <div key={i} className="border border-black/10 bg-white p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-display text-sm font-bold uppercase tracking-tight text-brand-navy-dark">
                            {t.containers.container(i + 1)}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                              c.full
                                ? "bg-brand-navy-dark text-brand-cream"
                                : "bg-brand-yellow text-brand-navy-dark"
                            }`}
                          >
                            {c.full ? t.containers.full : t.containers.inProgress}
                          </span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden bg-black/10">
                          <div
                            className={`h-full transition-all duration-500 ${
                              c.full ? "bg-brand-navy-dark" : "bg-brand-yellow"
                            }`}
                            style={{ width: `${c.fillPercent}%` }}
                          />
                        </div>
                        <ul className="mt-2 space-y-0.5">
                          {c.groups.map((g, gi) => (
                            <li
                              key={gi}
                              className="flex justify-between text-xs text-black/60"
                            >
                              <span className="truncate">{g.label}</span>
                              <span className="shrink-0 pl-2 font-medium text-brand-navy-dark">
                                {t.containers.units(g.tires)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <p className="text-xs font-semibold text-brand-navy-dark">
                      {t.containers.fullContainers(stats.fullCount)} ·{" "}
                      {t.containers.totalTires(stats.totalTires)}
                    </p>
                    {stats.hasPartial && (
                      <p className="text-xs text-brand-red">
                        {t.containers.remaining}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Items */}
            <ul className="divide-y divide-black/10">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 px-5 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-brand-navy-dark">
                      {item.label}
                    </p>
                    {item.kind === "tire" && item.perHalf ? (
                      <p className="mt-0.5 text-xs text-black/50">
                        {item.qty} × {t.containers.half} ·{" "}
                        {t.containers.units(item.qty * item.perHalf)}
                      </p>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      className="mt-1 inline-flex items-center gap-1 text-xs text-black/40 transition-colors hover:text-brand-red"
                    >
                      <TrashIcon className="h-3.5 w-3.5" />
                      {t.cart.remove}
                    </button>
                  </div>

                  {/* Quantity stepper */}
                  <div className="flex items-stretch border border-black/15">
                    <button
                      type="button"
                      onClick={() => setQty(item.id, item.qty - 1)}
                      aria-label={t.cart.removeOne(item.label)}
                      className="flex h-9 w-9 items-center justify-center text-brand-navy-dark transition-colors hover:bg-brand-navy-dark hover:text-white"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="flex h-9 w-9 items-center justify-center border-x border-black/15 text-sm font-bold text-brand-navy-dark">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => add({ id: item.id, label: item.label })}
                      aria-label={t.cart.addOne(item.label)}
                      className="flex h-9 w-9 items-center justify-center text-brand-navy-dark transition-colors hover:bg-brand-navy-dark hover:text-white"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer / checkout */}
        {items.length > 0 && (
          <div className="border-t border-black/10 p-5">
            <p className="mb-3 text-xs leading-relaxed text-black/50">{t.cart.note}</p>
            <a
              href={buildCartWhatsAppLink(items)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep relative flex h-14 w-full items-center justify-center gap-2 bg-brand-yellow text-sm font-semibold text-brand-navy-dark"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>{t.cart.checkout}</span>
            </a>
            <button
              type="button"
              onClick={clear}
              className="mt-3 w-full text-center text-xs text-black/40 transition-colors hover:text-brand-red"
            >
              {t.cart.clear}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
