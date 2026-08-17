"use client";

import { useState, useEffect } from "react";

export default function LiveCounter() {
  const [count, setCount] = useState(1095);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const drift = Math.floor(Math.random() * 11) - 5; // -5 to +5
        const next = prev + drift;
        // Keep in a reasonable range
        return Math.max(800, Math.min(2000, next));
      });
    }, 3000 + Math.random() * 4000); // 3-7 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sm" id="live-counter">
      <span className="pulse-dot" aria-hidden="true" />
      <span className="text-white/90 font-medium tabular-nums">
        {count.toLocaleString()} online
      </span>
    </div>
  );
}
