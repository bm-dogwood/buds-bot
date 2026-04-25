"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { STRAINS } from "@/lib/cannabis-data";

const TYPES = ["All", "Sativa", "Indica", "Hybrid"] as const;

export default function StrainsPage() {
  const [filter, setFilter] = useState<(typeof TYPES)[number]>("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    return STRAINS.filter((s) =>
      filter === "All" ? true : s.type === filter
    ).filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));
  }, [filter, q]);

  return (
    <div className="px-6 lg:px-12 py-16">
      <header className="border-b border-white/15 pb-12 mb-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-holo-green mb-6">
          /04 — Cultivar Archive
        </div>
        <h1 className="font-serif text-6xl md:text-8xl italic font-black tracking-tighter leading-[0.85]">
          The Archive.
        </h1>
        <p className="mt-6 max-w-2xl font-mono text-xs uppercase tracking-widest text-silver leading-relaxed">
          Six featured cultivars from a database of 14,204. Each entry verified
          against lab assays and breeder records.
        </p>
      </header>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center justify-between">
        <div className="flex gap-1 border border-white/15 p-1">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                filter === t
                  ? "bg-holo-green text-matte"
                  : "text-silver hover:text-paper"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="// QUERY_NAME"
          className="bg-card border border-white/15 px-4 py-3 font-mono text-xs uppercase tracking-widest placeholder:text-silver/60 focus:border-holo-green focus:outline-none w-full md:w-72"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/15 border border-white/15">
        {list.map((s) => (
          <article
            key={s.id}
            className="bg-matte p-6 group hover:bg-card transition-colors flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="bg-holo-purple text-matte font-mono text-[9px] uppercase px-2 py-1 font-bold">
                {s.tag}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-silver">
                {s.type}
              </span>
            </div>
            <div className="aspect-square bg-card mb-6 border border-white/10 overflow-hidden">
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                width={800}
                height={800}
                className="specimen-img w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-3xl italic font-black mb-4 group-hover:text-holo-green transition-colors">
              {s.name}
            </h3>

            {/* THC bar */}
            <div className="mb-4">
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest mb-1">
                <span className="text-silver">THC</span>
                <span className="text-holo-green">{s.thc}%</span>
              </div>
              <div className="h-1 bg-white/10">
                <div
                  className="h-full bg-holo-green"
                  style={{
                    width: `${Math.min(100, (s.thc / 35) * 100)}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-2 font-mono text-[11px] uppercase tracking-wide mb-4">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-silver">Lineage</span>
                <span className="text-paper text-right truncate ml-2">
                  {s.lineage}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-silver">Terpene</span>
                <span className="text-holo-purple">{s.terpene}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-silver">Spot / 8th</span>
                <span className="text-paper">${s.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-silver">Rating</span>
                <span className="text-paper">{s.rating} / 5.0</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-auto">
              {s.effects.map((e) => (
                <span
                  key={e}
                  className="font-mono text-[9px] uppercase tracking-widest border border-white/15 px-2 py-1 text-silver"
                >
                  {e}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {list.length === 0 && (
        <div className="border border-white/15 p-12 text-center font-mono text-xs uppercase tracking-widest text-silver mt-px">
          No specimens match query.{" "}
          <button
            onClick={() => {
              setQ("");
              setFilter("All");
            }}
            className="text-holo-green underline"
          >
            Reset filters
          </button>
        </div>
      )}

      <div className="mt-16 border border-white/15 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-silver max-w-md">
          Looking for something specific? Cross-reference dispensary inventory
          and live pricing.
        </p>
        <Link
          href="/dispensaries"
          className="border border-holo-green text-holo-green px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-holo-green hover:text-matte transition-colors"
        >
          Find a node →
        </Link>
      </div>
    </div>
  );
}
