import { ImageResponse } from "next/og";

export const alt = "Arijit Singh Radio — Love, In Every Note";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a120b 45%, #2a1b0d 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          padding: "60px",
        }}
      >
        {/* Ambient Glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "350px",
            background: "radial-gradient(circle, rgba(212, 168, 83, 0.25) 0%, rgba(200, 117, 51, 0.08) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Top Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 24px",
            background: "rgba(212, 168, 83, 0.15)",
            border: "1px solid rgba(212, 168, 83, 0.3)",
            borderRadius: "999px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#d4a853",
            }}
          />
          <span
            style={{
              color: "#d4a853",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Cinematic Tribute Radio
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "68px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "16px",
            textShadow: "0 4px 24px rgba(0,0,0,0.8)",
          }}
        >
          ARIJIT SINGH
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#e6c278",
            textAlign: "center",
            letterSpacing: "0.05em",
            marginBottom: "32px",
          }}
        >
          Love, In Every Note
        </div>

        {/* Tags row */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "10px",
          }}
        >
          {["6 Mood Stations", "Curated Playlists", "Discography Essays", "24/7 Stream"].map(
            (tag, idx) => (
              <div
                key={idx}
                style={{
                  padding: "6px 16px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  color: "rgba(255, 255, 255, 0.75)",
                  fontSize: "16px",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
