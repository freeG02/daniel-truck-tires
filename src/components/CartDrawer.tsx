"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { buildCartWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  CloseIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  CartIcon,
} from "@/components/CartIcons";

export function CartDrawer() {
  const { items, count, isOpen, close, add, setQty, remove, clear } = useCart();

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
        aria-label="Tu carrito"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-brand-navy-dark px-5 py-4 text-brand-cream">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold uppercase tracking-wide">
            <CartIcon className="h-5 w-5" />
            Tu carrito
            {count > 0 && (
              <span className="ml-1 bg-brand-yellow px-2 text-sm font-bold text-brand-navy-dark">
                {count}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar carrito"
            className="text-brand-cream/70 transition-colors hover:text-brand-cream"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <CartIcon className="h-10 w-10 text-black/20" />
            <p className="font-display text-lg font-bold uppercase tracking-tight text-brand-navy-dark">
              Tu carrito está vacío
            </p>
            <p className="text-sm text-black/50">
              Agrega gomas, aros o camiones y pídelos todos juntos por WhatsApp.
            </p>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-black/10 overflow-y-auto">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-brand-navy-dark">
                    {item.label}
                  </p>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="mt-1 inline-flex items-center gap-1 text-xs text-black/40 transition-colors hover:text-brand-red"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                    Quitar
                  </button>
                </div>

                {/* Quantity stepper */}
                <div className="flex items-stretch border border-black/15">
                  <button
                    type="button"
                    onClick={() => setQty(item.id, item.qty - 1)}
                    aria-label={`Quitar una unidad de ${item.label}`}
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
                    aria-label={`Agregar una unidad de ${item.label}`}
                    className="flex h-9 w-9 items-center justify-center text-brand-navy-dark transition-colors hover:bg-brand-navy-dark hover:text-white"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Footer / checkout */}
        {items.length > 0 && (
          <div className="border-t border-black/10 p-5">
            <p className="mb-3 text-xs leading-relaxed text-black/50">
              No se cobra en línea. Confirmamos disponibilidad y precio de
              importador por WhatsApp.
            </p>
            <a
              href={buildCartWhatsAppLink(items)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep relative flex h-14 w-full items-center justify-center gap-2 bg-brand-yellow text-sm font-semibold text-brand-navy-dark"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>Comprar ahora</span>
            </a>
            <button
              type="button"
              onClick={clear}
              className="mt-3 w-full text-center text-xs text-black/40 transition-colors hover:text-brand-red"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
