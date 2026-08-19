"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-light rounded-2xl p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6">
          <Send className="w-7 h-7 text-white" />
        </div>
        <h2
          className="text-2xl font-bold text-amber-100 mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Message Sent!
        </h2>
        <p className="text-sm text-amber-100/50">
          Thank you for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-light rounded-2xl p-8 space-y-6">
      <div>
        <label
          htmlFor="contact-name"
          className="block text-xs tracking-widest uppercase text-amber-400/60 mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-amber-100 placeholder:text-amber-100/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
          placeholder="Your name"
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="block text-xs tracking-widest uppercase text-amber-400/60 mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-amber-100 placeholder:text-amber-100/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label
          htmlFor="contact-type"
          className="block text-xs tracking-widest uppercase text-amber-400/60 mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Type
        </label>
        <select
          id="contact-type"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-amber-100 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
        >
          <option value="general" className="bg-[#141414]">
            General Feedback
          </option>
          <option value="metadata" className="bg-[#141414]">
            Metadata Correction
          </option>
          <option value="article" className="bg-[#141414]">
            Article Submission
          </option>
          <option value="other" className="bg-[#141414]">
            Other
          </option>
        </select>
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs tracking-widest uppercase text-amber-400/60 mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-amber-100 placeholder:text-amber-100/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none"
          placeholder="Your message..."
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-xl font-semibold text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        style={{
          fontFamily: "var(--font-heading)",
          background: "linear-gradient(135deg, #d4a853, #c87533)",
          color: "#0a0a0a",
        }}
        id="contact-submit"
      >
        <Send className="w-4 h-4" />
        Send Message
      </button>
    </form>
  );
}
