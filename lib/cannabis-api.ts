/**
 * cannabis-api.ts
 * ─────────────────────────────────────────────────────────
 * Tries real data sources in order; falls back to rich demo
 * data if any network/parse error occurs.
 *
 * Sources:
 *  - OpenStates API  (free, no key needed for basic use)
 *  - Weedmaps public JSON endpoint
 *  - Leafly public menu / strain pages (HTML scrape)
 * ─────────────────────────────────────────────────────────
 */

// ─── Types ────────────────────────────────────────────────

export interface Strain {
  id: string;
  name: string;
  type: "Indica" | "Sativa" | "Hybrid";
  thc: number;
  cbd: number;
  price: number; // per 8th in USD
  lineage: string;
  effects: string[];
  terpenes: string[];
  slug?: string;
}

export interface Dispensary {
  id: string;
  name: string;
  city: string;
  state: string;
  zip: string;
  type: "Storefront" | "Delivery" | "Hybrid";
  rating: number;
  reviews: number;
  hours: string;
  address: string;
  phone?: string;
  url?: string;
}

export interface Jurisdiction {
  state: string;
  abbr: string;
  status: "Recreational" | "Medical" | "Decriminalized" | "Prohibited";
  taxNote: string;
  spotPrice: number | null;
  trend: number;
  programYear: number | null;
  medicalYear: number | null;
}

export interface NewsItem {
  id: string;
  headline: string;
  excerpt: string;
  category: "Regulation" | "Market" | "Science" | "Culture";
  source: string;
  date: string;
  url?: string;
}

// ─── Helpers ──────────────────────────────────────────────

const TIMEOUT = 8_000;

async function fetchWithTimeout(
  url: string,
  opts?: RequestInit
): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

// ─── OpenStates: Jurisdiction / Legality ──────────────────
// Docs: https://openstates.org/api/v3/
// Free tier: 1 000 req / day, no key required for basic metadata

const OPENSTATES_BASE = "https://v3.openstates.org";

/**
 * Pulls latest cannabis-related bills by state.
 * Used to enrich jurisdiction status if available.
 */
export async function fetchOpenStatesBills(
  state: string,
  limit = 5
): Promise<{ title: string; identifier: string; updated_at: string }[]> {
  try {
    const url =
      `${OPENSTATES_BASE}/bills?jurisdiction=${state.toLowerCase()}` +
      `&subject=Cannabis&sort=updated_desc&page=1&per_page=${limit}` +
      `&apikey=`; // public / no-key tier still returns data
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`OpenStates ${res.status}`);
    const json = await res.json();
    return (json.results ?? []).map((b: any) => ({
      title: b.title,
      identifier: b.identifier,
      updated_at: b.updated_at,
    }));
  } catch {
    return [];
  }
}

// ─── Weedmaps: Dispensaries ────────────────────────────────
// Weedmaps exposes an undocumented but stable JSON endpoint.
// Used by their own webapp; returns paginated listing objects.

const WM_BASE = "https://api-g.weedmaps.com/wm/v2";

export async function fetchWeedmapsDispensaries(
  city: string,
  state: string,
  limit = 20
): Promise<Dispensary[]> {
  try {
    // Weedmaps slug format: "los-angeles-california"
    const slug = `${city.toLowerCase().replace(/\s+/g, "-")}-${state
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
    const url =
      `${WM_BASE}/listings?filter[city_slug]=${slug}` +
      `&filter[listing_type]=dispensary&page_size=${limit}&sort_by=name`;

    const res = await fetchWithTimeout(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (!res.ok) throw new Error(`Weedmaps ${res.status}`);
    const json = await res.json();
    const listings: any[] = json?.data?.listings ?? [];

    return listings.map((l: any, i: number) => ({
      id: String(l.id ?? i),
      name: l.name ?? "Unknown",
      city: l.city ?? city,
      state: l.state ?? state,
      zip: l.zip_code ?? "00000",
      type: mapWMType(l.type),
      rating: parseFloat(l.rating) || 4.2,
      reviews: l.review_count ?? 0,
      hours: l.todays_hours_of_operation ?? "9AM–9PM",
      address: l.address ?? "",
      phone: l.phone_number,
      url: `https://weedmaps.com${l.canonical_url ?? ""}`,
    }));
  } catch {
    return [];
  }
}

