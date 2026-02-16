import { CatalogFilters } from "@/components/CatalogFilters";
import { ProductGrid } from "@/components/ProductGrid";
import { searchProducts } from "@/lib/products";
import Link from "next/link";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function getOne(sp: Record<string, string | string[] | undefined> | undefined, key: string) {
  const v = sp?.[key];
  return Array.isArray(v) ? v[0] : v;
}

export default function CatalogPage({ searchParams }: PageProps) {
  const q = (getOne(searchParams, "q") ?? "").toString();
  const season = (getOne(searchParams, "season") ?? "").toString();
  const size = (getOne(searchParams, "size") ?? "").toString();
  const minPrice = Number(getOne(searchParams, "minPrice") ?? "0");
  const maxPrice = Number(getOne(searchParams, "maxPrice") ?? "999999");

  const results = searchProducts({
    q: q || "",
    season: season || "",
    size: size || "",
    minPrice: Number.isFinite(minPrice) ? minPrice : 0,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : 999999,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Catálogo</h1>
          <p className="text-sm text-slate-600">
            Filtrá por sección, talla, precio o buscá por nombre y descripción
          </p>
        </div>

        <Link className="btn-secondary" href="/">
          Volver al inicio
        </Link>
      </div>

      <CatalogFilters />

      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-600">
          Resultados: <span className="font-semibold text-slate-900">{results.length}</span>
        </span>

        {(q || season || size || Number.isFinite(minPrice) || Number.isFinite(maxPrice)) ? (
          <Link className="text-sm font-semibold text-slate-900 underline" href="/catalog">
            Limpiar filtros
          </Link>
        ) : null}
      </div>

      <ProductGrid products={results} />
    </div>
  );
}
