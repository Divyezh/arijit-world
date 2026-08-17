import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Arijit Radio",
  description: "Privacy Policy for Arijit Radio — how we handle your data and protect your privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-(--nav-height)">
      <section className="relative py-20 md:py-28">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gold-gradient mb-4" style={{ fontFamily: "var(--font-display)" }}>PRIVACY POLICY</h1>
          <p className="text-sm text-amber-100/40">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
      </section>
      <section className="pb-32">
        <div className="section-container max-w-3xl">
          <div className="glass-light rounded-2xl p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Information We Collect</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                Arijit Radio is designed to respect your privacy. We do not require user accounts, login, or registration. We do not collect personal information such as names, email addresses, or payment information through the core radio experience.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Analytics & Cookies</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                We may use privacy-respecting analytics tools to understand general site usage patterns (pages visited, general geographic region, device type). We do not use invasive tracking, fingerprinting, or sell any data to third parties.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Third-Party Embeds</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                When you interact with Spotify or YouTube Music embeds on this site, those platforms may set their own cookies and collect data according to their respective privacy policies. We encourage you to review Spotify&apos;s and YouTube&apos;s privacy policies for details on their data practices.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Data Storage</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                Any preferences (such as your last-played mood station) may be stored locally in your browser&apos;s localStorage. This data never leaves your device and can be cleared at any time through your browser settings.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Contact</h2>
              <p className="text-sm text-amber-100/50 leading-relaxed">
                If you have questions about this privacy policy, please reach out through our Contact page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
