"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  QrCode,
  Heart,
  Coffee,
} from "lucide-react";
import { faqs } from "@/data/faqs";

export type ModalType = "about" | "faq" | "support" | null;

interface ModalOverlayProps {
  activeModal: ModalType;
  onClose: () => void;
}

const modalTitles: Record<string, string> = {
  about: "About This Project",
  faq: "Frequently Asked Questions",
  support: "Buy Me a Chai",
};

function AboutContent() {
  return (
    <div className="space-y-5 text-white/70 text-sm leading-relaxed">
      <p>
        <strong className="text-white">This is an unofficial, independent fan tribute</strong>{" "}
        dedicated to the romantic music of Arijit Singh.
      </p>
      <p>
        This project is <strong className="text-white/90">not affiliated with, endorsed by, or connected to</strong>{" "}
        Arijit Singh, his management, any record label, or any music streaming
        platform. It is built with love and deep respect for his artistry.
      </p>
      <p>
        We curate his most beloved love songs into a cinematic, atmospheric
        listening experience — like tuning into a beautifully art-directed
        radio station devoted to romance.
      </p>
      <p className="text-white/40 text-xs pt-4 border-t border-white/5">
        All music rights belong to their respective owners. We do not host,
        distribute, or stream any copyrighted audio.
      </p>
    </div>
  );
}

function FAQContent() {
  return (
    <div className="space-y-6">
      {faqs.map((faq, i) => (
        <div key={i} className="space-y-2">
          <h3 className="text-sm font-semibold text-white/90">{faq.question}</h3>
          <p className="text-sm text-white/60 leading-relaxed">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}

function SupportContent() {
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const upiId = "sonidivyesh2004@okhdfcbank";
  const upiDeepLink = `upi://pay?pa=${upiId}&pn=Divyesh%20Soni&cu=INR&tn=Support%20Arijit%20Radio`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      return true;
    } catch {
      return false;
    }
  };

  const handleUpiClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await copyToClipboard();

    // Check if on mobile device
    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = upiDeepLink;
    } else {
      setNotice("UPI ID copied! Scan QR code on your mobile phone to pay.");
      setTimeout(() => setNotice(null), 4000);
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-6 px-1 pb-4">
      {/* 1. Header & Badge Section */}
      <div className="space-y-2.5 max-w-sm px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 shadow-sm shadow-amber-500/10">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
            Fan Tribute & Streaming Fund
          </span>
        </div>

        <h3
          className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-snug"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Keep the Radio Playing ☕
        </h3>

        <p className="text-xs text-white/60 leading-relaxed max-w-72.5 mx-auto">
          Your voluntary support directly covers streaming bandwidth & high-performance server hosting for all listeners.
        </p>
      </div>

      {/* 2. QR Code Dedicated Glass Card */}
      <div className="relative group w-full max-w-70">
        {/* Ambient Gold Halo Glow */}
        <div className="absolute -inset-2.5 bg-linear-to-b from-amber-500/20 via-amber-500/8 to-transparent rounded-3xl blur-xl opacity-80 pointer-events-none transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative p-4 rounded-3xl bg-white/4 border border-white/12 shadow-2xl backdrop-blur-xl flex flex-col items-center gap-3">
          {/* Inner White Stage */}
          <div className="relative bg-white p-3 rounded-2xl shadow-md border border-white/40 overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]">
            <Image
              src="/images/support-qr.png"
              alt="Divyesh Soni UPI QR Code"
              width={200}
              height={200}
              className="w-44 sm:w-48 h-auto rounded-xl object-contain block select-none"
              priority
            />
          </div>

          {/* Micro Scan Hint */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/50">
            <QrCode className="w-3.5 h-3.5 text-amber-400/80" />
            <span>Scan with any UPI App</span>
          </div>
        </div>
      </div>

      {/* 3. UPI ID & Interactive Actions */}
      <div className="w-full max-w-80 space-y-3">
        {/* Copyable UPI ID Box */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-left hover:border-amber-400/30 transition-all duration-200 shadow-inner">
          <div className="min-w-0 flex-1">
            <span className="block text-[9px] uppercase font-bold tracking-wider text-white/40 mb-0.5">
              Direct UPI ID
            </span>
            <span className="block text-xs sm:text-sm font-mono font-medium text-amber-300 truncate select-all">
              {upiId}
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 active:scale-95 ${
              copied
                ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-white/30"
            }`}
            aria-label="Copy UPI ID"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-white/80" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Primary Warm Gold CTA */}
        <button
          onClick={handleUpiClick}
          className="group relative flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl text-sm font-bold text-zinc-950 bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 border border-amber-300/40 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-zinc-900 transition-transform group-hover:rotate-12" />
          <span className="tracking-wide">Open in UPI App</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-800 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        {/* Notice Message Toast */}
        {notice && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-amber-300 bg-amber-500/15 border border-amber-500/30 rounded-xl py-2 px-3 text-center font-medium"
          >
            {notice}
          </motion.p>
        )}
      </div>

      {/* 4. Supported Apps & Micro Footer */}
      <div className="w-full max-w-80 pt-4 border-t border-white/8 space-y-2">
        <p className="text-[11px] font-medium text-white/60">
          Supports Google Pay • PhonePe • Paytm • BHIM
        </p>
        <p className="text-white/35 text-[10px] leading-relaxed">
          100% voluntary fan tribute fund. We do not monetize copyrighted audio.
        </p>
      </div>
    </div>
  );
}

export default function ModalOverlay({ activeModal, onClose }: ModalOverlayProps) {
  return (
    <AnimatePresence>
      {activeModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel — slides smoothly from right */}
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-110 max-w-full shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={modalTitles[activeModal]}
            id={`modal-${activeModal}`}
          >
            <div
              className="h-full flex flex-col border-l border-white/10 relative overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgba(212, 168, 83, 0.12) 0%, rgba(14, 12, 10, 0.95) 45%, rgba(8, 8, 8, 0.98) 100%)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
              }}
            >
              {/* Top ambient highlight line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-400/40 to-transparent" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/8 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                    {activeModal === "support" ? (
                      <Coffee className="w-4 h-4" />
                    ) : (
                      <Heart className="w-4 h-4" />
                    )}
                  </div>
                  <h2
                    className="text-base sm:text-lg font-semibold text-white tracking-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {modalTitles[activeModal]}
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer"
                  aria-label="Close modal"
                  id="modal-close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content area */}
              <div className="flex-1 overflow-y-auto modal-scroll px-5 sm:px-7 py-6">
                {activeModal === "about" && <AboutContent />}
                {activeModal === "faq" && <FAQContent />}
                {activeModal === "support" && <SupportContent />}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
