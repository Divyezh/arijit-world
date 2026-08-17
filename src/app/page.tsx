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
