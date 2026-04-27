"use client";

import { useState } from "react";
import { Palette, Check } from "lucide-react";
import { THEMES, useTheme, type Theme } from "./theme-provider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Panel */}
      {open && (
        <div
          className="
            absolute bottom-full right-0 mb-3
            min-w-[260px]
            rounded-2xl
            bg-white/80 dark:bg-black/60
            backdrop-blur-xl backdrop-saturate-150
            border border-white/60 dark:border-white/10
            shadow-[0_12px_40px_-8px_rgba(15,26,46,0.25)]
            p-2
            before:absolute before:inset-x-0 before:top-0 before:h-px
            before:rounded-2xl
            before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent
            before:pointer-events-none
          "
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/60 px-3 pt-2 pb-3">
            Version du site
          </p>
          {THEMES.map((t) => {
            const active = t.id === theme;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id as Theme);
                  setOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5
                  rounded-xl
                  transition-colors
                  text-left
                  hover:bg-foreground/5
                  focus-visible:outline-none focus-visible:bg-foreground/5
                  ${active ? "bg-foreground/5" : ""}
                `}
                aria-pressed={active}
              >
                <span
                  aria-hidden="true"
                  className="flex shrink-0 rounded-full border border-foreground/10 overflow-hidden h-7 w-7"
                  style={{
                    background: `linear-gradient(135deg, ${t.swatch[0]} 0%, ${t.swatch[0]} 33%, ${t.swatch[1]} 33%, ${t.swatch[1]} 66%, ${t.swatch[2]} 66%, ${t.swatch[2]} 100%)`,
                  }}
                />
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-foreground">
                    {t.name}
                  </span>
                  <span className="block text-xs text-foreground/60 truncate">
                    {t.description}
                  </span>
                </span>
                {active && (
                  <Check className="h-4 w-4 text-[var(--brand-cobalt)] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Changer de thème visuel"
        aria-expanded={open}
        className="
          h-12 px-5
          rounded-full
          bg-white/70 dark:bg-black/45
          backdrop-blur-xl backdrop-saturate-150
          border border-white/60 dark:border-white/10
          shadow-[0_8px_32px_-12px_rgba(15,26,46,0.25),0_2px_8px_-4px_rgba(15,26,46,0.1)]
          flex items-center gap-2
          text-sm font-medium text-foreground
          hover:bg-white/90 dark:hover:bg-black/60
          transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cobalt)] focus-visible:ring-offset-2
          before:absolute before:inset-x-0 before:top-0 before:h-px
          before:rounded-full
          before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent
          before:pointer-events-none
          relative
        "
      >
        <Palette className="h-4 w-4" />
        <span className="hidden sm:inline">Thème</span>
        <span className="font-mono text-xs text-foreground/60 capitalize">
          {theme}
        </span>
      </button>
    </div>
  );
}
