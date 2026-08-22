"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowRightIcon,
  AlgorithmIcon,
  CheckIcon,
  HeartIcon,
  ShieldIcon,
} from "./icons";
import { encodeCard, type AvatarId, type FrameId } from "@/lib/cardData";
import { FRAME_META, FRAME_ORDER } from "@/lib/frames";

const ROW_ICON: Record<FrameId, { bg: string; render: () => React.ReactNode }> = {
  warranty: { bg: "#FDEBD3", render: () => <ShieldIcon size={22} /> },
  algorithm: { bg: "#E4F2EF", render: () => <AlgorithmIcon size={22} /> },
  lovenote: { bg: "#FBE3EC", render: () => <HeartIcon size={22} /> },
};

export default function FramePickerClient() {
  const router = useRouter();
  const params = useSearchParams();

  const to = params.get("to") ?? "Someone Special";
  const from = params.get("from") ?? "Someone who loves you";
  const memory = params.get("memory") ?? "";
  const avatarTo = (params.get("avatarTo") as AvatarId) || "male";
  const avatarFrom = (params.get("avatarFrom") as AvatarId) || "female";

  const [frame, setFrame] = useState<FrameId>("lovenote");
  const meta = FRAME_META[frame];

  function handleContinue() {
    const encoded = encodeCard({ to, from, memory, frame, avatarTo, avatarFrom });
    router.push(`/share/${encoded}`);
  }

  return (
    <div className="flex min-h-dvh flex-col gap-4.5 bg-gradient-to-br from-cream to-cream-2 px-7 pt-9 pb-8">
      <div className="flex flex-col gap-1.5">
        <span className="text-[22px] font-extrabold tracking-tight text-ink-warm">Pick your rakhi&apos;s vibe</span>
        <span className="text-[13px] text-tan">Tap one — the preview below updates live.</span>
      </div>

      <div className="flex flex-col gap-3">
        {FRAME_ORDER.map((id) => {
          const m = FRAME_META[id];
          const selected = frame === id;
          const icon = ROW_ICON[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => setFrame(id)}
              className="flex items-center gap-3.5 rounded-2xl bg-card p-3.5 text-left transition-shadow"
              style={{
                border: selected ? "2px solid #F2994A" : "1.5px solid #F0DFC9",
                boxShadow: selected ? "0 4px 14px rgba(242,153,74,0.16)" : "none",
              }}
            >
              <div
                className="flex h-13 w-13 shrink-0 items-center justify-center rounded-[10px]"
                style={{ background: icon.bg, width: 52, height: 52 }}
              >
                {icon.render()}
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-[14.5px] font-bold text-ink">{m.title}</span>
                <span className="text-[11.5px] text-tan">{m.tagline}</span>
              </div>
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: selected ? "#F2994A" : "transparent",
                  border: selected ? "2px solid #F2994A" : "2px solid #E4D5BE",
                }}
              >
                {selected && <CheckIcon />}
              </span>
            </button>
          );
        })}
      </div>

      <div
        key={frame}
        className="animate-popIn flex flex-1 min-h-0 flex-col gap-2.5 overflow-hidden rounded-[18px] p-4.5"
        style={{ background: meta.previewBg }}
      >
        <span className="text-[10.5px] font-bold tracking-[0.09em] uppercase" style={{ color: meta.labelColor }}>
          Here&apos;s a peek
        </span>

        <div className="flex items-center gap-2.5">
          <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full bg-white shadow-sm" style={{ width: 38, height: 38 }}>
            {frame === "warranty" && <ShieldIcon size={17} />}
            {frame === "algorithm" && <AlgorithmIcon size={17} />}
            {frame === "lovenote" && <HeartIcon size={16} className="animate-pulseHeart" />}
          </div>
          <div className="flex flex-col gap-0">
            <span className="text-sm font-extrabold text-ink-warm">{meta.title}</span>
            <span className="text-[11px] text-tan">
              for {to}, from {from}
            </span>
          </div>
        </div>

        <div className="flex flex-1 min-h-0 items-center rounded-xl bg-card p-3.5">
          {frame === "warranty" && (
            <div className="flex w-full flex-col gap-1.5">
              <span className="text-[9.5px] font-bold tracking-[0.08em] text-tan-light">CERTIFIES</span>
              <span className="text-[15px] leading-tight font-extrabold text-ink-warm">1 × Irreplaceable {avatarTo === "female" ? "Sister" : "Sibling"}</span>
              <span className="text-[11px] text-tan">Coverage: unconditional. No expiry.</span>
            </div>
          )}
          {frame === "algorithm" && (
            <div className="flex w-full justify-center gap-4">
              <Stat value="100%" label="Trust" color="#E07B29" />
              <Stat value="100%" label="Compatible" color="#237F79" />
              <Stat value="∞" label="Love" color="#D6447E" pulse />
            </div>
          )}
          {frame === "lovenote" && (
            <span className="font-script text-lg leading-snug text-ink-soft">
              {memory ? `"${memory}"` : "“Write a memory on the last screen and it'll show up here.”"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {frame === "warranty" && (
            <>
              <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-maroon" />
              <span className="text-[10.5px] text-brown">Sealed and signed</span>
            </>
          )}
          {frame === "algorithm" && (
            <>
              <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-teal" />
              <span className="text-[10.5px] text-teal-deep">Still running, on love</span>
            </>
          )}
          {frame === "lovenote" && (
            <>
              <span className="animate-swayCharm inline-block text-[13px]">🪢</span>
              <span className="text-[10.5px] text-brown">Handwritten, not typed</span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          onClick={handleContinue}
          className="animate-pulseGlow flex items-center justify-center gap-2 rounded-[11px] bg-gradient-to-r from-marigold to-rose py-4 text-[15.5px] font-bold whitespace-nowrap text-white"
        >
          Continue
          <ArrowRightIcon />
        </button>
        <span className="text-center text-[11px] text-tan-light">
          Going with {meta.title} — you can send a different one next time.
        </span>
      </div>
    </div>
  );
}

function Stat({ value, label, color, pulse = false }: { value: string; label: string; color: string; pulse?: boolean }) {
  return (
    <div className="text-center">
      <div className={`text-[15px] font-extrabold ${pulse ? "animate-pulseHeart" : ""}`} style={{ color }}>
        {value}
      </div>
      <div className="text-[9px] font-semibold text-tan">{label}</div>
    </div>
  );
}
