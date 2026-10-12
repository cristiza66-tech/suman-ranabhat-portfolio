"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { profile } from "@/data/profile";

// Compact nav items — Home removed (logo links home); long labels trimmed
const navItems = [
  { label: "About", href: "/about" },
  { label: "Subjects", href: "/education" },
  { label: "Services", href: "/services" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  return (
    <header className="site-header-fixed w-full">
      <div className="shell flex items-center justify-between h-14">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:outline-none"
          aria-label={`${profile.name} — Home`}
        >
          <span
            className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs tracking-wider transition-transform group-hover:scale-105"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-dark-accent)",
              border: "1px solid color-mix(in srgb, var(--color-gold) 40%, transparent)",
            }}
          >
            {profile.initials}
          </span>
          <div className="flex flex-col leading-none">
            <span
              className="font-bold text-sm tracking-tight transition-colors"
              style={{ color: "var(--color-fg)" }}
            >
              {profile.name}
            </span>
            <span
              className="text-[10px] font-medium tracking-wide"
              style={{ color: "var(--color-fg-secondary)" }}
            >
              Commerce &amp; Accounting Educator
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: "var(--color-surface-alt)",
            border: "1px solid var(--color-border)",
          }}
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive ? "shadow-sm" : "hover:opacity-80"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: "var(--color-accent)",
                        color: "var(--color-accent-fg)",
                      }
                    : {
                        color: "var(--color-fg-secondary)",
                      }
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/contact"
            className="btn-primary text-xs !py-2 !px-3.5 tracking-wide shadow-sm"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg transition-colors focus:outline-none"
          style={{
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface)",
            color: "var(--color-fg)",
          }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden px-5 py-5 shadow-lg animate-[fadeIn_0.15s_ease]"
          style={{
            borderBottom: "1px solid var(--color-border)",
            backgroundColor: "var(--color-bg)",
          }}
        >
          <nav className="flex flex-col gap-1.5" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "font-semibold" : ""}`}
                  style={
                    isActive
                      ? {
                          backgroundColor: "var(--color-accent)",
                          color: "var(--color-accent-fg)",
                        }
                      : {
                          color: "var(--color-fg-secondary)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-surface-alt)";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-fg)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-fg-secondary)";
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 mt-2" style={{ borderTop: "1px solid var(--color-border)" }}>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full justify-center text-sm"
              >
                <span>Get in Touch</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
