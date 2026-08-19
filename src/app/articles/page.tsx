import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Essays & Discography Stories — Arijit Radio",
  description:
    "Deep-dive essays exploring the cultural impact, vocal architecture, and emotional legacy of Arijit Singh's romantic era in Bollywood music.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Essays & Discography Stories — Arijit Radio",
    description:
      "Deep-dive essays exploring the cultural impact, vocal architecture, and emotional legacy of Arijit Singh's romantic era in Bollywood music.",
    type: "website",
  },
};

export default function ArticlesPage() {
  return (
    <div className="pt-(--nav-height)">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Articles", path: "/articles" },
        ]}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-rose-900/10 to-transparent" />
        <div className="section-container relative text-center">
          <p
            className="text-xs tracking-[0.3em] uppercase text-amber-500/60 mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Original Writing
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold-gradient mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ARTICLES
          </h1>
          <p className="text-sm md:text-base text-amber-100/40 max-w-xl mx-auto leading-relaxed">
            Deep-dive essays exploring the cultural impact, vocal architecture, and emotional legacy of Arijit Singh&apos;s romantic era.
          </p>
        </div>
      </section>

      {/* Articles List */}
      <section className="pb-32">
        <div className="section-container max-w-4xl">
          <div className="space-y-6">
            {articles.map((article, i) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group block"
              >
                <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl glass-light hover-glow transition-all duration-500">
                  {/* Gradient thumbnail */}
                  <div
                    className={`w-full md:w-48 h-32 md:h-auto rounded-xl bg-linear-to-br ${article.heroGradient} shrink-0 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-3 left-3">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] tracking-widest uppercase bg-white/20 text-white/90"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {article.mood}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-xl font-bold text-amber-100 mb-1 group-hover:text-amber-400 transition-colors"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {article.title}
                    </h2>
                    <p className="text-sm text-amber-100/40 mb-3">{article.subtitle}</p>
                    <p className="text-sm text-amber-100/30 leading-relaxed line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-amber-100/25">
                        <span>{article.readTime}</span>
                        <span>{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                      <span className="text-xs text-amber-400/50 group-hover:text-amber-400 flex items-center gap-1 transition-colors">
                        Read
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
