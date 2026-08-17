"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { articles } from "@/data/articles";

export default function ArticlesTeaser() {
  const preview = articles.slice(0, 3);

  return (
    <section className="py-24 md:py-32 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase text-amber-500/60 mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Original Writing
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold text-gold-gradient"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ARTICLES
            </h2>
          </div>
          <Link
            href="/articles"
            className="hidden md:flex items-center gap-2 text-sm text-amber-400/70 hover:text-amber-400 transition-colors group"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {preview.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <Link href={`/articles/${article.slug}`} className="group block">
                <div className="rounded-2xl overflow-hidden glass-light hover-glow transition-all duration-500">
                  {/* Gradient header */}
                  <div className={`h-40 bg-linear-to-br ${article.heroGradient} relative flex items-end p-5`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-[10px] tracking-widest uppercase bg-white/20 text-white/90 mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {article.mood}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3
                      className="text-base font-bold text-amber-100 mb-1 group-hover:text-amber-400 transition-colors line-clamp-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-xs text-amber-100/30 mb-3">{article.subtitle}</p>
                    <p className="text-xs text-amber-100/40 leading-relaxed line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                      <span className="text-[10px] text-amber-100/30">{article.readTime}</span>
                      <span className="text-xs text-amber-400/60 group-hover:text-amber-400 flex items-center gap-1 transition-colors">
                        Read
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden text-center mt-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-amber-400/70 hover:text-amber-400 transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
