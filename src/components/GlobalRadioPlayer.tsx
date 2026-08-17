"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, ExternalLink, X, Disc3 } from "lucide-react";
import { useRadioPlayer } from "@/context/RadioPlayerContext";

export default function GlobalRadioPlayer() {
  const {
    currentTrack,
    isPlaying,
    queueName,
    showSpotifyEmbed,
    toastMessage,
    togglePlay,
    next,
    prev,
    openOnSpotify,
    openOnYouTube,
    dismissToast,
  } = useRadioPlayer();

  if (!currentTrack) return null;

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-60 px-5 py-2.5 rounded-full glass text-sm text-amber-300 flex items-center gap-2 shadow-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <Disc3 className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-amber-500/10"
        style={{ height: "var(--player-height)" }}
      >
        <div className="section-container h-full flex items-center justify-between gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              className={`w-12 h-12 rounded-lg shrink-0 flex items-center justify-center ${
                isPlaying ? "breathing" : ""
              }`}
              style={{
                background: "linear-gradient(135deg, rgba(212,168,83,0.3), rgba(200,117,51,0.2))",
              }}
            >
              <Disc3
                className={`w-6 h-6 text-amber-400 ${isPlaying ? "animate-spin" : ""}`}
                style={{ animationDuration: "3s" }}
              />
            </div>
            <div className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTrack.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-sm font-semibold text-amber-100 truncate"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {currentTrack.title}
                </motion.p>
              </AnimatePresence>
              <p className="text-xs text-amber-100/40 truncate">
                {currentTrack.movie} · {currentTrack.year} · {currentTrack.artist_display}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center text-amber-100/60 hover:text-amber-400 hover:bg-amber-400/10 transition-all duration-200"
              aria-label="Previous song"
              id="player-prev-button"
            >
              <SkipBack className="w-4 h-4" fill="currentColor" />
            </button>

            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #d4a853, #c87533)",
                color: "#0a0a0a",
                boxShadow: isPlaying
                  ? "0 0 20px rgba(212,168,83,0.4), 0 0 40px rgba(212,168,83,0.15)"
                  : "none",
              }}
              aria-label={isPlaying ? "Pause song" : "Play song"}
              id="player-play-button"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
              )}
            </button>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center text-amber-100/60 hover:text-amber-400 hover:bg-amber-400/10 transition-all duration-200"
              aria-label="Next song"
              id="player-next-button"
            >
              <SkipForward className="w-4 h-4" fill="currentColor" />
            </button>
          </div>

          {/* External Links */}
          <div className="hidden sm:flex items-center gap-2 flex-1 justify-end">
            <span className="text-[10px] tracking-widest uppercase text-amber-100/30 mr-2" style={{ fontFamily: "var(--font-heading)" }}>
              Listen on
            </span>
            {currentTrack.spotify_track_id && (
              <button
                onClick={openOnSpotify}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#1DB954]/15 text-[#1DB954] hover:bg-[#1DB954]/25 transition-all duration-200 flex items-center gap-1.5"
                aria-label="Continue on Spotify"
                id="player-spotify-button"
              >
                Spotify
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
            {currentTrack.youtube_music_url && (
              <button
                onClick={openOnYouTube}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#FF0000]/15 text-[#FF4444] hover:bg-[#FF0000]/25 transition-all duration-200 flex items-center gap-1.5"
                aria-label="Continue on YouTube Music"
                id="player-youtube-button"
              >
                YouTube
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Progress shimmer when playing */}
        {isPlaying && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-500/20 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-transparent via-amber-400 to-transparent"
              style={{
                animation: "shimmer 3s ease-in-out infinite",
                width: "30%",
              }}
            />
          </div>
        )}
      </motion.div>

      {/* Spotify Embed Modal */}
      <AnimatePresence>
        {showSpotifyEmbed && currentTrack.spotify_track_id && isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-[calc(var(--player-height)+1rem)] right-4 z-50 w-80 rounded-xl overflow-hidden shadow-2xl shadow-black/50 glass"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-amber-500/10">
              <span className="text-[10px] tracking-widest uppercase text-amber-400/60" style={{ fontFamily: "var(--font-heading)" }}>
                Playing via Spotify
              </span>
            </div>
            <iframe
              src={`https://open.spotify.com/embed/track/${currentTrack.spotify_track_id}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ border: "none" }}
              title={`Spotify embed: ${currentTrack.title}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
