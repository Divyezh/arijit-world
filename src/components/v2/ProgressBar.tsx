"use client";

import { useRef, useCallback } from "react";
import { useAudio } from "@/store/useAudioStore";

export default function ProgressBar() {
  const { seek, duration, seekTo } = useAudio();
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const calculatePosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current || duration <= 0) return;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      seekTo(ratio * duration);
    },
    [duration, seekTo]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      calculatePosition(e.clientX);

      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current) calculatePosition(e.clientX);
      };
      const handleMouseUp = () => {
        isDragging.current = false;
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [calculatePosition]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDragging.current = true;
      calculatePosition(e.touches[0].clientX);

      const handleTouchMove = (e: TouchEvent) => {
        if (isDragging.current) calculatePosition(e.touches[0].clientX);
      };
      const handleTouchEnd = () => {
        isDragging.current = false;
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };

      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    },
    [calculatePosition]
  );

  const percent = duration > 0 ? (seek / duration) * 100 : 0;

  return (
    <div
      ref={trackRef}
      className="progress-track w-full"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="slider"
      aria-label="Seek position"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
      id="progress-bar"
    >
      <div
        className="progress-fill"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
