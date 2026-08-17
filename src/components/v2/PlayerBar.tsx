"use client";

import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Loader2, ExternalLink } from "lucide-react";
import { useAudio, formatTime } from "@/store/useAudioStore";
import ProgressBar from "./ProgressBar";

export default function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    isLoading,
    seek,
    duration,
    idleMessage,
    togglePlay,
    next,
    prev,
  } = useAudio();

  const track = currentTrack;

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      className="fixed z-30 left-1/2 -translate-x-1/2 bottom-6 sm:bottom-8 w-[92vw] max-w-xl"
      id="player-bar"
    >
      <div
        className="rounded-2xl px-4 py-3 flex flex-col gap-2"
        style={{
          background: "rgba(20, 16, 12, 0.85)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          border: "1px solid rgba(var(--color-accent-rgb), 0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
        }}
      >
        {/* Top row: artwork + info + controls */}
        <div className="flex items-center gap-3">
          {/* Artwork thumbnail */}
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg shrink-0 overflow-hidden flex items-center justify-center"
            style={{
              background: "rgba(var(--color-accent-rgb), 0.12)",
            }}
          >
            {track ? (
              <div
                className="w-full h-full rounded-lg flex items-center justify-center text-base font-bold"
                style={{
                  background: `linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.25), rgba(var(--color-accent-rgb), 0.08))`,
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {track.title.charAt(0)}
              </div>
            ) : (
              <div
                className="w-full h-full rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.04)",
                }}
              />
            )}
          </div>

          {/* Track info */}
          <div className="min-w-0 flex-1">
            {track ? (
              <>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white truncate leading-tight">
                    {track.title}
                    {isLoading && (
                      <span className="text-white/40 font-normal ml-1">Loading...</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-white/40 truncate leading-tight">
                    {track.mood} Era • {track.era_label}
                  </p>
                  {track.spotify_track_id && (
                    <a
                      href={`https://open.spotify.com/track/${track.spotify_track_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:flex items-center gap-0.5 text-[10px] shrink-0 hover:underline whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity"
                      style={{ color: "var(--color-accent)" }}
                      suppressHydrationWarning
                    >
                      Full song
                      <ExternalLink size={8} />
                    </a>
                  )}
                </div>
              </>
            ) : idleMessage ? (
              <p className="text-sm text-white/50">{idleMessage}</p>
            ) : (
              <p className="text-sm text-white/40">Press play to begin</p>
            )}
          </div>

          {/* Controls: prev / play / next */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Previous track"
              id="btn-prev"
            >
              <SkipBack size={16} fill="currentColor" />
            </button>

            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full flex items-center justify-center text-black hover:brightness-110 transition-all cursor-pointer"
              style={{ background: "var(--color-accent)" }}
              aria-label={isPlaying ? "Pause" : "Play"}
              id="btn-play-pause"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : isPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" className="ml-0.5" />
              )}
            </button>

            <button
              onClick={next}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Next track"
              id="btn-next"
            >
              <SkipForward size={16} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Bottom row: time + progress bar + time */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/35 tabular-nums w-8 text-right shrink-0">
            {formatTime(seek)}
          </span>
          <div className="flex-1">
            <ProgressBar />
          </div>
          <span className="text-[10px] text-white/35 tabular-nums w-8 shrink-0">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
