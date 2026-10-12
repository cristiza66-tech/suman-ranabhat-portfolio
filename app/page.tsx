import Link from "next/link";
import { ArrowRight, BookOpen, Receipt } from "lucide-react";
import { profile, testimonials } from "@/data/profile";
import { HeroSection } from "@/components/home/hero-section";
import { DualPaths } from "@/components/home/dual-paths";
import { TeachingPhilosophy } from "@/components/home/teaching-philosophy";
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
                More Than Teaching: A Commitment to Strong Fundamentals and Real Results
              </h2>
              <p
                className="text-sm sm:text-base mt-4 leading-relaxed"
                style={{ color: "var(--color-fg-secondary)" }}
              >
                Whether guiding a Class 11 student through their very first ledger entries or coaching undergraduate commerce students for board and university examinations, my philosophy remains constant:{" "}
                <strong>deep conceptual understanding always precedes sustainable academic success</strong>.
              </p>
              <p
                className="text-sm mt-3 leading-relaxed"
                style={{ color: "var(--color-fg-secondary)" }}
              >
                By demystifying accounting principles with clear real-world examples and step-by-step logic, students gain genuine exam confidence while parents can rely on an approachable, dedicated, and trustworthy academic educator.
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
                  className="text-[10px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: "var(--color-gold)" }}
                >
                  Core Guiding Principle
                </p>
                <blockquote
                  className="text-base sm:text-lg font-medium leading-relaxed italic"
                  style={{ color: "var(--color-fg)" }}
                >
                  &ldquo;Accounting is not merely arithmetic; it is the financial language of enterprise. When students understand the purpose behind every rule and businesses master compliance as a strategic asset, true value is unlocked.&rdquo;
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
                      Commerce &amp; Accounting Educator
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

      {/* 4. Teaching Philosophy */}
      <TeachingPhilosophy />

      {/* 5. Credentials & Qualifications */}
      <CredentialsOverview />

      {/* 6. Featured Courses & Services Summary */}
      <section
        className="py-12 md:py-18 border-b"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Curated Offerings"
            title="Designed for Academic Mastery and Conceptual Clarity"
            subtitle="Our most sought-after tuition cohorts and specialized accounting guidance."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Education Highlight 1 */}
            <div className="editorial-card flex flex-col justify-between">
              <div>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--color-gold-soft)" }}
                >
                  <BookOpen size={16} style={{ color: "var(--color-gold)" }} />
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--color-gold)" }}
                >
                  Tuition Cohort
                </span>
                <h3
                  className="text-base font-bold mt-1"
                  style={{ color: "var(--color-fg)" }}
                >
                  Financial Accounting Mastery
                </h3>
                <p
                  className="text-xs mt-0.5 font-medium"
                  style={{ color: "var(--color-fg-muted)" }}
                >
                  Class 11, 12 &amp; BBS / BBA Level
                </p>
                <p
                  className="text-xs mt-2.5 leading-relaxed"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  Fundamental double-entry logic, ledger mechanics, adjustments, and financial statements preparation with step-by-step guidance.
                </p>
              </div>
              <div
                className="mt-4 pt-3 border-t"
                style={{ borderColor: "var(--color-surface-alt)" }}
              >
                <Link
                  href="/education#financial-accounting"
                  className="text-xs font-bold flex items-center gap-1.5 transition-colors link-accent-gold"
                >
                  <span>View Syllabus &amp; Schedule</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Education Highlight 2 */}
            <div className="editorial-card flex flex-col justify-between">
              <div>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--color-gold-soft)" }}
                >
                  <BookOpen size={16} style={{ color: "var(--color-gold)" }} />
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--color-gold)" }}
                >
                  Undergraduate Commerce Tuition
                </span>
                <h3
                  className="text-base font-bold mt-1"
                  style={{ color: "var(--color-fg)" }}
                >
                  Cost &amp; Management Accounting
                </h3>
                <p
                  className="text-xs mt-0.5 font-medium"
                  style={{ color: "var(--color-fg-muted)" }}
                >
                  BBS, BBA &amp; Intermediate Level
                </p>
                <p
                  className="text-xs mt-2.5 leading-relaxed"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  Clear conceptual breakdown of material, labor, overhead allocation, marginal costing, and managerial decision frameworks.
                </p>
              </div>
              <div
                className="mt-4 pt-3 border-t"
                style={{ borderColor: "var(--color-surface-alt)" }}
              >
                <Link
                  href="/education#cost-management-accounting"
                  className="text-xs font-bold flex items-center gap-1.5 transition-colors link-accent-gold"
                >
                  <span>View Course Details</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Accounting Service Highlight */}
            <div
              className="editorial-card flex flex-col justify-between"
              style={{ backgroundColor: "var(--color-bg)" }}
            >
              <div>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-dark-accent)",
                  }}
                >
                  <Receipt size={16} />
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--color-accent)" }}
                >
                  Accounting Service
                </span>
                <h3
                  className="text-base font-bold mt-1"
                  style={{ color: "var(--color-fg)" }}
                >
                  Taxation &amp; Regulatory Compliance
                </h3>
                <p
                  className="text-xs mt-0.5 font-medium"
                  style={{ color: "var(--color-fg-muted)" }}
                >
                  Corporate &amp; Individual Advisory
                </p>
                <p
                  className="text-xs mt-2.5 leading-relaxed"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  Direct tax planning, VAT returns filing, advance tax calculations, and representation before revenue authorities.
                </p>
              </div>
              <div
                className="mt-4 pt-3 border-t"
                style={{ borderColor: "var(--color-border)" }}
              >
                <Link
                  href="/services#tax-compliance-advisory"
                  className="text-xs font-bold flex items-center gap-1.5 transition-colors link-accent-gold"
                >
                  <span>View Deliverables &amp; Scope</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
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
            title="Perspectives from Students and Advisory Clients"
            subtitle="Real experiences reflecting our commitment to concept clarity and meticulous financial guidance."
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
                      className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--color-gold-soft) 60%, transparent)",
                        color: "var(--color-accent)",
                      }}
                    >
                      {t.type === "student" ? "Student Tuition" : "Business Advisory"}
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed italic"
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
                    className="text-xs font-bold"
                    style={{ color: "var(--color-fg)" }}
                  >
                    {t.author}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-fg-muted)" }}
                  >
                    {t.designation}
                  </p>
                  {t.context && (
                    <p
                      className="text-xs font-medium mt-0.5"
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

      {/* 8. CTA Banner */}
      <CtaBanner />
    </div>
  );
}
