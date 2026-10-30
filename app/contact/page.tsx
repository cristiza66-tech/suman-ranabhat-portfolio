import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, MapPin, MessageSquare, ShieldCheck } from "lucide-react";
import { profile, faqs } from "@/data/profile";
import { pageSeo, buildPageMetadata, generateFaqSchema, generateBreadcrumbSchema, siteConfig } from "@/data/seo";
import { JsonLd } from "@/components/json-ld";
import { ContactForm, ContactFormFromQuery } from "@/components/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = buildPageMetadata(pageSeo.contact);

export default function ContactPage() {
  const faqJsonLd = generateFaqSchema(faqs);
  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: "Home", url: `${siteConfig.siteUrl}/` },
    { name: "Contact", url: `${siteConfig.siteUrl}/contact` },
  ]);

  return (
    <div>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Main Contact Grid — no hero, sits directly under navbar */}
      <section
        className="pt-8 pb-12 md:pt-10 md:pb-18 border-b"
        style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
      >
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Column: Info */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div
                className="rounded-xl border p-6"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <span className="eyebrow-badge mb-4">Direct Contact</span>
                <h1
                  className="text-xl font-bold mt-1"
                  style={{ color: "var(--color-fg)" }}
                >
                  Contact {profile.name}
                </h1>
                <p
                  className="text-sm font-semibold mt-0.5"
                  style={{ color: "var(--color-gold)" }}
                >
                  {profile.role}
                </p>

                <div className="mt-6 flex flex-col gap-4">
                  {[
                    {
                      Icon: Mail,
                      label: "Email",
                      content: profile.email ? (
                        <a
                          href={`mailto:${profile.email}`}
                          className="text-sm font-semibold block mt-0.5 transition-colors hover:opacity-75"
                          style={{ color: "var(--color-fg)" }}
                        >
                          {profile.email}
                        </a>
                      ) : (
                        <p className="text-sm mt-0.5" style={{ color: "var(--color-fg-secondary)" }}>
                          Available upon inquiry / WhatsApp
                        </p>
                      ),
                    },
                    {
                      Icon: Phone,
                      label: "Phone / Call",
                      content: (
                        <a
                          href={`tel:${profile.phoneTel}`}
                          className="text-sm font-semibold block mt-0.5 transition-colors hover:opacity-75"
                          style={{ color: "var(--color-fg)" }}
                        >
                          {profile.phone}
                        </a>
                      ),
                    },
                    {
                      Icon: MessageSquare,
                      label: "WhatsApp",
                      content: (
                        <a
                          href={profile.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold block mt-0.5 transition-colors hover:opacity-75"
                          style={{ color: "var(--color-fg)" }}
                        >
                          {profile.whatsapp}
                        </a>
                      ),
                    },
                    {
                      Icon: MapPin,
                      label: "Office Location",
                      content: (
                        <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--color-fg)" }}>
                          {profile.officeAddress}
                        </p>
                      ),
                    },
                  ].map(({ Icon, label, content }) => (
                    <div key={label} className="flex items-start gap-3.5">
                      <div
                        className="w-9 h-9 rounded-lg border flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
                      >
                        <Icon size={16} style={{ color: "var(--color-gold)" }} />
                      </div>
                      <div>
                        <span
                          className="text-xs uppercase font-bold tracking-wider"
                          style={{ color: "var(--color-fg-muted)" }}
                        >
                          {label}
                        </span>
                        {content}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-6 pt-5 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <a
                    href={profile.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full"
                  >
                    <MessageSquare size={15} />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Confidentiality Card */}
              <div
                className="rounded-xl p-5 border"
                style={{
                  backgroundColor: "var(--color-accent)",
                  borderColor: "var(--color-dark-border)",
                  color: "var(--color-fg-light)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={18} style={{ color: "var(--color-gold)" }} />
                  <h2 className="text-sm font-bold" style={{ color: "var(--color-fg-light)" }}>
                    Confidentiality Guarantee
                  </h2>
                </div>
                <p
                  className="text-sm mt-2 leading-relaxed"
                  style={{ color: "var(--color-dark-fg-muted)" }}
                >
                  All submitted business data, academic records, and inquiries are strictly guarded under professional non-disclosure practices.
                </p>
              </div>
            </div>

            {/* Right Column: Dual Form */}
            <div className="lg:col-span-7">
              <Suspense fallback={<ContactForm defaultTab="tuition" />}>
                <ContactFormFromQuery defaultTab="tuition" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* General Inquiry FAQs */}
      <section
        className="py-12 md:py-18"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Inquiry Guidelines"
            title="Frequently Asked Questions"
            subtitle="Clear answers on what to expect after submitting an inquiry."
            align="center"
          />

          <div className="max-w-3xl mx-auto flex flex-col gap-3.5">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg border p-5"
                style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
              >
                <h3
                  className="text-base font-bold"
                  style={{ color: "var(--color-fg)" }}
                >
                  {faq.question}
                </h3>
                <p
                  className="text-sm mt-2 leading-relaxed"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
