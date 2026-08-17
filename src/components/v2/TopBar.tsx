"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
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

      {/* Middle — Support Me Button */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center z-10">
        <button
          onClick={() => onOpenModal("support")}
          className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-md cursor-pointer border border-amber-400/30 bg-linear-to-r from-amber-500/15 via-rose-500/15 to-amber-500/15 text-amber-200 hover:text-white hover:border-amber-400/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:scale-105 active:scale-95"
          id="nav-support-me-btn"
          title="Support the Creator"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <Heart className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform fill-rose-400/20" />
          <span className="tracking-wide font-medium">Support Me</span>
        </button>
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
            className="absolute top-full right-4 mt-2 w-48 rounded-xl glass overflow-hidden z-50 md:hidden shadow-2xl border border-white/10"
          >
            <button
              onClick={() => {
                onOpenModal("support");
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-sm font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 transition-colors flex items-center gap-2 border-b border-white/5 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400/20" />
              Support Me (QR Code)
            </button>
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
