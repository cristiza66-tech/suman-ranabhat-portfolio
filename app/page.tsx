import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile, testimonials } from "@/data/profile";
import { HeroSection } from "@/components/home/hero-section";
import { DualPaths } from "@/components/home/dual-paths";
import { CredentialsOverview } from "@/components/home/credentials-overview";
import { CtaBanner } from "@/components/home/cta-banner";
import { SectionHeading } from "@/components/ui/section-heading";

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Personal Introduction */}
      <section
        className="py-12 md:py-18 border-b"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="eyebrow-badge mb-3">Academic Tuition &amp; Student Guidance</span>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight"
                style={{ color: "var(--color-fg)" }}
              >
                A Commitment to Strong Fundamentals and Real Results
              </h2>
              <p
                className="text-sm sm:text-base mt-4 leading-relaxed"
                style={{ color: "var(--color-fg-secondary)" }}
              >
                Whether coaching a Class 11 student through their first ledger entries or preparing undergraduates for board exams, the approach stays constant:{" "}
                <strong>deep conceptual understanding drives lasting academic success</strong>.
              </p>
              <p
                className="text-sm mt-3 leading-relaxed"
                style={{ color: "var(--color-fg-secondary)" }}
              >
                Real-world examples and step-by-step logic replace rote memorization — giving students genuine confidence and parents a trustworthy, dedicated educator.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Link href="/about" className="btn-primary">
                  <span>Learn More About Me</span>
                  <ArrowRight size={15} />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  <span>Get in Touch</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div
                className="rounded-xl border p-6 sm:p-7 relative"
                style={{
                  backgroundColor: "var(--color-bg)",
                  borderColor: "var(--color-border)",
                }}
              >
                <p
                  className="text-sm font-bold uppercase tracking-widest mb-2"
                  style={{ color: "var(--color-gold)" }}
                >
                  Core Guiding Principle
                </p>
                <blockquote
                  className="text-base sm:text-lg font-medium leading-relaxed italic"
                  style={{ color: "var(--color-fg)" }}
                >
                  &ldquo;Accounting is the financial language of enterprise. When students understand the purpose behind every rule, true value is unlocked.&rdquo;
                </blockquote>
                <div
                  className="mt-5 pt-4 border-t flex items-center justify-between"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div>
                    <span
                      className="font-bold text-sm block"
                      style={{ color: "var(--color-fg)" }}
                    >
                      {profile.name}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-fg-muted)" }}
                    >
                      {profile.title}
                    </span>
                  </div>
                  <span
                    className="w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      color: "var(--color-dark-accent)",
                    }}
                  >
                    {profile.initials}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dual Professional Paths */}
      <DualPaths />

      {/* 4. Credentials & Qualifications */}
      <CredentialsOverview />

      {/* 5. Testimonials */}
      <section
        className="py-12 md:py-18 border-b"
        style={{
          backgroundColor: "var(--color-bg)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Feedback &amp; Impact"
            title="From Students &amp; Advisory Clients"
            subtitle="Honest experiences that reflect our commitment to concept clarity and meticulous financial guidance."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="rounded-xl border p-5 flex flex-col justify-between transition-shadow hover:shadow-sm"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div>
                  <div className="mb-3">
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--color-gold-soft) 60%, transparent)",
                        color: "var(--color-accent)",
                      }}
                    >
                      {t.type === "student" ? "Student Tuition" : "Business Advisory"}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed italic"
                    style={{ color: "var(--color-fg)" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div
                  className="mt-4 pt-4 border-t"
                  style={{ borderColor: "var(--color-surface-alt)" }}
                >
                  <p
                    className="text-sm font-bold"
                    style={{ color: "var(--color-fg)" }}
                  >
                    {t.author}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-fg-muted)" }}
                  >
                    {t.designation}
                  </p>
                  {t.context && (
                    <p
                      className="text-sm font-medium mt-0.5"
                      style={{ color: "var(--color-gold)" }}
                    >
                      {t.context}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <CtaBanner />
    </div>
  );
}
