"use client";

import { motion } from "framer-motion";
import { Play, Calendar, Music } from "lucide-react";
import { useRadioPlayer } from "@/context/RadioPlayerContext";
import { getFeaturedTracks } from "@/data/tracks";

export default function RomanticEraTimeline() {
  const { setQueue } = useRadioPlayer();
  const featured = getFeaturedTracks();

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 rounded-full bg-amber-500/3 blur-3xl" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase text-amber-500/60 mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            A Journey Through Love
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-gold-gradient"
            style={{ fontFamily: "var(--font-display)" }}
          >
            THE ROMANTIC ERA
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-amber-500/30 to-transparent hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {featured.map((track, i) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`md:flex items-center gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } mb-8`}
              >
                {/* Content Card */}
                <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div
                    className="group p-6 rounded-2xl glass-light hover-glow cursor-pointer transition-all duration-300"
                    onClick={() => setQueue([track], track.title)}
                  >
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                      <div className="flex items-center gap-1.5 text-amber-500/60">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-xs tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                          {track.year}
                        </span>
                      </div>
                      <span className="text-amber-500/20">·</span>
                      <span
                        className="text-xs tracking-wider text-amber-400/50"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {track.mood}
                      </span>
                    </div>

                    <h3
                      className="text-xl md:text-2xl font-bold text-amber-100 mb-1 group-hover:text-gold-gradient transition-all"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {track.title}
                    </h3>
                    <p className="text-sm text-amber-100/40 mb-3">{track.movie}</p>
                    <p className="text-xs text-amber-100/30 flex items-center gap-1.5">
                      <Music className="w-3 h-3" />
                      {track.artist_display}
                    </p>

                    {/* Play overlay */}
                    <div
                      className={`flex items-center gap-2 mt-4 text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        i % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <Play className="w-3.5 h-3.5" fill="currentColor" />
                      <span style={{ fontFamily: "var(--font-heading)" }}>Play now</span>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-4 items-center justify-center relative">
                  <div className="w-3 h-3 rounded-full bg-amber-500/50 border-2 border-amber-400/30" />
                </div>

                {/* Spacer for the other side */}
                <div className="md:w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
