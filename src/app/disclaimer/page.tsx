import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer — Arijit Radio",
  description: "Legal disclaimer for Arijit Radio — an independent fan tribute. Not affiliated with any artist, label, or streaming platform.",
};

export default function DisclaimerPage() {
  return (
    <div className="pt-(--nav-height)">
      <section className="relative py-20 md:py-28">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gold-gradient mb-4" style={{ fontFamily: "var(--font-display)" }}>DISCLAIMER</h1>
        </div>
      </section>
      <section className="pb-32">
        <div className="section-container max-w-3xl">
          <div className="glass-light rounded-2xl p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Not an Official Property</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                Arijit Radio is an independent, unofficial fan-tribute project. It is not an official website of Arijit Singh, nor is it affiliated with, endorsed by, or connected to Arijit Singh, his management team, any record label, music publisher, or any music streaming platform.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>No Audio Hosting</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                This site does not host, mirror, download, stream, or distribute any audio files or copyrighted recordings. All music playback is facilitated through official, licensed platforms (Spotify, YouTube Music) via their authorized embed APIs and deep links.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Third-Party Content</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                Song titles, film names, artist names, and other metadata are used for informational and editorial purposes only. All trademarks, copyrights, and intellectual property rights in the music, artwork, and related materials belong to their respective owners and rights holders.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Original Content</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                All editorial content (articles, essays, descriptions, and curation commentary) published on this site is original writing. No copyrighted lyrics, press releases, or third-party editorial content is reproduced on this site.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>External Platforms</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                When you click &quot;Listen on Spotify&quot; or &quot;Listen on YouTube Music,&quot; you are redirected to those platforms, which are governed by their own terms of service, privacy policies, and content licensing agreements. We are not responsible for the content, availability, or policies of these external platforms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
