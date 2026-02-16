import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { ProductGallery } from "@/components/ProductGallery";
import { AddToCart } from "@/components/AddToCart";
import { formatMoney } from "@/lib/format";
import Link from "next/link";

type Props = {
  params: { slug: string };
};

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <ProductGallery images={product.images} name={product.name} />

      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge">{product.season}</span>
            <span className="badge">Stock: {product.stock}</span>
          </div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-slate-600">{product.description}</p>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Precio</div>
            <div className="text-2xl font-extrabold">{formatMoney(product.price)}</div>
          </div>

          <div className="mt-5">
            <AddToCart product={product} />
          </div>
        </div>

        <div className="flex gap-3">
          <Link className="btn-secondary" href="/catalog">Ver catálogo</Link>
          <Link className="btn-secondary" href="/cart">Ir al carrito</Link>
        </div>
      </div>
    </div>
  );
}
