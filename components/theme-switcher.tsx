"use client";

import { useEffect, useState, useRef } from "react";
import { Palette, X } from "lucide-react";

type ThemeId = "navy" | "emerald" | "charcoal" | "slate" | "burgundy";

const themes: { id: ThemeId; label: string; bg: string; accent: string; dot: string }[] = [
  { id: "navy",     label: "Academic Navy",    bg: "#FAF9F5", accent: "#0E2439", dot: "#C29B38" },
  { id: "emerald",  label: "Forest Emerald",   bg: "#F8FAF7", accent: "#1A4D3A", dot: "#3A9A72" },
  { id: "charcoal", label: "Charcoal Gold",    bg: "#F7F6F2", accent: "#2A2A28", dot: "#A8882A" },
  { id: "slate",    label: "Slate Blue",       bg: "#F5F7FA", accent: "#1E3A5F", dot: "#2E6DB4" },
  { id: "burgundy", label: "Burgundy Cream",   bg: "#FAF5F0", accent: "#6B1E35", dot: "#9B6B4A" },
];

const STORAGE_KEY = "sr-portfolio-theme";

export function ThemeSwitcher() {
  const [active, setActive] = useState<ThemeId>("navy");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const applyTheme = (id: ThemeId) => {
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (saved && themes.find((t) => t.id === saved)) {
      applyTheme(saved);
      queueMicrotask(() => {
        setActive(saved);
      });
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function selectTheme(id: ThemeId) {
    applyTheme(id);
    setActive(id);
    setOpen(false);
  }

  const activeTheme = themes.find((t) => t.id === active)!;

  return (
    <div
      ref={ref}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2"
      aria-label="Theme switcher"
    >
      {/* Panel */}
      {open && (
        <div
          className="bg-white border border-[#E6E2D8] rounded-xl shadow-lg p-3 w-52 flex flex-col gap-1"
          style={{
            boxShadow: "0 8px 30px -4px rgba(0,0,0,0.12)",
            animation: "fadeIn 0.15s ease",
          }}
          role="listbox"
          aria-label="Color theme options"
        >
          <div className="flex items-center justify-between px-1 pb-2 border-b border-[#F0EDE6] mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#667085]">
              Preview Theme
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-[#9BA8B8] hover:text-[#12161A] transition-colors"
              aria-label="Close theme switcher"
            >
              <X size={13} />
            </button>
          </div>

          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => selectTheme(t.id)}
              role="option"
              aria-selected={active === t.id}
              className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-left transition-colors text-xs font-medium ${
                active === t.id
                  ? "bg-[#F3F1EA] text-[#12161A]"
                  : "text-[#475467] hover:bg-[#F8F7F4] hover:text-[#12161A]"
              }`}
            >
              {/* Swatch */}
              <span
                className="flex items-center gap-0.5 shrink-0"
                aria-hidden="true"
              >
                <span
                  className="w-3.5 h-5 rounded-l-sm border border-[#D0C8BE]"
                  style={{ backgroundColor: t.accent }}
                />
                <span
                  className="w-3.5 h-5 rounded-r-sm border border-[#D0C8BE] border-l-0"
                  style={{ backgroundColor: t.dot }}
                />
              </span>
              <span className="truncate">{t.label}</span>
              {active === t.id && (
                <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-[#667085]">
                  Active
                </span>
              )}
            </button>
          ))}

          <p className="text-[9px] text-[#9BA8B8] text-center mt-2 px-1">
            Preview tool · Not shown to visitors
          </p>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#E6E2D8] bg-white shadow-sm text-xs font-semibold text-[#475467] hover:text-[#12161A] hover:border-[#C0B89A] transition-all"
        aria-expanded={open}
        aria-haspopup="listbox"
        title="Switch color theme (preview only)"
        style={{ boxShadow: "0 2px 10px -2px rgba(0,0,0,0.10)" }}
      >
        {/* Active swatch dots */}
        <span className="flex items-center gap-0.5" aria-hidden="true">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: activeTheme.accent }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: activeTheme.dot }}
          />
        </span>
        <Palette size={13} />
        <span className="hidden sm:inline">Theme</span>
      </button>
    </div>
  );
}
