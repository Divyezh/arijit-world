import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact & Feedback — Arijit Radio",
  description:
    "Get in touch with the Arijit Radio fan project team. Submit track suggestions, editorial ideas, or feedback.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Feedback — Arijit Radio",
    description:
      "Get in touch with the Arijit Radio fan project team. Submit track suggestions, editorial ideas, or feedback.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-(--nav-height)">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <section className="relative py-20 md:py-28">
        <div className="section-container text-center">
          <h1
            className="text-4xl md:text-6xl font-bold text-gold-gradient mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CONTACT
          </h1>
          <p className="text-sm md:text-base text-amber-100/40 max-w-xl mx-auto">
            Found a metadata error? Have a suggestion? Want to contribute an article? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="section-container max-w-2xl">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
