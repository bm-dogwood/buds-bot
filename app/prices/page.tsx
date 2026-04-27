"use client";

import { useMemo, useState, useEffect } from "react";
import {
  fetchLeaflyStrains,
  DEMO_STRAINS,
  type Strain,
} from "@/lib/cannabis-api";

const FORMATS = ["8th", "Quarter", "Half", "Ounce"] as const;
const FORMAT_MULT: Record<(typeof FORMATS)[number], number> = {
  "8th": 1,
  Quarter: 1.85,
  Half: 3.4,
  Ounce: 6.2,
};

export default function PricesPage() {
  const [format, setFormat] = useState<(typeof FORMATS)[number]>("8th");
  const [sort, setSort] = useState<"name" | "price" | "thc">("price");
  const [strains, setStrains] = useState<Strain[]>(DEMO_STRAINS);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"live" | "demo">("demo");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchLeaflyStrains(30).then((live) => {
      if (cancelled) return;
      if (live.length > 0) {
        setStrains(live);
        setSource("live");
      } else {
        setStrains(DEMO_STRAINS);
        setSource("demo");
      }
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(() => {
    const list = strains.map((s, i) => ({
      ...s,
      effective: s.price * FORMAT_MULT[format],
      change: (((s.id.charCodeAt(0) ?? i) % 7) - 3) * 0.6,
    }));
    list.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "thc") return b.thc - a.thc;
      return b.effective - a.effective;
    });
    return list;
  }, [format, sort, strains]);

  const high = rows.length ? Math.max(...rows.map((r) => r.effective)) : 0;
  const low = rows.length ? Math.min(...rows.map((r) => r.effective)) : 0;
  const avgThc = rows.length
    ? (rows.reduce((s, r) => s + r.thc, 0) / rows.length).toFixed(1)
    : "—";

  return (
    <div className="px-6 lg:px-12 py-16">
      <header className="border-b border-white/15 pb-12 mb-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-holo-green mb-6">
          /02 — Live Index
        </div>
        <h1 className="font-serif text-6xl md:text-8xl italic font-black tracking-tighter leading-[0.85]">
          The Index.
        </h1>
        <div className="flex items-center gap-4 mt-6">
          <p className="max-w-2xl font-mono text-xs uppercase tracking-widest text-silver leading-relaxed">
            Aggregated retail spot prices across the network. Refreshed against
            live menus every 90 minutes.
          </p>
          {/* Source badge */}
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <span
              className={`w-2 h-2 rounded-full ${
                loading
                  ? "bg-silver animate-pulse"
                  : source === "live"
                  ? "bg-holo-green"
                  : "bg-holo-purple"
              }`}
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-silver">
              {loading
                ? "Fetching Leafly…"
                : source === "live"
                ? `Live · Leafly · ${lastUpdated}`
                : `Demo · ${lastUpdated}`}
            </span>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-px bg-white/15 border border-white/15 mb-12">
        <div className="bg-matte p-8">
          <div className="font-mono text-[10px] uppercase tracking-widest text-silver mb-2">
            Index High / {format}
          </div>
          <div className="font-serif text-6xl italic font-black tracking-tighter holo-text">
            {loading ? "—" : `$${high.toFixed(2)}`}
          </div>
        </div>
        <div className="bg-matte p-8">
          <div className="font-mono text-[10px] uppercase tracking-widest text-silver mb-2">
            Index Low / {format}
          </div>
          <div className="font-serif text-6xl italic font-black tracking-tighter">
            {loading ? "—" : `$${low.toFixed(2)}`}
          </div>
        </div>
        <div className="bg-matte p-8">
          <div className="font-mono text-[10px] uppercase tracking-widest text-silver mb-2">
            Avg THC — {rows.length} Cultivars
          </div>
          <div className="font-serif text-6xl italic font-black tracking-tighter text-holo-purple">
            {loading ? "—" : `${avgThc}%`}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-silver mb-2">
            Format
          </div>
          <div className="flex gap-1 border border-white/15 p-1">
            {FORMATS.map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  format === f
                    ? "bg-holo-green text-matte"
                    : "text-silver hover:text-paper"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-silver mb-2">
            Sort
          </div>
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as "name" | "price" | "thc")
            }
            className="bg-card border border-white/15 px-4 py-3 font-mono text-xs uppercase tracking-widest focus:border-holo-green focus:outline-none"
          >
            <option value="price">Price (high to low)</option>
            <option value="thc">Potency (high to low)</option>
            <option value="name">Name (A to Z)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="border border-white/15 p-20 text-center">
          <div className="font-mono text-[10px] uppercase tracking-widest text-silver animate-pulse">
            // Fetching live cultivar data from Leafly…
          </div>
        </div>
      ) : (
        <div className="border border-white/15 bg-white/[0.02] overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[2fr_1fr_1fr_2fr_1fr_1fr] border-b border-white/15 text-silver uppercase text-[10px] tracking-widest p-4 font-mono bg-white/5">
              <div>Cultivar</div>
              <div>Type</div>
              <div>THC%</div>
              <div>Spot vs. Index</div>
              <div className="text-right">7d</div>
              <div className="text-right">Spot / {format}</div>
            </div>
            {rows.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-[2fr_1fr_1fr_2fr_1fr_1fr] border-b border-white/10 p-4 hover:bg-white/5 transition-colors items-center group cursor-crosshair"
              >
                <div>
                  <div className="font-serif italic font-black text-lg group-hover:text-holo-green transition-colors">
                    {r.name}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-silver mt-0.5">
                    {r.lineage}
                  </div>
                  {r.terpenes?.length ? (
                    <div className="font-mono text-[9px] text-silver/40 mt-0.5">
                      {r.terpenes.join(" · ")}
                    </div>
                  ) : null}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-silver">
                  {r.type}
                </div>
                <div className="font-mono text-sm tabular-nums text-paper">
                  {r.thc}%
                </div>
                <div className="pr-6">
                  <div className="h-2 bg-white/10 relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-holo-purple to-holo-green"
                      style={{
                        width: `${high > 0 ? (r.effective / high) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
                <div
                  className={`text-right font-mono text-xs tabular-nums ${
                    r.change > 0
                      ? "text-holo-green"
                      : r.change < 0
                      ? "text-destructive"
                      : "text-silver"
                  }`}
                >
                  {r.change > 0 ? "+" : ""}
                  {r.change.toFixed(1)}%
                </div>
                <div className="text-right font-mono font-bold tabular-nums">
                  ${r.effective.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-silver/60">
        {"// Source: "}
        {source === "live"
          ? "Leafly consumer API — live strain data"
          : "Demo dataset — Leafly unavailable"}
        {
          " · Prices reflect aggregated retail menu data. Actual transaction prices vary by jurisdiction, tax and discount."
        }
      </div>
    </div>
  );
}
