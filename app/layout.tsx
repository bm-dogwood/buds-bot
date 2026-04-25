import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// app/layout.tsx

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://buds.bot"),
  title: {
    default: "BUDS.BOT — Cannabis Price & Dispensary Intelligence",
    template: "%s — BUDS.BOT",
  },
  description:
    "Independent cannabis market terminal: live prices, dispensary network, jurisdictional legality, strain archive, and regulatory dispatch.",
  authors: [{ name: "BUDS.BOT" }],
  openGraph: {
    title: "BUDS.BOT — Cannabis Price & Dispensary Intelligence",
    description:
      "Live prices, dispensary network, jurisdictional legality and strain archive.",
    type: "website",
    siteName: "BUDS.BOT",
  },
  twitter: {
    card: "summary",
    site: "@BudsBot",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-matte text-paper antialiased">
        <div className="min-h-screen flex flex-col bg-matte">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
