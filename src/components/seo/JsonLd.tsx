import React from "react";
import { getSiteUrl, siteConfig } from "@/lib/seo";
import { faqs } from "@/data/faqs";

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Root website + Radio Station + FAQ schemas for the home page & layout
 */
export function RootJsonLd() {
  const siteUrl = getSiteUrl();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
    },
  };

  const radioStationSchema = {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    "@id": `${siteUrl}/#radiostation`,
    name: "Arijit Singh Tribute Radio",
    alternateName: "Arijit Radio",
    url: siteUrl,
    description:
      "A cinematic, unofficial fan-tribute web radio playing 24/7 curated tracks and mood stations dedicated to Bollywood romantic singer Arijit Singh.",
    genre: ["Bollywood Romance", "Hindi Film Music", "Romantic Ballads", "Acoustic Pop"],
    inLanguage: "hi, en",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={[websiteSchema, radioStationSchema, faqSchema]} />;
}

/**
 * Article Schema for single essay pages
 */
export function ArticleJsonLd({
  title,
  description,
  slug,
  datePublished,
  heroGradient,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  heroGradient?: string;
}) {
  const siteUrl = getSiteUrl();
  const articleUrl = `${siteUrl}/articles/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteUrl,
    },
    headline: title,
    description: description,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    datePublished: datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.shortName,
      url: siteUrl,
    },
    articleSection: "Music & Culture",
    inLanguage: "en-US",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: `${siteUrl}/articles`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: articleUrl,
      },
    ],
  };

  return <JsonLd data={[articleSchema, breadcrumbSchema]} />;
}

/**
 * Breadcrumb Schema generator for inner pages
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; path: string }>;
}) {
  const siteUrl = getSiteUrl();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };

  return <JsonLd data={breadcrumbSchema} />;
}
