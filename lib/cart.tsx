"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/lib/types";

type AddItemInput = { id: string; name: string; price: number; size: string; image: string };



type CartContextValue = {
  items: CartItem[];
  addItem: (input: AddItemInput) => void;
  hasItem: (id: string, size: string) => boolean;
  updateQty: (id: string, size: string, qty: number) => void;
  removeItem: (id: string, size: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "next-clothing-store:cart:v1";

function safeRead(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

function safeWrite(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(safeRead());
  }, []);

  function setAndPersist(updater: (prev: CartItem[]) => CartItem[]) {
    setItems((prev) => {
      const next = updater(prev);
      safeWrite(next);
      return next;
    });
  }

  const value = useMemo<CartContextValue>(() => {
    function addItem(input: AddItemInput) {
      setAndPersist((prev) => {
        const existing = prev.find((it) => it.id === input.id && it.size === input.size);
        if (existing) {
          return prev.map((it) =>
            it.id === input.id && it.size === input.size ? { ...it, qty: it.qty + 1 } : it
          );
        }
        return [...prev, { ...input, qty: 1 }];
      });
    }

    function updateQty(id: string, size: string, qty: number) {
      setAndPersist((prev) =>
        prev.map((it) => (it.id === id && it.size === size ? { ...it, qty } : it))
      );
    }

    function removeItem(id: string, size: string) {
      setAndPersist((prev) => prev.filter((it) => !(it.id === id && it.size === size)));
    }

    function clear() {
      setAndPersist(() => []);
    }

    function hasItem(id: string, size: string) {
      return items.some((it) => it.id === id && it.size === size);
    }

    return { items, addItem, updateQty, removeItem, clear, hasItem };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
