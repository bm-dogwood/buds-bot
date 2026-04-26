import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SeoPageLayout from "@/components/SeoPageLayout";

export const metadata: Metadata = buildMetadata({
  title: "Is Weed Legal in My State? 2025 Marijuana Legality Map",
  description:
    "Complete 2025 guide to cannabis legality by state. Find out if recreational or medical marijuana is legal where you live, possession limits, and state laws.",
  path: "/weed-legal-states",
  keywords: [
    "is weed legal in my state",
    "marijuana legal states 2025",
    "cannabis legality map",
    "recreational marijuana states",
    "medical marijuana states",
    "weed laws by state",
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is weed legal in my state?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As of 2025, recreational cannabis is legal in 24 states plus Washington D.C. Medical cannabis is legal in 38 states total. Cannabis remains federally illegal under the Controlled Substances Act, regardless of state law. Check the full state-by-state breakdown on BUDS.BOT for your specific state's rules.",
      },
    },
    {
      "@type": "Question",
      name: "How much weed can you legally possess?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Possession limits vary by state. Most recreational states allow 1 ounce (28 grams) of flower for adults 21+. Some states like Colorado allow up to 2 ounces. Medical patients often have higher limits. Concentrates and edibles have separate limits measured in milligrams of THC.",
      },
    },
    {
      "@type": "Question",
      name: "Can I travel between legal states with cannabis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Transporting cannabis across state lines is a federal crime, even between two states where cannabis is legal. This applies to all forms of travel including by car, plane, and train. Never take cannabis products with you when crossing state borders.",
      },
    },
  ],
};

const legalityData = {
  recreational: [
    "Alaska",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Illinois",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Montana",
    "Nevada",
    "New Jersey",
    "New Mexico",
    "New York",
    "Ohio",
    "Oregon",
    "Rhode Island",
    "Vermont",
    "Virginia",
    "Washington",
    "Washington D.C.",
  ],
  medicalOnly: [
    "Alabama",
    "Arkansas",
    "Florida",
    "Georgia",
    "Hawaii",
    "Kentucky",
    "Louisiana",
    "Mississippi",
    "New Hampshire",
    "North Dakota",
    "Oklahoma",
    "Pennsylvania",
    "South Dakota",
    "Utah",
    "West Virginia",
  ],
  illegal: [
    "Idaho",
    "Indiana",
    "Iowa",
    "Kansas",
    "Nebraska",
    "North Carolina",
    "South Carolina",
    "Tennessee",
    "Texas",
    "Wisconsin",
    "Wyoming",
  ],
};

