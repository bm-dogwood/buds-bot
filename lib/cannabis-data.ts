import strain1 from "@/public/1.jpeg";
import strain2 from "@/public/2.jpeg";
import strain3 from "@/public/3.jpeg";
import strain4 from "@/public/4.jpeg";
import strain5 from "@/public/6.jpeg";
import strain6 from "@/public/5.jpeg";

export type Strain = {
  id: string;
  name: string;
  type: "Sativa" | "Indica" | "Hybrid";
  lineage: string;
  thc: number;
  cbd: number;
  terpene: string;
  effects: string[];
  flavor: string[];
  rating: number;
  price: number;
  tag: "Exotic" | "Heirloom" | "Reserve" | "House" | "Limited";
  image: string;
  notes: string;
};

export const STRAINS: Strain[] = [
  {
    id: "velvet-glove",
    name: "Velvet Glove",
    type: "Hybrid",
    lineage: "GMO × Nookies",
    thc: 28.4,
    cbd: 0.1,
    terpene: "Myrcene",
    effects: ["Relaxed", "Euphoric", "Sleepy"],
    flavor: ["Diesel", "Earth", "Cream"],
    rating: 4.7,
    price: 58,
    tag: "Exotic",
    image: strain1.src,
    notes: "Heavy resin, cake-forward palate. A reliable evening cultivar.",
  },
  {
    id: "panama-red",
    name: "Panama Red",
    type: "Sativa",
    lineage: "Landrace (Panama)",
    thc: 16.2,
    cbd: 0.4,
    terpene: "Terpinolene",
    effects: ["Uplifted", "Creative", "Focused"],
    flavor: ["Citrus", "Pine", "Spice"],
    rating: 4.4,
    price: 42,
    tag: "Heirloom",
    image: strain2.src,
    notes: "1960s heritage genetics. Bright, soaring, conversational high.",
  },
  {
    id: "truffle-pig",
    name: "Truffle Pig",
    type: "Indica",
    lineage: "Gorilla × Mintz",
    thc: 31.1,
    cbd: 0.2,
    terpene: "Caryophyllene",
    effects: ["Sedated", "Hungry", "Tingly"],
    flavor: ["Mint", "Truffle", "Gas"],
    rating: 4.9,
    price: 72,
    tag: "Reserve",
    image: strain3.src,
    notes: "Gourmet indica. Deeply sedative — reserve for the end of the day.",
  },
  {
    id: "ghost-train-haze",
    name: "Ghost Train Haze",
    type: "Sativa",
    lineage: "Ghost OG × Neville's Wreck",
    thc: 27.4,
    cbd: 0.1,
    terpene: "Limonene",
    effects: ["Energetic", "Talkative", "Focused"],
    flavor: ["Lemon", "Floral", "Sour"],
    rating: 4.6,
    price: 48,
    tag: "House",
    image: strain4.src,
    notes: "Cup-winning daytime sativa. Sharp, alert, no fog.",
  },
  {
    id: "northern-lights",
    name: "Northern Lights",
    type: "Indica",
    lineage: "Afghani × Thai",
    thc: 19.8,
    cbd: 0.3,
    terpene: "Myrcene",
    effects: ["Calm", "Sleepy", "Hungry"],
    flavor: ["Pine", "Sweet", "Earth"],
    rating: 4.5,
    price: 36,
    tag: "Heirloom",
    image: strain5.src,
    notes:
      "The classical reference indica. Forty years and still measured against.",
  },
  {
    id: "blue-dream-v2",
    name: "Blue Dream V2",
    type: "Hybrid",
    lineage: "Blueberry × Haze (recut)",
    thc: 22.1,
    cbd: 0.4,
    terpene: "Pinene",
    effects: ["Balanced", "Creative", "Calm"],
    flavor: ["Blueberry", "Vanilla", "Herbal"],
    rating: 4.3,
    price: 39,
    tag: "House",
    image: strain6.src,
    notes: "Workhorse hybrid. Approachable for new operators.",
  },
];

export type Jurisdiction = {
  state: string;
  status: "Recreational" | "Medical" | "Decriminalized" | "Prohibited";
  taxNote: string;
  spotPrice: number | null;
  trend: number;
  programYear?: number;
};

export const JURISDICTIONS: Jurisdiction[] = [
  {
    state: "California",
    status: "Recreational",
    taxNote: "15% State + Local",
    spotPrice: 214.5,
    trend: -1.1,
    programYear: 2016,
  },
  {
    state: "Colorado",
    status: "Recreational",
    taxNote: "15% Excise + 2.9%",
    spotPrice: 178.0,
    trend: 1.9,
    programYear: 2014,
  },
  {
    state: "Florida",
    status: "Medical",
    taxNote: "No Excise",
    spotPrice: 268.4,
    trend: 4.2,
    programYear: 2016,
  },
  {
    state: "Illinois",
    status: "Recreational",
    taxNote: "10–25% Tiered",
    spotPrice: 312.2,
    trend: 2.4,
    programYear: 2020,
  },
  {
    state: "Massachusetts",
    status: "Recreational",
    taxNote: "10.75% State",
    spotPrice: 256.1,
    trend: -0.4,
    programYear: 2018,
  },
  {
    state: "Michigan",
    status: "Recreational",
    taxNote: "10% Excise + 6%",
    spotPrice: 88.9,
    trend: 0.8,
    programYear: 2019,
  },
  {
    state: "Minnesota",
    status: "Recreational",
    taxNote: "10% Gross Receipts",
    spotPrice: null,
    trend: 0,
    programYear: 2025,
  },
  {
    state: "New York",
    status: "Recreational",
    taxNote: "13% State",
    spotPrice: 289.0,
    trend: 0,
    programYear: 2022,
  },
  {
    state: "Nevada",
    status: "Recreational",
    taxNote: "10% + 15% Cult.",
    spotPrice: 198.5,
    trend: -2.0,
    programYear: 2017,
  },
  {
    state: "Oregon",
    status: "Recreational",
    taxNote: "17% State",
    spotPrice: 124.3,
    trend: 1.2,
    programYear: 2015,
  },
  {
    state: "Texas",
    status: "Prohibited",
    taxNote: "—",
    spotPrice: null,
    trend: 0,
  },
  {
    state: "Washington",
    status: "Recreational",
    taxNote: "37% Excise",
    spotPrice: 142.7,
    trend: 0.3,
    programYear: 2014,
  },
];

