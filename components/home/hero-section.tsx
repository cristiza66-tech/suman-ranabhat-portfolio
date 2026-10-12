import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, GraduationCap, CheckCircle2 } from "lucide-react";
import { profile } from "@/data/profile";

export function HeroSection() {
  return (
    <section
      className="relative pt-8 pb-14 md:pt-12 md:pb-18 overflow-hidden border-b"
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow badge — static dot, no pulse */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
              style={{
                backgroundColor: "var(--color-gold-soft)",
                border: "1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)",
                color: "var(--color-accent)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-gold)" }}
              />
              <span>{profile.eyebrow}</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-left"
              style={{ color: "var(--color-fg)" }}
            >
              {profile.name}
            </h1>

            <div
              className="flex flex-wrap items-center gap-2 sm:gap-3 text-base sm:text-lg font-semibold mt-2"
              style={{ color: "var(--color-accent)" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap size={18} style={{ color: "var(--color-gold)" }} />
                <span>Commerce &amp; Accounting Educator</span>
              </span>
              <span
                className="hidden sm:inline font-light"
                style={{ color: "var(--color-gold)" }}
              >
                ·
              </span>
              <span
                className="text-sm sm:text-base font-medium"
                style={{ color: "var(--color-fg-secondary)" }}
              >
                Concept-First Commerce Tuition
              </span>
            </div>

            <p
              className="text-sm sm:text-base mt-4 leading-relaxed max-w-xl"
              style={{ color: "var(--color-fg-secondary)" }}
            >
              {profile.tagline}
            </p>

            {/* Primary Action Paths */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6 w-full sm:w-auto">
              <Link
                href="/education"
                className="btn-primary justify-center text-sm"
              >
                <GraduationCap size={16} />
                <span>Explore Tuition &amp; Subjects</span>
                <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/about"
                className="btn-secondary justify-center text-sm"
              >
                <span>About Teaching Approach</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t w-full"
              style={{ borderColor: "var(--color-border)" }}
            >
              {[
                { title: "Concept First", sub: "Zero rote-memorization" },
                { title: "Strong Fundamentals", sub: "Clear subject mastery" },
                { title: "Personal Attention", sub: "Dedicated student guidance" },
              ].map((b) => (
                <div key={b.title} className="flex items-start gap-2">
                  <CheckCircle2
                    size={15}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--color-gold)" }}
                  />
                  <div className="flex flex-col">
                    <span
                      className="text-xs font-bold"
                      style={{ color: "var(--color-fg)" }}
                    >
                      {b.title}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-fg-muted)" }}
                    >
                      {b.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Portrait Frame */}
              <div
                className="portrait-frame aspect-[4/5] relative flex items-center justify-center"
                style={{ backgroundColor: "var(--color-dark-bg)" }}
              >
                <Image
                  src={profile.portrait}
                  alt={profile.portraitAlt}
                  width={600}
                  height={750}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 440px"
                  className="w-full h-full object-cover"
                />

                {/* Overlay Top Tag */}
                <div
                  className="absolute top-3 left-3 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-accent) 90%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--color-gold) 40%, transparent)",
                  }}
                >
                  <GraduationCap
                    size={12}
                    style={{ color: "var(--color-gold)" }}
                  />
                  <span
                    className="text-[10px] font-bold tracking-wider uppercase"
                    style={{ color: "var(--color-fg-light)" }}
                  >
                    Commerce &amp; Accounting Educator
                  </span>
                </div>

                {/* Floating Bottom Card */}
                <div
                  className="absolute bottom-3 left-3 right-3 backdrop-blur-md p-3 rounded-lg"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-dark-bg) 95%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--color-gold) 40%, transparent)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: "var(--color-dark-accent)" }}
                      >
                        Commerce &amp; Accounting Tuition
                      </p>
                      <p
                        className="text-sm font-bold mt-0.5"
                        style={{ color: "var(--color-fg-light)" }}
                      >
                        {profile.name}
                      </p>
                    </div>
                    <Link
                      href="/about"
                      className="text-xs font-semibold flex items-center gap-1 transition-opacity hover:opacity-75"
                      style={{ color: "var(--color-gold)" }}
                    >
                      <span>Bio</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
