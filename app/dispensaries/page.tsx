"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useCallback } from "react";
import {
  fetchWeedmapsDispensaries,
  fetchLeaflyDispensaries,
  DEMO_DISPENSARIES,
  type Dispensary,
} from "@/lib/cannabis-api";

const TYPES = ["All", "Storefront", "Delivery", "Hybrid"] as const;

// Major US cities for quick location switching
const QUICK_CITIES = [
  { label: "Los Angeles", city: "los angeles", state: "california" },
  { label: "Denver", city: "denver", state: "colorado" },
  { label: "Seattle", city: "seattle", state: "washington" },
  { label: "Chicago", city: "chicago", state: "illinois" },
  { label: "New York", city: "new york", state: "new york" },
  { label: "Las Vegas", city: "las vegas", state: "nevada" },
] as const;

export default function DispensariesPage() {
  const [zip, setZip] = useState("");
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [dispensaries, setDispensaries] =
    useState<Dispensary[]>(DEMO_DISPENSARIES);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"weedmaps" | "leafly" | "demo">("demo");
  const [activeCity, setActiveCity] = useState<(typeof QUICK_CITIES)[number]>(
    QUICK_CITIES[0]
  );
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchDispensaries = useCallback(async (city: string, state: string) => {
    setLoading(true);
    try {
      // Try Weedmaps first
      const wmData = await fetchWeedmapsDispensaries(city, state, 24);
      if (wmData.length > 0) {
        setDispensaries(wmData);
        setSource("weedmaps");
        setLastUpdated(new Date().toLocaleTimeString());
        setLoading(false);
        return;
      }
      // Fall back to Leafly scrape
      const leaflyData = await fetchLeaflyDispensaries(state, 20);
      if (leaflyData.length > 0) {
        setDispensaries(leaflyData);
        setSource("leafly");
        setLastUpdated(new Date().toLocaleTimeString());
        setLoading(false);
        return;
      }
      // Last resort: demo
      setDispensaries(DEMO_DISPENSARIES);
      setSource("demo");
    } catch {
      setDispensaries(DEMO_DISPENSARIES);
      setSource("demo");
    } finally {
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDispensaries(activeCity.city, activeCity.state);
  }, [activeCity, fetchDispensaries]);

  const list = useMemo(() => {
    return dispensaries
      .filter((d) => (type === "All" ? true : d.type === type))
      .filter((d) => zip.trim() === "" || d.zip.startsWith(zip.trim()));
  }, [zip, type, dispensaries]);

  const sourceLabel = {
    weedmaps: "Weedmaps API",
    leafly: "Leafly scrape",
    demo: "Demo data",
  }[source];

  return (
    <div className="px-6 lg:px-12 py-16">
      <header className="border-b border-white/15 pb-12 mb-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-holo-green mb-6">
          /01 — Network Locator
        </div>
        <h1 className="font-serif text-6xl md:text-8xl italic font-black tracking-tighter leading-[0.85]">
          The Network.
        </h1>
        <div className="flex items-start justify-between gap-6 mt-6">
          <p className="max-w-2xl font-mono text-xs uppercase tracking-widest text-silver leading-relaxed">
            Licensed retail nodes verified against state registries. Search by
            ZIP, narrow by retail type.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`w-2 h-2 rounded-full ${
                loading
                  ? "bg-silver animate-pulse"
                  : source === "demo"
                  ? "bg-holo-purple"
                  : "bg-holo-green"
              }`}
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-silver">
              {loading ? "Fetching…" : `${sourceLabel} · ${lastUpdated}`}
            </span>
          </div>
        </div>
      </header>

      {/* City quick-select */}
      <div className="mb-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-silver mb-2">
          Market
        </div>
        <div className="flex flex-wrap gap-1 border border-white/15 p-1 w-fit">
          {QUICK_CITIES.map((c) => (
            <button
              key={c.label}
              onClick={() => {
                setActiveCity(c);
                setZip("");
              }}
              className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                activeCity.label === c.label
                  ? "bg-holo-green text-matte"
                  : "text-silver hover:text-paper"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

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
            placeholder="// Filter by ZIP"
            inputMode="numeric"
            className="w-full bg-matte border border-white/15 px-4 py-3 font-mono text-sm tracking-widest placeholder:text-silver/60 focus:border-holo-green focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-silver mb-2">
            Type
          </label>
          <div className="flex gap-1 border border-white/15 p-1 bg-matte h-[46px]">
            {TYPES.map((t) => (
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
      {loading ? (
        <div className="border border-white/15 p-20 text-center">
          <div className="font-mono text-[10px] uppercase tracking-widest text-silver animate-pulse">
            // Querying {activeCity.city} dispensary network…
          </div>
        </div>
      ) : (
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
                  {d.address && (
                    <div className="font-mono text-[9px] uppercase tracking-widest text-silver/50 mt-0.5">
                      {d.address}
                    </div>
                  )}
                </div>
                <span className="bg-holo-purple/15 text-holo-purple border border-holo-purple/30 font-mono text-[10px] uppercase px-2 py-1 shrink-0">
                  {d.type}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 font-mono text-[10px] uppercase tracking-widest text-silver">
                <div>
                  <div className="text-silver/60">Rating</div>
                  <div className="text-paper text-base font-serif italic">
                    {d.rating.toFixed(1)} ★
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
                {d.url ? (
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-white/15 py-2 font-mono text-[10px] uppercase tracking-widest hover:border-holo-green hover:text-holo-green transition-colors text-center"
                  >
                    View Menu ↗
                  </a>
                ) : (
                  <button className="flex-1 border border-white/15 py-2 font-mono text-[10px] uppercase tracking-widest hover:border-holo-green hover:text-holo-green transition-colors">
                    View Menu
                  </button>
                )}
                <button
                  onClick={() => {
                    const q = encodeURIComponent(
                      `${d.name} ${d.city} ${d.state}`
                    );
                    window.open(`https://maps.google.com/?q=${q}`, "_blank");
                  }}
                  className="flex-1 border border-white/15 py-2 font-mono text-[10px] uppercase tracking-widest hover:border-holo-green hover:text-holo-green transition-colors"
                >
                  Directions ↗
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && list.length === 0 && (
        <div className="border border-white/15 p-12 text-center font-mono text-xs uppercase tracking-widest text-silver">
          No nodes detected in sector. Adjust query parameters.
        </div>
      )}

      <div className="mt-16 grid md:grid-cols-3 gap-px bg-white/15 border border-white/15">
        {[
          { k: list.length.toString(), l: "Active nodes in view" },
          { k: "38 / 50", l: "Legal jurisdictions" },
          { k: sourceLabel, l: "Data source" },
        ].map((s) => (
          <div key={s.l} className="bg-matte p-8">
            <div className="font-serif text-4xl italic font-black tracking-tighter holo-text">
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
