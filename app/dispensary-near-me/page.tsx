import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SeoPageLayout from "@/components/SeoPageLayout";

export const metadata: Metadata = buildMetadata({
  title: "Dispensary Near Me — Find Cannabis Dispensaries Open Now",
  description:
    "Find the closest open cannabis dispensaries near you. Search by zip code, compare menus and prices, read reviews, and get directions. Updated in real-time.",
  path: "/dispensary-near-me",
  keywords: [
    "dispensary near me",
    "cannabis dispensary near me",
    "weed dispensary near me",
    "marijuana dispensary open now",
    "closest dispensary",
    "find dispensary by zip code",
  ],
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "BUDS.BOT Dispensary Finder",
  description: "Find cannabis dispensaries near you by zip code or city",
  applicationCategory: "UtilityApplication",
  url: "https://buds.bot/dispensary-near-me",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I find a cannabis dispensary near me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter your zip code or city in the BUDS.BOT dispensary finder. We show all licensed dispensaries within your area, including hours, menus, and real-time pricing. You can filter by recreational vs. medical, open now, delivery, and price range.",
      },
    },
    {
      "@type": "Question",
      name: "Are dispensaries open on holidays?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hours vary by dispensary and state regulations. BUDS.BOT shows real-time hours including holiday schedules. Many dispensaries maintain regular hours on most holidays, but it's always best to verify with the specific store.",
      },
    },
    {
      "@type": "Question",
      name: "What do I need to bring to a dispensary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You'll need a valid government-issued photo ID proving you're 21 or older (18+ with a medical card in some states). Cash is often preferred as many dispensaries are cash-only due to federal banking restrictions, though many now accept debit cards.",
      },
    },
    {
      "@type": "Question",
      name: "Can I order cannabis for delivery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, in many legal states cannabis delivery is permitted. BUDS.BOT filters dispensaries that offer delivery. Delivery is available in California, Michigan, Colorado, Nevada, Massachusetts, and several other states. Rules vary by city and county.",
      },
    },
  ],
};

