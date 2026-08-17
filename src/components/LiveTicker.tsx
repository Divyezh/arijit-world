"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export default function LiveTicker() {
  const [listenerCount, setListenerCount] = useState(1842);
  const [time, setTime] = useState("");

  useEffect(() => {
    // Simulated listener count — atmospheric, not real
    const interval = setInterval(() => {
      setListenerCount((prev) => {
        const delta = Math.floor(Math.random() * 11) - 5;
        return Math.max(800, Math.min(3500, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(now);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm tracking-[0.15em] uppercase"
      style={{ fontFamily: "var(--font-heading)", color: "rgba(245, 234, 214, 0.6)" }}
    >
      <div className="flex items-center gap-2">
        <span className="pulse-dot" />
        <span>Now Streaming</span>
      </div>
      <span className="hidden sm:inline text-amber-500/30">·</span>
      <span className="text-amber-400/80">Arijit&apos;s Romantic Era</span>
      <span className="hidden sm:inline text-amber-500/30">·</span>
      <span className="text-amber-100/40">
        {listenerCount.toLocaleString()} listening now
      </span>
      <span className="hidden md:inline text-amber-500/30">·</span>
      <span className="hidden md:inline text-amber-100/30">{time} IST</span>
    </motion.div>
  );
}
