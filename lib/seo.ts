export const SITE_URL = "https://buds.bot";
export const SITE_NAME = "BUDS.BOT";
export const SITE_DESCRIPTION =
  "The #1 cannabis price tracker & dispensary finder. Compare weed prices, find dispensaries near you, and track legalization news.";

export function buildMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords: string[];
}) {
  return {
    title: `${title} | BUDS.BOT`,
    description,
    keywords: keywords.join(", "),
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: `${title} | BUDS.BOT`,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | BUDS.BOT`,
      description,
    },
    robots: { index: true, follow: true },
  };
}
