"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { faqs } from "@/data/faqs";

export type ModalType = "about" | "faq" | "support" | null;

interface ModalOverlayProps {
  activeModal: ModalType;
  onClose: () => void;
}

const modalTitles: Record<string, string> = {
  about: "About This Project",
  faq: "Frequently Asked Questions",
  support: "Support",
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
  return (
    <div className="space-y-5 text-white/70 text-sm leading-relaxed">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-white/90">Report an Issue</h3>
        <p>
          If you encounter a bug, broken playback, or anything that doesn&apos;t
          feel right, please let us know. We read every report.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-white/90">Contact</h3>
        <p>
          For general inquiries, partnership proposals, or just to say hello —
          reach out and we&apos;ll get back to you.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-white/90">Takedown Requests</h3>
        <p>
          If you are a rights holder and believe any content on this site
          infringes your copyright, please contact us immediately. We will
          respond promptly and take appropriate action.
        </p>
      </div>
      <p className="text-white/40 text-xs pt-4 border-t border-white/5">
        This is a fan-made project. We do not monetize, sell data, or
        distribute copyrighted material.
      </p>
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
