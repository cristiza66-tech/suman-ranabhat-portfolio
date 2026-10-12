import type { Metadata } from "next";
import { Receipt, Calculator, ShieldCheck, Briefcase, Check, ArrowUpRight, Scale, Lock, HelpCircle } from "lucide-react";
import { services, faqs } from "@/data/profile";
import { pageSeo, generateServicesSchema, generateFaqSchema, generateBreadcrumbSchema, safeJsonLd, siteConfig } from "@/data/seo";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: pageSeo.services.title,
  description: pageSeo.services.description,
  keywords: pageSeo.services.keywords,
  alternates: {
    canonical: pageSeo.services.canonical,
  },
  openGraph: {
    title: pageSeo.services.title,
    description: pageSeo.services.description,
    url: pageSeo.services.canonical,
  },
};

const serviceIcons = {
  receipt: Receipt,
  calculator: Calculator,
  "shield-check": ShieldCheck,
  briefcase: Briefcase,
  chart: Calculator,
  scale: Scale,
};

export default function ServicesPage() {
  const serviceFaqs = faqs.filter(
    (f) => f.category === "services" || f.category === "general"
  );
  const servicesJsonLd = generateServicesSchema(services);
  const faqJsonLd = generateFaqSchema(serviceFaqs);
  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: "Home", url: `${siteConfig.siteUrl}/` },
    { name: "Accounting Services", url: `${siteConfig.siteUrl}/services` },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(servicesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      <PageHero
        eyebrow="Accounting & Advisory Practice"
        title="Professional Financial & Advisory Services"
        subtitle="Rigorous accounting compliance, strategic taxation guidance, and independent advisory tailored for growth-oriented enterprises and discerning individuals."
        primaryAction={{ label: "Request Consultation", href: "#service-inquiry" }}
        secondaryAction={{ label: "Explore Service Scope", href: "#services-catalog" }}
        metaList={[
          { label: "Specialist", value: "Commerce & Accounting Educator" },
          { label: "Focus", value: "Tax, Audit & Accounting" },
          { label: "Standards", value: "NFRS / IFRS / Local Laws" },
        ]}
      />

      {/* Services Catalog */}
      <section
        id="services-catalog"
        className="py-12 md:py-18 border-b scroll-mt-16"
        style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Specialized Practice Areas"
            title="Comprehensive Commercial & Statutory Support"
            subtitle="Dependable solutions designed to safeguard compliance, streamline financial reporting, and provide commercial foresight."
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {services.map((svc) => {
              const IconComp = serviceIcons[svc.icon] || Briefcase;
              return (
                <div
                  key={svc.id}
                  id={svc.id}
                  className="card-hover-accent rounded-xl border p-6 sm:p-7 flex flex-col justify-between scroll-mt-20"
                  style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
                >
                  <div>
                    <div
                      className="flex items-center justify-between pb-3.5 border-b"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: "var(--color-accent)",
                          color: "var(--color-dark-accent)",
                          border: "1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)",
                        }}
                      >
                        <IconComp size={20} />
                      </div>
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: "var(--color-fg-muted)" }}
                      >
                        Accounting &amp; Advisory
                      </span>
                    </div>

                    <h3
                      className="text-xl font-bold mt-4"
                      style={{ color: "var(--color-fg)" }}
                    >
                      {svc.title}
                    </h3>
                    <p
                      className="text-xs font-semibold mt-1"
                      style={{ color: "var(--color-gold)" }}
                    >
                      Ideal For: {svc.targetClients}
                    </p>
                    <p
                      className="text-sm mt-3 leading-relaxed"
                      style={{ color: "var(--color-fg-secondary)" }}
                    >
                      {svc.fullDesc}
                    </p>

                    <div
                      className="mt-4 pt-4 border-t"
                      style={{ borderColor: "var(--color-surface-alt)" }}
                    >
                      <p
                        className="text-[10px] font-bold uppercase tracking-wider mb-2.5"
                        style={{ color: "var(--color-fg)" }}
                      >
                        Core Deliverables &amp; Scope:
                      </p>
                      <ul className="flex flex-col gap-2">
                        {svc.deliverables.map((deliv, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs"
                            style={{ color: "var(--color-fg-secondary)" }}
                          >
                            <Check size={14} className="shrink-0 mt-0.5" style={{ color: "var(--color-gold)" }} />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className="mt-5 pt-4 border-t flex items-center justify-between"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--color-fg-muted)" }}
                    >
                      Confidential Advisory
                    </span>
                    <a href="#service-inquiry" className="btn-primary text-xs">
                      <span>Inquire for this Service</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engagement Workflow */}
      <section
        className="py-12 md:py-16 border-b"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Engagement Model"
            title="A Structured, Transparent Approach to Advisory"
            subtitle="How we onboard and support your business from initial discussion to ongoing compliance."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "01", title: "Discovery & Scope", desc: "Confidential meeting to assess your business structure, statutory timelines, and specific financial needs." },
              { num: "02", title: "Diagnostic Review", desc: "Reviewing past accounts, filings, and reconciliations to identify potential exposure areas and efficiencies." },
              { num: "03", title: "Execution & Filing", desc: "Meticulous preparation of statements, tax returns, and audit documentation in strict compliance with current laws." },
              { num: "04", title: "Strategic Support", desc: "Ongoing advisory, periodic MIS updates, and proactive alerts regarding changes in fiscal legislation." },
            ].map(({ num, title, desc }) => (
              <div
                key={num}
                className="p-5 rounded-lg border flex flex-col"
                style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
              >
                <span
                  className="font-mono text-lg font-bold"
                  style={{ color: "var(--color-gold)" }}
                >
                  {num}
                </span>
                <h4
                  className="text-sm font-bold mt-2"
                  style={{ color: "var(--color-fg)" }}
                >
                  {title}
                </h4>
                <p
                  className="text-xs mt-2 leading-relaxed"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Ethics Callout */}
      <section
        className="py-10 border-b"
        style={{ backgroundColor: "var(--color-accent)", borderColor: "var(--color-dark-border)" }}
      >
        <div className="shell">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: "var(--color-accent-hover)",
                color: "var(--color-dark-accent)",
                border: "1px solid color-mix(in srgb, var(--color-gold) 40%, transparent)",
              }}
            >
              <Lock size={24} />
            </div>
            <div>
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "var(--color-dark-accent)" }}
              >
                Confidentiality &amp; Professional Standards
              </span>
              <h3
                className="text-xl font-bold mt-1"
                style={{ color: "var(--color-fg-light)" }}
              >
                Upholding the Highest Professional Code of Ethics
              </h3>
              <p
                className="text-sm mt-2 leading-relaxed"
                style={{ color: "var(--color-dark-fg-muted)" }}
              >
                All client engagements are conducted under strict non-disclosure obligations, objective integrity, professional competence, and adherence to standard accounting practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service FAQs */}
      <section
        className="py-12 md:py-18 border-b"
        style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Client FAQ"
            title="Frequently Asked Questions on Accounting & Advisory Services"
            subtitle="Clear answers on our engagement structure, turnaround times, and statutory coverage."
            align="center"
          />

          <div className="max-w-3xl mx-auto flex flex-col gap-3.5">
            {serviceFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-lg border p-5"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <h4
                  className="text-sm font-bold flex items-start gap-2"
                  style={{ color: "var(--color-fg)" }}
                >
                  <HelpCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--color-gold)" }} />
                  <span>{faq.question}</span>
                </h4>
                <p
                  className="text-xs mt-2 pl-6 leading-relaxed"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Inquiry Form */}
      <section
        id="service-inquiry"
        className="py-12 md:py-18 scroll-mt-16"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="shell">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              eyebrow="Commercial Consultation"
              title="Request a Professional Consultation"
              subtitle="Outline your business requirements and we will arrange a confidential introductory call."
              align="center"
            />
            <ContactForm defaultTab="services" />
          </div>
        </div>
      </section>
    </div>
  );
}
