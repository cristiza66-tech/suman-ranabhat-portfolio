import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Shield, HeartHandshake } from "lucide-react";
import { profile, qualifications } from "@/data/profile";
import { pageSeo, buildPageMetadata, generateBreadcrumbSchema, safeJsonLd, siteConfig } from "@/data/seo";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/home/cta-banner";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = buildPageMetadata(pageSeo.about);

export default function AboutPage() {
  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: "Home", url: `${siteConfig.siteUrl}/` },
    { name: "About", url: `${siteConfig.siteUrl}/about` },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      <PageHero
        eyebrow="Biography & Background"
        title="Commerce & Accounting Educator"
        subtitle="Concept-first education for Class 11/12 and undergraduate commerce students, backed by strong accounting expertise."
        primaryAction={{ label: "Contact Directly", href: "/contact" }}
        secondaryAction={{ label: "View Experience", href: "/experience" }}
        metaList={[
          { label: "Primary Role", value: "Commerce & Accounting Educator" },
          { label: "Pedagogy Focus", value: "Concept-First Tuition" },
          { label: "Practice Base", value: profile.location },
        ]}
      />

      {/* Main Biographical Story */}
      <section
        className="py-12 md:py-18 border-b"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Portrait & Quick Credentials */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div
                className="portrait-frame aspect-[4/5] relative"
                style={{ backgroundColor: "var(--color-dark-bg)" }}
              >
                <Image
                  src={profile.portrait}
                  alt={profile.portraitAlt}
                  width={600}
                  height={750}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 420px"
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="rounded-lg border p-5"
                style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
              >
                <h3
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: "var(--color-gold)" }}
                >
                  Summary Coordinates
                </h3>
                <div
                  className="flex flex-col gap-2 text-xs"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {[
                    ["Name", profile.name],
                    ["Specialization", "Commerce & Accounting Educator"],
                    ["Subjects", "Accounting, Costing & Taxation"],
                    ["Location", profile.location],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between border-b pb-1.5 last:border-0 last:pb-0"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <span className="font-semibold" style={{ color: "var(--color-fg)" }}>{label}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="eyebrow-badge mb-3">Concept-First Teaching</span>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight"
                style={{ color: "var(--color-fg)" }}
              >
                Combining Deep Accounting Knowledge with a Passion for Student Success
              </h2>

              <div
                className="text-sm leading-relaxed mt-5 space-y-3.5"
                style={{ color: "var(--color-fg-secondary)" }}
              >
                <p>
                  My mission is to demystify complex financial subjects for school and college students — helping them understand how accounting systems and commercial logic work in the real world, not just on a chalkboard.
                </p>
                <p>
                  Too often, students memorize formulas for exam day without genuine understanding. When an unfamiliar question appears, confidence collapses. I saw this pattern early in my teaching career and it shaped everything.
                </p>
                <p>
                  The result is a <strong>concept-first</strong> approach — combining dedicated doubt clearance, practical real-world examples, and structured exam strategy so students build lasting confidence and achieve standout results.
                </p>
              </div>

              {/* Core Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6 w-full">
                {[
                  { Icon: Shield, title: "Uncompromising Ethics", desc: "Strict professional ethics, academic discipline, and complete confidentiality in every engagement." },
                  { Icon: HeartHandshake, title: "Personal Attention", desc: "Every student receives dedicated focus, patience, and clear supportive guidance throughout." },
                ].map(({ Icon, title, desc }) => (
                  <div
                    key={title}
                    className="p-4 rounded-lg border"
                    style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
                  >
                    <div
                      className="flex items-center gap-2 font-bold text-sm"
                      style={{ color: "var(--color-accent)" }}
                    >
                      <Icon size={16} style={{ color: "var(--color-gold)" }} />
                      <span>{title}</span>
                    </div>
                    <p
                      className="text-sm mt-2 leading-relaxed"
                      style={{ color: "var(--color-fg-muted)" }}
                    >
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/education" className="btn-primary">
                  <span>Explore Tuition Offerings</span>
                  <ArrowRight size={15} />
                </Link>
                <Link href="/services" className="btn-secondary">
                  <span>Explore Accounting Services</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section
        className="py-12 md:py-18 border-b"
        style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Academic & Professional Rigor"
            title="Credentials & Qualifications"
            subtitle="Verified background underpinning every advisory and teaching engagement."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {qualifications.map((q) => (
              <div
                key={q.id}
                className="card-hover-accent rounded-lg border p-5 flex flex-col"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: "var(--color-accent)", color: "var(--color-dark-accent)" }}
                >
                  <Award size={18} />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "var(--color-gold)" }}
                >
                  {q.category}
                </span>
                <h3
                  className="text-base font-bold mt-1"
                  style={{ color: "var(--color-fg)" }}
                >
                  {q.title}
                </h3>
                <p
                  className="text-sm mt-0.5 font-medium"
                  style={{ color: "var(--color-fg-muted)" }}
                >
                  {q.body}
                </p>
                {q.description && (
                  <p
                    className="text-sm mt-2.5 leading-relaxed"
                    style={{ color: "var(--color-fg-secondary)" }}
                  >
                    {q.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
