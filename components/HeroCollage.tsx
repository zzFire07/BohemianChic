import Image from "next/image";
import tiles from "@/data/dropSummer2026.json";
import Link from "next/link";

export function HeroCollage() {
  return (
    <section className="card overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="p-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            Nuevo drop
            <span className="rounded-full bg-white/15 px-2 py-0.5">2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            De Ibiza a Punta del Este
          </h1>

          <p className="text-slate-600">
            La esencia del Boho-Chic llego para quedarse, con diseños únicos, naturales y para todo el año.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link className="btn-primary" href="/catalog">Explorar catálogo</Link>
            <Link className="btn-secondary" href="#productos">Ver productos</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 p-2 bg-slate-50">
          {tiles.map((t) => (
            <div key={t.src} className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src={t.src} alt={t.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
