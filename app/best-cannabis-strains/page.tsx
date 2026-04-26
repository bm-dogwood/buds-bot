import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SeoPageLayout from "@/components/SeoPageLayout";

export const metadata: Metadata = buildMetadata({
  title: "Cannabis Strain Database — Effects, THC%, & Reviews",
  description:
    "Explore thousands of cannabis strains. Search by effects, THC content, flavor, and medical benefits. Find the perfect indica, sativa, or hybrid strain for you.",
  path: "/strain-database",
  keywords: [
    "cannabis strain database",
    "weed strains",
    "indica vs sativa",
    "best cannabis strains",
    "strain effects",
    "THC percentage strains",
    "marijuana strain guide",
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between indica and sativa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Indica strains are traditionally associated with relaxing, body-heavy effects good for sleep and pain relief. Sativa strains are associated with energizing, uplifting cerebral effects good for creativity and focus. However, modern cannabis science shows these distinctions are overly simplified — the actual effects depend more on the specific cannabinoid and terpene profile of each individual strain than on indica/sativa classification.",
      },
    },
    {
      "@type": "Question",
      name: "What is a hybrid cannabis strain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hybrid strains are crosses between indica and sativa genetics, bred to combine desirable traits from both. Most cannabis available today is technically some form of hybrid. They're classified as indica-dominant, sativa-dominant, or balanced hybrids based on which effects predominate.",
      },
    },
    {
      "@type": "Question",
      name: "What THC percentage is best for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For beginners, strains with 10–15% THC are recommended. High-potency strains (20–30%+ THC) can cause anxiety and discomfort in new users. Starting low and going slow allows you to find your comfortable dose. CBD-rich strains can also help mitigate unwanted psychoactive effects.",
      },
    },
  ],
};

const featuredStrains = [
  {
    name: "Blue Dream",
    type: "Sativa-Dominant Hybrid",
    thc: "21%",
    cbd: "0.1%",
    effects: ["Euphoric", "Creative", "Uplifting"],
    flavor: "Blueberry, Sweet",
    best: "Daytime use, creativity",
  },
  {
    name: "OG Kush",
    type: "Hybrid",
    thc: "23%",
    cbd: "0.3%",
    effects: ["Relaxed", "Happy", "Euphoric"],
    flavor: "Earthy, Pine, Woody",
    best: "Stress relief, evening",
  },
  {
    name: "Girl Scout Cookies",
    type: "Indica-Dominant Hybrid",
    thc: "28%",
    cbd: "0.2%",
    effects: ["Euphoric", "Relaxed", "Creative"],
    flavor: "Sweet, Earthy, Mint",
    best: "Pain relief, sleep",
  },
  {
    name: "Sour Diesel",
    type: "Sativa",
    thc: "22%",
    cbd: "0.2%",
    effects: ["Energetic", "Happy", "Uplifting"],
    flavor: "Diesel, Earthy, Citrus",
    best: "Morning, focus, energy",
  },
  {
    name: "Granddaddy Purple",
    type: "Indica",
    thc: "20%",
    cbd: "0.1%",
    effects: ["Relaxed", "Sleepy", "Happy"],
    flavor: "Grape, Berry, Sweet",
    best: "Sleep, pain, stress",
  },
  {
    name: "Green Crack",
    type: "Sativa",
    thc: "24%",
    cbd: "0.1%",
    effects: ["Energetic", "Focused", "Uplifting"],
    flavor: "Citrus, Sweet, Tropical",
    best: "Daytime energy, ADHD",
  },
];

