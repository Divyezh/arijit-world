"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LiveCounter from "./LiveCounter";
import ThemeSwitcher from "./ThemeSwitcher";

interface TopBarProps {
  onOpenModal: (type: "about" | "faq" | "support") => void;
}

export default function TopBar({ onOpenModal }: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; key: "about" | "faq" | "support" }[] = [
    { label: "About", key: "about" },
    { label: "FAQ", key: "faq" },
    { label: "Support", key: "support" },
  ];

  return (
    <header
      className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-4 sm:px-6"
      style={{ height: "var(--topbar-height)" }}
      id="topbar"
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        <LiveCounter />
        <div className="hidden sm:block">
          <ThemeSwitcher />
        </div>
      </div>

      {/* Right side — desktop nav */}
      <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onOpenModal(item.key)}
            className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
            id={`nav-${item.key}`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right side — mobile hamburger */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="sm:hidden">
          <ThemeSwitcher />
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-4 mt-2 w-44 rounded-xl glass overflow-hidden z-50 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  onOpenModal(item.key);
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
