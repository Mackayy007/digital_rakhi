import Image from "next/image";
import { HeartIcon } from "../icons";
import type { CardData } from "@/lib/cardData";

const AVATAR_SRC: Record<string, string> = {
  male: "/avatars/male.png",
  female: "/avatars/female.png",
};

const AVATAR_RING: Record<string, string> = {
  male: "#F2994A",
  female: "#D6447E",
};

const AVATAR_BG: Record<string, string> = {
  male: "#FDEBD3",
  female: "#FBE3EC",
};

export default function AlgorithmCard({ to, from, memory, avatarTo, avatarFrom }: CardData) {
  return (
    <div className="flex h-full w-full flex-col gap-4.5 bg-cream-3 p-6 pb-8 font-sans text-ink">
      <div className="flex items-center justify-between">
        <span className="text-[16.5px] font-extrabold tracking-tight">
          SIBLING <span className="text-rose">ALGORITHM</span>
          <span className="align-super text-[9px]">™</span>
        </span>
        <div className="flex items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-teal" />
          <span className="text-[10.5px] font-bold tracking-wide text-teal-deep">STILL RUNNING (ON LOVE)</span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-line bg-card px-3.5 py-4">
        <Avatar name={to} label="For" avatar={avatarTo} />
        <svg width="40" height="16" viewBox="0 0 46 18" className="shrink-0">
          <path d="M0,9 C6,16 12,2 18,9" stroke="#D8B25E" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M28,9 C34,16 40,2 46,9" stroke="#D8B25E" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        <Avatar name={from} label="From" avatar={avatarFrom} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[10.5px] font-bold tracking-[0.1em] text-tan uppercase">Trained On</span>
        {memory && (
          <div className="flex items-start gap-2.5">
            <span className="w-8 shrink-0 text-[11px] font-bold text-tan-light">2026</span>
            <span className="text-[13px] leading-snug text-ink-warm">{memory}</span>
          </div>
        )}
        <div className="flex items-start gap-2.5">
          <span className="w-8 shrink-0 text-[11px] font-bold text-tan-light">Now</span>
          <span className="text-[13px] leading-snug text-ink-warm">Rakhi detected. Model confidence: 100%.</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-[10.5px] font-bold tracking-[0.1em] text-tan uppercase">Processing</span>
        <div className="h-2.5 overflow-hidden rounded-full bg-line">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-marigold via-rose to-teal" />
        </div>
      </div>

      <div className="mt-0.5 flex flex-col items-center gap-3 rounded-2xl border border-line bg-card px-4.5 py-5">
        <span className="text-[10px] font-bold tracking-wide text-tan uppercase">Output</span>
        <span className="text-center text-[21px] font-extrabold leading-tight text-ink-warm">1 × IRREPLACEABLE HUMAN</span>
        <svg width="100%" height="26" viewBox="0 0 300 30">
          <path d="M0,17 C33,30 66,4 100,17 C133,30 166,4 200,17 C233,30 266,4 300,17" stroke="#B23A48" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M0,15 C33,2 66,28 100,15 C133,2 166,28 200,15 C233,2 266,28 300,15" stroke="#D8B25E" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        <div className="flex gap-3.5">
          <Stat value="100%" label="Trust" color="#E07B29" />
          <Stat value="100%" label="Compatibility" color="#237F79" />
          <Stat value="∞" label="Love" color="#D6447E" pulse />
        </div>
      </div>

      <div className="mt-auto flex flex-col items-center gap-0.5 pt-1 text-center">
        <span className="text-[13.5px] text-ink">They may not solve every problem.</span>
        <span className="text-[13.5px] font-bold text-rose underline decoration-rose">They&apos;ll still pick up.</span>
        <div className="mt-1.5 flex items-center justify-center gap-1.5">
          <span className="font-script text-[22px] font-bold text-maroon">Happy Raksha Bandhan.</span>
          <HeartIcon size={16} className="animate-pulseHeart" />
        </div>
      </div>
    </div>
  );
}

function Avatar({ name, label, avatar }: { name: string; label: string; avatar: string }) {
  const src = AVATAR_SRC[avatar] ?? AVATAR_SRC.male;
  const ring = AVATAR_RING[avatar] ?? AVATAR_RING.male;
  const bg = AVATAR_BG[avatar] ?? AVATAR_BG.male;
  return (
    <div className="flex w-[92px] flex-col items-center gap-1.5">
      <div
        className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full"
        style={{ background: bg, border: `2.5px solid ${ring}` }}
      >
        <Image src={src} alt="" width={52} height={52} className="rounded-full object-cover" unoptimized />
      </div>
      <span className="text-center text-[9px] font-bold tracking-wide text-tan uppercase">{label}</span>
      <span className="truncate text-[13px] font-bold text-ink">{name}</span>
    </div>
  );
}

function Stat({ value, label, color, pulse = false }: { value: string; label: string; color: string; pulse?: boolean }) {
  return (
    <div className="text-center">
      <div className={`text-sm font-extrabold ${pulse ? "animate-pulseHeart" : ""}`} style={{ color }}>
        {value}
      </div>
      <div className="text-[9.5px] font-semibold text-tan">{label}</div>
    </div>
  );
}
