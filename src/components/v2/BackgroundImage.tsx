"use client";

import Image from "next/image";
import { useTheme } from "@/store/useThemeStore";

export default function BackgroundImage() {
  const { currentTheme } = useTheme();

  return (
    <div className="absolute inset-0 z-0">
      {/* Background artwork */}
      <Image
        src={currentTheme.backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="bg-artwork object-cover"
        style={{ objectFit: "cover" }}
        quality={90}
      />
      {/* Subtle vignette — very light so artwork stays vivid */}
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 120px 40px rgba(0,0,0,0.35)" }}
        aria-hidden="true"
      />
      {/* Bottom gradient — just enough for player bar text legibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-[25%]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      {/* Top gradient — subtle for topbar legibility */}
      <div
        className="absolute inset-x-0 top-0 h-[12%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
