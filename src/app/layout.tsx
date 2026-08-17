import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "@/store/useAudioStore";
import { ThemeProvider } from "@/store/useThemeStore";

import { RadioPlayerProvider } from "@/context/RadioPlayerContext";

export const metadata: Metadata = {
  title: "Arijit Singh — Love, In Every Note | Cinematic Radio",
  description:
    "A cinematic, fan-tribute radio experience dedicated to Arijit Singh's romantic discography. Curated mood stations and seamless playback in a single beautiful viewport.",
  keywords: [
    "Arijit Singh",
    "Bollywood romance",
    "Hindi love songs",
    "radio",
    "romantic music",
    "Tum Hi Ho",
    "Channa Mereya",
    "Kesariya",
  ],
  openGraph: {
    title: "Arijit Singh — Love, In Every Note",
    description:
      "A cinematic tribute radio for Arijit Singh's romantic era. Press play, drift through love, heartbreak, and longing.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arijit Singh — Love, In Every Note",
    description: "A cinematic tribute radio for Arijit Singh's romantic era.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="golden-hour" suppressHydrationWarning>
      <body className="overflow-hidden h-dvh w-screen" suppressHydrationWarning>
        <ThemeProvider>
          <AudioProvider>
            <RadioPlayerProvider>
              <div className="film-grain" aria-hidden="true" suppressHydrationWarning />
              {children}
            </RadioPlayerProvider>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
