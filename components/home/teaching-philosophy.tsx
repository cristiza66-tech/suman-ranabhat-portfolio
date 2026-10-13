import { teachingPrinciples } from "@/data/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Check, Lightbulb } from "lucide-react";

export function TeachingPhilosophy() {
  return (
    <section
      className="py-12 md:py-18 border-b"
      style={{
        backgroundColor: "var(--color-surface-alt)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Teaching Philosophy"
          title="Built for Long-Term Understanding, Not Short-Term Memorization"
          subtitle="Commerce and accountancy are logical systems. Grasp the principles and exam success follows naturally."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teachingPrinciples.map((principle) => (
            <div
              key={principle.number}
              className="card-hover-gold rounded-lg border p-5 flex flex-col"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-mono text-xl font-bold"
                  style={{ color: "var(--color-gold)" }}
                >
                  {principle.number}
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <Check size={12} style={{ color: "var(--color-gold)" }} />
                </div>
              </div>

              <h3
                className="text-base font-bold tracking-tight"
                style={{ color: "var(--color-fg)" }}
              >
                {principle.title}
              </h3>
              <p
                className="text-[10px] font-semibold uppercase tracking-wider mt-0.5"
                style={{ color: "var(--color-gold)" }}
              >
                {principle.tagline}
              </p>

              <p
                className="text-xs leading-relaxed mt-3"
                style={{ color: "var(--color-fg-secondary)" }}
              >
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Philosophy Highlight Banner */}
        <div
          className="mt-8 rounded-xl p-6 sm:p-7 border flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          style={{
            backgroundColor: "var(--color-accent)",
            borderColor: "var(--color-dark-border)",
            color: "var(--color-fg-light)",
          }}
        >
          <div className="flex items-start gap-3.5 max-w-2xl">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
              style={{
                backgroundColor: "var(--color-accent-hover)",
                color: "var(--color-dark-accent)",
                border: "1px solid color-mix(in srgb, var(--color-gold) 40%, transparent)",
              }}
            >
              <Lightbulb size={18} />
            </div>
            <div>
              <p
                className="text-[10px] uppercase tracking-widest font-bold"
                style={{ color: "var(--color-dark-accent)" }}
              >
                Educator Creed
              </p>
              <p
                className="text-sm sm:text-base font-medium mt-1 leading-relaxed italic"
                style={{ color: "var(--color-fg-light)" }}
              >
                &ldquo;If a student can explain why a ledger entry is made from first principles, they can solve any variation an examiner presents.&rdquo;
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <span
              className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: "var(--color-dark-surface)",
                border: "1px solid var(--color-dark-border)",
                color: "var(--color-dark-accent)",
              }}
            >
              Active Tuition Batches
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
