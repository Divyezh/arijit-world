"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Radio } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/moods", label: "Moods" },
  { href: "/albums", label: "Filmography" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
        }`}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="section-container h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all duration-300">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span
                className="text-sm font-bold tracking-[0.2em] uppercase text-gold-gradient"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Arijit Radio
              </span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-amber-500/60 hidden sm:block">
                Love, In Every Note
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  pathname === link.href
                    ? "text-amber-400 bg-amber-400/10"
                    : "text-amber-100/60 hover:text-amber-100 hover:bg-white/5"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-lg glass-light flex items-center justify-center text-amber-400"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass pt-(--nav-height)"
          >
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className={`text-2xl font-semibold tracking-wide transition-colors ${
                      pathname === link.href ? "text-amber-400" : "text-amber-100/70 hover:text-amber-100"
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
