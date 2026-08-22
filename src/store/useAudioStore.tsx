"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Howl, Howler } from "howler";
import { Track, tracks as allTracks } from "@/data/tracks";

// Increase Howler HTML5 audio pool size to prevent exhaustion
if (typeof window !== "undefined") {
  Howler.html5PoolSize = 50;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

/* ─── Types ─── */
interface AudioState {
  currentTrack: Track | null;
  queue: Track[];
  queueIndex: number;
  isPlaying: boolean;
  seek: number;
  duration: number;
  isLoading: boolean;
  toastMessage: string | null;
  idleMessage: string | null;
  playbackMode: "full" | "preview";
}

interface AudioContextType extends AudioState {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seekTo: (position: number) => void;
  dismissToast: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

/* ─── Constants ─── */
const DEBOUNCE_MS = 150;
const TOAST_DURATION_MS = 3000;
const SEEK_UPDATE_INTERVAL = 250;

/* ─── Helpers ─── */
export function formatTime(secs: number): string {
  if (isNaN(secs) || secs < 0) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ─── Provider ─── */
export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AudioState>({
    currentTrack: allTracks[0] || null,
    queue: allTracks,
    queueIndex: 0,
    isPlaying: false,
    seek: 0,
    duration: allTracks[0]?.duration_seconds || 262,
    isLoading: false,
    toastMessage: null,
    idleMessage: null,
    playbackMode: "full",
  });

  const howlRef = useRef<Howl | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const isYTReadyRef = useRef<boolean>(false);
  const currentEngineRef = useRef<"youtube" | "howler">("youtube");
  const activeYtVideoIdRef = useRef<string | null>(null);
  const triedAltForTrackRef = useRef<string | null>(null);
  const consecutiveErrorsRef = useRef<number>(0);

  // Sync refs to avoid stale closures in callbacks and event listeners
  const currentTrackRef = useRef<Track | null>(allTracks[0] || null);
  const queueRef = useRef<Track[]>(allTracks);
  const queueIndexRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);

  currentTrackRef.current = state.currentTrack;
  queueRef.current = state.queue;
  queueIndexRef.current = state.queueIndex;
  isPlayingRef.current = state.isPlaying;

  const seekTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Toast ── */
  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setState((s) => ({ ...s, toastMessage: message }));
    toastTimerRef.current = setTimeout(() => {
      setState((s) => ({ ...s, toastMessage: null }));
    }, TOAST_DURATION_MS);
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setState((s) => ({ ...s, toastMessage: null }));
  }, []);

  /* ── Seek Updater Loop ── */
  const startSeekUpdater = useCallback(() => {
    if (seekTimerRef.current) clearInterval(seekTimerRef.current);
    seekTimerRef.current = setInterval(() => {
      if (currentEngineRef.current === "youtube" && ytPlayerRef.current?.getCurrentTime) {
        try {
          const s = ytPlayerRef.current.getCurrentTime() || 0;
          const d = ytPlayerRef.current.getDuration() || 0;
          setState((prev) => {
            const actualDur = d > 0 ? d : prev.duration;
            return { ...prev, seek: s, duration: actualDur };
          });
        } catch {
          // player might be transitioning
        }
      } else if (currentEngineRef.current === "howler" && howlRef.current?.playing()) {
        try {
          const s = (howlRef.current.seek() as number) || 0;
          const d = howlRef.current.duration() || 0;
          setState((prev) => ({ ...prev, seek: s, duration: d > 0 ? d : prev.duration }));
        } catch {
          // ignore
        }
      }
    }, SEEK_UPDATE_INTERVAL);
  }, []);

  const stopSeekUpdater = useCallback(() => {
    if (seekTimerRef.current) {
      clearInterval(seekTimerRef.current);
      seekTimerRef.current = null;
    }
  }, []);

  /* ── Howler Safe Cleanup ── */
  const cleanHowl = useCallback(() => {
    if (howlRef.current) {
      try {
        howlRef.current.stop();
        howlRef.current.unload();
      } catch {
        // ignore
      }
      howlRef.current = null;
    }
  }, []);

  /* ── Clean Fallback to Howler ── */
  const fallbackToHowler = useCallback(() => {
    const track = currentTrackRef.current;
    if (!track || !track.audio_src) {
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    cleanHowl();
    stopSeekUpdater();

    currentEngineRef.current = "howler";

    try {
      const howl = new Howl({
        src: [track.audio_src],
        html5: true,
        preload: true,
        onplay: () => {
          consecutiveErrorsRef.current = 0;
          setState((prev) => ({
            ...prev,
            isPlaying: true,
            isLoading: false,
            playbackMode: "preview",
          }));
          startSeekUpdater();
        },
        onend: () => {
          stopSeekUpdater();
          const nextIndex = (queueIndexRef.current + 1) % queueRef.current.length;
          const nextTrack = queueRef.current[nextIndex];
          if (nextTrack) {
            loadAndPlayTrack(nextTrack, queueRef.current, nextIndex);
          }
        },
        onloaderror: (_id, err) => {
          console.warn("Audio stream load error:", err);
          consecutiveErrorsRef.current += 1;
          if (consecutiveErrorsRef.current >= 3) {
            stopSeekUpdater();
            setState((prev) => ({
              ...prev,
              isPlaying: false,
              isLoading: false,
              toastMessage: "Playback paused. Tap play to retry.",
            }));
            return;
          }

          showToast("Skipped track — playing next");
          const nextIndex = (queueIndexRef.current + 1) % queueRef.current.length;
          const nextTrack = queueRef.current[nextIndex];
          if (nextTrack) {
            setTimeout(() => loadAndPlayTrack(nextTrack, queueRef.current, nextIndex), 300);
          }
        },
        onplayerror: () => {
          howl.once("unlock", () => {
            howl.play();
          });
        },
      });

      howlRef.current = howl;
      howl.play();
      setState((s) => ({ ...s, playbackMode: "preview" }));
    } catch (err) {
      console.warn("Howler fallback error:", err);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [cleanHowl, showToast, startSeekUpdater, stopSeekUpdater]);

  /* ── Core Play / Load Track ── */
  const loadAndPlayTrack = useCallback(
    (track: Track, queue: Track[], index: number, tryAlt: boolean = false) => {
      cleanHowl();
      stopSeekUpdater();

      if (!tryAlt) {
        triedAltForTrackRef.current = null;
      }

      setState((s) => ({
        ...s,
        currentTrack: track,
        queueIndex: index,
        isLoading: true,
        seek: 0,
        duration: track.duration_seconds,
        idleMessage: null,
        playbackMode: "full",
      }));

      const videoId =
        tryAlt && track.alt_youtube_video_id
          ? track.alt_youtube_video_id
          : track.youtube_video_id;

      if (videoId && isYTReadyRef.current && ytPlayerRef.current?.loadVideoById) {
        currentEngineRef.current = "youtube";
        activeYtVideoIdRef.current = videoId;
        try {
          ytPlayerRef.current.loadVideoById({
            videoId,
            startSeconds: 0,
          });
          ytPlayerRef.current.playVideo();
          return;
        } catch (e) {
          console.warn("YouTube play exception:", e);
        }
      }

      // If YouTube is not available or uninitialized, fallback to Howler
      fallbackToHowler();
    },
    [cleanHowl, fallbackToHowler, stopSeekUpdater]
  );

  /* ── Load YouTube Iframe API ── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    function initYT() {
      if (!window.YT || !window.YT.Player) return;
      if (ytPlayerRef.current) return;

      try {
        const initialVideoId = allTracks[0]?.youtube_video_id || "Umqb9KENgmk";
        activeYtVideoIdRef.current = initialVideoId;

        ytPlayerRef.current = new window.YT.Player("yt-audio-player", {
          height: "200",
          width: "200",
          videoId: initialVideoId,
          host: "https://www.youtube-nocookie.com",
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            iv_load_policy: 3,
          },
          events: {
            onReady: () => {
              isYTReadyRef.current = true;
            },
            onStateChange: (event: any) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
              if (event.data === 1) {
                consecutiveErrorsRef.current = 0;
                setState((s) => ({
                  ...s,
                  isPlaying: true,
                  isLoading: false,
                  playbackMode: "full",
                }));
                startSeekUpdater();
              } else if (event.data === 2) {
                setState((s) => ({ ...s, isPlaying: false, isLoading: false }));
                stopSeekUpdater();
              } else if (event.data === 3) {
                setState((s) => ({ ...s, isLoading: true }));
              } else if (event.data === 0) {
                stopSeekUpdater();
                // Advance to next track automatically
                const nextIndex = (queueIndexRef.current + 1) % queueRef.current.length;
                const nextTrack = queueRef.current[nextIndex];
                if (nextTrack) {
                  loadAndPlayTrack(nextTrack, queueRef.current, nextIndex);
                }
              }
            },
            onError: (err: any) => {
              console.warn("[YT Error]:", err);
              const track = currentTrackRef.current;
              // If this track has an alternate YouTube video ID and we haven't tried it yet
              if (
                track &&
                track.alt_youtube_video_id &&
                track.alt_youtube_video_id !== track.youtube_video_id &&
                triedAltForTrackRef.current !== track.id
              ) {
                triedAltForTrackRef.current = track.id;
                loadAndPlayTrack(track, queueRef.current, queueIndexRef.current, true);
                return;
              }
              // Otherwise fall back smoothly to verified high quality stream
              fallbackToHowler();
            },
          },
        });
      } catch (e) {
        console.warn("Failed to initialize YT Player:", e);
      }
    }

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => initYT();
    } else {
      initYT();
    }

    return () => {
      stopSeekUpdater();
      cleanHowl();
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [cleanHowl, fallbackToHowler, loadAndPlayTrack, startSeekUpdater, stopSeekUpdater]);

  /* ── User Controls ── */
  const play = useCallback(() => {
    const track = state.currentTrack || state.queue[state.queueIndex] || state.queue[0];
    if (!track) return;

    if (currentEngineRef.current === "youtube" && ytPlayerRef.current?.playVideo) {
      try {
        ytPlayerRef.current.playVideo();
        setState((s) => ({ ...s, isPlaying: true }));
        startSeekUpdater();
        return;
      } catch (e) {
        console.warn("YT play error:", e);
      }
    }

    if (currentEngineRef.current === "howler" && howlRef.current) {
      howlRef.current.play();
      setState((s) => ({ ...s, isPlaying: true }));
      startSeekUpdater();
      return;
    }

    loadAndPlayTrack(track, state.queue, state.queueIndex);
  }, [state.currentTrack, state.queue, state.queueIndex, loadAndPlayTrack, startSeekUpdater]);

  const pause = useCallback(() => {
    if (currentEngineRef.current === "youtube" && ytPlayerRef.current?.pauseVideo) {
      try {
        ytPlayerRef.current.pauseVideo();
      } catch (e) {
        console.warn("YT pause error:", e);
      }
    }
    if (currentEngineRef.current === "howler" && howlRef.current) {
      try {
        howlRef.current.pause();
      } catch {
        // ignore
      }
    }
    stopSeekUpdater();
    setState((s) => ({ ...s, isPlaying: false }));
  }, [stopSeekUpdater]);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const next = useCallback(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      const nextIndex = (queueIndexRef.current + 1) % queueRef.current.length;
      const track = queueRef.current[nextIndex];
      if (track) {
        loadAndPlayTrack(track, queueRef.current, nextIndex);
      }
    }, DEBOUNCE_MS);
  }, [loadAndPlayTrack]);

  const prev = useCallback(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      const prevIndex =
        queueIndexRef.current === 0
          ? queueRef.current.length - 1
          : queueIndexRef.current - 1;
      const track = queueRef.current[prevIndex];
      if (track) {
        loadAndPlayTrack(track, queueRef.current, prevIndex);
      }
    }, DEBOUNCE_MS);
  }, [loadAndPlayTrack]);

  const seekTo = useCallback((position: number) => {
    if (currentEngineRef.current === "youtube" && ytPlayerRef.current?.seekTo) {
      try {
        ytPlayerRef.current.seekTo(position, true);
        setState((s) => ({ ...s, seek: position }));
      } catch (e) {
        console.warn("YT seekTo error:", e);
      }
    } else if (currentEngineRef.current === "howler" && howlRef.current) {
      try {
        howlRef.current.seek(position);
        setState((s) => ({ ...s, seek: position }));
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{
        ...state,
        play,
        pause,
        togglePlay,
        next,
        prev,
        seekTo,
        dismissToast,
      }}
    >
      {/* Off-viewport YouTube Audio Engine Container */}
      <div
        id="yt-audio-player-container"
        className="fixed bottom-0 left-0 w-1 h-1 pointer-events-none opacity-[0.001] overflow-hidden -z-50"
        aria-hidden="true"
        suppressHydrationWarning
      >
        <div id="yt-audio-player" suppressHydrationWarning />
      </div>
      {children}
    </AudioContext.Provider>
  );
}

const defaultAudioState: AudioContextType = {
  currentTrack: allTracks[0] || null,
  queue: allTracks,
  queueIndex: 0,
  isPlaying: false,
  seek: 0,
  duration: 262,
  isLoading: false,
  toastMessage: null,
  idleMessage: null,
  playbackMode: "full",
  play: () => {},
  pause: () => {},
  togglePlay: () => {},
  next: () => {},
  prev: () => {},
  seekTo: () => {},
  dismissToast: () => {},
};

export function useAudio() {
  const context = useContext(AudioContext);
  return context || defaultAudioState;
}
