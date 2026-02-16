"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import Link from "next/link";

export function Header() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const { items } = useCart();

  const count = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    router.push(`/catalog?${params.toString()}`);
  }

  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="container-app py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-extrabold tracking-tight">
            Bohemian<span className="text-slate-400">Chic</span>
          </Link>

          <Link href="/cart" className="sm:hidden text-sm font-semibold">
            Carrito ({count})
          </Link>
        </div>

        <form onSubmit={submit} className="flex gap-2 w-full sm:max-w-xl">
          <input
            className="input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar: remera, jean, camperas..."
          />
          <button className="btn-primary" type="submit">
            Buscar
          </button>
        </form>

        <nav className="hidden sm:flex items-center gap-3">
          <Link className="text-sm font-semibold text-slate-700 hover:text-slate-900" href="/catalog">
            Catálogo
          </Link>
          <Link className="text-sm font-semibold text-slate-700 hover:text-slate-900" href="/cart">
            Carrito ({count})
          </Link>
        </nav>
      </div>
    </header>
  );
}
