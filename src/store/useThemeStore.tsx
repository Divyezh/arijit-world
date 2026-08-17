"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

/* ─── Theme definitions ─── */
export interface ThemeDefinition {
  id: string;
  label: string;
  accent: string;
  accentRGB: string;
  backgroundImage: string;
  vibe: string;
}

export const themes: ThemeDefinition[] = [
  {
    id: "golden-hour",
    label: "Golden Hour",
    accent: "#d4a853",
    accentRGB: "212, 168, 83",
    backgroundImage: "/images/hero-bg.png",
    vibe: "Warm amber tones",
  },
  {
    id: "monsoon-blue",
    label: "Monsoon Blue",
    accent: "#5b8fb9",
    accentRGB: "91, 143, 185",
    backgroundImage: "/images/hero-bg-alt.png",
    vibe: "Cool rain vibes",
  },
  {
    id: "midnight-maroon",
    label: "Midnight Maroon",
    accent: "#c0566a",
    accentRGB: "192, 86, 106",
    backgroundImage: "/images/hero-bg.png", // Fallback — will use CSS filter for maroon tint
    vibe: "Dark velvet mood",
  },
];

interface ThemeContextType {
  currentTheme: ThemeDefinition;
  setTheme: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function applyThemeToDOM(theme: ThemeDefinition) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", theme.id);
  root.style.setProperty("--color-accent", theme.accent);
  root.style.setProperty("--color-accent-rgb", theme.accentRGB);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeDefinition>(themes[0]);

  // Restore from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("arijit-theme");
      if (stored) {
        const found = themes.find((t) => t.id === stored);
        if (found) {
          setCurrentTheme(found);
          applyThemeToDOM(found);
        }
      } else {
        applyThemeToDOM(themes[0]);
      }
    }
  }, []);

  const setTheme = useCallback((id: string) => {
    const found = themes.find((t) => t.id === id);
    if (found) {
      setCurrentTheme(found);
      applyThemeToDOM(found);
      if (typeof window !== "undefined") {
        localStorage.setItem("arijit-theme", found.id);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
