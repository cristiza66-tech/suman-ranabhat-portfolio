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
            Whether you&rsquo;re a student preparing for exams, a parent looking for tuition, or a business that needs accounting help, reach out to begin the conversation.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full sm:w-auto">
            <Link
              href="/contact?type=tuition"
              className="btn-gold w-full sm:w-auto"
            >
              <GraduationCap size={16} aria-hidden="true" />
              <span>Enquire about tuition</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link
              href="/contact?type=services"
              className="btn-dark-secondary w-full sm:w-auto"
            >
              <span>Discuss accounting work</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div
            className="mt-6 text-sm flex flex-wrap items-center justify-center gap-2"
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
