import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About The Project — Arijit Radio",
  description: "Learn about Arijit Radio — an independent, unofficial fan-tribute radio experience dedicated to Arijit Singh's romantic music.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About The Project — Arijit Radio",
    description: "Learn about Arijit Radio — an independent, unofficial fan-tribute radio experience dedicated to Arijit Singh's romantic music.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-(--nav-height)">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-amber-900/10 to-transparent" />
        <div className="section-container relative text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold-gradient mb-4" style={{ fontFamily: "var(--font-display)" }}>
            ABOUT
          </h1>
        </div>
      </section>

      <section className="pb-32">
        <div className="section-container max-w-3xl space-y-8">
          <div className="glass-light rounded-2xl p-8">
            <h2 className="text-xl font-bold text-amber-100 mb-4" style={{ fontFamily: "var(--font-heading)" }}>What is Arijit Radio?</h2>
            <p className="text-sm text-amber-100/50 leading-relaxed mb-4">
              Arijit Radio is an independent, unofficial fan-tribute experience dedicated to the romantic music of Arijit Singh. It is a love letter from fans to an artist whose voice has become the soundtrack to an entire generation&apos;s love stories.
            </p>
            <p className="text-sm text-amber-100/50 leading-relaxed">
              Think of it as a beautifully art-directed radio station — not a music library, not a streaming service, not a database. You press play, and we curate the journey through love, heartbreak, longing, and nostalgia.
            </p>
          </div>

          <div className="glass-light rounded-2xl p-8">
            <h2 className="text-xl font-bold text-amber-100 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Independence Statement</h2>
            <p className="text-sm text-amber-100/50 leading-relaxed mb-4">
              This site is <strong className="text-amber-100/70">not affiliated with, endorsed by, or connected to</strong> Arijit Singh, his management, any record label (T-Series, Sony Music, Universal, etc.), or any music streaming platform (Spotify, YouTube Music, Apple Music, etc.).
            </p>
            <p className="text-sm text-amber-100/50 leading-relaxed">
              All music rights belong to their respective owners. We do not host, mirror, download, or distribute any audio files. Audio playback is provided exclusively through official, licensed platforms via authorized embeds and deep links.
            </p>
          </div>

          <div className="glass-light rounded-2xl p-8">
            <h2 className="text-xl font-bold text-amber-100 mb-4" style={{ fontFamily: "var(--font-heading)" }}>The Visual Language</h2>
            <p className="text-sm text-amber-100/50 leading-relaxed">
              Our design draws from the cinematic warmth of Bollywood romance — golden-hour color grading, film grain textures, and the atmospheric intimacy of a late-night radio broadcast. The visual identity is entirely original and does not reproduce or claim any third-party branding.
            </p>
          </div>

          <div className="glass-light rounded-2xl p-8">
            <h2 className="text-xl font-bold text-amber-100 mb-4" style={{ fontFamily: "var(--font-heading)" }}>How It Works</h2>
            <p className="text-sm text-amber-100/50 leading-relaxed mb-4">
              When you press Play, the site connects you to the corresponding track on Spotify or YouTube Music. The platforms handle the audio; we handle the curation, the atmosphere, and the experience.
            </p>
            <p className="text-sm text-amber-100/50 leading-relaxed">
              Our original editorial content — essays on the cultural impact of Arijit&apos;s romantic era, the history of iconic soundtracks, and the emotional anatomy of his music — is written in-house and represents the site&apos;s core content value.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
