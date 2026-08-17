"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";

export default function JoinBanner() {
  const [dismissed, setDismissed] = useState(false);

  const communityUrl = process.env.NEXT_PUBLIC_COMMUNITY_URL;

  // Don't render if no URL configured or dismissed
  if (!communityUrl || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="fixed z-20 left-1/2 -translate-x-1/2"
        style={{ bottom: "calc(var(--player-height) + 16px)" }}
        id="join-banner"
      >
        <div className="glass rounded-2xl px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-4 max-w-md mx-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(var(--color-accent-rgb), 0.2)" }}
          >
            <Heart size={18} style={{ color: "var(--color-accent)" }} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-white/80 leading-snug">
              Get new romantic drops before anyone else
            </p>
          </div>

          <a
            href={communityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-black shrink-0 hover:brightness-110 transition-all"
            style={{ background: "var(--color-accent)" }}
          >
            Join Free
          </a>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-white/30 hover:text-white/60 transition-colors shrink-0 cursor-pointer"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