export default function DispensaryNearMePage() {
  return (
    <SeoPageLayout badge="🔍 Real-time dispensary data across all legal states">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1>Find a Cannabis Dispensary Near Me</h1>
      <p className="hero-intro">
        Search over 15,000 licensed cannabis dispensaries across the United
        States. Filter by location, hours, menu, and pricing — all in one place.
      </p>

      <div className="cta-box">
        <h2 style={{ marginTop: 0 }}>Search Dispensaries Near You</h2>
        <p>
          Enter your zip code to find the closest open dispensaries, compare
          prices, and check live menus.
        </p>
        <a href="/#search">Find Dispensaries →</a>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-num">15,000+</div>
          <div className="stat-label">Licensed Dispensaries</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">38</div>
          <div className="stat-label">Legal States Covered</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">Real-time</div>
          <div className="stat-label">Price & Hours Updates</div>
        </div>
      </div>

      <h2>How Our Dispensary Finder Works</h2>
      <p>
        BUDS.BOT aggregates data from state dispensary registries, official
        licensing databases, and dispensary websites to give you the most
        accurate, up-to-date information possible. Simply enter your zip code
        and we'll show you every licensed dispensary within your search radius,
        sorted by distance.
      </p>
      <p>
        Each listing includes verified hours of operation, accepted payment
        methods, whether delivery is available, current menu highlights, and
        live pricing on popular products like flower, edibles, concentrates, and
        pre-rolls. We refresh pricing data multiple times per day so you're
        always seeing the current deals.
      </p>

      <h2>What to Expect at Your First Dispensary Visit</h2>
      <p>
        Walking into a dispensary for the first time can feel intimidating, but
        most shops are designed to be welcoming and educational. You'll check in
        at the front with your ID, then be guided to the sales floor or met by a
        budtender — a trained cannabis specialist who can answer any questions.
      </p>
      <p>
        Products are organized by category: flower (the traditional cannabis
        bud), pre-rolls, vapes, edibles, tinctures, topicals, and concentrates.
        Each has a label showing THC and CBD percentages, effects, and price.
        Don't hesitate to ask the budtender for recommendations based on your
        goals — whether that's pain relief, sleep, creativity, or just
        relaxation.
      </p>

      <h2>Types of Dispensaries Explained</h2>
      <h3>Recreational Dispensaries (Adult-Use)</h3>
      <p>
        Open to any adult 21 or older with valid ID. No medical card required.
        These are the most common type in fully legalized states like Colorado,
        California, and Illinois. Products are taxed at both state and local
        levels, which is why prices can be higher than medical.
      </p>

      <h3>Medical Dispensaries</h3>
      <p>
        Require a valid medical marijuana card issued by a licensed physician in
        your state. Often have lower taxes, higher purchase limits, and stronger
        products than recreational stores. Available in all legal states and in
        medical-only states like Pennsylvania and Ohio.
      </p>

      <h3>Dual-License (Rec + Med) Dispensaries</h3>
      <p>
        The most common type in mature markets. Serve both recreational and
        medical customers, often through separate entrances or counters. Medical
        patients typically get priority service and better pricing.
      </p>

      <h3>Delivery-Only Operations</h3>
      <p>
        Some dispensaries operate entirely through delivery, often with lower
        overhead and better prices. Legal in California, Michigan,
        Massachusetts, Nevada, and several other states. BUDS.BOT clearly marks
        which dispensaries offer delivery in your area.
      </p>

      <h2>Dispensary Etiquette: Do's and Don'ts</h2>
      <p>
        Cannabis dispensaries operate under strict regulations. Here's what you
        need to know before visiting:
      </p>
      <table>
        <thead>
          <tr>
            <th>Do</th>
            <th>Don't</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bring a valid photo ID (passport or driver's license)</td>
            <td>Bring anyone under 21 (or under 18 for medical)</td>
          </tr>
          <tr>
            <td>Bring cash (ATMs are usually on-site)</td>
            <td>Use a cannabis product on the premises</td>
          </tr>
          <tr>
            <td>Ask the budtender for recommendations</td>
            <td>Photograph products or other customers without permission</td>
          </tr>
          <tr>
            <td>Review your purchase before leaving</td>
            <td>Leave cannabis products visible in your car</td>
          </tr>
          <tr>
            <td>Check the menu online before visiting</td>
            <td>Cross state lines with your purchase</td>
          </tr>
        </tbody>
      </table>

      <h2>Cannabis Dispensary Hotspots by State</h2>
      <p>
        <strong>California:</strong> Over 1,200 licensed dispensaries,
        concentrated in Los Angeles, San Francisco, and San Diego. Delivery
        widely available. Competitive pricing due to market maturity.
      </p>
      <p>
        <strong>Colorado:</strong> The original legal market with over 700
        dispensaries. Denver has the highest density. Known for competitive
        prices and a wide product selection.
      </p>
      <p>
        <strong>Illinois:</strong> Rapidly expanding market with 200+
        dispensaries. Chicago metro has the most options. Higher prices than
        older markets but growing fast.
      </p>
      <p>
        <strong>Michigan:</strong> One of the most competitive markets. Detroit
        and Grand Rapids are well-served. Known for low prices thanks to
        abundant local cultivation.
      </p>
      <p>
        <strong>Washington:</strong> Strong regulatory framework with 600+
        stores. Seattle area has dozens of options with strong competition
        driving good prices.
      </p>

      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <div className="faq-q">
          How do I find a cannabis dispensary near me?
        </div>
        <div className="faq-a">
          Enter your zip code or city in the BUDS.BOT dispensary finder. We show
          all licensed dispensaries within your area, including hours, menus,
          and real-time pricing.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-q">Are dispensaries open on holidays?</div>
        <div className="faq-a">
          Hours vary by dispensary and state regulations. BUDS.BOT shows
          real-time hours including holiday schedules. Many dispensaries
          maintain regular hours on most holidays.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-q">What do I need to bring to a dispensary?</div>
        <div className="faq-a">
          A valid government-issued photo ID proving you're 21 or older. Cash is
          often preferred, though many dispensaries now accept debit cards.
          Medical patients should also bring their state-issued medical card.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-q">Can I order cannabis for delivery?</div>
        <div className="faq-a">
          Yes, in many legal states cannabis delivery is permitted. BUDS.BOT
          filters dispensaries that offer delivery, available in California,
          Michigan, Colorado, Nevada, Massachusetts, and several other states.
        </div>
      </div>
    </SeoPageLayout>
  );
}
