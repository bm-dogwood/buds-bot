"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DISPENSARIES } from "@/lib/cannabis-data";

export default function DispensariesPage() {
  const [zip, setZip] = useState("");
  const [type, setType] = useState<
    "All" | "Storefront" | "Delivery" | "Hybrid"
  >("All");

  const list = useMemo(() => {
    return DISPENSARIES.filter((d) =>
      type === "All" ? true : d.type === type
    ).filter((d) => zip.trim() === "" || d.zip.startsWith(zip.trim()));
  }, [zip, type]);

  return (
    <div className="px-6 lg:px-12 py-16">
      <header className="border-b border-white/15 pb-12 mb-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-holo-green mb-6">
          /01 — Network Locator
        </div>
        <h1 className="font-serif text-6xl md:text-8xl italic font-black tracking-tighter leading-[0.85]">
          The Network.
        </h1>
        <p className="mt-6 max-w-2xl font-mono text-xs uppercase tracking-widest text-silver leading-relaxed">
          8,932 licensed retail nodes verified against state registries. Search
          by ZIP, narrow by retail type.
        </p>
      </header>

      {/* Search panel */}
      <div className="border border-white/15 bg-card/40 p-6 mb-10 grid md:grid-cols-[1fr_auto_auto] gap-4 items-stretch">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-silver mb-2">
            ZIP Code
          </label>
          <input
            value={zip}
            onChange={(e) =>
              setZip(e.target.value.replace(/[^0-9]/g, "").slice(0, 5))
            }
            placeholder="// 90026"
            inputMode="numeric"
            className="w-full bg-matte border border-white/15 px-4 py-3 font-mono text-sm tracking-widest placeholder:text-silver/60 focus:border-holo-green focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-silver mb-2">
            Type
          </label>
          <div className="flex gap-1 border border-white/15 p-1 bg-matte h-[46px]">
            {(["All", "Storefront", "Delivery", "Hybrid"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  type === t
                    ? "bg-holo-green text-matte"
                    : "text-silver hover:text-paper"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end">
          <button
            onClick={() => {
              setZip("");
              setType("All");
            }}
            className="border border-white/30 px-5 py-3 font-mono text-xs uppercase tracking-widest hover:border-holo-green hover:text-holo-green transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="grid lg:grid-cols-2 gap-px bg-white/15 border border-white/15">
        {list.map((d) => (
          <article
            key={d.id}
            className="bg-matte p-6 group hover:bg-card transition-colors flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-silver">
                  {d.city}, {d.state} · {d.zip}
                </div>
                <h3 className="font-serif text-3xl italic font-black mt-1 group-hover:text-holo-green transition-colors">
                  {d.name}
                </h3>
              </div>
              <span className="bg-holo-purple/15 text-holo-purple border border-holo-purple/30 font-mono text-[10px] uppercase px-2 py-1">
                {d.type}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 font-mono text-[10px] uppercase tracking-widest text-silver">
              <div>
                <div className="text-silver/60">Rating</div>
                <div className="text-paper text-base font-serif italic">
                  {d.rating}
                </div>
              </div>
              <div>
                <div className="text-silver/60">Reviews</div>
                <div className="text-paper text-base font-serif italic">
                  {d.reviews.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-silver/60">Hours</div>
                <div className="text-paper text-xs">{d.hours}</div>
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button className="flex-1 border border-white/15 py-2 font-mono text-[10px] uppercase tracking-widest hover:border-holo-green hover:text-holo-green transition-colors">
                View Menu
              </button>
              <button className="flex-1 border border-white/15 py-2 font-mono text-[10px] uppercase tracking-widest hover:border-holo-green hover:text-holo-green transition-colors">
                Directions
              </button>
            </div>
          </article>
        ))}
      </div>

      {list.length === 0 && (
        <div className="border border-white/15 p-12 text-center font-mono text-xs uppercase tracking-widest text-silver">
          No nodes detected in sector. Adjust query parameters.
        </div>
      )}

      <div className="mt-16 grid md:grid-cols-3 gap-px bg-white/15 border border-white/15">
        {[
          { k: "8,932", l: "Active retail nodes" },
          { k: "38 / 50", l: "Legal jurisdictions" },
          { k: "24h", l: "Registry refresh" },
        ].map((s) => (
          <div key={s.l} className="bg-matte p-8">
            <div className="font-serif text-5xl italic font-black tracking-tighter holo-text">
              {s.k}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-silver mt-3">
              {s.l}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/legality"
          className="font-mono text-xs uppercase tracking-widest text-silver hover:text-holo-green"
        >
          [ Check jurisdiction status → ]
        </Link>
      </div>
    </div>
  );
}
