"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 relative">
      <div className="section-container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase text-amber-500/60 mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Arijit Radio, Explained
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-gold-gradient"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FAQ
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full text-left p-5 rounded-xl transition-all duration-300 ${
                    isOpen ? "glass" : "glass-light hover:bg-white/4"
                  }`}
                  id={`faq-${i}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className={`text-sm font-semibold transition-colors ${
                        isOpen ? "text-amber-400" : "text-amber-100/80"
                      }`}
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-amber-500/50 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-amber-100/50 leading-relaxed mt-3 pt-3 border-t border-white/5">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
