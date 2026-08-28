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
  /** Human label used in the cart and the WhatsApp message. */
  label: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  isOpen: boolean;
  add: (item: { id: string; label: string }) => void;
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
        if (Array.isArray(parsed)) restored = parsed;
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

  const add = useCallback((item: { id: string; label: string }) => {
    // Note: adding does NOT open the drawer, so the user can keep adding items
    // without interruption. The header cart badge reflects the new count.
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { id: item.id, label: item.label, qty: 1 }];
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
