"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { useRouter } from "next/navigation";

export function AddToCart({ product }: { product: Product }) {
  const { addItem, hasItem} = useCart();
  const [size, setSize] = useState<string | null>(null);
  const router = useRouter();
  const alreadyAdded = size ? hasItem(product.id, size) : false;

  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm font-semibold">Elegí tu talla</div>

        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((s) => {
            const selected = s === size;

            return (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={selected}
                className={
                  selected
                    ? "inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white ring-2 ring-slate-900"
                    : "inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50"
                }
              >
                {selected ? "✓ " : ""}
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <button
        className={
          !size
            ? "btn-secondary w-full pointer-events-none opacity-60"
            : alreadyAdded
              ? "btn-secondary w-full"
              : "btn-primary w-full"
        }
        type="button"
        onClick={() => {
          if (!size) return;

          if (alreadyAdded) {
            router.push("/cart");
            return;
          }

          addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            size,
            image: product.images[0]
          });
        }}
      >
        {!size ? "Elegí una talla" : alreadyAdded ? "Ver carrito" : "Agregar al carrito"}
      </button>

    </div>
  );
}
