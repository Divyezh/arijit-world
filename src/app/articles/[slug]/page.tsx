import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/data/articles";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Metadata } from "next";
import { ArticleJsonLd } from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/articles/${article.slug}`;

  return {
    title: `${article.title} — ${article.subtitle}`,
    description: article.excerpt,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${article.title} — Arijit Radio`,
      description: article.excerpt,
      url: pageUrl,
      publishedTime: article.date,
      authors: ["Divyesh Soni"],
      tags: [article.mood, "Arijit Singh", "Bollywood Music", "Indian Romance"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} — Arijit Radio`,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="pt-(--nav-height)">
      <ArticleJsonLd
        title={article.title}
        description={article.excerpt}
        slug={article.slug}
        datePublished={article.date}
        heroGradient={article.heroGradient}
      />
      {/* Hero */}
      <section className={`relative py-20 md:py-32 overflow-hidden bg-linear-to-br ${article.heroGradient}`}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="section-container relative max-w-3xl">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </Link>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs text-white/80" style={{ fontFamily: "var(--font-heading)" }}>
              <Tag className="w-3 h-3" />
              {article.mood}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs text-white/80" style={{ fontFamily: "var(--font-heading)" }}>
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {article.title.toUpperCase()}
          </h1>
          <p className="text-lg text-white/60" style={{ fontFamily: "var(--font-heading)" }}>
            {article.subtitle}
          </p>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 md:py-24">
        <div className="section-container max-w-3xl">
          <div className="prose prose-invert prose-amber max-w-none">
            {article.content.split("\n").map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return null;
              if (trimmed.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-2xl md:text-3xl font-bold text-amber-100 mt-12 mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                return (
                  <p key={i} className="text-base text-amber-100/70 font-semibold leading-relaxed my-4">
                    {trimmed.replace(/\*\*/g, "")}
                  </p>
                );
              }
              return (
                <p key={i} className="text-base text-amber-100/50 leading-[1.85] mb-4">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-white/5">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm text-amber-400/60 hover:text-amber-400 transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
