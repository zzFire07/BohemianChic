import type { Product, Size } from "@/lib/types";
import products from "@/data/products.json";

const allProducts = products as Product[];

export function getAllProducts() {
  return allProducts;
}

export function getProductBySlug(slug: string) {
  return allProducts.find((p) => p.slug === slug);
}

export function getFilterOptions() {
  const seasons = Array.from(new Set(allProducts.map((p) => p.season))).sort();
  const sizes = Array.from(new Set(allProducts.flatMap((p) => p.sizes))).sort();
  return { seasons, sizes };
}

export function searchProducts(args: {
  q?: string;
  season?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const q = (args.q ?? "").trim().toLowerCase();
  const season = (args.season ?? "").trim();
  const size = (args.size ?? "").trim();
  const minPrice = args.minPrice;
  const maxPrice = args.maxPrice;

  return allProducts.filter((p) => {
    const matchesQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.season.toLowerCase().includes(q);

    const matchesSeason = !season || p.season === season;
    const matchesSize = !size || p.sizes.includes(size as Size);

    const matchesMin = typeof minPrice !== "number" || Number.isNaN(minPrice) ? true : p.price >= minPrice;
    const matchesMax = typeof maxPrice !== "number" || Number.isNaN(maxPrice) ? true : p.price <= maxPrice;

    return matchesQ && matchesSeason && matchesSize && matchesMin && matchesMax;
  });
}
