"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/store/useAudioStore";

export default function Toast() {
  const { toastMessage, dismissToast } = useAudio();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
          className="fixed z-40 right-4 sm:right-6 glass rounded-xl px-4 py-2.5 text-sm text-white/80 max-w-xs cursor-pointer"
          style={{ bottom: "calc(var(--player-height) + 16px)" }}
          onClick={dismissToast}
          role="alert"
          id="toast-notification"
        >
          {toastMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
