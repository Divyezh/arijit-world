import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Terms of Service — Arijit Radio",
  description: "Terms of Service for Arijit Radio — the rules and guidelines for using this fan-tribute radio experience.",
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="pt-(--nav-height)">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ]}
      />

      <section className="relative py-20 md:py-28">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gold-gradient mb-4" style={{ fontFamily: "var(--font-display)" }}>TERMS OF SERVICE</h1>
          <p className="text-sm text-amber-100/40">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
      </section>
      <section className="pb-32">
        <div className="section-container max-w-3xl">
          <div className="glass-light rounded-2xl p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Acceptance of Terms</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                By accessing and using Arijit Radio, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of the site.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Nature of Service</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                Arijit Radio is a free, fan-made tribute radio experience. It provides curated music metadata and editorial content. It is not a music streaming service and does not provide direct audio playback. Audio is facilitated through third-party platforms (Spotify, YouTube Music) under their own terms.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Intellectual Property</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                Original editorial content, design, and code on this site are the property of the Arijit Radio project. Song titles, film names, artist names, and associated metadata belong to their respective rights holders and are used for informational purposes only.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Limitation of Liability</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                Arijit Radio is provided &quot;as is&quot; without warranties of any kind. We are not responsible for the availability, accuracy, or content of third-party platforms. Track availability may change without notice based on the licensing decisions of streaming platforms and rights holders.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Changes to Terms</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
