import Link from "next/link";
import { Award, ShieldCheck, ArrowRight, FileCheck, Building2 } from "lucide-react";
import { qualifications } from "@/data/profile";

export function CredentialsOverview() {
  return (
    <section
      className="py-12 md:py-18 border-b"
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="eyebrow-badge mb-3">Credentials &amp; Standards</span>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight"
              style={{ color: "var(--color-fg)" }}
            >
              Grounded in Technical Rigor &amp; Professional Integrity
            </h2>
            <p
              className="text-sm mt-4 leading-relaxed"
              style={{ color: "var(--color-fg-secondary)" }}
            >
              Every session and consultation is anchored in verified qualifications, ongoing professional development, and high ethical standards.
            </p>

            <div className="flex flex-col gap-2.5 mt-6 w-full">
              {[
                { Icon: ShieldCheck, text: "Committed to Strict Professional Code of Ethics" },
                { Icon: FileCheck, text: "Active Statutory & Regulatory Compliance Mastery" },
                { Icon: Building2, text: "Confidential, Independent Professional Practice" },
              ].map(({ Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 p-3 rounded-lg border"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <Icon size={17} className="shrink-0" style={{ color: "var(--color-gold)" }} />
                  <span
                    className="text-xs sm:text-sm font-semibold"
                    style={{ color: "var(--color-fg)" }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link href="/experience" className="btn-secondary inline-flex items-center gap-2 text-sm">
                <span>View Full Academic &amp; Career Journey</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Qualification Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {qualifications.map((q) => (
              <div
                key={q.id}
                className="card-hover-accent rounded-lg border p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      color: "var(--color-dark-accent)",
                      border: "1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)",
                    }}
                  >
                    <Award size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: "var(--color-gold)" }}
                      >
                        {q.category}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--color-fg-muted)" }}
                      >
                        · {q.year}
                      </span>
                    </div>
                    <h3
                      className="text-base sm:text-lg font-bold mt-0.5"
                      style={{ color: "var(--color-fg)" }}
                    >
                      {q.title}
                    </h3>
                    <p
                      className="text-xs font-medium mt-0.5"
                      style={{ color: "var(--color-fg-secondary)" }}
                    >
                      {q.body}
                    </p>
                    {q.description && (
                      <p
                        className="text-xs mt-1.5 leading-relaxed max-w-xl"
                        style={{ color: "var(--color-fg-muted)" }}
                      >
                        {q.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
