import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SeoPageLayout from "@/components/SeoPageLayout";

export const metadata: Metadata = buildMetadata({
  title:
    "Cheap Weed Deals — Best Cannabis Sales & Dispensary Specials Near You",
  description:
    "Find the best cannabis deals, weed sales, and dispensary specials near you. Daily-updated discounts on flower, edibles, vapes, and concentrates.",
  path: "/cheap-weed-deals",
  keywords: [
    "cheap weed deals",
    "cannabis sales",
    "dispensary deals",
    "marijuana discounts",
    "weed specials",
    "cannabis coupons",
    "best dispensary deals near me",
    "cheapest weed dispensary",
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What day is the best to buy weed for deals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Many dispensaries run themed daily deals: "Munchies Monday" for edibles, "Wax Wednesday" or "Concentrate Wednesday" for concentrates, "Flower Friday" for bud. Midweek tends to be when stores run their biggest promotions to drive traffic. BUDS.BOT aggregates daily deals from dispensaries near you so you can always find what\'s on sale today.',
      },
    },
    {
      "@type": "Question",
      name: "How can I get the cheapest weed legally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To get the best prices on legal cannabis: 1) Buy in larger quantities (ounces have much lower per-gram costs), 2) Look for daily specials and themed deal days, 3) Join dispensary loyalty programs for points and exclusive offers, 4) Get a medical card if eligible (lower taxes), 5) Shop in states with lower prices like Oregon and Michigan, 6) Look for house or store brand products which are typically less expensive than premium brands.",
      },
    },
  ],
};

const dailyDeals = [
  {
    day: "Monday",
    theme: "Munchies Monday",
    deals: ["Edibles 20% off", "Gummies 2-for-1", "Chocolate bars BOGO"],
    emoji: "🍫",
  },
  {
    day: "Tuesday",
    theme: "Topical Tuesday",
    deals: ["Tinctures 15% off", "CBD products $5 off", "Topicals buy 2 get 1"],
    emoji: "🌿",
  },
  {
    day: "Wednesday",
    theme: "Wax Wednesday",
    deals: ["All concentrates 20% off", "Live resin deals", "Dabs BOGO Friday"],
    emoji: "💎",
  },
  {
    day: "Thursday",
    theme: "Throwback Thursday",
    deals: [
      "Last week's specials",
      "Legacy strains on sale",
      "Old-school prices on classics",
    ],
    emoji: "🕰️",
  },
  {
    day: "Friday",
    theme: "Flower Friday",
    deals: ["Eighths at ounce prices", "Top-shelf 15% off", "Pre-roll bundles"],
    emoji: "🌸",
  },
  {
    day: "Saturday",
    theme: "Sesh Saturday",
    deals: ["Happy hour deals", "Loyalty points x2", "Bundle deals all day"],
    emoji: "🎉",
  },
  {
    day: "Sunday",
    theme: "Self-Care Sunday",
    deals: ["Relaxation products", "CBD specials", "Indica Sunday sales"],
    emoji: "☀️",
  },
];

