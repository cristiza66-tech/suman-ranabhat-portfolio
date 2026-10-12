import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  theme = "light",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col ${
        isCenter ? "items-center text-center mx-auto" : "items-start text-left"
      } max-w-3xl mb-8 sm:mb-10 ${className}`}
    >
      {eyebrow && (
        <span className={`eyebrow-badge ${isDark ? "dark" : ""} mb-2.5`}>
          {eyebrow}
        </span>
      )}
      <h2
        className="text-2xl sm:text-3xl font-bold tracking-tight leading-[1.2]"
        style={{ color: isDark ? "var(--color-fg-light)" : "var(--color-fg)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-3 text-sm sm:text-base leading-relaxed"
          style={{
            color: isDark ? "var(--color-dark-fg-muted)" : "var(--color-fg-secondary)",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
