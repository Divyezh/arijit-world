"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { useTheme, themes } from "@/store/useThemeStore";

export default function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sm text-white/80 hover:text-white transition-colors cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        id="theme-switcher"
      >
        <Palette size={14} />
        <span className="hidden sm:inline">Change Theme</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-52 rounded-xl glass overflow-hidden z-50"
            role="listbox"
            aria-label="Choose theme"
          >
            {themes.map((theme) => (
              <button
                key={theme.id}
                role="option"
                aria-selected={currentTheme.id === theme.id}
                onClick={() => {
                  setTheme(theme.id);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span
                  className="w-4 h-4 rounded-full shrink-0 ring-2 ring-white/20"
                  style={{ background: theme.accent }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white/90">
                    {theme.label}
                  </div>
                  <div className="text-xs text-white/40">{theme.vibe}</div>
                </div>
                {currentTheme.id === theme.id && (
                  <Check size={14} className="text-white/60 shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
