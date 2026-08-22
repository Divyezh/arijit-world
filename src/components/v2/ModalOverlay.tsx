"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Copy,
  ExternalLink,
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
  support: "Buy Me a Chai ☕",
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
    <div className="flex flex-col items-center text-center space-y-6 pb-6">
      {/* Intro message */}
      <div className="space-y-2 max-w-sm px-2">
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400/90 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Fan Tribute & Streaming Fund
        </span>
        <h3
          className="text-xl font-bold text-white tracking-tight pt-1"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Keep the Radio Playing
        </h3>
        <p className="text-xs text-white/60 leading-relaxed max-w-xs mx-auto">
          Your support directly covers streaming bandwidth & high-performance server hosting for all listeners.
        </p>
      </div>

      {/* QR Code Presentation */}
      <div className="relative group my-1">
        <div className="absolute -inset-3 bg-linear-to-b from-amber-500/25 via-amber-500/10 to-transparent rounded-3xl blur-xl opacity-70 pointer-events-none" />
        <div className="relative bg-white p-4 rounded-2xl shadow-2xl shadow-black/70 border border-white/30 transition-transform duration-300 group-hover:scale-[1.01]">
          <Image
            src="/images/support-qr.png"
            alt="Divyesh Soni UPI QR Code"
            width={240}
            height={300}
            className="w-56 sm:w-60 h-auto rounded-xl object-contain block select-none"
            priority
          />
        </div>
      </div>

      {/* UPI Actions Container */}
      <div className="w-full max-w-sm space-y-3.5 pt-2">
        {/* Copy UPI ID Pill */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white/[0.06] border border-white/10 text-left hover:border-white/20 transition-all shadow-inner">
          <div className="min-w-0 flex-1">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-white/40 mb-0.5">
              Direct UPI ID
            </span>
            <span className="block text-xs sm:text-sm font-mono font-medium text-amber-300 truncate select-all">
              {upiId}
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 ${copied
                ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/15 active:scale-95 hover:border-white/30"
              }`}
            aria-label="Copy UPI ID"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-white/80" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Large Prominent UPI App Button */}
        <button
          onClick={handleUpiClick}
          className="group relative flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-2xl text-sm font-bold text-zinc-950 bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-300 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 border border-amber-300/40 cursor-pointer"
        >
          <span className="tracking-wide">Open in UPI App</span>
          <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        {notice && (
          <p className="text-xs text-amber-300 bg-amber-500/15 border border-amber-500/30 rounded-xl py-2 px-3 animate-in fade-in duration-200 text-center font-medium">
            {notice}
          </p>
        )}
      </div>

      {/* Footer Info */}
      <div className="w-full max-w-sm pt-5 border-t border-white/10 space-y-2 text-xs text-white/50">
        <p className="font-medium text-white/70">
          Supports Google Pay, PhonePe, Paytm & any UPI app
        </p>
        <p className="text-white/35 text-[11px] leading-relaxed">
          Unofficial fan tribute. We do not monetize copyrighted audio.
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel — slides from right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-105 max-w-full"
            role="dialog"
            aria-modal="true"
            aria-label={modalTitles[activeModal]}
            id={`modal-${activeModal}`}
          >
            <div className="h-full flex flex-col glass-light border-l border-white/5"
              style={{ background: "rgba(10, 10, 10, 0.92)", backdropFilter: "blur(40px)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <h2
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {modalTitles[activeModal]}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-white/40 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close"
                  id="modal-close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto modal-scroll px-6 py-6">
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
