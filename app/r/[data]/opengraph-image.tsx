import { ImageResponse } from "next/og";
import { decodeCard, type CardData } from "@/lib/cardData";
import { FRAME_META } from "@/lib/frames";

export const alt = "A digital rakhi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FRAME_ACCENT: Record<CardData["frame"], string> = {
  warranty: "#B23A48",
  algorithm: "#237F79",
  lovenote: "#D6447E",
};

const FALLBACK: CardData = {
  to: "Someone Special",
  from: "Someone who loves you",
  memory: "",
  frame: "lovenote",
  avatarTo: "male",
  avatarFrom: "female",
};

export default async function Image({ params }: PageProps<"/r/[data]">) {
  const { data: encoded } = await params;
  const data = decodeCard(encoded) ?? FALLBACK;
  const meta = FRAME_META[data.frame];
  const accent = FRAME_ACCENT[data.frame];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #FDF6EE 0%, #FBEEE0 100%)",
          padding: "60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <span style={{ fontSize: 56 }}>🪢</span>
          <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5, color: "#3A2A1E" }}>Digital Rakhi</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#FFFBF5",
            border: `3px solid ${accent}`,
            borderRadius: 28,
            padding: "44px 64px",
            maxWidth: 940,
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 600, color: "#A9825E", textTransform: "uppercase", letterSpacing: 2 }}>
            {meta.title}
          </span>
          <span
            style={{
              fontSize: 46,
              fontWeight: 800,
              color: "#1A1A1A",
              marginTop: 18,
              textAlign: "center",
              display: "flex",
            }}
          >
            {data.from} tied one for {data.to}
          </span>
          <span style={{ fontSize: 24, color: accent, marginTop: 20, fontWeight: 600, display: "flex" }}>
            Tap to untie it 🪢
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
