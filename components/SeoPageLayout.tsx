import React from "react";

interface SeoPageLayoutProps {
  children: React.ReactNode;
  badge?: string;
}

export default function SeoPageLayout({ children, badge }: SeoPageLayoutProps) {
  return (
    <div className="seo-page">
      <nav className="seo-nav">
        <a href="/" className="brand">
          🌿 BUDS.BOT
        </a>
        <div className="nav-links">
          <a href="/dispensary-near-me">Find Dispensaries</a>
          <a href="/cannabis-prices">Prices</a>
          <a href="/strain-database">Strains</a>
          <a href="/weed-legal-states">Legality Map</a>
        </div>
      </nav>
      {badge && <div className="seo-badge">{badge}</div>}
      <main className="seo-main">{children}</main>
      <footer className="seo-footer">
        <div className="footer-grid">
          <div>
            <h3>🌿 BUDS.BOT</h3>
            <p>Cannabis price tracker & dispensary finder</p>
          </div>
          <div>
            <h4>Tools</h4>
            <a href="/dispensary-near-me">Dispensary Finder</a>
            <a href="/cannabis-prices">Price Tracker</a>
            <a href="/strain-database">Strain Database</a>
          </div>
          <div>
            <h4>Information</h4>
            <a href="/weed-legal-states">Legality Map</a>
            <a href="/cannabis-legalization-news">News</a>
            <a href="/cheap-weed-deals">Deals</a>
          </div>
          <div>
            <h4>Guides</h4>
            <a href="/best-cannabis-strains">Best Strains</a>
            <a href="/marijuana-dispensary-finder">Dispensary Guide</a>
          </div>
        </div>
        <p className="disclaimer">
          For educational purposes. Must be 21+ or meet your state's legal age
          requirement. Always consume responsibly.
        </p>
      </footer>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0f0a; color: #e8f5e2; font-family: 'Georgia', serif; }
        .seo-page { min-height: 100vh; }
        .seo-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 2rem; background: rgba(10,20,10,0.95);
          border-bottom: 1px solid #2d4a2d; position: sticky; top: 0; z-index: 100;
          backdrop-filter: blur(10px);
        }
        .brand { color: #7fff7f; font-size: 1.4rem; font-weight: 700; text-decoration: none; letter-spacing: 2px; }
        .nav-links { display: flex; gap: 1.5rem; }
        .nav-links a { color: #a8c8a8; text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
        .nav-links a:hover { color: #7fff7f; }
        .seo-badge {
          background: linear-gradient(135deg, #1a3a1a, #0d1f0d);
          border-bottom: 1px solid #2d4a2d;
          padding: 0.4rem 2rem; font-size: 0.8rem; color: #7fff7f; text-align: center;
        }
        .seo-main { max-width: 900px; margin: 0 auto; padding: 3rem 2rem; }
        .seo-footer {
          background: #050d05; border-top: 1px solid #1a3a1a;
          padding: 3rem 2rem; margin-top: 4rem;
        }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 2rem; max-width: 900px; margin: 0 auto 2rem; }
        .footer-grid h3 { color: #7fff7f; margin-bottom: 0.5rem; }
        .footer-grid h4 { color: #a8c8a8; margin-bottom: 0.75rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
        .footer-grid a { display: block; color: #6a8a6a; text-decoration: none; font-size: 0.85rem; margin-bottom: 0.3rem; }
        .footer-grid a:hover { color: #7fff7f; }
        .footer-grid p { color: #6a8a6a; font-size: 0.85rem; line-height: 1.5; }
        .disclaimer { text-align: center; color: #3a5a3a; font-size: 0.75rem; max-width: 900px; margin: 0 auto; padding-top: 1rem; border-top: 1px solid #1a3a1a; }
        h1 { font-size: 2.5rem; line-height: 1.2; color: #7fff7f; margin-bottom: 1rem; }
        h2 { font-size: 1.6rem; color: #a8e6a8; margin: 2rem 0 1rem; }
        h3 { font-size: 1.2rem; color: #90d090; margin: 1.5rem 0 0.75rem; }
        p { line-height: 1.8; color: #c8e0c8; margin-bottom: 1rem; font-size: 1.05rem; }
        .hero-intro { font-size: 1.2rem; color: #a8d8a8; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #1a3a1a; }
        .faq-item { margin-bottom: 1.5rem; padding: 1.5rem; background: rgba(255,255,255,0.03); border: 1px solid #1a3a1a; border-radius: 8px; }
        .faq-q { color: #7fff7f; font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; }
        .faq-a { color: #b8d8b8; line-height: 1.7; }
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0; }
        .stat-card { background: rgba(127,255,127,0.05); border: 1px solid #2d4a2d; border-radius: 8px; padding: 1.5rem; text-align: center; }
        .stat-num { font-size: 2rem; font-weight: 700; color: #7fff7f; }
        .stat-label { color: #6a8a6a; font-size: 0.85rem; margin-top: 0.25rem; }
        .cta-box { background: linear-gradient(135deg, #1a3a1a, #0d2a0d); border: 1px solid #3a6a3a; border-radius: 12px; padding: 2rem; text-align: center; margin: 2rem 0; }
        .cta-box a { display: inline-block; background: #7fff7f; color: #050d05; padding: 0.75rem 2rem; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 1.1rem; margin-top: 1rem; }
        .strain-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0; }
        .strain-card { background: rgba(255,255,255,0.03); border: 1px solid #1a3a1a; border-radius: 8px; padding: 1.25rem; }
        .strain-name { color: #7fff7f; font-weight: 700; margin-bottom: 0.25rem; }
        .strain-type { font-size: 0.8rem; color: #5a8a5a; text-transform: uppercase; letter-spacing: 1px; }
        table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
        th { background: #1a3a1a; color: #7fff7f; padding: 0.75rem 1rem; text-align: left; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
        td { padding: 0.75rem 1rem; border-bottom: 1px solid #1a3a1a; color: #b8d8b8; font-size: 0.95rem; }
        tr:hover td { background: rgba(255,255,255,0.02); }
        .tag { display: inline-block; background: rgba(127,255,127,0.1); border: 1px solid #2d5a2d; color: #7fff7f; border-radius: 4px; padding: 0.2rem 0.6rem; font-size: 0.75rem; margin: 0.15rem; }
        @media (max-width: 600px) {
          h1 { font-size: 1.8rem; }
          .stat-grid { grid-template-columns: 1fr; }
          .strain-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .nav-links { display: none; }
        }
      `}</style>
    </div>
  );
}
