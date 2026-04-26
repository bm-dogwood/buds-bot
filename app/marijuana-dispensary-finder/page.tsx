import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SeoPageLayout from "@/components/SeoPageLayout";

export const metadata: Metadata = buildMetadata({
  title: "Marijuana Dispensary Finder — How to Find the Best Dispensary",
  description:
    "Complete guide to finding the best marijuana dispensary near you. Learn what to look for, how to compare menus, understand pricing, and get the best deals.",
  path: "/marijuana-dispensary-finder",
  keywords: [
    "marijuana dispensary finder",
    "find marijuana dispensary",
    "best dispensary near me",
    "how to find a dispensary",
    "dispensary guide",
    "cannabis shop near me",
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I find the best dispensary near me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To find the best dispensary near you: 1) Check BUDS.BOT for dispensaries in your zip code, 2) Filter by what matters most — price, selection, hours, or delivery, 3) Read recent reviews for quality and service consistency, 4) Compare menus for the specific products you want, 5) Check for first-time customer deals, which many dispensaries offer.",
      },
    },
    {
      "@type": "Question",
      name: "What should I look for when choosing a dispensary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Key factors include: product selection and quality, staff knowledge and helpfulness, pricing and deals, hours and location, lab testing transparency (look for dispensaries that share COAs), and cleanliness. First-time buyers should prioritize knowledgeable staff who can help guide selections without being pushy.",
      },
    },
  ],
};

