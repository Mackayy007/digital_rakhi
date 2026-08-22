import type { FrameId } from "./cardData";

const FRAME_HOOK: Record<FrameId, string> = {
  warranty: "I made you a Sibling Warranty",
  algorithm: "I ran the Sibling Algorithm on us",
  lovenote: "I wrote you a rakhi letter",
};

export function buildWhatsAppShareUrl(url: string, to: string, frame: FrameId): string {
  const hook = FRAME_HOOK[frame];
  const text = `${to}, ${hook} 🪢 tap to untie it: ${url}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function getSiteUrl(): string {
  if (typeof window !== "undefined") return window.location.origin;
  return process.env.NEXT_PUBLIC_SITE_URL || "https://digital-rakhi.vercel.app";
}
