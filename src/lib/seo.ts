export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "https://arijit-world.vercel.app";
}

export const siteConfig = {
  name: "Arijit Singh Radio — Love, In Every Note",
  shortName: "Arijit Radio",
  description:
    "A cinematic, fan-tribute radio experience dedicated to Arijit Singh's romantic discography. Curated mood stations, deep-dive essays, and seamless playback.",
  tagline: "Love, In Every Note",
  author: "Divyesh Soni",
  creator: "Divyesh Soni",
  keywords: [
    "Arijit Singh",
    "Arijit Singh radio",
    "Arijit Singh songs",
    "Bollywood romantic songs",
    "Hindi love songs",
    "Tum Hi Ho",
    "Channa Mereya",
    "Kesariya",
    "Gerua",
    "Hawayein",
    "Agar Tum Saath Ho",
    "Arijit Singh romantic playlist",
    "Arijit radio online",
    "Bollywood radio tribute",
    "Hindi cinema love tracks",
  ],
  locale: "en_US",
  type: "website",
};