export default function CheapWeedDealsPage() {
  return (
    <SeoPageLayout badge="💰 Deals refreshed multiple times daily — last updated today">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1>Best Cannabis Deals & Dispensary Specials Near You</h1>
      <p className="hero-intro">
        Daily-updated cannabis deals from 15,000+ dispensaries. Never pay full
        price for weed again — find today's best sales, coupons, and specials in
        your area.
      </p>

      <div className="cta-box">
        <h2 style={{ marginTop: 0 }}>Find Today's Deals Near You</h2>
        <p>
          Enter your zip code to see all active cannabis specials and dispensary
          promotions in your area.
        </p>
        <a href="/#deals">See Today's Deals →</a>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-num">40%</div>
          <div className="stat-label">Avg Savings on Deal Days</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">Daily</div>
          <div className="stat-label">Price Updates</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">15k+</div>
          <div className="stat-label">Dispensaries Tracked</div>
        </div>
      </div>

      <h2>The Weekly Cannabis Deal Calendar</h2>
      <p>
        Most dispensaries run themed daily specials following a similar pattern.
        Knowing this schedule can save you 15–40% on your usual products:
      </p>

      <div style={{ display: "grid", gap: "0.75rem", margin: "1.5rem 0" }}>
        {dailyDeals.map((day) => (
          <div
            key={day.day}
            className="faq-item"
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
              padding: "1rem 1.25rem",
            }}
          >
            <div
              style={{
                fontSize: "1.75rem",
                lineHeight: 1,
                minWidth: "2rem",
                textAlign: "center",
              }}
            >
              {day.emoji}
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "baseline",
                  marginBottom: "0.25rem",
                }}
              >
                <strong style={{ color: "#7fff7f" }}>{day.day}</strong>
                <span style={{ color: "#5a8a5a", fontSize: "0.85rem" }}>
                  {day.theme}
                </span>
              </div>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}
              >
                {day.deals.map((d) => (
                  <span key={d} className="tag" style={{ fontSize: "0.75rem" }}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Best Strategies for Cheap Legal Weed</h2>

      <h3>1. Buy in Larger Quantities</h3>
      <p>
        The per-gram price drops dramatically as you buy more. The difference
        between buying by the gram ($13 avg) versus buying an ounce ($200 avg)
        works out to roughly $7 per gram — nearly half price. If you consume
        regularly and have a strain you love, buying in bulk is the single
        biggest money-saver available.
      </p>
      <p>
        Most states limit recreational possession to 1–3 ounces, but you can
        typically purchase up to an ounce per transaction. Medical patients
        often have higher purchase limits.
      </p>

      <h3>2. Loyalty Programs Are Underrated</h3>
      <p>
        Nearly every dispensary chain runs a loyalty points program. A typical
        program gives you 1 point per dollar spent, with 100 points redeeming
        for $10 off. That's effectively a 10% rebate on everything you buy. Some
        programs offer birthday rewards, double-point days, and exclusive member
        deals that are significantly better than public promotions.
      </p>
      <p>
        The catch: you'll need to give your contact info, including a phone
        number for compliance reasons. Many dispensaries also run SMS deal
        alerts for loyalty members that aren't posted publicly.
      </p>

      <h3>3. House Brands vs. Premium Brands</h3>
      <p>
        Most dispensary chains have their own "house brand" or carry a
        store-brand product line. These are typically grown, processed, and
        packaged under the dispensary's own label and sell for 20–40% less than
        premium branded products. Quality varies — some house brands are
        genuinely excellent, others are more inconsistent.
      </p>
      <p>
        A good strategy is to buy a small amount of a house brand flower before
        committing to an ounce. If you like it, you've found a reliable,
        affordable option.
      </p>

      <h3>4. Medical Cards: Significant Long-Term Savings</h3>
      <p>
        In states that have both recreational and medical programs, medical
        patients pay significantly lower taxes. In California, medical patients
        avoid the 15% excise tax and many local taxes, saving $20–$40 per ounce
        compared to recreational prices. In Illinois, medical patients pay 1%
        tax versus 10–25% for recreational customers.
      </p>
      <p>
        Medical card costs vary by state but typically run $50–$200 for the
        doctor's consultation plus $25–$100 for the state registration fee. In
        high-tax states, this pays for itself within a few purchases for regular
        consumers.
      </p>

      <h3>5. Compare Before You Drive</h3>
      <p>
        The same product can vary by 20–30% in price between dispensaries in the
        same city. Delivery fees and gas costs add up. Use BUDS.BOT to compare
        prices on your specific product before leaving the house. Filter by
        "best price" on the exact strain or product you want — you'll often find
        a significantly better deal at a dispensary you hadn't considered.
      </p>

      <h3>6. First-Time Customer Discounts</h3>
      <p>
        Almost every dispensary offers a new customer deal — usually 10–25% off
        your first purchase, sometimes a free pre-roll, or a buy-one-get-one on
        select items. If you're new to a market or just moved, take advantage of
        these across a few dispensaries before settling on your regular spot.
        BUDS.BOT marks all active first-timer deals in search results.
      </p>

      <h2>Best Value Products: Getting More THC Per Dollar</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Avg Cost</th>
            <th>Value Rating</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          {[
            [
              "Ounce of flower",
              "$160–200",
              "⭐⭐⭐⭐⭐",
              "Lowest cost per mg THC",
            ],
            [
              "Distillate cartridge (1g)",
              "$25–35",
              "⭐⭐⭐⭐",
              "High THC%, convenient",
            ],
            [
              "Edibles (100mg pack)",
              "$15–20",
              "⭐⭐⭐⭐",
              "Long-lasting, efficient dosing",
            ],
            [
              "Pre-rolls (multi-pack)",
              "$25–40",
              "⭐⭐⭐",
              "Convenience vs. value tradeoff",
            ],
            [
              "Single gram of flower",
              "$10–15",
              "⭐⭐",
              "Convenient but expensive per-gram",
            ],
            [
              "Live resin (1g)",
              "$35–55",
              "⭐⭐⭐",
              "Premium quality, worth it for effects",
            ],
          ].map(([product, cost, value, why]) => (
            <tr key={product}>
              <td>
                <strong>{product}</strong>
              </td>
              <td style={{ color: "#7fff7f" }}>{cost}</td>
              <td>{value}</td>
              <td style={{ color: "#6a8a6a", fontSize: "0.85rem" }}>{why}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <div className="faq-q">What day is the best to buy weed for deals?</div>
        <div className="faq-a">
          Wednesday (concentrates), Friday (flower), and Monday (edibles) are
          the most common deal days. Midweek promotions tend to be the most
          aggressive since dispensaries are trying to drive traffic on slower
          days. BUDS.BOT aggregates daily specials from dispensaries near you.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-q">How can I get the cheapest weed legally?</div>
        <div className="faq-a">
          Buy in bulk (ounces), join loyalty programs, get a medical card if
          eligible, shop on deal days, compare prices before visiting, and look
          for house brand products. Medical patients in high-tax states save the
          most — taxes can account for 30–40% of the retail price.
        </div>
      </div>
    </SeoPageLayout>
  );
}
