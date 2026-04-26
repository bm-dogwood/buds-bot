import { MetadataRoute } from "next";

const SITE_URL = "https://buds.bot";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Main app pages (high priority)
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/dispensary-near-me`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/cannabis-prices`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/weed-legal-states`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/strain-database`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // SEO content pages (medium-high priority)
  const seoPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/cannabis-legalization-news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/best-cannabis-strains`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cheap-weed-deals`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/marijuana-dispensary-finder`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  return [...mainPages, ...seoPages];
}
