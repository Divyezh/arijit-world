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
  support: "Support Creator",
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
    <div className="flex flex-col items-center text-center space-y-6 pb-2">
      {/* Intro message */}
      <div className="space-y-1.5 max-w-xs">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
          Fan Tribute & Streaming Fund
        </p>
        <h3
          className="text-lg font-bold text-white tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Keep the Radio Playing
        </h3>
        <p className="text-xs text-white/60 leading-relaxed">
          Your support helps cover hosting and streaming bandwidth for all listeners.
        </p>
      </div>

      {/* QR Code Presentation */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-linear-to-b from-amber-500/20 to-transparent rounded-3xl blur-xl opacity-60 pointer-events-none" />
        <div className="relative bg-white p-3.5 rounded-2xl shadow-2xl shadow-black/50 border border-white/20">
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

      {/* UPI Actions */}
      <div className="w-full max-w-xs space-y-3">
        {/* Copy UPI ID Pill */}
        <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-left hover:border-white/20 transition-colors">
          <div className="min-w-0 flex-1">
            <span className="block text-[10px] uppercase font-semibold tracking-wider text-white/40">
              UPI ID
            </span>
            <span className="block text-xs font-mono text-amber-300 truncate select-all">
              {upiId}
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              copied
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/10 active:scale-95"
            }`}
            aria-label="Copy UPI ID"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Pay via UPI deep link with desktop detection */}
        <button
          onClick={handleUpiClick}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <span>Open in UPI App</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        {notice && (
          <p className="text-[11px] text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded-lg py-1.5 px-2 animate-in fade-in duration-200">
            {notice}
          </p>
        )}
      </div>

      {/* Footer info */}
      <div className="w-full pt-4 border-t border-white/5 space-y-2 text-[11px] text-white/40">
        <p>Supports Google Pay, PhonePe, Paytm & any UPI app</p>
        <p className="text-white/30 text-[10px]">
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
