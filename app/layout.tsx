import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { siteConfig, pageSeo, generatePersonSchema, safeJsonLd } from "@/data/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeSwitcher } from "@/components/theme-switcher";
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
  themeColor: "#0E2439",
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
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.siteUrl,
    title: pageSeo.home.title,
    description: pageSeo.home.description,
    siteName: siteConfig.siteName,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 600,
        height: 750,
        alt: `${profile.name} - Commerce & Accounting Educator in Pokhara, Nepal`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageSeo.home.title,
    description: pageSeo.home.description,
    images: [siteConfig.defaultOgImage],
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

// Theme-restore script: runs before first paint to avoid flash
const themeInitScript = `
(function(){
  try{
    var t=localStorage.getItem('sr-portfolio-theme');
    var valid=['navy','emerald','charcoal','slate','burgundy'];
    if(t&&valid.indexOf(t)>-1){document.documentElement.setAttribute('data-theme',t);}
    else{document.documentElement.setAttribute('data-theme','navy');}
  }catch(e){}
})();
`;

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
      data-theme="navy"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Theme init: runs synchronously before paint to prevent flash */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <SiteHeader />
        <main className="flex-1 w-full">{children}</main>
        <SiteFooter />
        {/* Theme Switcher — client preview tool, remove before final production deploy */}
        <ThemeSwitcher />
      </body>
    </html>
  );
}
