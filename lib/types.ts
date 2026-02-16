export type Size = "XS" | "S" | "M" | "L" | "XL";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  season: string;
  price: number;
  sizes: Size[];
  stock: number;
  images: string[];
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  qty: number;
  image: string;
};
