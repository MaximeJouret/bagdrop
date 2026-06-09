"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "cobalt" | "dopamine" | "atelier" | "maison";

export const THEMES: Array<{
  id: Theme;
  name: string;
  description: string;
  /** Three color hex codes for the swatch preview */
  swatch: [string, string, string];
}> = [
  {
    id: "cobalt",
    name: "Cobalt",
    description: "Calme, confiant, Apple-inspired",
    swatch: ["#FAFAF7", "#1E3A8A", "#FFC857"],
  },
  {
    id: "maison",
    name: "Maison",
    description: "Heritage luxe, serif, Embelco",
    swatch: ["#FFFFFF", "#232931", "#D4C8B5"],
  },
  {
    id: "dopamine",
    name: "Dopamine",
    description: "Vibrant, joyeux, Gen Z",
    swatch: ["#FFF6D6", "#F8166B", "#00B4FF"],
  },
  {
    id: "atelier",
    name: "Atelier",
    description: "Illustré, hand-drawn, playful",
    swatch: ["#FCE5D2", "#E07050", "#F5D88A"],
  },
];

const STORAGE_KEY = "bagdrop-theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("cobalt");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored && THEMES.some((t) => t.id === stored)) {
        setThemeState(stored);
      }
    } catch {
      // localStorage may be unavailable
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    THEMES.forEach((t) => root.classList.remove(`theme-${t.id}`));
    if (theme !== "cobalt") {
      root.classList.add(`theme-${theme}`);
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme, hydrated]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}
