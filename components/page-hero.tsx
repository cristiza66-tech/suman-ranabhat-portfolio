import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  metaList?: { label: string; value: string }[];
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  metaList,
}: PageHeroProps) {
  return (
    <section
      className="relative pt-9 pb-10 md:pt-14 md:pb-14 border-b"
      style={{
        backgroundColor: "var(--color-surface-dim)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="shell">
        <div className="max-w-3xl">
          <span className="eyebrow-badge mb-3">{eyebrow}</span>
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mt-2 leading-[1.15]"
            style={{ color: "var(--color-fg)" }}
          >
            {title}
          </h1>
          <p
            className="text-base sm:text-lg mt-3 leading-relaxed"
            style={{ color: "var(--color-fg-secondary)" }}
          >
            {subtitle}
          </p>

          {(primaryAction || secondaryAction) && (
            <div className="flex flex-wrap items-center gap-3 mt-6">
              {primaryAction && (
                <Link href={primaryAction.href} className="btn-primary">
                  <span>{primaryAction.label}</span>
                  <ArrowUpRight size={15} />
                </Link>
              )}
              {secondaryAction && (
                <Link href={secondaryAction.href} className="btn-secondary">
                  <span>{secondaryAction.label}</span>
                </Link>
              )}
            </div>
          )}

          {metaList && metaList.length > 0 && (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-5 pt-7 mt-7 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              {metaList.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span
                    className="text-xs uppercase tracking-wider font-semibold"
                    style={{ color: "var(--color-fg-muted)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm font-bold mt-0.5"
                    style={{ color: "var(--color-fg)" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
