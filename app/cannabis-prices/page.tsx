import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SeoPageLayout from "@/components/SeoPageLayout";

export const metadata: Metadata = buildMetadata({
  title: "Cannabis Prices 2025 — Weed Price Comparison by Strain & State",
  description:
    "Compare cannabis prices across dispensaries and states. See average costs for flower, edibles, concentrates, and pre-rolls. Find the best weed deals near you.",
  path: "/cannabis-prices",
  keywords: [
    "cannabis prices",
    "weed prices 2025",
    "marijuana price per gram",
    "how much does weed cost",
    "cannabis price comparison",
    "cheapest dispensary near me",
    "weed prices by state",
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does cannabis cost per gram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The average price of cannabis flower ranges from $8–$18 per gram at recreational dispensaries, depending on quality and state. Premium or craft cannabis can cost $20+ per gram. Medical patients often pay less due to lower taxes. Buying in larger quantities (eighths, quarters, or ounces) significantly reduces the per-gram cost.",
      },
    },
    {
      "@type": "Question",
      name: "Which state has the cheapest weed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oregon and Michigan consistently have the lowest cannabis prices in the U.S., with average prices around $5–$8 per gram for recreational flower. Colorado is also competitively priced. States with newer markets like Illinois and New Jersey tend to have higher prices due to limited supply.",
      },
    },
    {
      "@type": "Question",
      name: "Why are dispensary prices higher than street prices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Legal dispensary cannabis includes state excise taxes (10–37%), local taxes, compliance costs, licensing fees, and lab testing. These costs are passed on to consumers. However, legal cannabis offers guaranteed quality, consistent potency, and safety testing that unregulated sources cannot provide.",
      },
    },
  ],
};

const priceData = [
  {
    product: "Flower (1g)",
    low: "$8",
    avg: "$13",
    high: "$20",
    notes: "Craft premium at top end",
  },
  {
    product: "Eighth (3.5g)",
    low: "$25",
    avg: "$40",
    high: "$65",
    notes: "Most popular size",
  },
  {
    product: "Quarter (7g)",
    low: "$45",
    avg: "$70",
    high: "$110",
    notes: "Best per-gram value",
  },
  {
    product: "Ounce (28g)",
    low: "$120",
    avg: "$200",
    high: "$350",
    notes: "Bulk pricing varies widely",
  },
  {
    product: "Pre-roll (1g)",
    low: "$5",
    avg: "$10",
    high: "$18",
    notes: "Infused pre-rolls cost more",
  },
  {
    product: "Vape Cartridge (.5g)",
    low: "$20",
    avg: "$35",
    high: "$55",
    notes: "1g carts ~double price",
  },
  {
    product: "Edibles (10mg)",
    low: "$3",
    avg: "$6",
    high: "$12",
    notes: "Price per 10mg THC dose",
  },
  {
    product: "Concentrate (1g)",
    low: "$20",
    avg: "$40",
    high: "$80",
    notes: "Live resin/rosin at top",
  },
];

const statePrices = [
  { state: "Oregon", avgGram: "$5–$7", tax: "17%", note: "Lowest in nation" },
  { state: "Michigan", avgGram: "$6–$9", tax: "10%", note: "High competition" },
  {
    state: "Colorado",
    avgGram: "$7–$11",
    tax: "15–25%",
    note: "Mature market",
  },
  {
    state: "Washington",
    avgGram: "$8–$12",
    tax: "37%",
    note: "High tax state",
  },
  {
    state: "California",
    avgGram: "$10–$16",
    tax: "15–20%+",
    note: "Local taxes vary",
  },
  {
    state: "Illinois",
    avgGram: "$12–$18",
    tax: "10–25%",
    note: "Newer market",
  },
  {
    state: "New Jersey",
    avgGram: "$13–$20",
    tax: "6.625%",
    note: "Still expanding",
  },
  {
    state: "New York",
    avgGram: "$12–$18",
    tax: "13%",
    note: "Recently opened",
  },
];

