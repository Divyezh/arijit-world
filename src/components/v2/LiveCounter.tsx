"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveCounter() {
  const [count, setCount] = useState<number>(1001);
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    // Generate or retrieve persistent tab session ID
    if (typeof window !== "undefined") {
      let sId = sessionStorage.getItem("arijit_live_sid");
      if (!sId) {
        sId = "usr_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now().toString(36);
        sessionStorage.setItem("arijit_live_sid", sId);
      }
      sessionIdRef.current = sId;
    }

    const sessionId = sessionIdRef.current;

    // Heartbeat function to ping server and get real-time count
    const sendHeartbeat = async () => {
      try {
        const res = await fetch(`/api/live?sessionId=${encodeURIComponent(sessionId)}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.count === "number") {
            setCount(data.count);
          }
        }
      } catch {
        // Fallback gracefully
      }
    };

    // Initial ping
    sendHeartbeat();

    // Regular heartbeat every 5 seconds
    const interval = setInterval(sendHeartbeat, 5000);

    // Cross-tab synchronization via BroadcastChannel
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== "undefined") {
        channel = new BroadcastChannel("arijit_live_sync");
        channel.onmessage = (event) => {
          if (event.data && typeof event.data.count === "number") {
            setCount(event.data.count);
          }
        };
      }
    } catch {
      // BroadcastChannel unsupported fallback
    }

    // Leave beacon on tab close / unload
    const handleLeave = () => {
      if (navigator.sendBeacon && sessionId) {
        const blob = new Blob([JSON.stringify({ sessionId, action: "leave" })], {
          type: "application/json",
        });
        navigator.sendBeacon("/api/live", blob);
      }
    };

    window.addEventListener("beforeunload", handleLeave);
    window.addEventListener("pagehide", handleLeave);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleLeave);
      window.removeEventListener("pagehide", handleLeave);
      if (channel) {
        channel.close();
      }
    };
  }, []);

  return (
    <div
      className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full glass text-xs sm:text-sm select-none"
      id="live-counter"
      title={`${count.toLocaleString()} live listeners (Base 1,000 + Real active users)`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>

      <span className="text-white/90 font-medium tabular-nums flex items-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
          >
            {count.toLocaleString()}
          </motion.span>
        </AnimatePresence>
        <span className="ml-1 hidden min-[420px]:inline text-white/60">online</span>
      </span>
    </div>
  );
}
