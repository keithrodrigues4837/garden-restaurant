"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { findMenuItem, type MenuItem } from "@/lib/menu-data";

type CartLine = { id: string; qty: number };
type CartLineWithItem = { item: MenuItem; qty: number };

type CartContextValue = {
  lines: CartLineWithItem[];
  itemCount: number;
  subtotal: number;
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "garden-restaurant-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setRaw(JSON.parse(stored));
    } catch {
      // ignore malformed/unavailable storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
  }, [raw, hydrated]);

  const add = (id: string) => {
    setRaw((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { id, qty: 1 }];
    });
  };

  const remove = (id: string) => {
    setRaw((prev) => prev.filter((l) => l.id !== id));
  };

  const setQty = (id: string, qty: number) => {
    if (qty <= 0) {
      remove(id);
      return;
    }
    setRaw((prev) => prev.map((l) => (l.id === id ? { ...l, qty } : l)));
  };

  const clear = () => setRaw([]);

  const lines = useMemo<CartLineWithItem[]>(
    () =>
      raw
        .map((l) => {
          const item = findMenuItem(l.id);
          return item ? { item, qty: l.qty } : null;
        })
        .filter((l): l is CartLineWithItem => l !== null),
    [raw]
  );

  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.item.price, 0);

  return (
    <CartContext.Provider value={{ lines, itemCount, subtotal, add, remove, setQty, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
