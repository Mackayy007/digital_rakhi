// Isomorphic card-data encode/decode.
// Must run identically in the browser, in Node (server components / SSR),
// and in the Edge runtime (the opengraph-image route) — so this deliberately
// uses TextEncoder/TextDecoder + btoa/atob rather than Node's Buffer, which
// is not available under Edge.

export type FrameId = "warranty" | "algorithm" | "lovenote";
export type AvatarId = "male" | "female";

export const FRAME_IDS: FrameId[] = ["warranty", "algorithm", "lovenote"];
export const AVATAR_IDS: AvatarId[] = ["male", "female"];

export interface CardData {
  to: string;
  from: string;
  memory: string;
  frame: FrameId;
  avatarTo: AvatarId;
  avatarFrom: AvatarId;
}

export const MAX_NAME_LEN = 30;
export const MAX_MEMORY_LEN = 220;

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  const b64 = btoa(binary);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function clean(str: string, max: number): string {
  return (str ?? "").toString().trim().replace(/\s+/g, " ").slice(0, max);
}

export function encodeCard(data: CardData): string {
  const safe: CardData = {
    to: clean(data.to, MAX_NAME_LEN),
    from: clean(data.from, MAX_NAME_LEN),
    memory: clean(data.memory, MAX_MEMORY_LEN),
    frame: FRAME_IDS.includes(data.frame) ? data.frame : "lovenote",
    avatarTo: AVATAR_IDS.includes(data.avatarTo) ? data.avatarTo : "male",
    avatarFrom: AVATAR_IDS.includes(data.avatarFrom) ? data.avatarFrom : "female",
  };
  const json = JSON.stringify([safe.to, safe.from, safe.memory, safe.frame, safe.avatarTo, safe.avatarFrom]);
  const bytes = new TextEncoder().encode(json);
  return toBase64Url(bytes);
}

export function decodeCard(encoded: string): CardData | null {
  if (!encoded) return null;
  try {
    const bytes = fromBase64Url(encoded);
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed) || parsed.length < 4) return null;
    const [to, from, memory, frame, avatarTo, avatarFrom] = parsed;
    return {
      to: clean(String(to ?? ""), MAX_NAME_LEN) || "Someone Special",
      from: clean(String(from ?? ""), MAX_NAME_LEN) || "Someone who loves you",
      memory: clean(String(memory ?? ""), MAX_MEMORY_LEN),
      frame: FRAME_IDS.includes(frame) ? (frame as FrameId) : "lovenote",
      avatarTo: AVATAR_IDS.includes(avatarTo) ? (avatarTo as AvatarId) : "male",
      avatarFrom: AVATAR_IDS.includes(avatarFrom) ? (avatarFrom as AvatarId) : "female",
    };
  } catch {
    return null;
  }
}
