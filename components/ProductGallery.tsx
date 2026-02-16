"use client";

import Image from "next/image";
import { useState } from "react";


export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="card overflow-hidden">
        <div className="relative aspect-[4/5] bg-slate-50">
          <Image src={images[active]} alt={name} fill className="object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 8).map((src, idx) => (
          <button
            key={src}
            className={idx === active ? "card overflow-hidden ring-2 ring-slate-900" : "card overflow-hidden"}
            onClick={() => setActive(idx)}
            type="button"
          >
            <div className="relative aspect-square bg-slate-50">
              <Image src={src} alt={`${name} ${idx + 1}`} fill className="object-cover" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
