import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { siteConfig, pageSeo, baseOpenGraph, baseTwitter, generatePersonSchema, safeJsonLd } from "@/data/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1E3A5F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: pageSeo.home.title,
    template: `%s | ${profile.name}`,
  },
  description: pageSeo.home.description,
  keywords: pageSeo.home.keywords,
  authors: [{ name: profile.name, url: siteConfig.siteUrl }],
  creator: profile.name,
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    ...baseOpenGraph,
    url: siteConfig.siteUrl,
    title: pageSeo.home.title,
    description: pageSeo.home.description,
  },
  twitter: {
    ...baseTwitter,
    title: pageSeo.home.title,
    description: pageSeo.home.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generatePersonSchema();

  return (
    <html
      lang="en"
      id="top"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 w-full focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
