import Link from "next/link";
import { GraduationCap, Briefcase, ArrowRight, CheckCircle, BookOpen, ShieldCheck, Scale, FileText } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

export function DualPaths() {
  return (
    <section
      className="py-12 md:py-18 border-b"
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Two Core Disciplines"
          title="Education & Professional Accounting Services"
          subtitle="Concept-first student tuition alongside rigorous accounting and advisory practice."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Path 1: Education & Tuition */}
          <div
            className="group relative rounded-xl border p-6 sm:p-7 flex flex-col justify-between card-hover-accent"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div>
              <div
                className="flex items-center justify-between pb-4 border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-dark-accent)",
                  }}
                >
                  <GraduationCap size={20} />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "var(--color-fg-muted)" }}
                >
                  Student Coaching &amp; Tuition
                </span>
              </div>

              <div className="mt-5">
                <span className="eyebrow-badge mb-2">Academic Coaching &amp; Tuition</span>
                <h3
                  className="text-xl sm:text-2xl font-bold tracking-tight"
                  style={{ color: "var(--color-fg)" }}
                >
                  Education &amp; Tuition
                </h3>
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: "var(--color-gold)" }}
                >
                  Learn with clarity. Build with confidence.
                </p>
                <p
                  className="text-sm mt-3 leading-relaxed"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  Specialized tuition for commerce and accounting — building solid foundational understanding without rote memorization.
                </p>
              </div>

              <div
                className="mt-5 pt-4 border-t flex flex-col gap-3"
                style={{ borderColor: "var(--color-surface-alt)" }}
              >
                {[
                  { Icon: BookOpen, text: <><strong>Class 11 &amp; 12 Commerce:</strong> Financial Accounting, Economics, and Business Mathematics.</> },
                  { Icon: BookOpen, text: <><strong>Bachelor Level (BBS / BBA):</strong> Cost &amp; Management Accounting, Taxation, and Corporate Finance.</> },
                  { Icon: BookOpen, text: <><strong>Targeted Exam Preparation:</strong> Specialized guidance on concept mastery, problem solving, and step-marking presentation.</> },
                  { Icon: CheckCircle, text: <><strong>Concept First &amp; 1-on-1 Doubt Sessions:</strong> Diagnosing individual learning gaps with personal guidance.</> },
                ].map(({ Icon, text }, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Icon size={15} className="shrink-0 mt-0.5" style={{ color: "var(--color-gold)" }} />
                    <span className="text-xs" style={{ color: "var(--color-fg)" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--color-border)" }}>
              <Link href="/education" className="btn-primary w-full justify-between">
                <span>Explore Education &amp; Courses</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Path 2: Accounting & Advisory Services */}
          <div
            className="group relative rounded-xl border p-6 sm:p-7 flex flex-col justify-between card-hover-gold"
            style={{
              backgroundColor: "var(--color-dark-bg)",
              borderColor: "var(--color-dark-border)",
              color: "var(--color-fg-light)",
            }}
          >
            <div>
              <div
                className="flex items-center justify-between pb-4 border-b"
                style={{ borderColor: "var(--color-dark-border)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--color-accent-hover)",
                    color: "var(--color-dark-accent)",
                    border: "1px solid color-mix(in srgb, var(--color-gold) 50%, transparent)",
                  }}
                >
                  <Briefcase size={20} />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "var(--color-dark-fg-muted)" }}
                >
                  Commercial Advisory
                </span>
              </div>

              <div className="mt-5">
                <span className="eyebrow-badge dark mb-2">Professional Services</span>
                <h3
                  className="text-xl sm:text-2xl font-bold tracking-tight"
                  style={{ color: "var(--color-fg-light)" }}
                >
                  Accounting &amp; Advisory Services
                </h3>
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: "var(--color-dark-accent)" }}
                >
                  Practical financial &amp; taxation guidance.
                </p>
                <p
                  className="text-sm mt-3 leading-relaxed"
                  style={{ color: "var(--color-dark-fg-muted)" }}
                >
                  Bookkeeping, tax compliance, audit support, and financial advisory — grounded in strict ethical standards.
                </p>
              </div>

              <div
                className="mt-5 pt-4 border-t flex flex-col gap-3"
                style={{ borderColor: "color-mix(in srgb, var(--color-dark-border) 80%, transparent)" }}
              >
                {[
                  { Icon: Scale, text: <><strong>Taxation &amp; Regulatory Advisory:</strong> Direct tax filings, VAT compliance, TDS reviews, and dispute advisory.</> },
                  { Icon: FileText, text: <><strong>Accounting &amp; Reporting:</strong> Chart of accounts setup, standard financial statements, and MIS reporting.</> },
                  { Icon: ShieldCheck, text: <><strong>Audit &amp; Assurance Support:</strong> Internal controls review, risk matrix assessments, and audit file preparation.</> },
                  { Icon: Briefcase, text: <><strong>Business Advisory:</strong> Due diligence, working capital management, and financial feasibility studies.</> },
                ].map(({ Icon, text }, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Icon size={15} className="shrink-0 mt-0.5" style={{ color: "var(--color-gold)" }} />
                    <span className="text-xs" style={{ color: "var(--color-fg-light)" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-6 pt-5 border-t"
              style={{ borderColor: "var(--color-dark-border)" }}
            >
              <Link href="/services" className="btn-gold w-full justify-between">
                <span>Explore Accounting Services</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