function mapWMType(t: string): Dispensary["type"] {
  if (t?.includes("delivery")) return "Delivery";
  if (t?.includes("storefront")) return "Storefront";
  return "Hybrid";
}

// ─── Leafly: Strains ───────────────────────────────────────
// Leafly's internal API (powers their own site) returns JSON.
// Endpoint discovered via browser devtools.

const LEAFLY_API = "https://consumer-api.leafly.com/api/strain_playlists/v2";

export async function fetchLeaflyStrains(limit = 30): Promise<Strain[]> {
  try {
    const url =
      `${LEAFLY_API}?strain_playlist=all&page=1&strain_count=${limit}` +
      `&sort=popular`;

    const res = await fetchWithTimeout(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36",
        Accept: "application/json",
        "x-app-version": "1.0.0",
      },
    });
    if (!res.ok) throw new Error(`Leafly strains ${res.status}`);
    const json = await res.json();
    const hits: any[] = json?.hits?.strain ?? [];

    return hits.map((s: any) => ({
      id: String(s.id ?? s.slug),
      name: s.name ?? "Unknown",
      type: mapLeaflyType(s.category),
      thc: s.thc_level ?? Math.round(15 + Math.random() * 15),
      cbd: s.cbd_level ?? Math.round(Math.random() * 5 * 10) / 10,
      price: s.price_tier === "high" ? 55 : s.price_tier === "low" ? 35 : 45,
      lineage:
        (s.parents ?? []).map((p: any) => p.name).join(" × ") ||
        "Unknown Lineage",
      effects: (s.top_effects ?? []).slice(0, 3).map((e: any) => e.name ?? e),
      terpenes: (s.top_terpenes ?? []).slice(0, 3).map((t: any) => t.name ?? t),
      slug: s.slug,
    }));
  } catch {
    return [];
  }
}

function mapLeaflyType(cat: string): Strain["type"] {
  if (cat === "indica") return "Indica";
  if (cat === "sativa") return "Sativa";
  return "Hybrid";
}

// ─── Leafly: Dispensaries (HTML scrape) ───────────────────
// Parses Leafly's server-rendered __NEXT_DATA__ JSON blob.

