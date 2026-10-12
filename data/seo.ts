/**
 * Centralized SEO & Metadata Configuration
 * Suman Ranabhat — Commerce & Accounting Educator (Pokhara, Nepal)
 */

export const siteConfig = {
  siteName: "Suman Ranabhat",
  personName: "Suman Ranabhat",
  jobTitle: "Commerce & Accounting Educator",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://sumanranabhat.com").replace(/\/$/, ""),
  locale: "en_US",
  location: {
    locality: "Pokhara",
    region: "Gandaki Province",
    country: "Nepal",
    countryCode: "NP",
    addressString: "Pokhara, Gandaki Province, Nepal",
  },
  contact: {
    phone: "+977 9805864812",
    telephone: "+9779805864812",
    whatsapp: "+9779805864812",
    email: "",
  },
  social: [
    "https://wa.me/9779805864812",
  ],
  defaultOgImage: "/images/suman-ranabhat.png",
} as const;

export const defaultKeywords = [
  "Suman Ranabhat",
  "Commerce & Accounting Educator",
  "Commerce Educator Pokhara",
  "Accounting Teacher Pokhara",
  "Tuition in Pokhara",
  "Tuition classes in Pokhara",
  "Accountancy tuition Pokhara",
  "Accounting tuition Pokhara",
  "Commerce tuition Pokhara",
  "Class 11 account tuition Pokhara",
  "Class 12 account tuition Pokhara",
  "BBS account tuition Pokhara",
  "Commerce services Pokhara",
];

export const pageSeo = {
  home: {
    title: "Commerce & Accounting Tuition in Pokhara | Suman Ranabhat",
    description:
      "Suman Ranabhat is a Commerce & Accounting Educator in Pokhara, Nepal offering tuition for Class 11, Class 12, BBS, and BBA students. Build strong fundamentals. Improve results.",
    keywords: [
      ...defaultKeywords,
      "Commerce educator Nepal",
      "Accounting educator Pokhara",
      "Tuition teacher Pokhara",
    ],
    canonical: `${siteConfig.siteUrl}/`,
  },
  about: {
    title: "About Suman Ranabhat | Commerce & Accounting Educator, Pokhara",
    description:
      "Suman Ranabhat is a dedicated Commerce & Accounting Educator based in Pokhara, Nepal. Concept-first tuition for school and college students, with personal attention and structured exam guidance.",
    keywords: [
      "About Suman Ranabhat",
      "Commerce educator Pokhara",
      "Accounting teacher biography",
      "Commerce tuition Nepal",
    ],
    canonical: `${siteConfig.siteUrl}/about`,
  },
  education: {
    title: "Commerce & Accounting Tuition Classes in Pokhara | Suman Ranabhat",
    description:
      "Commerce and accounting tuition in Pokhara for Class 11, Class 12, BBS, and BBA students. Concept-first teaching by Suman Ranabhat covering financial accounting, costing, and taxation.",
    keywords: [
      "Commerce tuition in Pokhara",
      "Accounting tuition in Pokhara",
      "Tuition classes in Pokhara",
      "Class 11 commerce tuition Pokhara",
      "Class 12 accounting tuition Pokhara",
      "BBS account tuition Pokhara",
      "Tuition in Pokhara",
      "Accountancy tuition Pokhara",
    ],
    canonical: `${siteConfig.siteUrl}/education`,
  },
  services: {
    title: "Accounting & Advisory Services in Pokhara | Suman Ranabhat",
    description:
      "Professional accounting, bookkeeping, tax advisory, and financial consulting services in Pokhara by Commerce & Accounting Educator Suman Ranabhat.",
    keywords: [
      "Accounting services in Pokhara",
      "Tax consultant in Pokhara",
      "Bookkeeping services Pokhara",
      "Financial advisory Pokhara",
      "Business advisory Pokhara",
    ],
    canonical: `${siteConfig.siteUrl}/services`,
  },
  experience: {
    title: "Teaching Experience | Suman Ranabhat — Commerce & Accounting Educator",
    description:
      "Suman Ranabhat's teaching journey, accounting training background, and student academic milestones in Pokhara, Nepal.",
    keywords: [
      "Suman Ranabhat experience",
      "Commerce educator background",
      "Accounting teaching experience Pokhara",
    ],
    canonical: `${siteConfig.siteUrl}/experience`,
  },
  contact: {
    title: "Contact for Tuition & Classes | Suman Ranabhat, Pokhara",
    description:
      "Contact Commerce & Accounting Educator Suman Ranabhat in Pokhara for tuition enrollment, 1-on-1 guidance, or accounting consultation. Reach via phone or WhatsApp.",
    keywords: [
      "Contact Suman Ranabhat",
      "Tuition inquiry Pokhara",
      "Commerce classes Pokhara",
      "Suman Ranabhat phone WhatsApp",
    ],
    canonical: `${siteConfig.siteUrl}/contact`,
  },
};

/**
 * Generate Schema.org JSON-LD Person Structured Data
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.personName,
    jobTitle: siteConfig.jobTitle,
    description:
      "Dedicated Commerce & Accounting Educator based in Pokhara, Nepal, helping school and college students build strong fundamentals and achieve better results.",
    url: siteConfig.siteUrl,
    telephone: siteConfig.contact.telephone,
    image: `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.locality,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.countryCode,
    },
    knowsAbout: [
      "Financial Accounting",
      "Corporate Taxation",
      "Statutory Audit & Compliance",
      "Cost & Management Accounting",
      "NFRS / IFRS Reporting",
      "Commercial Laws",
      "Academic Tuition & Commerce Education",
    ],
    ...(siteConfig.social.filter((url) => !url.includes("wa.me")).length > 0
      ? { sameAs: siteConfig.social.filter((url) => !url.includes("wa.me")) }
      : {}),
  };
}

/**
 * Generate Schema.org JSON-LD Course / Educational Program Structured Data
 */
export function generateCourseListSchema(courses: Array<{ title: string; description: string; targetAudience: string; level: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Course",
        name: c.title,
        description: c.description,
        provider: {
          "@type": "Person",
          name: siteConfig.personName,
          jobTitle: siteConfig.jobTitle,
          address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.location.locality,
            addressRegion: siteConfig.location.region,
            addressCountry: siteConfig.location.countryCode,
          },
        },
        educationalCredentialAwarded: c.level,
        audience: {
          "@type": "Audience",
          audienceType: c.targetAudience,
        },
      },
    })),
  };
}

/**
 * Generate Schema.org JSON-LD BreadcrumbList Structured Data
 */
export function generateBreadcrumbSchema(crumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Generate Schema.org JSON-LD FAQPage Structured Data
 */
export function generateFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/**
 * Generate Schema.org JSON-LD ProfessionalService / Service List Structured Data
 */
export function generateServicesSchema(services: Array<{ title: string; shortDesc: string; targetClients: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.personName} — Commerce & Accounting Educator`,
    description: "Professional accounting, taxation, and financial advisory services in Pokhara, Nepal.",
    url: `${siteConfig.siteUrl}/services`,
    telephone: siteConfig.contact.telephone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.locality,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.countryCode,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Accounting & Advisory Services",
      itemListElement: services.map((s, idx) => ({
        "@type": "Offer",
        position: idx + 1,
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.shortDesc,
        },
      })),
    },
  };
}

/**
 * Safely serialize JSON-LD structured data by escaping `<` characters
 * to prevent XSS breakout through `</script>` injection.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

