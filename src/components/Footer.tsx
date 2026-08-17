import Link from "next/link";
import { Radio } from "lucide-react";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/articles", label: "Articles" },
  { href: "/moods", label: "Moods" },
  { href: "/albums", label: "Filmography" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pb-(--player-height)">
      <div className="section-container py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Radio className="w-4 h-4 text-white" />
              </div>
              <div>
                <p
                  className="text-sm font-bold tracking-[0.2em] uppercase text-gold-gradient"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Arijit Radio
                </p>
                <p className="text-[10px] tracking-[0.15em] uppercase text-amber-500/60">
                  Love, In Every Note
                </p>
              </div>
            </div>
            <p className="text-xs text-amber-100/30 leading-relaxed">
              An independent, unofficial fan-tribute radio experience dedicated to the romantic music of
              Arijit Singh. Not affiliated with any artist, label, or streaming platform.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-16">
            <div>
              <h4
                className="text-xs tracking-[0.2em] uppercase text-amber-400/60 mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Navigate
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-amber-100/40 hover:text-amber-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="text-xs tracking-[0.2em] uppercase text-amber-400/60 mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Legal
              </h4>
              <ul className="space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-amber-100/40 hover:text-amber-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-amber-100/20">
            © {new Date().getFullYear()} Arijit Radio. An independent fan tribute. All music rights belong to their
            respective owners.
          </p>
          <p className="text-[11px] text-amber-100/20">
            Audio playback provided by Spotify and YouTube Music.
          </p>
        </div>
      </div>
    </footer>
  );
}
