import { getAllProducts } from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";
import { HeroCollage } from "@/components/HeroCollage";
import Link from "next/link";

export default function HomePage() {
  const products = getAllProducts();

  return (
    <div className="space-y-10">
      <HeroCollage />

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Todos los productos</h2>
            <p className="text-sm text-slate-600">Vista completa de la tienda sin filtrar</p>
          </div>
          <Link className="btn-secondary" href="/catalog">
            Ir al catálogo
          </Link>
        </div>

        <ProductGrid products={products} />
      </section>
    </div>
  );
}
