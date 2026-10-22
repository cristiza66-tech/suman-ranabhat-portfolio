import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { profile, services, educationOfferings } from "@/data/profile";

// Compact footer nav — trimmed labels matching the header
const footerNav = [
  { label: "About", href: "/about" },
  { label: "Subjects", href: "/education" },
  { label: "Services", href: "/services" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer
      className="border-t pt-10 pb-8"
      style={{
        backgroundColor: "var(--color-dark-bg)",
        color: "var(--color-fg-light)",
        borderColor: "var(--color-dark-border)",
      }}
    >
      <div className="shell">
        {/* Top Callout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b items-center"
          style={{ borderColor: "color-mix(in srgb, var(--color-dark-border) 80%, transparent)" }}
        >
          <div className="lg:col-span-8">
            <span className="eyebrow-badge dark mb-3">
              Commerce &amp; Accounting Educator · Tuition &amp; Classes
            </span>
            <p
              className="text-xl sm:text-2xl font-bold tracking-tight mt-2 max-w-xl"
              style={{ color: "var(--color-fg-light)" }}
            >
              Elevating academic understanding. Building strong foundations for student success.
            </p>
            <p
              className="mt-3 text-base max-w-lg leading-relaxed"
              style={{ color: "var(--color-dark-fg-muted)" }}
            >
              Available for tuition, student guidance, and accounting work in Pokhara.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <Link href="/contact?type=tuition" className="btn-gold justify-center text-sm">
              <span>Enquire about tuition</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link
              href="/contact?type=services"
              className="btn-dark-secondary inline-flex items-center justify-center gap-2 rounded-[10px] text-sm font-semibold text-center"
              style={{ padding: "0.6rem 1.2rem" }}
            >
              <span>Discuss accounting work</span>
            </Link>
          </div>
        </div>

        {/* Main Footer Links */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-10 border-b"
          style={{ borderColor: "color-mix(in srgb, var(--color-dark-border) 80%, transparent)" }}
        >
          {/* Col 1: Bio */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <div className="flex items-center gap-2.5">
              <span
                className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs"
                style={{
                  backgroundColor: "var(--color-accent-hover)",
                  color: "var(--color-dark-accent)",
                  border: "1px solid color-mix(in srgb, var(--color-gold) 50%, transparent)",
                }}
              >
                {profile.initials}
              </span>
              <div>
                <span
                  className="font-bold text-base block"
                  style={{ color: "var(--color-fg-light)" }}
                >
                  {profile.name}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--color-dark-fg-muted)" }}
                >
                  Commerce &amp; Accounting Educator
                </span>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed pr-3"
              style={{ color: "var(--color-dark-fg-muted)" }}
            >
              {profile.summary}
            </p>
            <div
              className="flex flex-col gap-2 text-sm"
              style={{ color: "var(--color-dark-fg-muted)" }}
            >
              <div className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0" style={{ color: "var(--color-dark-accent)" }} aria-hidden="true" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="shrink-0" style={{ color: "var(--color-dark-accent)" }} aria-hidden="true" />
                <a
                  href={`tel:${profile.phoneTel}`}
                  className="py-1 transition-opacity hover:opacity-75"
                  style={{ color: "var(--color-dark-fg-muted)" }}
                >
                  {profile.phone}
                </a>
              </div>
              {profile.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} className="shrink-0" style={{ color: "var(--color-dark-accent)" }} aria-hidden="true" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="py-1 transition-opacity hover:opacity-75"
                    style={{ color: "var(--color-dark-fg-muted)" }}
                  >
                    {profile.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Education */}
          <div className="lg:col-span-3">
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-3.5"
              style={{ color: "var(--color-dark-accent)" }}
            >
              Tuition &amp; Education
            </h3>
            <ul className="flex flex-col gap-1 text-sm" style={{ color: "var(--color-dark-fg-muted)" }}>
              {educationOfferings.slice(0, 4).map((offering) => (
                <li key={offering.id}>
                  <Link
                    href={`/education#${offering.id}`}
                    className="inline-block py-1.5 transition-opacity hover:opacity-75 hover:underline"
                    style={{ color: "var(--color-dark-fg-muted)" }}
                  >
                    {offering.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/education"
                  className="font-medium hover:underline inline-flex items-center gap-1 py-1.5"
                  style={{ color: "var(--color-dark-accent)" }}
                >
                  All Academic Offerings <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-3">
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-3.5"
              style={{ color: "var(--color-dark-accent)" }}
            >
              Accounting Services
            </h3>
            <ul className="flex flex-col gap-1 text-sm" style={{ color: "var(--color-dark-fg-muted)" }}>
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="inline-block py-1.5 transition-opacity hover:opacity-75 hover:underline"
                    style={{ color: "var(--color-dark-fg-muted)" }}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="font-medium hover:underline inline-flex items-center gap-1 py-1.5"
                  style={{ color: "var(--color-dark-accent)" }}
                >
                  All Services &amp; Scope <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Navigation */}
          <div className="lg:col-span-2">
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-3.5"
              style={{ color: "var(--color-dark-accent)" }}
            >
              Navigation
            </h3>
            <ul className="flex flex-col gap-1 text-sm" style={{ color: "var(--color-dark-fg-muted)" }}>
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-1.5 transition-opacity hover:opacity-75 hover:underline"
                    style={{ color: "var(--color-dark-fg-muted)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
          style={{ color: "var(--color-dark-fg-muted)" }}
        >
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved. Dedicated to educational excellence and professional integrity.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="py-1.5 transition-opacity hover:opacity-75" style={{ color: "var(--color-dark-fg-muted)" }}>
              About
            </Link>
            <Link href="/contact" className="py-1.5 transition-opacity hover:opacity-75" style={{ color: "var(--color-dark-fg-muted)" }}>
              Contact
            </Link>
            <a
              href="#top"
              className="py-1.5 font-medium hover:underline"
              style={{ color: "var(--color-dark-accent)" }}
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
