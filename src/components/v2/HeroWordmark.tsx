"use client";

import { motion } from "framer-motion";

export default function HeroWordmark() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4"
      style={{ paddingBottom: "clamp(120px, 20vh, 200px)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        {/* Devanagari secondary */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/30 text-sm sm:text-base tracking-[0.3em] uppercase mb-3 sm:mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          प्रेम गीतों का सिलसिला
        </motion.p>

        {/* Main title */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9]"
          style={{
            fontFamily: "var(--font-display)",
            textShadow: "0 2px 40px rgba(0,0,0,0.6), 0 0 80px rgba(0,0,0,0.3)",
          }}
        >
          <span className="text-white block">ARIJIT</span>
          <span className="text-white block">SINGH</span>
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl tracking-[0.2em] uppercase"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-accent)",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          LOVE, IN EVERY NOTE.
        </motion.p>
      </motion.div>
    </div>
  );
}
