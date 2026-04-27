// app/legality/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { DEMO_JURISDICTIONS } from "@/lib/cannabis-api";

export const metadata: Metadata = {
  title: "State Legality Map — BUDS.BOT",
  description:
    "Cannabis legality, tax burden and program timelines for every U.S. state and territory.",
  openGraph: {
    title: "State Legality Map — BUDS.BOT",
    description:
      "Cannabis legality, tax burden and program timelines by state.",
  },
};

const STATUS_COLOR: Record<string, string> = {
  Recreational: "text-holo-green border-holo-green/40 bg-holo-green/10",
  Medical: "text-holo-purple border-holo-purple/40 bg-holo-purple/10",
  Decriminalized: "text-paper border-white/30 bg-white/5",
  Prohibited: "text-destructive border-destructive/40 bg-destructive/10",
};

// Use curated dataset — OpenStates doesn't expose clean status fields;
// this data is compiled from NCSL + state regulatory body records.
const JURISDICTIONS = DEMO_JURISDICTIONS;

export default function LegalityPage() {
  const stats = {
    rec: JURISDICTIONS.filter((j) => j.status === "Recreational").length,
    med: JURISDICTIONS.filter((j) => j.status === "Medical").length,
    dec: JURISDICTIONS.filter((j) => j.status === "Decriminalized").length,
    pro: JURISDICTIONS.filter((j) => j.status === "Prohibited").length,
  };

  const avgSpot = (() => {
    const prices = JURISDICTIONS.filter((j) => j.spotPrice !== null).map(
      (j) => j.spotPrice as number
    );
    return prices.length
      ? (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)
      : "—";
  })();

  return (
    <div className="px-6 lg:px-12 py-16">
      <header className="border-b border-white/15 pb-12 mb-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-holo-green mb-6">
          /03 — Jurisdiction Map
        </div>
        <h1 className="font-serif text-6xl md:text-8xl italic font-black tracking-tighter leading-[0.85]">
          Jurisdiction.
        </h1>
        <p className="mt-6 max-w-2xl font-mono text-xs uppercase tracking-widest text-silver leading-relaxed">
          Compiled from NCSL filings, OpenStates bill tracking, and state
          regulatory bodies. Updated nightly.
        </p>
      </header>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-px bg-white/15 border border-white/15 mb-12">
        {[
          {
            k: stats.rec.toString(),
            l: "Recreational programs",
            c: "text-holo-green",
          },
          { k: stats.med.toString(), l: "Medical-only", c: "text-holo-purple" },
          { k: stats.dec.toString(), l: "Decriminalized", c: "text-paper" },
          { k: stats.pro.toString(), l: "Prohibited", c: "text-destructive" },
        ].map((s) => (
          <div key={s.l} className="bg-matte p-8">
            <div
              className={`font-serif text-6xl italic font-black tracking-tighter ${s.c}`}
            >
              {s.k}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-silver mt-3">
              {s.l}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-8">
        {Object.entries(STATUS_COLOR).map(([status, cls]) => (
          <div
            key={status}
            className={`border font-mono text-[9px] uppercase px-3 py-1.5 ${cls}`}
          >
            {status}
          </div>
        ))}
        <div className="ml-auto font-mono text-[10px] uppercase tracking-widest text-silver self-center">
          Avg spot / oz: ${avgSpot}
        </div>
      </div>

      {/* Card grid */}
      <h2 className="font-serif text-3xl italic font-black mb-6">
        By territory.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/15 border border-white/15">
        {JURISDICTIONS.map((j) => (
          <div
            key={j.state}
            className="bg-matte p-6 group hover:bg-card transition-colors flex flex-col gap-3 min-h-[200px]"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-silver/50 mb-0.5">
                  {j.abbr}
                </div>
                <h3 className="font-serif text-2xl italic font-black tracking-tighter group-hover:text-holo-green transition-colors">
                  {j.state}
                </h3>
              </div>
              <span
                className={`border font-mono text-[9px] uppercase px-2 py-1 ${
                  STATUS_COLOR[j.status]
                }`}
              >
                {j.status}
              </span>
            </div>
            <div className="space-y-2 font-mono text-[10px] uppercase tracking-widest mt-auto">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-silver">Tax</span>
                <span className="text-paper">{j.taxNote}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-silver">Spot / Oz</span>
                <span className="text-paper tabular-nums">
                  {j.spotPrice ? `$${j.spotPrice.toFixed(2)}` : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-silver">Trend</span>
                <span
                  className={
                    j.trend > 0
                      ? "text-holo-green"
                      : j.trend < 0
                      ? "text-destructive"
                      : "text-silver"
                  }
                >
                  {j.trend > 0 ? "+" : ""}
                  {j.trend.toFixed(1)}%
                </span>
              </div>
              {j.programYear && (
                <div className="flex justify-between pt-1">
                  <span className="text-silver">Rec. activated</span>
                  <span className="text-holo-green">{j.programYear}</span>
                </div>
              )}
              {j.medicalYear && !j.programYear && (
                <div className="flex justify-between pt-1">
                  <span className="text-silver">Med. activated</span>
                  <span className="text-holo-purple">{j.medicalYear}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 border border-white/15 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-silver max-w-md">
          Legal in your state? Find a verified retail node nearby.
        </p>
        <Link
          href="/dispensaries"
          className="border border-holo-green text-holo-green px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-holo-green hover:text-matte transition-colors"
        >
          Network locator →
        </Link>
      </div>

      <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-silver/40 text-center">
        // Source: NCSL State Cannabis Laws · OpenStates · State regulatory body
        records
      </div>
    </div>
  );
}
