import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "@/store/useAudioStore";
import { ThemeProvider } from "@/store/useThemeStore";
import { RadioPlayerProvider } from "@/context/RadioPlayerContext";
import { RootJsonLd } from "@/components/seo/JsonLd";
import { getSiteUrl, siteConfig } from "@/lib/seo";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arijit Singh — Love, In Every Note | Cinematic Radio",
    template: "%s | Arijit Radio",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  applicationName: siteConfig.shortName,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteUrl,
    title: "Arijit Singh — Love, In Every Note | Cinematic Radio",
    description: siteConfig.description,
    siteName: siteConfig.shortName,
  },
  twitter: {
    card: "summary_large_image",
    title: "Arijit Singh — Love, In Every Note | Cinematic Radio",
    description: siteConfig.description,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "googled1a697e54b4ff7a7",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="golden-hour" suppressHydrationWarning>
      <head>
        <RootJsonLd />
      </head>
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

