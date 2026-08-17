"use client";

import Image from "next/image";
import { useTheme } from "@/store/useThemeStore";

export default function BackgroundImage() {
  const { currentTheme } = useTheme();

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
      {/* Mobile background artwork (portrait) */}
      <div className="block sm:hidden absolute inset-0">
        <Image
          src="/mobile.png"
          alt="Arijit Singh Mobile Background"
          fill
          priority
          sizes="100vw"
          className="bg-artwork object-cover object-center transition-all duration-700 ease-out"
          quality={95}
        />
      </div>

      {/* Desktop / Tablet background artwork (landscape) */}
      <div className="hidden sm:block absolute inset-0">
        <Image
          src={currentTheme.backgroundImage}
          alt="Arijit Singh Cinematic Background Artwork"
          fill
          priority
          sizes="100vw"
          className="bg-artwork object-cover sm:max-md:object-[58%_32%] md:max-lg:object-[52%_40%] lg:object-center transition-all duration-700 ease-out"
          quality={92}
        />
      </div>

      {/* Mobile-only subtle top title banner */}
      <div className="sm:hidden absolute top-14 inset-x-0 flex flex-col items-center justify-center text-center px-4 z-10 opacity-90">
        <span
          className="text-2xl font-bold tracking-tight text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ARIJIT SINGH
        </span>
        <span
          className="text-[10px] tracking-[0.25em] uppercase font-semibold text-amber-300/80 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          LOVE, IN EVERY NOTE
        </span>
      </div>

      {/* Subtle vignette — soft border darkening */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 100px 30px rgba(0,0,0,0.45)",
        }}
        aria-hidden="true"
      />

      {/* Bottom gradient — protects player bar and controls */}
      <div
        className="absolute inset-x-0 bottom-0 h-72 sm:h-52 bg-linear-to-t from-black/95 via-black/60 to-transparent"
        aria-hidden="true"
      />

      {/* Top gradient — protects status bar and navigation */}
      <div
        className="absolute inset-x-0 top-0 h-36 sm:h-24 bg-linear-to-b from-black/85 via-black/40 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
