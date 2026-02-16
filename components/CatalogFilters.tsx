"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getFilterOptions } from "@/lib/products";
import Link from "next/link";

export function CatalogFilters() {
  const router = useRouter();

  const opts = useMemo(() => getFilterOptions(), []);

  const [q, setQ] = useState("");
  const [season, setSeason] = useState("");
  const [size, setSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function apply() {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (season) params.set("season", season);
    if (size) params.set("size", size);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    const qs = params.toString();
    router.push(qs ? `/catalog?${qs}` : "/catalog");
  }

  return (
    <div className="card p-5">
      <div className="grid gap-3 md:grid-cols-6">
        <div className="md:col-span-2">
          <label className="text-sm font-semibold">
            Buscar
            <input className="input mt-1" value={q} onChange={(e) => setQ(e.target.value)} placeholder="remera, jean, hoodie..." />
          </label>
        </div>

        <div>
          <label className="text-sm font-semibold">
            Temporada
            <select className="input mt-1" value={season} onChange={(e) => setSeason(e.target.value)}>
              <option value="">Todas</option>
              {opts.seasons.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="text-sm font-semibold">
            Talla
            <select className="input mt-1" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">Todas</option>
              {opts.sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="text-sm font-semibold">
            Precio mín
            <input className="input mt-1" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0" inputMode="numeric" />
          </label>
        </div>

        <div>
          <label className="text-sm font-semibold">
            Precio máx
            <input className="input mt-1" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="999" inputMode="numeric" />
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button className="btn-primary" onClick={apply} type="button">
          Aplicar filtros
        </button>
        <Link className="btn-secondary" href="/catalog">
          Limpiar
        </Link>
      </div>
    </div>
  );
}
