import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arijit Singh — Love, In Every Note",
    short_name: "Arijit Radio",
    description:
      "A cinematic, fan-tribute radio experience dedicated to Arijit Singh's romantic discography.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
