import type { Metadata } from "next";
import MoodSelector from "@/components/MoodSelector";

export const metadata: Metadata = {
  title: "Mood Stations — Arijit Radio",
  description:
    "Tune your heart to one of six curated mood stations: Love, Heartbreak, Longing, Dreamy, Soulful, or Nostalgic. Each station plays a curated queue of Arijit Singh's finest romantic songs.",
};

export default function MoodsPage() {
  return (
    <div className="pt-(--nav-height)">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-amber-900/10 to-transparent" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/images/hero-bg-alt.png')" }}
        />
        <div className="section-container relative text-center">
          <p
            className="text-xs tracking-[0.3em] uppercase text-amber-500/60 mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tune Your Heart
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold-gradient mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MOOD STATIONS
          </h1>
          <p className="text-sm md:text-base text-amber-100/40 max-w-xl mx-auto leading-relaxed">
            Six curated emotional frequencies. Select a mood and let Arijit&apos;s voice carry you through every shade of love.
          </p>
        </div>
      </section>

      {/* Mood Grid */}
      <section className="pb-32">
        <div className="section-container">
          <MoodSelector compact />
        </div>
      </section>
    </div>
  );
}
