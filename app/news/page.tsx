// app/news/page.tsx
"use client";

import { useMemo, useState } from "react";
import type { Metadata } from "next";
import { NEWS } from "@/lib/cannabis-data";

const CATS = ["All", "Regulation", "Market", "Science", "Culture"] as const;

export default function NewsPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");

  const list = useMemo(
    () => NEWS.filter((n) => (cat === "All" ? true : n.category === cat)),
    [cat]
  );

  const lead = list[0];
  const rest = list.slice(1);

  return (
    <div className="px-6 lg:px-12 py-16">
      <header className="border-b border-white/15 pb-12 mb-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-holo-green mb-6">
          /05 — Dispatch
        </div>
        <h1 className="font-serif text-6xl md:text-8xl italic font-black tracking-tighter leading-[0.85]">
          Dispatch.
        </h1>
        <p className="mt-6 max-w-2xl font-mono text-xs uppercase tracking-widest text-silver leading-relaxed">
          Field reports from the regulatory front. Cannabis policy, market
          intelligence and scientific updates.
        </p>
      </header>

      <div className="flex flex-wrap gap-1 border border-white/15 p-1 mb-10 w-fit">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
              cat === c
                ? "bg-holo-green text-matte"
                : "text-silver hover:text-paper"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {lead && (
        <article className="border border-white/15 bg-card/30 p-8 lg:p-12 mb-12 group hover:bg-card/50 transition-colors cursor-pointer">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-silver mb-6">
            <span className="text-holo-green">/// LEAD STORY</span>
            <span>{lead.date}</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-9">
              <div className="font-mono text-[10px] uppercase tracking-widest text-holo-purple mb-3">
                {lead.category}
              </div>
              <h2 className="font-serif text-4xl md:text-6xl italic font-black tracking-tighter leading-[0.95] group-hover:text-holo-green transition-colors">
                {lead.headline}
              </h2>
              <p className="mt-6 font-mono text-xs uppercase tracking-widest text-silver leading-relaxed max-w-2xl">
                {lead.excerpt}
              </p>
            </div>
            <div className="lg:col-span-3 font-mono text-[10px] uppercase tracking-widest text-silver border-l border-white/15 pl-4">
              <div className="text-silver/60 mb-1">Source</div>
              <div className="text-paper">{lead.source}</div>
            </div>
          </div>
        </article>
      )}

      <div className="grid md:grid-cols-2 gap-px bg-white/15 border border-white/15">
        {rest.map((n) => (
          <article
            key={n.id}
            className="bg-matte p-8 hover:bg-card transition-colors group cursor-pointer flex flex-col gap-4"
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-silver">
              <span className="text-holo-green">{n.category}</span>
              <span>{n.date}</span>
            </div>
            <h3 className="font-serif text-3xl italic font-black leading-tight group-hover:text-holo-green transition-colors">
              {n.headline}
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-wide text-silver leading-relaxed">
              {n.excerpt}
            </p>
            <div className="mt-auto font-mono text-[10px] uppercase tracking-widest text-silver/60">
              — {n.source}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
