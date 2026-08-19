import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Discography & Albums — Arijit Radio",
  description: "Explore the comprehensive discography and filmography of Arijit Singh.",
  alternates: {
    canonical: "/albums",
  },
};

export default function AlbumsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-4 text-center">
      <h1
        className="text-3xl font-bold text-white/80 mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        FILMOGRAPHY
      </h1>
      <p className="text-white/40 max-w-md mb-6">
        This page is being redesigned. Head back to the main radio experience.
      </p>
      <Link
        href="/"
        className="px-6 py-2 rounded-full text-sm font-medium"
        style={{ background: "var(--color-accent)", color: "black" }}
      >
        Back to Radio
      </Link>
    </div>
  );
}
