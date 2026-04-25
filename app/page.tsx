// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import specimenHero from "@/public/hero.jpeg";
import { Ticker } from "@/components/Ticker";
import { STRAINS, JURISDICTIONS, NEWS } from "@/lib/cannabis-data";

export const metadata: Metadata = {
  title: "BUDS.BOT — Cannabis Price & Dispensary Intelligence",
  description:
    "Live cannabis prices, dispensary network, jurisdictional legality, strain archive and regulatory dispatch. Independent commerce intelligence.",
  openGraph: {
    title: "BUDS.BOT — Cannabis Price & Dispensary Intelligence",
    description:
      "Live cannabis prices, dispensary network, jurisdictional legality, strain archive and regulatory dispatch.",
  },
};

export default function IndexPage() {
  const featured = STRAINS.slice(0, 3);
  const topJur = JURISDICTIONS.filter((j) => j.spotPrice).slice(0, 6);
  const dispatch = NEWS.slice(0, 3);

  return (
    <div className="bg-matte text-paper">
      {/* HERO / COVER */}
      <section className="relative min-h-[88vh] flex items-end px-6 lg:px-12 pb-20 border-b border-white/15 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" />

        <div className="relative z-10 w-full grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          {/* HEADLINE */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="font-mono text-holo-green text-[11px] mb-8 uppercase tracking-[0.3em] border-l border-holo-green pl-4">
              Terminal V.2.4 // Encrypted Botanical Stream
            </div>
            <h1 className="font-serif text-[14vw] lg:text-[8.5vw] leading-[0.85] tracking-tighter font-black uppercase">
              High
              <br />
              <span className="italic holo-text">Culture</span>
              <br />
              Data.
            </h1>
            <p className="mt-8 max-w-xl font-mono text-xs uppercase tracking-widest text-silver leading-relaxed">
              Independent cannabis commerce intelligence. Aggregated from public
              dispensary registries, retail menus, and state regulatory filings
              — decrypted into a single terminal. We do not sell. We reveal.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/prices"
                className="group inline-flex items-center gap-3 bg-holo-green text-matte px-6 py-4 font-mono text-xs uppercase tracking-widest font-bold hover:bg-paper transition-colors"
              >
                <span>Open the index</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
              <Link
                href="/dispensaries"
                className="inline-flex items-center gap-3 border border-white/30 px-6 py-4 font-mono text-xs uppercase tracking-widest text-paper hover:border-holo-green hover:text-holo-green transition-colors"
              >
                Locate a node
              </Link>
            </div>
          </div>

          {/* SPECIMEN PLATE */}
          <div className="lg:col-span-5 order-1 lg:order-2 group cursor-crosshair">
            <div className="relative aspect-[3/4] max-w-[440px] mx-auto">
              <div className="absolute inset-0 bg-holo-green translate-x-4 translate-y-4 mix-blend-screen transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="relative h-full w-full bg-card border border-white/30 overflow-hidden">
                <Image
                  src={specimenHero}
                  alt="Botanical specimen — trichome density scan"
                  className="specimen-img w-full h-full object-cover"
                  width={1024}
                  height={1280}
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-matte p-4 border border-white/20 font-mono text-[10px] text-silver w-52 shadow-2xl">
                <div className="flex justify-between border-b border-white/20 pb-2 mb-2 uppercase">
                  <span>Specimen</span>
                  <span className="text-paper">X-77 / VG</span>
                </div>
                <div className="flex justify-between uppercase">
                  <span>Status</span>
                  <span className="text-holo-purple animate-pulse">
                    Cultivating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* SYSTEM CAPABILITIES — pillar grid */}
      <section className="px-6 lg:px-12 py-20 border-b border-white/15">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-14">
          <h2 className="font-serif text-5xl md:text-7xl italic font-black tracking-tighter">
            Five instruments,
            <br />
            one terminal.
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-widest text-silver max-w-[34ch] mt-6 md:mt-0">
            Each module aggregates public-record data into actionable cannabis
            intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/15 border border-white/15">
          {[
            {
              n: "01",
              href: "/dispensaries" as const,
              t: "Locator",
              d: "Dispensary network finder by ZIP code, state, license tier and delivery type.",
            },
            {
              n: "02",
              href: "/prices" as const,
              t: "Index",
              d: "Live retail price comparison by strain, format and territory.",
            },
            {
              n: "03",
              href: "/legality" as const,
              t: "Jurisdiction",
              d: "State-by-state legality, tax burden and regulatory program timelines.",
            },
            {
              n: "04",
              href: "/strains" as const,
              t: "Archive",
              d: "Curated strain database — lineage, terpene profile and effect mapping.",
            },
            {
              n: "05",
              href: "/news" as const,
              t: "Dispatch",
              d: "Federal & state legalization updates and market-moving developments.",
            },
          ].map((p) => (
            <Link
              key={p.n}
              href={p.href}
              className="bg-matte p-8 group hover:bg-card transition-colors flex flex-col gap-6 min-h-[260px]"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-silver">
                  /{p.n}
                </span>
                <span className="font-mono text-[10px] text-holo-green opacity-0 group-hover:opacity-100 transition-opacity">
                  → ENTER
                </span>
              </div>
              <h3 className="font-serif text-3xl italic font-black leading-none tracking-tighter group-hover:text-holo-green transition-colors">
                {p.t}.
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-wide text-silver leading-relaxed mt-auto">
                {p.d}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* THE ARCHIVE — featured strains */}
      <section className="px-6 lg:px-12 py-20 border-b border-white/15">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12">
          <h2 className="font-serif text-5xl md:text-7xl italic font-black tracking-tighter">
            The Archive.
          </h2>
          <Link
            href="/strains"
            className="font-mono text-xs uppercase tracking-widest text-silver hover:text-holo-green mt-4 md:mt-0"
          >
            [ View all 14,204 cultivars → ]
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/15 border border-white/15">
          {featured.map((s) => (
            <Link
              key={s.id}
              href="/strains"
              className="bg-matte p-6 group hover:bg-card transition-colors relative flex flex-col"
            >
              <div className="absolute top-6 right-6 bg-holo-purple text-matte font-mono text-[9px] uppercase px-2 py-1 font-bold z-10">
                {s.tag}
              </div>
              <div className="aspect-square bg-card mb-6 border border-white/10 overflow-hidden">
                <Image
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
              <div className="space-y-2 font-mono text-[11px] uppercase tracking-wide">
                <Row label="Lineage" value={s.lineage} />
                <Row label="Potency" value={`${s.thc}% THC`} />
                <Row label="Dominant" value={s.terpene} accent />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* JURISDICTION INDEX */}
      <section className="px-6 lg:px-12 py-20 border-b border-white/15">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-5xl md:text-6xl italic font-black tracking-tighter leading-[0.9]">
              Jurisdiction
              <br />
              Index.
            </h2>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-silver leading-relaxed">
              Real-time regulatory status and spot pricing across monitored
              territories. Data secured via state registries and public retail
              menus.
            </p>
            <Link
              href="/legality"
              className="mt-8 inline-flex items-center gap-2 border border-white/30 px-5 py-3 font-mono text-xs uppercase tracking-widest hover:border-holo-green hover:text-holo-green transition-colors"
            >
              Open full map →
            </Link>
          </div>

          <div className="lg:col-span-8 font-mono text-sm border-t border-l border-white/30 bg-white/[0.02]">
            <div className="grid grid-cols-[2fr_1.4fr_1fr_1fr] border-b border-white/30 text-silver uppercase text-[10px] tracking-widest p-4 bg-white/5">
              <div>Territory</div>
              <div>Status</div>
              <div className="hidden sm:block">Tax Burden</div>
              <div className="text-right">Spot / Oz</div>
            </div>
            {topJur.map((j) => (
              <div
                key={j.state}
                className="grid grid-cols-[2fr_1.4fr_1fr_1fr] border-b border-white/10 p-4 hover:bg-white/10 transition-colors group cursor-crosshair"
              >
                <div className="text-paper font-bold">{j.state}</div>
                <div
                  className={
                    j.status === "Recreational"
                      ? "text-holo-green"
                      : j.status === "Medical"
                      ? "text-holo-purple"
                      : j.status === "Decriminalized"
                      ? "text-paper"
                      : "text-destructive"
                  }
                >
                  {j.status}
                </div>
                <div className="hidden sm:block text-silver">{j.taxNote}</div>
                <div className="text-right tabular-nums group-hover:text-holo-green transition-colors">
                  {j.spotPrice ? `$${j.spotPrice.toFixed(2)}` : "—"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISPATCH */}
      <section className="px-6 lg:px-12 py-20">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12">
          <h2 className="font-serif text-5xl md:text-7xl italic font-black tracking-tighter">
            Dispatch.
          </h2>
          <Link
            href="/news"
            className="font-mono text-xs uppercase tracking-widest text-silver hover:text-holo-green mt-4 md:mt-0"
          >
            [ Full feed → ]
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-white/15 border border-white/15">
          {dispatch.map((n) => (
            <article
              key={n.id}
              className="bg-matte p-8 hover:bg-card transition-colors group cursor-pointer flex flex-col gap-4 min-h-[220px]"
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-silver">
                <span className="text-holo-green">{n.category}</span>
                <span>{n.date}</span>
              </div>
              <h3 className="font-serif text-2xl italic font-black leading-tight group-hover:text-holo-green transition-colors">
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
      </section>
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-2">
      <span className="text-silver">{label}</span>
      <span className={accent ? "text-holo-purple" : "text-paper"}>
        {value}
      </span>
    </div>
  );
}
