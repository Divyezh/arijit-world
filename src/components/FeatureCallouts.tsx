"use client";

import { motion } from "framer-motion";
import { Radio, BookOpen, Smartphone } from "lucide-react";

const features = [
  {
    icon: Radio,
    title: "Cinematic Romantic Radio",
    description:
      "A curated radio experience that plays Arijit's most iconic love songs in a beautifully art-directed atmosphere. No browsing, no searching — just press play and drift.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: BookOpen,
    title: "Original Editorial",
    description:
      "Deep-dive essays exploring the cultural impact of Arijit's romantic era — from the architecture of Aashiqui 2 to the anatomy of longing in modern Bollywood.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: Smartphone,
    title: "Zero-Friction Player",
    description:
      "Previous. Play. Next. That's it. Audio plays through Spotify or YouTube Music — the platforms handle the music, we handle the magic.",
    gradient: "from-emerald-500 to-teal-600",
  },
];

export default function FeatureCallouts() {
  return (
    <section className="py-24 md:py-32 relative">
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
            The Experience
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-gold-gradient"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MORE THAN MUSIC
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group relative p-8 rounded-2xl glass-light hover-glow cursor-default overflow-hidden"
            >
              {/* Gradient accent line */}
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${feature.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-5 h-5 text-white" />
              </div>

              <h3
                className="text-lg font-semibold text-amber-100 mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {feature.title}
              </h3>

              <p className="text-sm text-amber-100/50 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