export type Dispensary = {
  id: string;
  name: string;
  city: string;
  state: string;
  zip: string;
  rating: number;
  reviews: number;
  hours: string;
  type: "Storefront" | "Delivery" | "Hybrid";
};

export const DISPENSARIES: Dispensary[] = [
  {
    id: "d1",
    name: "Verdant Hall",
    city: "Los Angeles",
    state: "CA",
    zip: "90026",
    rating: 4.8,
    reviews: 1284,
    hours: "08:00 — 22:00",
    type: "Hybrid",
  },
  {
    id: "d2",
    name: "Cold Storage Co.",
    city: "Denver",
    state: "CO",
    zip: "80203",
    rating: 4.6,
    reviews: 902,
    hours: "09:00 — 21:00",
    type: "Storefront",
  },
  {
    id: "d3",
    name: "House of Resin",
    city: "Detroit",
    state: "MI",
    zip: "48201",
    rating: 4.7,
    reviews: 612,
    hours: "10:00 — 23:00",
    type: "Storefront",
  },
  {
    id: "d4",
    name: "Atlas Reserve",
    city: "Brooklyn",
    state: "NY",
    zip: "11211",
    rating: 4.5,
    reviews: 488,
    hours: "11:00 — 22:00",
    type: "Hybrid",
  },
  {
    id: "d5",
    name: "Field & Curing",
    city: "Portland",
    state: "OR",
    zip: "97214",
    rating: 4.9,
    reviews: 1801,
    hours: "08:00 — 22:00",
    type: "Storefront",
  },
  {
    id: "d6",
    name: "Halcyon Botanicals",
    city: "Boston",
    state: "MA",
    zip: "02118",
    rating: 4.4,
    reviews: 320,
    hours: "10:00 — 20:00",
    type: "Delivery",
  },
  {
    id: "d7",
    name: "Ember & Ash",
    city: "Chicago",
    state: "IL",
    zip: "60607",
    rating: 4.6,
    reviews: 754,
    hours: "09:00 — 22:00",
    type: "Storefront",
  },
  {
    id: "d8",
    name: "Black Mesa Reserve",
    city: "Phoenix",
    state: "AZ",
    zip: "85004",
    rating: 4.5,
    reviews: 511,
    hours: "08:00 — 22:00",
    type: "Hybrid",
  },
];

export type NewsItem = {
  id: string;
  date: string;
  category: "Regulation" | "Market" | "Science" | "Culture";
  headline: string;
  excerpt: string;
  source: string;
};

export const NEWS: NewsItem[] = [
  {
    id: "n1",
    date: "2025.04.18",
    category: "Regulation",
    headline:
      "Minnesota recreational program clears final implementation rules",
    excerpt:
      "Adult-use sales schedule confirmed for late summer with tiered tax structure and microbusiness license tier.",
    source: "OpenStates",
  },
  {
    id: "n2",
    date: "2025.04.17",
    category: "Market",
    headline: "California spot prices fall 1.1% on Q1 cultivation surplus",
    excerpt:
      "Greenhouse oversupply in the Salinas region pushes wholesale flower to a 36-month low.",
    source: "Index Wire",
  },
  {
    id: "n3",
    date: "2025.04.15",
    category: "Science",
    headline: "Caryophyllene pathway studied as anti-inflammatory mechanism",
    excerpt:
      "Peer-reviewed work clarifies the CB2-receptor activity of the dominant terpene in indica lineages.",
    source: "Journal Excerpt",
  },
  {
    id: "n4",
    date: "2025.04.12",
    category: "Regulation",
    headline: "DEA scheduling petition advances to interagency review",
    excerpt:
      "Reclassification timeline now overlaps the next federal budget cycle. Tax implications remain unresolved.",
    source: "Federal Register",
  },
  {
    id: "n5",
    date: "2025.04.09",
    category: "Culture",
    headline: "Heirloom landrace preservation co-op opens public archive",
    excerpt:
      "Genotype seed bank and oral history project releases first 240 entries to researchers.",
    source: "Field Report",
  },
  {
    id: "n6",
    date: "2025.04.05",
    category: "Market",
    headline: "Florida medical patient count crosses 900,000",
    excerpt:
      "Patient registry growth accelerates ahead of pending adult-use ballot consideration.",
    source: "OMMU",
  },
];
