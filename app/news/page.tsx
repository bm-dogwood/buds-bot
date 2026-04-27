"use client";

import { useMemo, useState, useEffect } from "react";
import {
  fetchCannabisNews,
  DEMO_NEWS,
  type NewsItem,
} from "@/lib/cannabis-api";

const CATS = ["All", "Regulation", "Market", "Science", "Culture"] as const;

export default function NewsPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [news, setNews] = useState<NewsItem[]>(DEMO_NEWS);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"live" | "demo">("demo");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchCannabisNews().then((items) => {
      if (cancelled) return;
      if (items.length > 0) {
        // Merge: live Regulation items + demo Market/Science/Culture items
        // (OpenStates only covers Regulation; keep demo for other categories)
        const liveReg = items.filter((i) => i.category === "Regulation");
        const demoOther = DEMO_NEWS.filter((i) => i.category !== "Regulation");
        const merged = [...liveReg, ...demoOther];
        setNews(merged.length > 0 ? merged : DEMO_NEWS);
        setSource(liveReg.length > 0 ? "live" : "demo");
      } else {
        setNews(DEMO_NEWS);
        setSource("demo");
      }
      setLastUpdated(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const list = useMemo(
    () => news.filter((n) => (cat === "All" ? true : n.category === cat)),
    [cat, news]
  );

  const lead = list[0];
  const rest = list.slice(1);

  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {};
    news.forEach((n) => {
      counts[n.category] = (counts[n.category] ?? 0) + 1;
    });
    return counts;
  }, [news]);

  return (
    <div className="px-6 lg:px-12 py-16">
      <header className="border-b border-white/15 pb-12 mb-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-holo-green mb-6">
          /05 — Dispatch
        </div>
        <h1 className="font-serif text-6xl md:text-8xl italic font-black tracking-tighter leading-[0.85]">
          Dispatch.
        </h1>
        <div className="flex items-start justify-between gap-4 mt-6">
          <p className="max-w-2xl font-mono text-xs uppercase tracking-widest text-silver leading-relaxed">
            Field reports from the regulatory front. Cannabis policy via
            OpenStates API, market intelligence and scientific updates.
          </p>
          <div className="flex items-center gap-2 shrink-0">
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
                ? "Fetching OpenStates…"
                : source === "live"
                ? `OpenStates API · ${lastUpdated}`
                : `Demo · ${lastUpdated}`}
            </span>
          </div>
        </div>
      </header>

      {/* Filter tabs with counts */}
      <div className="flex flex-wrap gap-1 border border-white/15 p-1 mb-10 w-fit">
        {CATS.map((c) => {
          const count = c === "All" ? news.length : categoryCount[c] ?? 0;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors flex items-center gap-2 ${
                cat === c
                  ? "bg-holo-green text-matte"
                  : "text-silver hover:text-paper"
              }`}
            >
              {c}
              <span
                className={`text-[9px] ${
                  cat === c ? "text-matte/70" : "text-silver/50"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="border border-white/15 p-20 text-center">
          <div className="font-mono text-[10px] uppercase tracking-widest text-silver animate-pulse">
            // Querying OpenStates bill database across 6 jurisdictions…
          </div>
        </div>
      ) : (
        <>
          {lead && (
            <article
              className="border border-white/15 bg-card/30 p-8 lg:p-12 mb-12 group transition-colors cursor-pointer hover:bg-card/50"
              onClick={() =>
                lead.url && lead.url !== "#" && window.open(lead.url, "_blank")
              }
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-silver mb-6">
                <span className="text-holo-green">/// Lead Story</span>
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
                  {lead.url && lead.url !== "#" && (
                    <div className="mt-4 text-holo-green text-[9px]">
                      View on OpenStates ↗
                    </div>
                  )}
                </div>
              </div>
            </article>
          )}

          <div className="grid md:grid-cols-2 gap-px bg-white/15 border border-white/15">
            {rest.map((n) => (
              <article
                key={n.id}
                className="bg-matte p-8 hover:bg-card transition-colors group cursor-pointer flex flex-col gap-4"
                onClick={() =>
                  n.url && n.url !== "#" && window.open(n.url, "_blank")
                }
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
                  {n.url && n.url !== "#" && (
                    <span className="ml-2 text-holo-green/60">↗</span>
                  )}
                </div>
              </article>
            ))}
          </div>

          {list.length === 0 && (
            <div className="border border-white/15 p-12 text-center font-mono text-xs uppercase tracking-widest text-silver">
              No dispatches in this category.
            </div>
          )}
        </>
      )}

      <div className="mt-12 font-mono text-[10px] uppercase tracking-widest text-silver/40 text-center">
        // Regulation data sourced from OpenStates API · openstates.org ·
        Updated nightly
      </div>
    </div>
  );
}