export default function CannabisPage() {
  return (
    <SeoPageLayout badge="💰 Prices updated multiple times daily from verified dispensary menus">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1>Cannabis Prices 2025: What Weed Really Costs</h1>
      <p className="hero-intro">
        Real-time price data from 15,000+ dispensaries nationwide. Compare
        cannabis costs by product type, strain quality, and state — and find the
        best deals near you.
      </p>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-num">$13</div>
          <div className="stat-label">Avg Price Per Gram (US)</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">$5</div>
          <div className="stat-label">Cheapest State (Oregon)</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">37%</div>
          <div className="stat-label">Highest State Tax Rate</div>
        </div>
      </div>

      <h2>Average Cannabis Prices by Product Type</h2>
      <p>
        Prices below represent national averages across recreational
        dispensaries in all legal states. Prices vary based on quality tier,
        local taxes, and market competition.
      </p>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Budget</th>
            <th>Average</th>
            <th>Premium</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {priceData.map((row) => (
            <tr key={row.product}>
              <td>
                <strong>{row.product}</strong>
              </td>
              <td style={{ color: "#7fff7f" }}>{row.low}</td>
              <td>{row.avg}</td>
              <td style={{ color: "#ff9f7f" }}>{row.high}</td>
              <td style={{ color: "#6a8a6a", fontSize: "0.85rem" }}>
                {row.notes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Cannabis Prices by State</h2>
      <p>
        State taxes and market maturity dramatically affect what you'll pay at
        the register. Here's how average recreational flower prices compare:
      </p>

      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Avg Price/Gram</th>
            <th>Tax Rate</th>
            <th>Market Note</th>
          </tr>
        </thead>
        <tbody>
          {statePrices.map((row) => (
            <tr key={row.state}>
              <td>
                <strong>{row.state}</strong>
              </td>
              <td style={{ color: "#7fff7f" }}>{row.avgGram}</td>
              <td>{row.tax}</td>
              <td style={{ color: "#6a8a6a", fontSize: "0.85rem" }}>
                {row.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Why Cannabis Prices Vary So Much</h2>
      <h3>State Taxes Are the #1 Factor</h3>
      <p>
        Cannabis excise taxes range from Washington's 37% to just 6.625% in New
        Jersey. California layered its 15% state tax on top of local taxes that
        can add another 10–15%, making Los Angeles dispensary prices among the
        highest in the country. Oregon's simple flat-rate structure keeps prices
        low.
      </p>

      <h3>Market Maturity & Competition</h3>
      <p>
        States with many dispensaries and years of legal sales tend to have
        lower prices. Oregon, Colorado, and Michigan all have mature,
        competitive markets where dispensaries compete aggressively on price.
        Illinois and New Jersey opened to recreational sales more recently and
        still have supply constraints pushing prices up.
      </p>

      <h3>Quality Tier: Budget vs. Craft</h3>
      <p>
        Like wine or coffee, cannabis has multiple quality tiers. "Budget" or
        "value" flower is typically trim-run, machine-trimmed, or older stock —
        still safe and effective, but lower shelf appeal. "Mid" is the sweet
        spot for most consumers. "Top shelf" or "craft" flower features
        hand-trimmed, small-batch grows with premium genetics and curing. Prices
        can triple between budget and premium.
      </p>

      <h3>Product Type Markup</h3>
      <p>
        Processed products like live resin concentrates, infused pre-rolls, and
        nano-emulsion edibles carry higher margins due to processing costs. Vape
        cartridges are often marked up significantly. Raw flower remains the
        best value per milligram of THC for most consumers.
      </p>

      <h2>How to Get the Best Cannabis Prices</h2>
      <p>
        <strong>1. Buy in bulk.</strong> The per-gram price of an ounce is
        typically 40–60% less than buying by the gram. If you're a regular
        consumer, buy your favorite strain in quantity.
      </p>
      <p>
        <strong>2. Check daily deals.</strong> Most dispensaries run weekly
        specials — "Wax Wednesday," "Flower Friday," etc. BUDS.BOT aggregates
        daily deals from dispensaries near you.
      </p>
      <p>
        <strong>3. Join loyalty programs.</strong> Nearly every dispensary chain
        has a points program. Regulars can earn free products, discounts, or
        early access to new drops.
      </p>
      <p>
        <strong>4. Get a medical card.</strong> In states that allow medical
        cannabis, a doctor's recommendation card often gives access to lower tax
        rates and higher purchase limits.
      </p>
      <p>
        <strong>5. Compare before you drive.</strong> Use BUDS.BOT to compare
        prices on your specific strain or product across dispensaries in your
        area before making the trip.
      </p>

      <div className="cta-box">
        <h2 style={{ marginTop: 0 }}>Compare Prices Near You</h2>
        <p>
          See live pricing from dispensaries in your area, sorted by best value.
        </p>
        <a href="/#price-compare">Compare Prices →</a>
      </div>

      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <div className="faq-q">How much does cannabis cost per gram?</div>
        <div className="faq-a">
          The average price of cannabis flower ranges from $8–$18 per gram at
          recreational dispensaries, depending on quality and state. Medical
          patients often pay less. Buying larger quantities significantly
          reduces the per-gram cost.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-q">Which state has the cheapest weed?</div>
        <div className="faq-a">
          Oregon and Michigan consistently have the lowest prices, averaging
          $5–$8 per gram for recreational flower. Colorado is also competitively
          priced. Newer markets like Illinois and New Jersey tend to have higher
          prices.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-q">
          Why are dispensary prices higher than street prices?
        </div>
        <div className="faq-a">
          Legal cannabis includes state excise taxes (10–37%), local taxes,
          compliance costs, and lab testing fees. However, legal cannabis offers
          guaranteed quality, consistent potency, and safety that unregulated
          sources cannot.
        </div>
      </div>
    </SeoPageLayout>
  );
}