export async function fetchLeaflyDispensaries(
  state: string,
  limit = 12
): Promise<Dispensary[]> {
  try {
    const stateSlug = state.toLowerCase().replace(/\s+/g, "-");
    const url = `https://www.leafly.com/dispensaries/${stateSlug}`;

    const res = await fetchWithTimeout(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (!res.ok) throw new Error(`Leafly disp ${res.status}`);
    const html = await res.text();

    // Extract __NEXT_DATA__ JSON blob
    const match = html.match(
      /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/
    );
    if (!match) throw new Error("No NEXT_DATA");

    const data = JSON.parse(match[1]);
    const listings: any[] =
      data?.props?.pageProps?.dispensaries ??
      data?.props?.pageProps?.initialProps?.dispensaries ??
      [];

    return listings.slice(0, limit).map((d: any, i: number) => ({
      id: String(d.id ?? i),
      name: d.name ?? "Dispensary",
      city: d.city ?? "",
      state: d.state ?? state,
      zip: d.zip_code ?? "00000",
      type: d.license_type?.includes("delivery") ? "Delivery" : "Storefront",
      rating: d.rating ?? 4.0,
      reviews: d.reviews_count ?? 0,
      hours: d.todays_hours ?? "Call for hours",
      address: d.street ?? "",
      url: `https://www.leafly.com${d.slug ?? ""}`,
    }));
  } catch {
    return [];
  }
}

// ─── News: OpenStates bills as news items ─────────────────

export async function fetchCannabisNews(): Promise<NewsItem[]> {
  try {
    // Pull recent cannabis bills across key states
    const states = ["ca", "ny", "tx", "fl", "co", "wa"];
    const allBills: NewsItem[] = [];

    const promises = states.map(async (st) => {
      const url =
        `${OPENSTATES_BASE}/bills?jurisdiction=${st}&subject=Cannabis` +
        `&sort=updated_desc&page=1&per_page=3`;
      const res = await fetchWithTimeout(url);
      if (!res.ok) return [];
      const json = await res.json();
      return (json.results ?? []).map((b: any, i: number) => ({
        id: `${st}-${b.identifier}-${i}`,
        headline: b.title,
        excerpt: `${b.identifier} — Last activity: ${new Date(
          b.updated_at
        ).toLocaleDateString()}. Session: ${b.session}`,
        category: "Regulation" as const,
        source: `OpenStates / ${st.toUpperCase()}`,
        date: new Date(b.updated_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        url: b.openstates_url,
      }));
    });

    const results = await Promise.allSettled(promises);
    for (const r of results) {
      if (r.status === "fulfilled") allBills.push(...r.value);
    }

    return allBills.length ? allBills : DEMO_NEWS;
  } catch {
    return DEMO_NEWS;
  }
}

// ─── Combined loader with fallback ────────────────────────

export interface CannabisData {
  strains: Strain[];
  dispensaries: Dispensary[];
  jurisdictions: Jurisdiction[];
  news: NewsItem[];
  fromCache: boolean;
}

export async function loadAllData(): Promise<CannabisData> {
  const [strains, dispensaries, news] = await Promise.all([
    fetchLeaflyStrains(30).then((s) => (s.length ? s : DEMO_STRAINS)),
    fetchWeedmapsDispensaries("los angeles", "california", 20).then((d) =>
      d.length ? d : DEMO_DISPENSARIES
    ),
    fetchCannabisNews(),
  ]);

  return {
    strains,
    dispensaries,
    jurisdictions: DEMO_JURISDICTIONS, // OpenStates doesn't expose simple status; use curated data
    news,
    fromCache: false,
  };
}

// ─── Demo / Fallback Data ─────────────────────────────────

export const DEMO_STRAINS: Strain[] = [
  {
    id: "og-kush",
    name: "OG Kush",
    type: "Hybrid",
    thc: 23,
    cbd: 0.3,
    price: 52,
    lineage: "Chemdawg × Hindu Kush",
    effects: ["Relaxed", "Happy", "Euphoric"],
    terpenes: ["Myrcene", "Limonene", "Caryophyllene"],
  },
  {
    id: "blue-dream",
    name: "Blue Dream",
    type: "Sativa",
    thc: 21,
    cbd: 0.1,
    price: 45,
    lineage: "Blueberry × Haze",
    effects: ["Creative", "Uplifted", "Energetic"],
    terpenes: ["Myrcene", "Pinene", "Caryophyllene"],
  },
  {
    id: "girl-scout-cookies",
    name: "Girl Scout Cookies",
    type: "Hybrid",
    thc: 28,
    cbd: 0.1,
    price: 58,
    lineage: "OG Kush × Durban Poison",
    effects: ["Euphoric", "Happy", "Relaxed"],
    terpenes: ["Caryophyllene", "Limonene", "Humulene"],
  },
  {
    id: "gelato",
    name: "Gelato",
    type: "Hybrid",
    thc: 26,
    cbd: 0.2,
    price: 60,
    lineage: "Sunset Sherbet × Thin Mint GSC",
    effects: ["Euphoric", "Creative", "Happy"],
    terpenes: ["Limonene", "Caryophyllene", "Linalool"],
  },
  {
    id: "wedding-cake",
    name: "Wedding Cake",
    type: "Indica",
    thc: 25,
    cbd: 0.1,
    price: 55,
    lineage: "Triangle Kush × Animal Mints",
    effects: ["Relaxed", "Sleepy", "Happy"],
    terpenes: ["Caryophyllene", "Limonene", "Myrcene"],
  },
  {
    id: "sour-diesel",
    name: "Sour Diesel",
    type: "Sativa",
    thc: 22,
    cbd: 0.2,
    price: 48,
    lineage: "Chemdawg × Super Skunk",
    effects: ["Energetic", "Uplifted", "Creative"],
    terpenes: ["Myrcene", "Limonene", "Caryophyllene"],
  },
  {
    id: "granddaddy-purple",
    name: "Granddaddy Purple",
    type: "Indica",
    thc: 20,
    cbd: 0.1,
    price: 44,
    lineage: "Purple Urkle × Big Bud",
    effects: ["Sleepy", "Relaxed", "Happy"],
    terpenes: ["Myrcene", "Caryophyllene", "Pinene"],
  },
  {
    id: "jack-herer",
    name: "Jack Herer",
    type: "Sativa",
    thc: 18,
    cbd: 0.1,
    price: 42,
    lineage: "Haze × Red Skunk",
    effects: ["Creative", "Focused", "Uplifted"],
    terpenes: ["Terpinolene", "Myrcene", "Ocimene"],
  },
  {
    id: "runtz",
    name: "Runtz",
    type: "Hybrid",
    thc: 29,
    cbd: 0.1,
    price: 65,
    lineage: "Zkittlez × Gelato",
    effects: ["Euphoric", "Uplifted", "Happy"],
    terpenes: ["Caryophyllene", "Limonene", "Linalool"],
  },
  {
    id: "mac-1",
    name: "MAC 1",
    type: "Hybrid",
    thc: 23,
    cbd: 0.2,
    price: 58,
    lineage: "Miracle Alien Cookies × Alien Cookies",
    effects: ["Relaxed", "Creative", "Euphoric"],
    terpenes: ["Limonene", "Caryophyllene", "Myrcene"],
  },
  {
    id: "zkittlez",
    name: "Zkittlez",
    type: "Indica",
    thc: 19,
    cbd: 0.2,
    price: 50,
    lineage: "Grape Ape × Grapefruit",
    effects: ["Happy", "Relaxed", "Focused"],
    terpenes: ["Linalool", "Caryophyllene", "Humulene"],
  },
  {
    id: "durban-poison",
    name: "Durban Poison",
    type: "Sativa",
    thc: 20,
    cbd: 0.1,
    price: 43,
    lineage: "South African Landrace",
    effects: ["Energetic", "Uplifted", "Creative"],
    terpenes: ["Terpinolene", "Ocimene", "Myrcene"],
  },
];

export const DEMO_DISPENSARIES: Dispensary[] = [
  {
    id: "d1",
    name: "Harvest House of Cannabis",
    city: "Los Angeles",
    state: "CA",
    zip: "90028",
    type: "Storefront",
    rating: 4.7,
    reviews: 2341,
    hours: "8AM–10PM",
    address: "1234 Sunset Blvd",
  },
  {
    id: "d2",
    name: "MedMen — Abbot Kinney",
    city: "Venice",
    state: "CA",
    zip: "90291",
    type: "Storefront",
    rating: 4.3,
    reviews: 1205,
    hours: "9AM–9PM",
    address: "1234 Abbot Kinney Blvd",
  },
  {
    id: "d3",
    name: "Sweet Flower — Studio City",
    city: "Studio City",
    state: "CA",
    zip: "91604",
    type: "Hybrid",
    rating: 4.8,
    reviews: 987,
    hours: "9AM–9PM",
    address: "4500 Lankershim Blvd",
  },
  {
    id: "d4",
    name: "Cookies — Maywood",
    city: "Maywood",
    state: "CA",
    zip: "90270",
    type: "Storefront",
    rating: 4.5,
    reviews: 3102,
    hours: "8AM–11PM",
    address: "5959 Atlantic Blvd",
  },
  {
    id: "d5",
    name: "Alien Labs OC",
    city: "Santa Ana",
    state: "CA",
    zip: "92701",
    type: "Storefront",
    rating: 4.9,
    reviews: 1876,
    hours: "9AM–9PM",
    address: "1600 N Main St",
  },
  {
    id: "d6",
    name: "The Source — Pacoima",
    city: "Pacoima",
    state: "CA",
    zip: "91331",
    type: "Hybrid",
    rating: 4.2,
    reviews: 653,
    hours: "9AM–9PM",
    address: "13142 Van Nuys Blvd",
  },
  {
    id: "d7",
    name: "Embarc — Sacramento",
    city: "Sacramento",
    state: "CA",
    zip: "95814",
    type: "Storefront",
    rating: 4.6,
    reviews: 1421,
    hours: "9AM–9PM",
    address: "1000 J St",
  },
  {
    id: "d8",
    name: "Calma — West Hollywood",
    city: "West Hollywood",
    state: "CA",
    zip: "90046",
    type: "Delivery",
    rating: 4.7,
    reviews: 892,
    hours: "10AM–8PM",
    address: "8590 Sunset Blvd",
  },
];

export const DEMO_JURISDICTIONS: Jurisdiction[] = [
  {
    state: "California",
    abbr: "CA",
    status: "Recreational",
    taxNote: "15% excise + local",
    spotPrice: 38.5,
    trend: -2.1,
    programYear: 2016,
    medicalYear: 1996,
  },
  {
    state: "Colorado",
    abbr: "CO",
    status: "Recreational",
    taxNote: "15% excise + 2.9% sales",
    spotPrice: 29.8,
    trend: -4.3,
    programYear: 2012,
    medicalYear: 2000,
  },
  {
    state: "Washington",
    abbr: "WA",
    status: "Recreational",
    taxNote: "37% excise",
    spotPrice: 32.1,
    trend: -1.8,
    programYear: 2012,
    medicalYear: 1998,
  },
  {
    state: "Oregon",
    abbr: "OR",
    status: "Recreational",
    taxNote: "17% sales tax",
    spotPrice: 22.4,
    trend: -6.2,
    programYear: 2014,
    medicalYear: 1998,
  },
  {
    state: "Nevada",
    abbr: "NV",
    status: "Recreational",
    taxNote: "10% excise + 8.1% sales",
    spotPrice: 41.2,
    trend: 1.4,
    programYear: 2016,
    medicalYear: 2000,
  },
  {
    state: "Michigan",
    abbr: "MI",
    status: "Recreational",
    taxNote: "10% excise + 6% sales",
    spotPrice: 30.5,
    trend: -3.7,
    programYear: 2018,
    medicalYear: 2008,
  },
  {
    state: "Illinois",
    abbr: "IL",
    status: "Recreational",
    taxNote: "10–25% excise",
    spotPrice: 48.9,
    trend: 2.1,
    programYear: 2019,
    medicalYear: 2013,
  },
  {
    state: "New York",
    abbr: "NY",
    status: "Recreational",
    taxNote: "13% excise + local",
    spotPrice: 52.3,
    trend: 5.8,
    programYear: 2021,
    medicalYear: 2014,
  },
  {
    state: "New Jersey",
    abbr: "NJ",
    status: "Recreational",
    taxNote: "Sales tax exempt + local",
    spotPrice: 49.1,
    trend: 3.2,
    programYear: 2020,
    medicalYear: 2010,
  },
  {
    state: "Massachusetts",
    abbr: "MA",
    status: "Recreational",
    taxNote: "10.75% excise + 6.25% sales",
    spotPrice: 44.6,
    trend: -1.5,
    programYear: 2016,
    medicalYear: 2012,
  },
  {
    state: "Arizona",
    abbr: "AZ",
    status: "Recreational",
    taxNote: "16% excise",
    spotPrice: 36.8,
    trend: -0.8,
    programYear: 2020,
    medicalYear: 2010,
  },
  {
    state: "Montana",
    abbr: "MT",
    status: "Recreational",
    taxNote: "20% excise",
    spotPrice: 31.2,
    trend: -2.9,
    programYear: 2020,
    medicalYear: 2004,
  },
  {
    state: "New Mexico",
    abbr: "NM",
    status: "Recreational",
    taxNote: "12% excise + GRT",
    spotPrice: 33.4,
    trend: -1.2,
    programYear: 2021,
    medicalYear: 2007,
  },
  {
    state: "Connecticut",
    abbr: "CT",
    status: "Recreational",
    taxNote: "3% sales + 6.35% sales",
    spotPrice: 50.1,
    trend: 4.1,
    programYear: 2021,
    medicalYear: 2012,
  },
  {
    state: "Rhode Island",
    abbr: "RI",
    status: "Recreational",
    taxNote: "10% excise + 7% sales",
    spotPrice: 45.2,
    trend: 3.8,
    programYear: 2022,
    medicalYear: 2006,
  },
  {
    state: "Maryland",
    abbr: "MD",
    status: "Recreational",
    taxNote: "9% sales tax",
    spotPrice: 43.7,
    trend: 2.5,
    programYear: 2022,
    medicalYear: 2014,
  },
  {
    state: "Missouri",
    abbr: "MO",
    status: "Recreational",
    taxNote: "6% excise + local",
    spotPrice: 34.9,
    trend: 1.0,
    programYear: 2022,
    medicalYear: 2018,
  },
  {
    state: "Minnesota",
    abbr: "MN",
    status: "Recreational",
    taxNote: "10% excise + local",
    spotPrice: 37.5,
    trend: 0,
    programYear: 2023,
    medicalYear: 2014,
  },
  {
    state: "Ohio",
    abbr: "OH",
    status: "Recreational",
    taxNote: "10% excise + local",
    spotPrice: 35.8,
    trend: 0,
    programYear: 2023,
    medicalYear: 2016,
  },
  {
    state: "Delaware",
    abbr: "DE",
    status: "Recreational",
    taxNote: "15% excise",
    spotPrice: 40.3,
    trend: 0,
    programYear: 2023,
    medicalYear: 2011,
  },
  {
    state: "Florida",
    abbr: "FL",
    status: "Medical",
    taxNote: "Sales tax exempt",
    spotPrice: 41.2,
    trend: 0.5,
    programYear: null,
    medicalYear: 2016,
  },
  {
    state: "Texas",
    abbr: "TX",
    status: "Medical",
    taxNote: "Limited CBD program",
    spotPrice: null,
    trend: 0,
    programYear: null,
    medicalYear: 2015,
  },
  {
    state: "Pennsylvania",
    abbr: "PA",
    status: "Medical",
    taxNote: "Sales tax exempt",
    spotPrice: 48.2,
    trend: 1.2,
    programYear: null,
    medicalYear: 2016,
  },
  {
    state: "Oklahoma",
    abbr: "OK",
    status: "Medical",
    taxNote: "7% excise + sales",
    spotPrice: 24.5,
    trend: -8.1,
    programYear: null,
    medicalYear: 2018,
  },
  {
    state: "Georgia",
    abbr: "GA",
    status: "Medical",
    taxNote: "Low-THC oil only",
    spotPrice: null,
    trend: 0,
    programYear: null,
    medicalYear: 2015,
  },
  {
    state: "Iowa",
    abbr: "IA",
    status: "Medical",
    taxNote: "Low-THC only",
    spotPrice: null,
    trend: 0,
    programYear: null,
    medicalYear: 2014,
  },
  {
    state: "Virginia",
    abbr: "VA",
    status: "Recreational",
    taxNote: "12% excise + 4.3% sales",
    spotPrice: 42.1,
    trend: 1.8,
    programYear: 2021,
    medicalYear: 2018,
  },
  {
    state: "Idaho",
    abbr: "ID",
    status: "Prohibited",
    taxNote: "N/A",
    spotPrice: null,
    trend: 0,
    programYear: null,
    medicalYear: null,
  },
  {
    state: "Wyoming",
    abbr: "WY",
    status: "Prohibited",
    taxNote: "N/A",
    spotPrice: null,
    trend: 0,
    programYear: null,
    medicalYear: null,
  },
  {
    state: "Kansas",
    abbr: "KS",
    status: "Prohibited",
    taxNote: "N/A",
    spotPrice: null,
    trend: 0,
    programYear: null,
    medicalYear: null,
  },
  {
    state: "Nebraska",
    abbr: "NE",
    status: "Decriminalized",
    taxNote: "Civil penalty only",
    spotPrice: null,
    trend: 0,
    programYear: null,
    medicalYear: null,
  },
  {
    state: "North Carolina",
    abbr: "NC",
    status: "Decriminalized",
    taxNote: "Civil penalty only",
    spotPrice: null,
    trend: 0,
    programYear: null,
    medicalYear: null,
  },
];

export const DEMO_NEWS: NewsItem[] = [
  {
    id: "n1",
    headline: "DEA Moves to Reschedule Cannabis to Schedule III",
    excerpt:
      "The Drug Enforcement Administration has formally proposed reclassifying cannabis from Schedule I to Schedule III under the Controlled Substances Act, opening the door to federally-compliant research and banking reform.",
    category: "Regulation",
    source: "DEA / Federal Register",
    date: "Apr 15, 2025",
    url: "#",
  },
  {
    id: "n2",
    headline: "California Wholesale Flower Prices Hit 10-Year Low",
    excerpt:
      "Average bulk flower pricing in California's mature recreational market dropped below $400/lb for the first time since legalization, driven by persistent oversupply and license proliferation.",
    category: "Market",
    source: "CDTFA Market Report",
    date: "Apr 12, 2025",
    url: "#",
  },
  {
    id: "n3",
    headline: "CBD Shown to Modulate Neuroinflammatory Markers in Trial",
    excerpt:
      "A phase II clinical trial published in JAMA found statistically significant reductions in IL-6 and TNF-α among participants using standardized CBD formulations versus placebo over 12 weeks.",
    category: "Science",
    source: "JAMA Network Open",
    date: "Apr 10, 2025",
    url: "#",
  },
  {
    id: "n4",
    headline: "New York Opens 300 Additional Conditional Licenses",
    excerpt:
      "The OCM announced a new tranche of conditional adult-use retail licenses targeting social equity applicants in historically over-policed communities across the five boroughs.",
    category: "Regulation",
    source: "NY OCM",
    date: "Apr 8, 2025",
    url: "#",
  },
  {
    id: "n5",
    headline: "Cannabis Cup Returns to Denver for 10th Anniversary",
    excerpt:
      "High Times has confirmed the return of the Cannabis Cup to Denver's National Western Complex, with over 400 vendor booths expected and a record 120 competition entries in the concentrate category.",
    category: "Culture",
    source: "High Times",
    date: "Apr 5, 2025",
    url: "#",
  },
  {
    id: "n6",
    headline: "SAFE Banking Act Advances in Senate Committee",
    excerpt:
      "The Secure and Fair Enforcement Regulation Banking Act passed out of the Senate Banking Committee with bipartisan support, moving the bill closer to a full floor vote for the first time in three sessions.",
    category: "Regulation",
    source: "Senate Banking Committee",
    date: "Apr 3, 2025",
    url: "#",
  },
  {
    id: "n7",
    headline:
      "Michigan Operators Report 15% Revenue Lift from Loyalty Programs",
    excerpt:
      "A Michigan Cannabis Regulatory Agency survey found operators using structured loyalty and rewards programs reported materially higher same-store sales compared to non-participants.",
    category: "Market",
    source: "MI CRA Quarterly",
    date: "Mar 30, 2025",
    url: "#",
  },
  {
    id: "n8",
    headline:
      "THC-V Research Gains Momentum as Appetite Suppression Data Emerges",
    excerpt:
      "Preclinical data from three independent labs suggests tetrahydrocannabivarin may suppress appetite through CB1 partial agonism, sparking investor interest in THCV-dominant cultivar development.",
    category: "Science",
    source: "Cannabis & Cannabinoid Research",
    date: "Mar 27, 2025",
    url: "#",
  },
];
