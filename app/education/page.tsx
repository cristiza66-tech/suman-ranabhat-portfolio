import type { Metadata } from "next";
import { Check, HelpCircle, ArrowUpRight, GraduationCap, Users, Video, Clock } from "lucide-react";
import { educationOfferings, teachingPrinciples, faqs } from "@/data/profile";
import { pageSeo, buildPageMetadata, generateCourseListSchema, generateFaqSchema, generateBreadcrumbSchema, safeJsonLd, siteConfig } from "@/data/seo";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = buildPageMetadata(pageSeo.education);

export default function EducationPage() {
  const educationFaqs = faqs.filter(
    (f) => f.category === "education" || f.category === "general"
  );
  const courseJsonLd = generateCourseListSchema(educationOfferings);
  const faqJsonLd = generateFaqSchema(educationFaqs);
  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: "Home", url: `${siteConfig.siteUrl}/` },
    { name: "Commerce & Accounting Tuition", url: `${siteConfig.siteUrl}/education` },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(courseJsonLd) }}
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
        eyebrow="Tuition & Accounting Education in Pokhara"
        title="Commerce & Accounting Tuition for School and College Students"
        subtitle="Master accountancy, costing, and taxation with concept-first teaching. Available for Class 11, 12, BBS, and BBA students in Pokhara and online."
        primaryAction={{ label: "Enroll in a Cohort", href: "#enrollment-form" }}
        secondaryAction={{ label: "View Subjects & Syllabus", href: "#courses" }}
        metaList={[
          { label: "Target Levels", value: "Class 11, 12, BBS & BBA" },
          { label: "Pedagogy", value: "Concept-First Logic" },
          { label: "Class Modes", value: "In-Person & Live Online" },
        ]}
      />

      {/* Teaching Pillars */}
      <section
        className="py-12 md:py-16 border-b"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Our Educational Method"
            title="4 Pillars of Every Teaching Session"
            subtitle="How we guide students from initial confusion to exam-day mastery."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teachingPrinciples.map((tp) => (
              <div
                key={tp.number}
                className="card-hover-accent rounded-lg border p-5"
                style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
              >
                <span
                  className="text-lg font-bold font-mono"
                  style={{ color: "var(--color-gold)" }}
                >
                  {tp.number}
                </span>
                <h3
                  className="text-base font-bold mt-2"
                  style={{ color: "var(--color-fg)" }}
                >
                  {tp.title}
                </h3>
                <p
                  className="text-sm font-semibold mt-0.5"
                  style={{ color: "var(--color-gold)" }}
                >
                  {tp.tagline}
                </p>
                <p
                  className="text-sm mt-2.5 leading-relaxed"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {tp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses / Subjects Catalog */}
      <section
        id="courses"
        className="py-12 md:py-18 border-b scroll-mt-16"
        style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Academic Programs"
            title="Curated Subjects & Coaching Tracks"
            subtitle="Structured curriculum designed around official examination boards and university syllabi."
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {educationOfferings.map((course) => (
              <div
                key={course.id}
                id={course.id}
                className="card-hover-gold rounded-xl border p-6 sm:p-7 flex flex-col justify-between scroll-mt-20"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <div>
                  <div
                    className="flex items-center justify-between gap-4 flex-wrap pb-3.5 border-b"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{ backgroundColor: "var(--color-gold-soft)", color: "var(--color-accent)" }}
                    >
                      {course.category}
                    </span>
                    <span
                      className="text-xs font-semibold flex items-center gap-1.5"
                      style={{ color: "var(--color-fg-muted)" }}
                    >
                      <GraduationCap size={13} style={{ color: "var(--color-gold)" }} />
                      <span>{course.level}</span>
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold mt-4"
                    style={{ color: "var(--color-fg)" }}
                  >
                    {course.title}
                  </h3>
                  <p
                    className="text-sm font-medium mt-1"
                    style={{ color: "var(--color-fg-muted)" }}
                  >
                    Target: {course.targetAudience}
                  </p>
                  <p
                    className="text-sm mt-3 leading-relaxed"
                    style={{ color: "var(--color-fg-secondary)" }}
                  >
                    {course.description}
                  </p>

                  <div
                    className="mt-4 pt-4 border-t"
                    style={{ borderColor: "var(--color-surface-alt)" }}
                  >
                    <p
                      className="text-sm font-bold uppercase tracking-wider mb-2.5"
                      style={{ color: "var(--color-fg)" }}
                    >
                      Key Learning Highlights:
                    </p>
                    <ul className="flex flex-col gap-2">
                      {course.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs"
                          style={{ color: "var(--color-fg-secondary)" }}
                        >
                          <Check size={14} className="shrink-0 mt-0.5" style={{ color: "var(--color-gold)" }} />
                          <span>{h}</span>
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
                    className="text-xs font-semibold px-2.5 py-1 rounded border"
                    style={{
                      backgroundColor: "var(--color-bg)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-accent)",
                    }}
                  >
                    Mode: {course.mode}
                  </span>
                  <a href="#enrollment-form" className="btn-primary text-xs">
                    <span>Inquire for this Subject</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Formats */}
      <section
        className="py-12 md:py-16 border-b"
        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Delivery Modes"
            title="Flexible Formats for Focused Learning"
            subtitle="Choose the batch setup that best suits your study routine."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                Icon: Users,
                title: "Small Group In-Person",
                tag: "Pokhara / In-Person Sessions",
                desc: "Small batches for interactive discussions, personal notebook reviews, and continuous doubt resolution.",
              },
              {
                Icon: Video,
                title: "Interactive Live Online",
                tag: "Digital Classroom",
                desc: "Live classes with digital whiteboards, screen-shared financial schedules, and downloadable revision materials.",
              },
              {
                Icon: Clock,
                title: "1-on-1 Exam Intensive",
                tag: "Targeted Remediation",
                desc: "Fast-track coaching focused on problem chapters, past-paper answer writing, and step-marking optimization.",
              },
            ].map(({ Icon, title, tag, desc }) => (
              <div
                key={title}
                className="p-5 rounded-xl border flex flex-col items-start"
                style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--color-accent)", color: "var(--color-dark-accent)" }}
                >
                  <Icon size={20} />
                </div>
                <h3
                  className="text-base font-bold"
                  style={{ color: "var(--color-fg)" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm font-semibold mt-0.5"
                  style={{ color: "var(--color-gold)" }}
                >
                  {tag}
                </p>
                <p
                  className="text-sm mt-2.5 leading-relaxed"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section
        className="py-12 md:py-18 border-b"
        style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Student & Parent FAQ"
            title="Common Questions About Tuition & Classes"
            subtitle="Everything you need to know about batch scheduling, fees, and doubt resolution."
            align="center"
          />

          <div className="max-w-3xl mx-auto flex flex-col gap-3.5">
            {educationFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-lg border p-5"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <h3
                  className="text-sm font-bold flex items-start gap-2"
                  style={{ color: "var(--color-fg)" }}
                >
                  <HelpCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--color-gold)" }} />
                  <span>{faq.question}</span>
                </h3>
                <p
                  className="text-sm mt-2 pl-6 leading-relaxed"
                  style={{ color: "var(--color-fg-secondary)" }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section
        id="enrollment-form"
        className="py-12 md:py-18 scroll-mt-16"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="shell">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              eyebrow="Cohort Enrollment"
              title="Inquire or Reserve Your Seat"
              subtitle="Share your academic background and we'll be in touch with schedule details."
              align="center"
            />
            <ContactForm defaultTab="tuition" />
          </div>
        </div>
      </section>
    </div>
  );
}
