// components/site/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/strains", label: "Archive" },
  { href: "/dispensaries", label: "Network" },
  { href: "/legality", label: "Jurisdiction" },
  { href: "/prices", label: "Index" },
  { href: "/news", label: "Dispatch" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-matte/80 backdrop-blur-md border-b border-white/10">
      <div className="px-6 lg:px-12 py-4 flex items-center justify-between gap-8">
        <Link
          href="/"
          className="font-serif text-xl font-black italic tracking-tighter uppercase leading-none shrink-0"
        >
          Buds<span className="text-holo-green">.</span>Bot
        </Link>

        <nav className="hidden md:flex font-mono text-[10px] uppercase tracking-[0.2em] text-silver gap-7">
          {NAV.map((n) => {
            const isActive =
              pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`hover:text-holo-green transition-colors py-1 ${
                  isActive ? "text-holo-green" : ""
                }`}
              >
                [ {n.label} ]
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-silver">
          <span className="hidden sm:inline">Stream</span>
          <span className="size-2 rounded-full bg-holo-green animate-pulse shadow-[0_0_8px_var(--holo-green)]" />
        </div>
      </div>
    </header>
  );
}
