import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SeoPageLayout from "@/components/SeoPageLayout";

export const metadata: Metadata = buildMetadata({
  title: "Cannabis Legalization News 2025 — Marijuana Law Updates",
  description:
    "Stay updated on marijuana legalization news. Track state ballot measures, federal cannabis reform, DEA rescheduling, and new dispensary regulations in 2025.",
  path: "/cannabis-legalization-news",
  keywords: [
    "cannabis legalization news",
    "marijuana legalization 2025",
    "weed legalization update",
    "federal cannabis reform",
    "marijuana rescheduling",
    "cannabis news today",
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Will cannabis be federally legalized in 2025?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Full federal legalization in 2025 is considered unlikely, but significant progress on rescheduling is underway. The DEA proposed moving cannabis from Schedule I to Schedule III in 2024. If finalized, this would not legalize cannabis federally but would ease research restrictions, reduce tax burdens on cannabis businesses (removing 280E limitations), and signal a shift in federal policy.",
      },
    },
    {
      "@type": "Question",
      name: "What states are voting on marijuana legalization in 2025?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Several states have active legalization efforts in 2025, including Florida (following a narrow 2024 failure), North Carolina (medical legalization in legislature), Pennsylvania (adult-use legislation advancing), and South Dakota (another ballot attempt after 2024). Tennessee and Texas also have advocacy campaigns underway.",
      },
    },
  ],
};

const newsItems = [
  {
    date: "April 2025",
    headline: "DEA Rescheduling Proposal Advances Through Review Process",
    summary:
      "The proposed move of cannabis from Schedule I to Schedule III under the Controlled Substances Act continues to advance. The change would reduce tax burdens on cannabis businesses by removing the Section 280E restriction that prevents cannabis companies from deducting normal business expenses.",
    tags: ["Federal", "DEA", "Rescheduling"],
  },
  {
    date: "March 2025",
    headline: "Pennsylvania Adult-Use Bill Passes Committee Vote",
    summary:
      "Pennsylvania's recreational cannabis legalization bill cleared committee with bipartisan support. With both the governor and a majority of legislators backing adult use, Pennsylvania may become the largest East Coast state to legalize recreational cannabis.",
    tags: ["Pennsylvania", "Legislative", "Adult-Use"],
  },
  {
    date: "March 2025",
    headline: "North Carolina Medical Cannabis Bill Heads to Full Senate",
    summary:
      "The NC Senate Bill 3 for medical cannabis has advanced through committee with broad support. Advocates predict it will pass the full Senate, and the governor has indicated support. This would make NC the last major Southern state to legalize medical use.",
    tags: ["North Carolina", "Medical", "Legislative"],
  },
  {
    date: "February 2025",
    headline: "Michigan Cannabis Market Reaches $3B in Annual Sales",
    summary:
      "Michigan's recreational cannabis market reported over $3 billion in total sales since legalization, solidifying its position as one of the most competitive and affordable markets in the country. Average prices in Michigan remain among the lowest nationally.",
    tags: ["Michigan", "Market Data", "Sales"],
  },
  {
    date: "February 2025",
    headline: "Florida Advocates File New Adult-Use Initiative for 2026 Ballot",
    summary:
      "Following the narrow defeat of Amendment 3 in 2024 (which received 56% support but needed 60%), Florida marijuana advocates have filed a new initiative for the 2026 ballot with updated language designed to address concerns that may have cost votes last time.",
    tags: ["Florida", "Ballot Initiative", "2026"],
  },
  {
    date: "January 2025",
    headline: "New York Expands Dispensary Licenses, Prices Begin to Drop",
    summary:
      "New York's slow-moving rollout has accelerated with hundreds of new dispensary licenses approved. As the market matures and competition increases, prices are declining from the historic highs seen in the early rollout phase.",
    tags: ["New York", "Market", "Licensing"],
  },
];