const terpenes = [
  {
    name: "Myrcene",
    smell: "Earthy, Musky",
    effects: "Relaxing, Sedating",
    foundIn: "OG Kush, Blue Dream",
  },
  {
    name: "Limonene",
    smell: "Citrus, Lemon",
    effects: "Uplifting, Anti-anxiety",
    foundIn: "Sour Diesel, Jack Herer",
  },
  {
    name: "Caryophyllene",
    smell: "Spicy, Pepper",
    effects: "Anti-inflammatory",
    foundIn: "GSC, Chemdawg",
  },
  {
    name: "Pinene",
    smell: "Pine, Fresh",
    effects: "Alert, Memory retention",
    foundIn: "Jack Herer, Critical Mass",
  },
  {
    name: "Linalool",
    smell: "Floral, Lavender",
    effects: "Calming, Anti-anxiety",
    foundIn: "Amnesia Haze, OG Shark",
  },
  {
    name: "Terpinolene",
    smell: "Floral, Herbal",
    effects: "Uplifting, Antioxidant",
    foundIn: "Ghost Train Haze, XJ-13",
  },
];

export default function StrainDatabasePage() {
  return (
    <SeoPageLayout badge="🌱 5,000+ strains with real user reviews and lab data">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1>Cannabis Strain Database & Effects Guide</h1>
      <p className="hero-intro">
        Explore 5,000+ cannabis strains with detailed effects, flavor profiles,
        THC/CBD percentages, and real user reviews. Find the perfect strain for
        your needs.
      </p>

      <div className="cta-box">
        <h2 style={{ marginTop: 0 }}>Find Your Perfect Strain</h2>
        <p>
          Filter by effects (relaxed, energetic, creative, sleepy), flavor, THC
          content, and medical benefits.
        </p>
        <a href="/#strain-search">Search Strains →</a>
      </div>

      <h2>Featured Strains</h2>
      <div className="strain-grid">
        {featuredStrains.map((strain) => (
          <div key={strain.name} className="strain-card">
            <div className="strain-name">{strain.name}</div>
            <div className="strain-type">{strain.type}</div>
            <div
              style={{
                margin: "0.5rem 0",
                fontSize: "0.9rem",
                color: "#a8d8a8",
              }}
            >
              THC: <strong style={{ color: "#7fff7f" }}>{strain.thc}</strong> ·
              CBD: {strain.cbd}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.25rem",
                margin: "0.5rem 0",
              }}
            >
              {strain.effects.map((e) => (
                <span key={e} className="tag">
                  {e}
                </span>
              ))}
            </div>
            <div style={{ fontSize: "0.8rem", color: "#6a8a6a" }}>
              🍋 {strain.flavor}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "#5a7a5a",
                marginTop: "0.25rem",
              }}
            >
              Best for: {strain.best}
            </div>
          </div>
        ))}
      </div>

      <h2>Understanding Indica vs. Sativa vs. Hybrid</h2>
      <h3>The Traditional View</h3>
      <p>
        For decades, cannabis consumers used indica and sativa as shorthand for
        the type of high they'd get. Indica = "in-da-couch," body heavy, good
        for sleep. Sativa = energetic, heady, good for creativity and daytime
        use. Hybrids fall somewhere in the middle.
      </p>
      <h3>The Modern Reality</h3>
      <p>
        Contemporary cannabis science tells a more complex story. The
        indica/sativa distinction refers to plant morphology — indica plants are
        shorter and bushy, sativa plants are tall and lanky. But thanks to
        decades of crossbreeding, virtually all cannabis available today is a
        genetic hybrid. The actual effects you experience depend primarily on
        the strain's terpene profile and full cannabinoid spectrum, not just its
        classification.
      </p>
      <p>
        This is why two different "indicas" can feel completely different, and
        why some sativas can actually be quite relaxing. BUDS.BOT's strain
        database focuses on detailed terpene and cannabinoid data so you can
        find strains based on actual effects rather than oversimplified
        categories.
      </p>

      <h2>What Are Terpenes and Why Do They Matter?</h2>
      <p>
        Terpenes are the aromatic compounds in cannabis (and all plants) that
        create distinctive smells and flavors. They also interact with
        cannabinoids to shape your experience — a phenomenon called the
        "entourage effect." Here are the most common cannabis terpenes and their
        effects:
      </p>
      <table>
        <thead>
          <tr>
            <th>Terpene</th>
            <th>Aroma</th>
            <th>Associated Effects</th>
            <th>Common Strains</th>
          </tr>
        </thead>
        <tbody>
          {terpenes.map((t) => (
            <tr key={t.name}>
              <td>
                <strong>{t.name}</strong>
              </td>
              <td style={{ color: "#a8d8a8" }}>{t.smell}</td>
              <td>{t.effects}</td>
              <td style={{ color: "#6a8a6a", fontSize: "0.85rem" }}>
                {t.foundIn}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Choosing a Strain by Effect</h2>
      <h3>Best Strains for Sleep</h3>
      <p>
        High-myrcene indicas tend to work best for sleep. Look for Granddaddy
        Purple, Northern Lights, 9 Pound Hammer, Tahoe OG, and Bubba Kush.
        Strains with more CBD can also be helpful without heavy sedation.
      </p>

      <h3>Best Strains for Anxiety</h3>
      <p>
        For anxiety, lower THC is often better — high THC can worsen anxiety in
        sensitive individuals. CBD-rich strains like ACDC, Harlequin, and
        Charlotte's Web offer relief without intense psychoactivity. Balanced
        hybrids like Cannatonic are also popular.
      </p>

      <h3>Best Strains for Creativity and Focus</h3>
      <p>
        High-limonene and high-terpinolene sativas are popular for creative
        work. Jack Herer, Durban Poison, Super Silver Haze, and Green Crack are
        consistently recommended for focus, energy, and creative flow states.
      </p>

      <h3>Best Strains for Pain Relief</h3>
      <p>
        High-CBD strains and potent indicas with caryophyllene are often
        recommended for pain. OG Kush, White Widow, ACDC, and Blueberry are
        commonly reported as effective for chronic pain, inflammation, and
        muscle tension.
      </p>

      <h2>Understanding THC and CBD Percentages</h2>
      <p>
        THC (tetrahydrocannabinol) is the primary psychoactive compound. Higher
        THC percentages generally mean stronger intoxication. Today's dispensary
        cannabis often ranges from 15% to 30%+ THC, significantly more potent
        than cannabis from 20–30 years ago.
      </p>
      <p>
        CBD (cannabidiol) is non-intoxicating and is associated with
        anti-anxiety, anti-inflammatory, and anti-epileptic effects. High-CBD
        strains (10%+ CBD) are popular for medical use without the psychoactive
        effects. The ratio of THC to CBD significantly shapes the overall
        experience.
      </p>
      <p>
        <strong>For beginners:</strong> Start with strains in the 10–15% THC
        range. Strains with a more balanced CBD ratio (like 1:1 THC:CBD) are
        gentler. Give yourself time between doses and remember that edibles take
        much longer to kick in than inhaled cannabis.
      </p>

      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <div className="faq-q">
          What is the difference between indica and sativa?
        </div>
        <div className="faq-a">
          Indica strains are traditionally associated with relaxing, body-heavy
          effects. Sativa strains with energizing, cerebral effects. However,
          modern cannabis science shows effects actually depend more on each
          strain's unique cannabinoid and terpene profile than on these broad
          classifications.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-q">What is a hybrid cannabis strain?</div>
        <div className="faq-a">
          Hybrids are crosses between indica and sativa genetics. Most cannabis
          available today is technically a hybrid. They're classified as
          indica-dominant, sativa-dominant, or balanced based on which effects
          predominate.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-q">What THC percentage is best for beginners?</div>
        <div className="faq-a">
          For beginners, 10–15% THC strains are recommended. High-potency
          strains (20–30%+ THC) can cause anxiety in new users. Start low and go
          slow, and consider CBD-rich strains to mitigate unwanted effects.
        </div>
      </div>
    </SeoPageLayout>
  );
}
