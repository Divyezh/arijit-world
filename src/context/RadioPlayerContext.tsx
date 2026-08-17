"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { Track, tracks as allTracks, getTracksByMood } from "@/data/tracks";

interface RadioPlayerState {
  currentTrack: Track | null;
  queue: Track[];
  queueIndex: number;
  isPlaying: boolean;
  queueName: string;
  showSpotifyEmbed: boolean;
  toastMessage: string | null;
}

interface RadioPlayerContextType extends RadioPlayerState {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  setQueue: (tracks: Track[], name: string) => void;
  setMoodQueue: (mood: string) => void;
  openOnSpotify: () => void;
  openOnYouTube: () => void;
  dismissToast: () => void;
}

const RadioPlayerContext = createContext<RadioPlayerContextType | null>(null);

export function RadioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RadioPlayerState>({
    currentTrack: null,
    queue: allTracks,
    queueIndex: 0,
    isPlaying: false,
    queueName: "All Songs",
    showSpotifyEmbed: false,
    toastMessage: null,
  });

  const toastTimeout = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((message: string) => {
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    setState((s) => ({ ...s, toastMessage: message }));
    toastTimeout.current = setTimeout(() => {
      setState((s) => ({ ...s, toastMessage: null }));
    }, 3000);
  }, []);

  const play = useCallback(() => {
    setState((s) => {
      const track = s.queue[s.queueIndex] || s.queue[0];
      if (!track) return s;
      return { ...s, currentTrack: track, isPlaying: true, showSpotifyEmbed: true };
    });
  }, []);

  const pause = useCallback(() => {
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);

  const togglePlay = useCallback(() => {
    setState((s) => {
      if (s.isPlaying) return { ...s, isPlaying: false };
      const track = s.currentTrack || s.queue[s.queueIndex] || s.queue[0];
      if (!track) return s;
      return { ...s, currentTrack: track, isPlaying: true, showSpotifyEmbed: true };
    });
  }, []);

  const next = useCallback(() => {
    setState((s) => {
      const nextIndex = (s.queueIndex + 1) % s.queue.length;
      const track = s.queue[nextIndex];
      if (!track) return s;
      return {
        ...s,
        queueIndex: nextIndex,
        currentTrack: track,
        isPlaying: true,
        showSpotifyEmbed: true,
      };
    });
    showToast("Skipped to next track");
  }, [showToast]);

  const prev = useCallback(() => {
    setState((s) => {
      const prevIndex = s.queueIndex === 0 ? s.queue.length - 1 : s.queueIndex - 1;
      const track = s.queue[prevIndex];
      if (!track) return s;
      return {
        ...s,
        queueIndex: prevIndex,
        currentTrack: track,
        isPlaying: true,
        showSpotifyEmbed: true,
      };
    });
    showToast("Previous track");
  }, [showToast]);

  const setQueue = useCallback(
    (newTracks: Track[], name: string) => {
      if (newTracks.length === 0) return;
      setState((s) => ({
        ...s,
        queue: newTracks,
        queueIndex: 0,
        currentTrack: newTracks[0],
        isPlaying: true,
        showSpotifyEmbed: true,
        queueName: name,
      }));
      showToast(`Now playing: ${name}`);
    },
    [showToast]
  );

  const setMoodQueue = useCallback(
    (mood: string) => {
      const moodTracks = getTracksByMood(mood);
      if (moodTracks.length > 0) {
        setQueue(moodTracks, `${mood} Station`);
      }
    },
    [setQueue]
  );

  const openOnSpotify = useCallback(() => {
    const track = state.currentTrack;
    if (track?.spotify_track_id) {
      window.open(`https://open.spotify.com/track/${track.spotify_track_id}`, "_blank");
    }
  }, [state.currentTrack]);

  const openOnYouTube = useCallback(() => {
    const track = state.currentTrack;
    if (track?.youtube_music_url) {
      window.open(track.youtube_music_url, "_blank");
    }
  }, [state.currentTrack]);

  const dismissToast = useCallback(() => {
    setState((s) => ({ ...s, toastMessage: null }));
  }, []);

  return (
    <RadioPlayerContext.Provider
      value={{
        ...state,
        play,
        pause,
        togglePlay,
        next,
        prev,
        setQueue,
        setMoodQueue,
        openOnSpotify,
        openOnYouTube,
        dismissToast,
      }}
    >
      {children}
    </RadioPlayerContext.Provider>
  );
}

const defaultRadioState: RadioPlayerContextType = {
  currentTrack: null,
  queue: allTracks,
  queueIndex: 0,
  isPlaying: false,
  queueName: "All Songs",
  showSpotifyEmbed: false,
  toastMessage: null,
  play: () => {},
  pause: () => {},
  togglePlay: () => {},
  next: () => {},
  prev: () => {},
  setQueue: () => {},
  setMoodQueue: () => {},
  openOnSpotify: () => {},
  openOnYouTube: () => {},
  dismissToast: () => {},
};

export function useRadioPlayer() {
  const context = useContext(RadioPlayerContext);
  return context || defaultRadioState;
}