export default function WeedLegalStatesPage() {
  return (
    <SeoPageLayout badge="📋 Updated April 2025 — Always verify with your state's official resources">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1>Is Weed Legal in My State? 2025 Cannabis Legality Guide</h1>
      <p className="hero-intro">
        Complete, up-to-date breakdown of marijuana laws across all 50 states.
        Know your rights, possession limits, and what's changing in 2025.
      </p>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-num" style={{ color: "#7fff7f" }}>
            24
          </div>
          <div className="stat-label">Recreational Legal States</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: "#ffdf7f" }}>
            38
          </div>
          <div className="stat-label">Medical Legal States</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: "#ff7f7f" }}>
            11
          </div>
          <div className="stat-label">Fully Illegal States</div>
        </div>
      </div>

      <h2>✅ States Where Recreational Cannabis Is Legal</h2>
      <p>
        These states allow adults 21 and older to purchase, possess, and consume
        cannabis without a medical card. Licensed dispensaries operate legally
        in all of these states.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          margin: "1rem 0 2rem",
        }}
      >
        {legalityData.recreational.map((state) => (
          <span
            key={state}
            className="tag"
            style={{
              background: "rgba(127,255,127,0.12)",
              borderColor: "#3a6a3a",
            }}
          >
            {state}
          </span>
        ))}
      </div>

      <h2>🟡 Medical-Only Cannabis States</h2>
      <p>
        These states permit cannabis for qualifying patients with a state-issued
        medical marijuana card. Recreational use remains illegal. Requirements
        and qualifying conditions vary by state.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          margin: "1rem 0 2rem",
        }}
      >
        {legalityData.medicalOnly.map((state) => (
          <span
            key={state}
            className="tag"
            style={{
              background: "rgba(255,220,127,0.1)",
              borderColor: "#5a5a1a",
              color: "#dfcf6f",
            }}
          >
            {state}
          </span>
        ))}
      </div>

      <h2>🔴 States Where Cannabis Remains Fully Illegal</h2>
      <p>
        These states have not passed any form of cannabis legalization.
        Possession, sale, and cultivation can result in criminal penalties.
        Several have active ballot initiatives pending.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          margin: "1rem 0 2rem",
        }}
      >
        {legalityData.illegal.map((state) => (
          <span
            key={state}
            className="tag"
            style={{
              background: "rgba(255,127,127,0.1)",
              borderColor: "#5a2a2a",
              color: "#df8f8f",
            }}
          >
            {state}
          </span>
        ))}
      </div>

      <h2>Possession Limits by State (Recreational)</h2>
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Flower Limit</th>
            <th>Concentrate Limit</th>
            <th>Home Grow</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["California", "1 oz", "8g", "6 plants"],
            ["Colorado", "2 oz", "8g", "3 plants (flowering)"],
            ["Michigan", "2.5 oz", "15g", "12 plants"],
            ["Oregon", "1 oz (public)", "No limit (home)", "4 plants"],
            ["Illinois", "30g (resident)", "500mg THC", "Medical only"],
            ["New York", "3 oz", "24g", "6 plants (home)"],
            ["Nevada", "1 oz", "3.5g", "Not permitted"],
            ["Washington", "1 oz", "7g", "Not permitted"],
          ].map(([state, flower, concentrate, grow]) => (
            <tr key={state}>
              <td>
                <strong>{state}</strong>
              </td>
              <td>{flower}</td>
              <td>{concentrate}</td>
              <td>{grow}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>States to Watch: 2025 Legalization Efforts</h2>
      <h3>Florida</h3>
      <p>
        After a 2024 ballot initiative narrowly failed to reach the 60%
        supermajority threshold required in Florida, advocates are regrouping
        for another attempt. Florida's medical program is one of the largest in
        the country, and polling consistently shows majority support for adult
        use.
      </p>
      <h3>Texas</h3>
      <p>
        Texas has the most restrictive medical program in the country, limited
        to specific conditions and low-THC products. While full legalization
        faces steep political challenges in the legislature, decriminalization
        efforts at the city level have succeeded in Houston, Austin, and San
        Antonio.
      </p>
      <h3>North Carolina</h3>
      <p>
        Medical cannabis passed the state Senate with bipartisan support and is
        moving through the House. If signed, North Carolina would join the
        growing list of Southern states expanding cannabis access.
      </p>
      <h3>Pennsylvania</h3>
      <p>
        Pennsylvania has a robust medical program and the governor has been
        vocal in supporting adult-use legalization. Legislation has been
        introduced and is advancing through the state legislature.
      </p>

      <h2>Understanding Federal Law vs. State Law</h2>
      <p>
        This is the most important thing to understand about cannabis in the
        United States:{" "}
        <strong>
          cannabis remains a Schedule I controlled substance under federal law
        </strong>
        , regardless of what your state says. This creates an unusual legal
        patchwork where an activity can be perfectly legal under state law while
        technically violating federal law.
      </p>
      <p>
        In practice, the federal government has largely taken a hands-off
        approach to state-legal cannabis businesses and consumers since 2013,
        guided by the Cole Memorandum and similar policy guidance. However, this
        can change with any new administration, and federal prohibition still
        causes real problems: it restricts cannabis businesses from accessing
        banking, makes crossing state lines with cannabis a federal crime, and
        creates complications for federal employees and certain other
        professions.
      </p>
      <p>
        The SAFER Banking Act and other federal reform measures continue to be
        debated in Congress. Many advocates expect rescheduling or descheduling
        of cannabis at the federal level in the coming years.
      </p>

      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <div className="faq-q">Is weed legal in my state?</div>
        <div className="faq-a">
          As of 2025, recreational cannabis is legal in 24 states plus
          Washington D.C. Medical cannabis is legal in 38 states. Cannabis
          remains federally illegal regardless of state law. Check the state
          listings above for your specific state's status.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-q">How much weed can you legally possess?</div>
        <div className="faq-a">
          Most recreational states allow 1 ounce (28g) of flower for adults 21+.
          Some states like Michigan allow 2.5 oz. Concentrates and edibles have
          separate limits. Medical patients typically have higher limits.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-q">
          Can I travel between legal states with cannabis?
        </div>
        <div className="faq-a">
          No. Transporting cannabis across state lines is a federal crime, even
          between two legal states. This applies to all travel including car,
          plane, and train. Never cross state borders with cannabis products.
        </div>
      </div>

      <div className="cta-box">
        <h2 style={{ marginTop: 0 }}>Find Dispensaries in Your State</h2>
        <p>Now that you know the rules, find the best dispensaries near you.</p>
        <a href="/dispensary-near-me">Find Dispensaries →</a>
      </div>
    </SeoPageLayout>
  );
}
