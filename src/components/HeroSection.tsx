"use client";

import { motion } from "framer-motion";
import { Play, Disc3 } from "lucide-react";
import { useRadioPlayer } from "@/context/RadioPlayerContext";
import LiveTicker from "./LiveTicker";

export default function HeroSection() {
  const { play, isPlaying, currentTrack } = useRadioPlayer();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${isPlaying ? "breathing" : ""}`}
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
        }}
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/90" />
      <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40" />
      <div className="absolute inset-0 vignette" />

      {/* Floating dust particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="float-particle absolute rounded-full bg-amber-400/30"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 12}s`,
            animationDuration: `${Math.random() * 8 + 8}s`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Now playing badge */}
        {isPlaying && currentTrack && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs tracking-widest uppercase"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-gold)" }}
          >
            <Disc3 className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
            {currentTrack.title} · {currentTrack.movie}
          </motion.div>
        )}

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.85] tracking-tight mb-4"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-ivory)",
            textShadow: "0 4px 60px rgba(212, 168, 83, 0.3)",
          }}
        >
          ARIJIT
          <br />
          SINGH
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl tracking-[0.3em] uppercase mb-8 text-gold-gradient"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
        >
          Love, In Every Note.
        </motion.p>

        {/* Live ticker */}
        <div className="mb-10">
          <LiveTicker />
        </div>

        {/* Play CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
        >
          <button
            onClick={play}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-semibold tracking-[0.2em] uppercase transition-all duration-500 hover:scale-105"
            style={{
              fontFamily: "var(--font-heading)",
              background: "linear-gradient(135deg, #d4a853, #c87533)",
              color: "#0a0a0a",
              boxShadow: "0 0 40px rgba(212, 168, 83, 0.3), 0 0 80px rgba(212, 168, 83, 0.1)",
            }}
            aria-label="Play radio"
            id="hero-play-button"
          >
            <Play className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" />
            {isPlaying ? "Now Playing" : "Play Radio"}
            <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-(--color-deep-black) to-transparent" />
    </section>
  );
}
