"use client";

import { motion } from "framer-motion";
import { Heart, HeartCrack, Wind, Sparkles, Flame, Clock, Play } from "lucide-react";
import { useRadioPlayer } from "@/context/RadioPlayerContext";
import { moods } from "@/data/moods";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  HeartCrack,
  Wind,
  Sparkles,
  Flame,
  Clock,
};

interface MoodSelectorProps {
  compact?: boolean;
}

export default function MoodSelector({ compact = false }: MoodSelectorProps) {
  const { setMoodQueue, queueName } = useRadioPlayer();

  return (
    <section className={compact ? "" : "py-24 md:py-32 relative"}>
      {!compact && (
        <div className="section-container">
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
              Tune Your Heart
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold text-gold-gradient"
              style={{ fontFamily: "var(--font-display)" }}
            >
              MOOD STATIONS
            </h2>
          </motion.div>
        </div>
      )}

      <div className={compact ? "" : "section-container"}>
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? "lg:grid-cols-2" : "lg:grid-cols-3"} gap-5`}>
          {moods.map((mood, i) => {
            const Icon = iconMap[mood.icon] || Heart;
            const isActive = queueName === `${mood.name} Station`;

            return (
              <motion.button
                key={mood.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onClick={() => setMoodQueue(mood.name)}
                className={`group relative p-6 md:p-8 rounded-2xl text-left transition-all duration-500 overflow-hidden ${
                  isActive ? "ring-2 ring-amber-400/50" : ""
                }`}
                style={{
                  background: isActive
                    ? "rgba(212, 168, 83, 0.1)"
                    : "rgba(255, 255, 255, 0.03)",
                  border: isActive ? "1px solid rgba(212, 168, 83, 0.3)" : "1px solid rgba(255, 255, 255, 0.06)",
                }}
                id={`mood-${mood.id}`}
              >
                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${mood.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl bg-linear-to-br ${mood.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      style={{ boxShadow: `0 4px 20px ${mood.accentColor}33` }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10">
                      <Play className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <h3
                      className="text-lg font-bold text-amber-100"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {mood.name}
                    </h3>
                    <span className="text-sm text-amber-400/40">{mood.hindi}</span>
                  </div>

                  <p className="text-xs text-amber-100/40 leading-relaxed line-clamp-2">
                    {mood.description}
                  </p>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 flex items-center gap-1.5 text-xs text-amber-400"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      <span className="pulse-dot" style={{ width: "6px", height: "6px" }} />
                      Now Playing
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
