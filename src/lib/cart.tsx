"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  /** Unique id, the product's page path (e.g. "/gomas/12r22-5"). */
  id: string;
  /** Human label used in the cart and the WhatsApp message (Spanish). */
  label: string;
  /**
   * For tires: number of HALF-CONTAINER units (the MOQ is 1/2 container, so the
   * smallest add is 1). For everything else: unit count.
   */
  qty: number;
  /** "tire" items follow the container-fill / MOQ rules; others are simple. */
  kind: "tire" | "other";
  /** Tires only: how many tires make up half a container (the MOQ). */
  perHalf?: number;
  /** Tires only: the size code, e.g. "12R22.5". */
  size?: string;
};

export type AddInput = {
  id: string;
  label: string;
  kind?: "tire" | "other";
  perHalf?: number;
  size?: string;
  /** How many units/half-containers to add at once (default 1). */
  qty?: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  isOpen: boolean;
  add: (item: AddInput) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "dtt-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load a previously saved cart once, on mount (no account needed). This runs
  // in an effect on purpose: reading localStorage during render would diverge
  // from the server-rendered (empty) markup and break hydration.
  useEffect(() => {
    let restored: CartItem[] | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Back-compat: older carts had no `kind`; treat them as "other".
          restored = parsed.map((i) => ({ kind: "other", ...i }));
        }
      }
    } catch {
      // Ignore unavailable / malformed storage.
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage
    if (restored) setItems(restored);
    setHydrated(true);
  }, []);

  // Persist on every change, once hydrated.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage write failures (private mode, quota, etc.).
    }
  }, [items, hydrated]);

  const add = useCallback((item: AddInput) => {
    // Note: adding does NOT open the drawer, so the user can keep adding items
    // without interruption. The header cart badge reflects the new count. For
    // tires, one unit = half a container (the MOQ).
    const amount = item.qty && item.qty > 0 ? item.qty : 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + amount } : i,
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          label: item.label,
          qty: amount,
          kind: item.kind ?? "other",
          perHalf: item.perHalf,
          size: item.size,
        },
      ];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const count = items.reduce((n, i) => n + i.qty, 0);

  const value = useMemo(
    () => ({ items, count, isOpen, add, remove, setQty, clear, open, close }),
    [items, count, isOpen, add, remove, setQty, clear, open, close],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
