"use client";

import { useState } from "react";
import BackgroundImage from "@/components/v2/BackgroundImage";
import TopBar from "@/components/v2/TopBar";
import JoinBanner from "@/components/v2/JoinBanner";
import PlayerBar from "@/components/v2/PlayerBar";
import ModalOverlay, { type ModalType } from "@/components/v2/ModalOverlay";
import Toast from "@/components/v2/Toast";

export default function Home() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <div className="relative w-screen h-dvh overflow-hidden" suppressHydrationWarning>
      {/* Semantic SEO & Crawler Content */}
      <div className="sr-only">
        <h1>Arijit Singh Radio — Love, In Every Note</h1>
        <p>
          Welcome to Arijit Radio, a 24/7 cinematic fan tribute radio celebrating the romantic
          discography of playback singer Arijit Singh. Explore curated mood stations including
          Love, Heartbreak, Longing, Dreamy, Soulful, and Nostalgic.
        </p>
        <nav aria-label="Quick links">
          <a href="/moods">Mood Stations</a>
          <a href="/articles">Essays and Discography Stories</a>
          <a href="/about">About Arijit Radio</a>
          <a href="/contact">Contact and Feedback</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/disclaimer">Disclaimer</a>
        </nav>
      </div>

      {/* Layer 0: Full-bleed background image */}
      <BackgroundImage />

      {/* Layer 1: Top bar */}
      <TopBar onOpenModal={(type) => setActiveModal(type)} />

      {/* Layer 3: Join community banner */}
      <JoinBanner />

      {/* Layer 4: Player bar */}
      <PlayerBar />

      {/* Layer 5: Modals */}
      <ModalOverlay
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* Layer 6: Toast */}
      <Toast />
    </div>
  );
}

