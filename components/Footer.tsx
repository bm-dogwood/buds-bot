// components/site/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 lg:px-12 py-12 mt-12">
      <div className="flex flex-col lg:flex-row justify-between gap-12">
        <div className="max-w-md">
          <div className="font-serif text-4xl italic font-black leading-none tracking-tighter">
            Buds<span className="text-holo-green">.</span>Bot
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-silver mt-6 leading-relaxed">
            Independent cannabis commerce intelligence. Aggregated from public
            dispensary registries, retail menus, and state regulatory filings.
            Not for resale. Not for consumption advice. For adults of legal age
            in legal jurisdictions only.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 font-mono text-xs uppercase tracking-widest">
          <div>
            <div className="text-silver mb-3">Data</div>
            <ul className="space-y-2">
              <li>
                <Link href="/strains" className="hover:text-holo-green">
                  Archive
                </Link>
              </li>
              <li>
                <Link href="/prices" className="hover:text-holo-green">
                  Index
                </Link>
              </li>
              <li>
                <Link href="/legality" className="hover:text-holo-green">
                  Jurisdiction
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-silver mb-3">Network</div>
            <ul className="space-y-2">
              <li>
                <Link href="/dispensaries" className="hover:text-holo-green">
                  Locator
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-holo-green">
                  Dispatch
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-silver mb-3">Codex</div>
            <ul className="space-y-2">
              <li className="text-paper">v.2.4.1</li>
              <li className="text-paper">EST. 2024</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-silver">
        <span>© BUDS.BOT — All Specimens Reserved</span>
        <span>Encrypted Botanical Networks</span>
      </div>
    </footer>
  );
}
