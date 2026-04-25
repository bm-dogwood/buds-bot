const STATES = [
  { code: "IL", v: "+2.4%" },
  { code: "CA", v: "-1.1%" },
  { code: "MI", v: "+0.8%" },
  { code: "NY", v: "—" },
  { code: "FL", v: "+4.2%" },
  { code: "MA", v: "-0.4%" },
  { code: "CO", v: "+1.9%" },
  { code: "WA", v: "+0.3%" },
  { code: "NV", v: "-2.0%" },
  { code: "OR", v: "+1.2%" },
  { code: "AZ", v: "+0.6%" },
  { code: "MN", v: "NEW" },
];

export function Ticker() {
  const items = [...STATES, ...STATES];
  return (
    <div className="bg-holo-green text-matte overflow-hidden py-3 border-y border-white/10">
      <div className="marquee-track flex gap-10 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-widest">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-3">
            <span>///</span>
            <span>{s.code}</span>
            <span className={s.v.startsWith("-") ? "opacity-70" : ""}>
              {s.v}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
