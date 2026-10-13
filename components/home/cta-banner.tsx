import Link from "next/link";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { profile } from "@/data/profile";

export function CtaBanner() {
  return (
    <section
      className="py-12 md:py-16 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-accent)", color: "var(--color-fg-light)" }}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(var(--color-gold) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="shell relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight"
            style={{ color: "var(--color-fg-light)" }}
          >
            Ready to Build Clarity and Better Results?
          </h2>
          <p
            className="text-sm sm:text-base mt-4 max-w-xl leading-relaxed"
            style={{ color: "var(--color-dark-fg-muted)" }}
          >
            Whether you&rsquo;re a student preparing for exams or a parent seeking concept-first tuition, reach out to begin the conversation.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full sm:w-auto">
            <Link
              href="/contact?type=tuition"
              className="btn-gold w-full sm:w-auto justify-center font-semibold"
            >
              <GraduationCap size={16} />
              <span>Enroll in Tuition Cohort</span>
              <ArrowUpRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="btn-dark-secondary inline-flex items-center justify-center gap-2 rounded-[10px] text-sm font-semibold w-full sm:w-auto text-center"
              style={{ padding: "0.6rem 1.2rem" }}
            >
              <span>Schedule Academic Consultation</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div
            className="mt-6 text-xs flex items-center gap-2"
            style={{ color: "var(--color-dark-accent)" }}
          >
            <span>Direct WhatsApp &amp; Inquiries:</span>
            <a
              href={profile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium transition-opacity hover:opacity-75"
              style={{ color: "var(--color-fg-light)" }}
            >
              {profile.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
