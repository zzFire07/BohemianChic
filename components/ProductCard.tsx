"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { useCart } from "@/lib/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, hasItem} = useCart();
  const [size, setSize] = useState<string | null>(null);
  const router = useRouter();
  const alreadyAdded = size ? hasItem(product.id, size) : false;



  const cover = useMemo(() => product.images[0], [product.images]);

  return (
    <div className="card overflow-hidden">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] bg-slate-50">
          <Image src={cover} alt={product.name} fill className="object-cover" />
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/product/${product.slug}`} className="font-bold hover:underline line-clamp-1">
              {product.name}
            </Link>
            <div className="text-sm text-slate-600 line-clamp-1">{product.season}</div>
          </div>
          <div className="text-sm font-extrabold">{formatMoney(product.price)}</div>
        </div>

        <div className="flex flex-wrap gap-2">
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

            addItem({ id: product.id, name: product.name, price: product.price, size, image: cover });
          }}
        >
          {!size ? "Elegí una talla" : alreadyAdded ? "Ver carrito" : "Agregar al carrito"}
        </button>

      </div>
    </div>
  );
}