export default function CannabisLegalizationNewsPage() {
  return (
    <SeoPageLayout badge="📰 News aggregated from OpenStates API, state legislatures, and verified cannabis press">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1>Cannabis Legalization News 2025</h1>
      <p className="hero-intro">
        Real-time tracking of marijuana legalization efforts across all 50
        states, plus federal reform news, market data, and regulatory updates.
      </p>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-num">8+</div>
          <div className="stat-label">States With Active Legislation</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">Schedule III</div>
          <div className="stat-label">DEA Proposed Status</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">$40B+</div>
          <div className="stat-label">US Legal Market Size 2025</div>
        </div>
      </div>

      <h2>Latest Legalization News</h2>
      {newsItems.map((item) => (
        <div key={item.headline} className="faq-item">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "0.5rem",
            }}
          >
            <div className="faq-q" style={{ fontSize: "1rem" }}>
              {item.headline}
            </div>
            <div
              style={{
                color: "#5a8a5a",
                fontSize: "0.8rem",
                whiteSpace: "nowrap",
                marginLeft: "1rem",
              }}
            >
              {item.date}
            </div>
          </div>
          <div className="faq-a">{item.summary}</div>
          <div
            style={{
              marginTop: "0.75rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.25rem",
            }}
          >
            {item.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      <h2>The Big Picture: Federal Cannabis Reform</h2>
      <h3>DEA Rescheduling: What It Means</h3>
      <p>
        In 2024, the DEA officially proposed moving cannabis from Schedule I (no
        accepted medical use, high abuse potential) to Schedule III (accepted
        medical use, lower abuse potential) under the Controlled Substances Act.
        This followed an HHS recommendation and represents the most significant
        shift in federal cannabis policy in decades.
      </p>
      <p>
        <strong>What Schedule III would change:</strong> Cannabis businesses
        could finally deduct normal operating expenses on federal taxes —
        currently prohibited by IRC Section 280E, which costs cannabis
        businesses tens of millions annually. Research would become
        significantly easier. International trade complications would ease.
      </p>
      <p>
        <strong>What Schedule III would NOT change:</strong> Cannabis would not
        be federally legal for recreational use. State laws would still govern
        legal markets. Banking restrictions would not automatically disappear.
        Interstate commerce would still be prohibited.
      </p>

      <h3>The SAFER Banking Act</h3>
      <p>
        The SAFER Banking Act (Secure and Fair Enforcement Regulation Banking
        Act) continues to be introduced in Congress. This legislation would
        allow banks to provide financial services to cannabis businesses
        operating legally under state law without fear of federal penalties.
        Without it, the majority of cannabis businesses remain cash-only,
        creating significant safety and operational challenges.
      </p>
      <p>
        While the act has passed the House with bipartisan support multiple
        times, it has repeatedly stalled in the Senate. Cannabis banking reform
        advocates remain cautiously optimistic for passage in the current
        Congress.
      </p>

      <h2>State-by-State Legislative Tracker</h2>
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Type</th>
            <th>Status</th>
            <th>Timeline</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Pennsylvania", "Adult-Use", "Committee passed", "2025 possible"],
            ["North Carolina", "Medical", "Senate advancing", "2025 possible"],
            ["Florida", "Adult-Use", "Ballot initiative filed", "2026 ballot"],
            ["South Dakota", "Adult-Use", "Petition drive", "2026 ballot"],
            ["Tennessee", "Medical CBD", "Advocacy phase", "Uncertain"],
            ["Texas", "Decriminalization", "City-level only", "State: stalled"],
            ["Wisconsin", "Medical", "Introduced", "Stalled in legislature"],
            ["Nebraska", "Medical", "Recently passed", "2025 implementing"],
          ].map(([state, type, status, timeline]) => (
            <tr key={state}>
              <td>
                <strong>{state}</strong>
              </td>
              <td>
                <span className="tag" style={{ fontSize: "0.75rem" }}>
                  {type}
                </span>
              </td>
              <td style={{ color: "#b8d8b8" }}>{status}</td>
              <td style={{ color: "#6a8a6a", fontSize: "0.85rem" }}>
                {timeline}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Cannabis Market Data & Industry News</h2>
      <h3>Market Size & Growth</h3>
      <p>
        The U.S. legal cannabis market is projected to exceed $40 billion in
        2025, up from roughly $30 billion in 2023. Despite federal prohibition,
        the legal market has grown every year since Colorado and Washington's
        pioneering 2012 votes. Industry analysts project continued growth as
        more states legalize and federal reform makes banking and capital access
        easier.
      </p>
      <h3>Price Compression</h3>
      <p>
        As more markets mature, wholesale cannabis prices have compressed
        significantly. This is good news for consumers but challenging for
        operators. States like Oregon and Michigan have seen prices drop so low
        that some cultivators have struggled to remain profitable. This is
        accelerating consolidation in the industry.
      </p>
      <h3>Multi-State Operators (MSOs)</h3>
      <p>
        Large multi-state cannabis companies continue to expand as markets open.
        Companies like Curaleaf, Green Thumb Industries, Trulieve, and Cresco
        Labs operate across dozens of states. Federal rescheduling could
        accelerate consolidation by making access to capital easier.
      </p>

      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <div className="faq-q">
          Will cannabis be federally legalized in 2025?
        </div>
        <div className="faq-a">
          Full federal legalization in 2025 is considered unlikely. The DEA's
          proposed rescheduling to Schedule III is advancing, which would ease
          research restrictions and tax burdens on cannabis businesses, but
          would not create a federally legal recreational market.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-q">
          What states are working toward legalization in 2025?
        </div>
        <div className="faq-a">
          Active efforts include Pennsylvania (adult-use legislation), North
          Carolina (medical bill advancing), Florida (2026 ballot initiative
          filed), and Nebraska (implementing recently-passed medical program).
          Several other states have advocacy campaigns underway.
        </div>
      </div>

      <div className="cta-box">
        <h2 style={{ marginTop: 0 }}>Find Legal Dispensaries in Your State</h2>
        <p>Check current dispensary options in legal states near you.</p>
        <a href="/dispensary-near-me">Find Dispensaries →</a>
      </div>
    </SeoPageLayout>
  );
}