export default function MarijuanaDispensaryFinderPage() {
  return (
    <SeoPageLayout badge="🗺️ Your complete guide to finding and choosing the best dispensary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1>Marijuana Dispensary Finder: The Complete Guide</h1>
      <p className="hero-intro">
        Everything you need to know about finding, evaluating, and getting the
        most out of cannabis dispensaries — whether you're a first-timer or a
        seasoned shopper.
      </p>

      <div className="cta-box">
        <h2 style={{ marginTop: 0 }}>Search Dispensaries by Zip Code</h2>
        <p>
          Find all licensed dispensaries in your area with real menus, hours,
          and pricing.
        </p>
        <a href="/#search">Search Now →</a>
      </div>

      <h2>How BUDS.BOT's Dispensary Finder Works</h2>
      <p>
        Unlike other cannabis directories that rely on self-reported
        information, BUDS.BOT aggregates data directly from state licensing
        databases, official dispensary registries, and live menu feeds. Every
        dispensary you see has been verified as a licensed, legal operation.
        Here's what we show you for each:
      </p>
      <table>
        <thead>
          <tr>
            <th>Data Point</th>
            <th>What It Means</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {[
            [
              "License Status",
              "Verified active license with state authority",
              "State registry",
            ],
            [
              "Live Menu",
              "Real-time inventory with pricing",
              "Dispensary API / scrape",
            ],
            [
              "Hours",
              "Current operating hours including holidays",
              "Verified daily",
            ],
            [
              "Delivery Zone",
              "Whether they deliver to your address",
              "Dispensary + state rules",
            ],
            [
              "Payment Methods",
              "Cash, debit, credit, CanPay, etc.",
              "Dispensary data",
            ],
            [
              "Lab Testing",
              "Links to COAs for flower products",
              "Dispensary upload",
            ],
          ].map(([point, meaning, source]) => (
            <tr key={point}>
              <td>
                <strong>{point}</strong>
              </td>
              <td>{meaning}</td>
              <td style={{ color: "#6a8a6a", fontSize: "0.85rem" }}>
                {source}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>5 Steps to Finding the Best Dispensary</h2>
      <h3>Step 1: Start with Your Zip Code</h3>
      <p>
        Enter your zip code in BUDS.BOT's dispensary finder. We'll show you all
        licensed dispensaries within your selected radius, sorted by distance.
        You can immediately see their hours to filter by who's open right now.
      </p>

      <h3>Step 2: Filter by What Matters to You</h3>
      <p>
        Different people prioritize different things. Price-conscious shoppers
        should filter by "best deals" and sort by price. If you need a specific
        product (say, a particular strain or a high-CBD tincture), filter by
        menu. If convenience is key, filter by delivery or curbside pickup. If
        you're medical, filter to show med-licensed dispensaries.
      </p>

      <h3>Step 3: Read Recent Reviews</h3>
      <p>
        A dispensary can have a beautiful website and great prices but still
        have slow service, inaccurate menus, or unhelpful staff. Reviews from
        the last 30–60 days are most reliable. Look for patterns — one bad
        review means little, but consistent complaints about wait times or staff
        knowledge are red flags.
      </p>

      <h3>Step 4: Check the Menu Before You Go</h3>
      <p>
        Cannabis menus change constantly. Products sell out, new inventory
        arrives, and specials rotate. Always check the live menu on BUDS.BOT
        before heading out to make sure the product you want is in stock and at
        the price you expect. Nothing is worse than driving 20 minutes only to
        find your strain is sold out.
      </p>

      <h3>Step 5: Look for New Customer Deals</h3>
      <p>
        Nearly every dispensary offers a first-time customer discount —
        typically 10–25% off your first purchase, or a free pre-roll with any
        order. BUDS.BOT flags active first-timer deals in dispensary listings.
        Take advantage of these when trying a new shop, and sign up for the
        loyalty program while you're at it.
      </p>

      <h2>Types of Dispensary Licenses Explained</h2>
      <h3>Retailer / Dispensary</h3>
      <p>
        The most common license type. These are retail storefronts that sell
        cannabis products directly to consumers. They must purchase from
        licensed cultivators and processors — they don't grow their own.
      </p>

      <h3>Vertically Integrated (Grow + Sell)</h3>
      <p>
        Some states allow or require dispensaries to grow a portion of their own
        cannabis. Vertically integrated operations can sometimes offer better
        prices and more consistent quality since they control their supply
        chain. In some states like Florida, all dispensaries must be vertically
        integrated.
      </p>

      <h3>Delivery-Only</h3>
      <p>
        Licensed only to sell through delivery, with no physical retail
        location. Often found in California and other mature markets. Can have
        very competitive pricing due to lower overhead. Check BUDS.BOT's
        delivery map to see if any serve your address.
      </p>

      <h3>Medical vs. Dual-License</h3>
      <p>
        Some dispensaries hold only a medical license and require patients to
        have a state-issued medical card. Dual-license dispensaries serve both
        medical patients and recreational adult-use customers, typically through
        the same store with different pricing structures.
      </p>

      <h2>Red Flags: Dispensaries to Avoid</h2>
      <p>
        <strong>No lab testing information available.</strong> Reputable
        dispensaries can provide Certificates of Analysis (COAs) for any
        product. If a budtender can't tell you where to find lab results,
        consider going elsewhere.
      </p>
      <p>
        <strong>Prices dramatically lower than the market average.</strong>{" "}
        Occasionally this is a great deal. More often it indicates old,
        improperly stored, or mislabeled product. Know the average price for
        what you're buying.
      </p>
      <p>
        <strong>High-pressure sales tactics.</strong> A good budtender guides
        and informs — they don't rush you or push you toward the most expensive
        option. Take your time and trust your gut.
      </p>
      <p>
        <strong>Poor online reviews about accuracy.</strong> If multiple
        reviewers mention getting the wrong product, incorrect pricing at
        checkout, or menus that don't match what's available, that's a systemic
        problem.
      </p>
      <p>
        <strong>Unlicensed or unclear license status.</strong> Always verify
        that a dispensary is licensed in your state's official registry.
        BUDS.BOT does this automatically, but if you find a shop elsewhere,
        verify.
      </p>

      <h2>Making the Most of Your Dispensary Visit</h2>
      <p>
        <strong>Go during off-peak hours.</strong> Weekday afternoons are
        typically the least busy. Weekends and right after work hours tend to be
        packed, with longer wait times and busier budtenders who may have less
        time to help you.
      </p>
      <p>
        <strong>Know what you want — but stay open.</strong> It's smart to have
        a general idea of what you're looking for (indica for sleep, something
        for anxiety, pre-rolls for social use) but stay open to budtender
        suggestions. They often know about new arrivals or deals that aren't
        online yet.
      </p>
      <p>
        <strong>Ask about storage and freshness.</strong> Fresh cannabis tastes
        better and hits more effectively. Ask when a product came in and how
        it's stored. Properly cured, humidity-controlled flower makes a
        significant difference.
      </p>

      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <div className="faq-q">How do I find the best dispensary near me?</div>
        <div className="faq-a">
          Search BUDS.BOT by zip code, filter by price/selection/hours, read
          recent reviews, compare live menus, and check for first-time customer
          deals. The "best" dispensary depends on your priorities — price,
          selection, service, or proximity.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-q">
          What should I look for when choosing a dispensary?
        </div>
        <div className="faq-a">
          Key factors: product selection, staff knowledge, pricing, hours, lab
          testing transparency, and cleanliness. First-time buyers should
          prioritize knowledgeable, non-pushy staff who can guide your
          selections.
        </div>
      </div>
    </SeoPageLayout>
  );
}
