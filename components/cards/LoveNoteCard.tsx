import { HeartIcon, HeartOutlineIcon, SparkleIcon } from "../icons";
import type { CardData } from "@/lib/cardData";

const FALLBACK_MEMORY =
  "I don't say this enough, but I'm glad you exist. That's the whole letter, really.";

export default function LoveNoteCard({ to, from, memory }: CardData) {
  return (
    <div className="relative flex h-full w-full flex-col gap-4 overflow-hidden bg-cream-3 p-8 pb-8 font-sans text-ink">
      <HeartOutlineIcon size={28} className="absolute top-9 right-9 opacity-60" />
      <SparkleIcon size={22} color="#2A9D8F" className="absolute bottom-52 left-6 opacity-60" />
      <span className="absolute top-28 left-7 h-4 w-4 rounded-full bg-marigold opacity-50" />

      <div className="flex justify-center">
        <div className="flex h-12 w-12 animate-swayCharm items-center justify-center rounded-full border-2 border-gold bg-[#FDEBD3]">
          <HeartIcon size={20} color="#B23A48" />
        </div>
      </div>

      <span className="text-center font-script text-[34px] font-bold text-ink-warm">Dear {to},</span>

      <div className="pt-1.5" style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 33px, #EADCC5 34px)" }}>
        <span className="font-script text-[23px] leading-[34px] text-ink-soft">{memory || FALLBACK_MEMORY}</span>
      </div>

      <div className="mt-1 flex flex-col items-end">
        <span className="font-script text-xl text-ink-soft">With all my love,</span>
        <span className="font-script text-[32px] font-bold text-rose">{from}</span>
      </div>

      <RibbonDivider />

      <div className="flex items-start gap-2 px-0.5">
        <span className="shrink-0 font-script text-xl text-brown">P.S. —</span>
        <span className="font-script text-xl leading-tight text-ink-soft">don&apos;t forget the sweets this time. I&apos;m counting.</span>
      </div>

      <div className="flex flex-1 items-center justify-center py-1">
        <div className="relative flex h-28 w-28 animate-floatSlow items-center justify-center">
          <svg width="112" height="112" viewBox="0 0 112 112" className="absolute inset-0 animate-rotateSlow">
            <circle cx="56" cy="56" r="50" fill="none" stroke="#D8B25E" strokeWidth="1.4" strokeDasharray="2 6" strokeLinecap="round" opacity="0.7" />
          </svg>
          <div className="flex h-[82px] w-[82px] flex-col items-center justify-center gap-0.5 rounded-full border-[2.5px] border-maroon bg-card shadow-[0_4px_12px_rgba(178,58,72,0.15)]">
            <span className="text-base">🪢</span>
            <span className="text-center text-[8px] font-bold leading-tight tracking-wide text-maroon">
              SEALED FOR
              <br />
              RAKSHA BANDHAN
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-0.5 pt-0.5 text-center">
        <span className="text-[13.5px] text-ink">Some things don&apos;t need proving.</span>
        <span className="text-[13.5px] font-bold text-rose underline decoration-rose">This is one of them.</span>
        <div className="mt-1.5 flex items-center justify-center gap-1.5">
          <span className="font-script text-[22px] font-bold text-maroon">Happy Raksha Bandhan.</span>
          <HeartIcon size={16} className="animate-pulseHeart" />
        </div>
      </div>
    </div>
  );
}

function RibbonDivider() {
  return (
    <svg width="100%" height="30" viewBox="0 0 360 34" className="block">
      <path d="M0,19 C40,34 80,4 120,19 C160,34 200,4 240,19 C280,34 320,4 360,19" stroke="#B23A48" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M0,17 C40,2 80,32 120,17 C160,2 200,32 240,17 C280,2 320,32 360,17" stroke="#D8B25E" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
