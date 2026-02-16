import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="container-app py-8 text-sm text-slate-600 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>Bohemian Chic - De PdE al Mundo. 2026</div>
        <div className="flex gap-4">
          <Link className="underline" href="/catalog">Catálogo</Link>
          <Link className="underline" href="/cart">Carrito</Link>
        </div>
      </div>
    </footer>
  );
}
