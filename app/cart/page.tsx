"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/format";
import { buildWhatsappCartMessage } from "@/lib/whatsapp";
import Image from "next/image";
import Link from "next/dist/client/link";

export default function CartPage() {
  const { items, updateQty, removeItem, clear } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const total = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);

  const canCheckout = items.length > 0 && firstName.trim() && lastName.trim() && phone.trim();

  const waLink = useMemo(() => {
    const msg = buildWhatsappCartMessage({
      customer: { firstName, lastName, phone },
      items,
      total
    });
    return `https://wa.me/59893341520?text=${encodeURIComponent(msg)}`;
  }, [firstName, lastName, phone, items, total]);

  return (
    <div className="grid gap-8 lg:grid-cols-5  min-w-0">
      <div className="lg:col-span-3 space-y-4  min-w-0">
        <div>
          <h1 className="text-2xl font-bold">Carrito</h1>
          <p className="text-sm text-slate-600">Revisá tus productos y completá tus datos</p>
        </div>

        {items.length === 0 ? (
          <div className="card p-6">
            <p className="text-slate-700">Tu carrito está vacío.</p>
            <div className="mt-4">
              <Link className="btn-primary" href="/catalog">Ir al catálogo</Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((it) => (
              <div key={`${it.id}:${it.size}`} className="card p-4">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200">
                    <Image src={it.image} alt={it.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="font-bold break-words">{it.name}</div>
                        <div className="text-sm text-slate-600">Talla: {it.size}</div>
                        <div className="text-sm text-slate-600">{formatMoney(it.price)} c/u</div>
                      </div>

                      <button
                        className="text-sm font-semibold text-slate-700 underline"
                        onClick={() => removeItem(it.id, it.size)}
                      >
                        Quitar
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button className="btn-secondary" onClick={() => updateQty(it.id, it.size, Math.max(1, it.qty - 1))}>
                          Menos
                        </button>
                        <span className="min-w-10 text-center text-sm font-semibold">{it.qty}</span>
                        <button className="btn-secondary" onClick={() => updateQty(it.id, it.size, it.qty + 1)}>
                          Más
                        </button>
                      </div>

                      <div className="text-sm font-semibold">{formatMoney(it.price * it.qty)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-2 space-y-4 min-w-0">
        <div className="card p-6 space-y-4 min-w-0">
          <div className="text-lg font-extrabold">Datos del cliente</div>

          <div className="grid gap-3  min-w-0">
            <label className="text-sm font-semibold">
              Nombre
              <input className="input mt-1 min-w-0" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Juan" />
            </label>

            <label className="text-sm font-semibold">
              Apellido
              <input className="input mt-1 min-w-0" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Pérez" />
            </label>

            <label className="text-sm font-semibold">
              Teléfono
              <input className="input mt-1 min-w-0" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+598 99 123 456" />
            </label>
          </div>
        </div>

        <div className="card p-6 space-y-4 min-w-0">
          <div className="flex items-center justify-between min-w-0">
            <div className="text-sm text-slate-600">Total</div>
            <div className="text-2xl font-extrabold whitespace-nowrap">{formatMoney(total)}</div>
          </div>

          <Link
            className={canCheckout ? "btn-primary w-full" : "btn-secondary w-full pointer-events-none opacity-60"}
            href={canCheckout ? waLink : ""}
            target="_blank"
            rel="noreferrer"
          >
            Enviar pedido por WhatsApp
          </Link>

          <button
            className={items.length ? "btn-secondary w-full" : "btn-secondary w-full pointer-events-none opacity-60"}
            onClick={clear}
          >
            Vaciar carrito
          </button>

          <p className="text-xs text-slate-500">
            Esto genera un mensaje con el resumen del carrito para que lo envíes por WhatsApp.
          </p>
        </div>

        <div className="flex gap-3">
          <Link className="btn-secondary w-full" href="/catalog">Seguir comprando</Link>
        </div>
      </div>
    </div>
  );
}
