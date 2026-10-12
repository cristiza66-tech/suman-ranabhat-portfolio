import type { Metadata } from "next";
import Link from "next/link";
import { Award, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { experienceTimeline, qualifications } from "@/data/profile";
import { pageSeo, generateBreadcrumbSchema, safeJsonLd, siteConfig } from "@/data/seo";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: pageSeo.experience.title,
  description: pageSeo.experience.description,
  keywords: pageSeo.experience.keywords,
  alternates: {
    canonical: pageSeo.experience.canonical,
  },
  openGraph: {
    title: pageSeo.experience.title,
    description: pageSeo.experience.description,
    url: pageSeo.experience.canonical,
  },
};

export default function ExperiencePage() {
  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: "Home", url: `${siteConfig.siteUrl}/` },
    { name: "Teaching Experience", url: `${siteConfig.siteUrl}/experience` },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      <PageHero
        eyebrow="Timeline & Career"
        title="Teaching Pathway & Professional Milestones"
        subtitle="A chronological view of academic foundations, intensive practical accounting training, and dedicated teaching practice in Pokhara."
        primaryAction={{ label: "Get in Touch", href: "/contact" }}
        secondaryAction={{ label: "Explore Tuition Offerings", href: "/education" }}
        metaList={[
          { label: "Primary Role", value: "Commerce & Accounting Educator" },
          { label: "Focus", value: "Commerce & Accounting Tuition" },
          { label: "Integrity", value: "Ethical Standards" },
        ]}
      />

      {/* Timeline Section */}
      <section
        className="py-12 md:py-18 border-b"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Chronological Progression"
            title="From Foundational Commerce to Dedicated Teaching & Education"
            subtitle="The pathway that shaped deep accounting knowledge and a concept-driven teaching method."
            align="center"
          />

          <div className="max-w-4xl mx-auto relative mt-8">
            {/* Vertical Center Line */}
            <div
              className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 hidden sm:block"
              style={{ backgroundColor: "var(--color-border)" }}
            />

            <div className="flex flex-col gap-10 sm:gap-12">
              {experienceTimeline.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={item.id}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? "sm:flex-row-reverse" : ""
                    } gap-6`}
                  >
                    {/* Center Node */}
                    <div
                      className="hidden sm:flex absolute left-1/2 top-5 -translate-x-1/2 w-7 h-7 rounded-full border-4 items-center justify-center text-xs font-bold shadow-md z-10"
                      style={{
                        backgroundColor: "var(--color-accent)",
                        color: "var(--color-dark-accent)",
                        borderColor: "var(--color-surface)",
                      }}
                    >
                      {idx + 1}
                    </div>

                    {/* Timeline Card */}
                    <div className="w-full sm:w-[calc(50%-2rem)]">
                      <div
                        className="card-hover-gold rounded-xl border p-5"
                        style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-bold"
                            style={{ backgroundColor: "var(--color-gold-soft)", color: "var(--color-accent)" }}
                          >
                            {item.period}
                          </span>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: "var(--color-fg-muted)" }}
                          >
                            {item.type}
                          </span>
                        </div>

                        <h3
                          className="text-base font-bold"
                          style={{ color: "var(--color-fg)" }}
                        >
                          {item.role}
                        </h3>

                        {item.organization && (
                          <p
                            className="text-xs font-semibold mt-0.5"
                            style={{ color: "var(--color-gold)" }}
                          >
                            {item.organization}
                          </p>
                        )}

                        <p
                          className="text-xs mt-2.5 leading-relaxed"
                          style={{ color: "var(--color-fg-secondary)" }}
                        >
                          {item.description}
                        </p>

                        {item.keyContributions && (
                          <div
                            className="mt-3 pt-3 border-t flex flex-col gap-1.5"
                            style={{ borderColor: "var(--color-border)" }}
                          >
                            {item.keyContributions.map((contrib, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 text-xs"
                                style={{ color: "var(--color-fg-secondary)" }}
                              >
                                <Check size={12} className="shrink-0 mt-0.5" style={{ color: "var(--color-gold)" }} />
                                <span>{contrib}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Formal Credentials */}
      <section
        className="py-12 md:py-18 border-b"
        style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Formal Accreditations"
            title="Professional Qualifications & Memberships"
            subtitle="Verified academic and professional credentials underpinning all engagements."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {qualifications.map((q) => (
              <div
                key={q.id}
                className="card-hover-accent rounded-xl border p-5 flex flex-col"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-dark-accent)",
                    border: "1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)",
                  }}
                >
                  <Award size={20} />
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
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
                  className="text-xs font-medium mt-0.5"
                  style={{ color: "var(--color-fg-muted)" }}
                >
                  {q.body}
                </p>
                {q.description && (
                  <p
                    className="text-xs mt-3 leading-relaxed"
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

      {/* CPD Callout */}
      <section
        className="py-10"
        style={{ backgroundColor: "var(--color-accent)", color: "var(--color-fg-light)" }}
      >
        <div className="shell">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <ShieldCheck size={32} className="mb-3" style={{ color: "var(--color-gold)" }} />
            <h3
              className="text-xl sm:text-2xl font-bold"
              style={{ color: "var(--color-fg-light)" }}
            >
              Continuous Professional Development &amp; Ethical Standards
            </h3>
            <p
              className="text-sm mt-2.5 max-w-xl leading-relaxed"
              style={{ color: "var(--color-dark-fg-muted)" }}
            >
              Committed to lifelong learning through regular participation in taxation seminars, accounting standard updates, and auditing workshops to ensure advice and teaching remain cutting-edge.
            </p>
            <div className="mt-6">
              <Link href="/contact" className="btn-gold text-sm font-semibold">
                <span>Start a Conversation</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
