import { HeartIcon, ShieldIcon } from "../icons";
import type { CardData } from "@/lib/cardData";

const DEFAULT_ITEMS = [
  { color: "#D6447E", text: "Remembering the small things you never said out loud" },
  { color: "#2A9D8F", text: "Picking up on the second ring, no matter the hour" },
  { color: "#C9A24B", text: "Never actually being replaceable" },
];

export default function WarrantyCard({ to, from, memory }: CardData) {
  return (
    <div className="flex h-full w-full flex-col gap-5 bg-gradient-to-br from-cream to-cream-2 p-7 pb-8 font-sans text-ink">
      <div className="flex items-start justify-between text-[10.5px] font-semibold uppercase tracking-wide text-tan">
        <span>
          Certificate No.
          <br />
          <span className="font-bold text-ink">RB/2026</span>
        </span>
        <span className="text-right">
          Issued on
          <br />
          <span className="font-bold text-ink">Raksha Bandhan</span>
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <div className="mb-1.5 flex h-13 w-13 animate-swayCharm items-center justify-center rounded-full bg-[#FDEBD3]" style={{ width: 52, height: 52 }}>
          <ShieldIcon size={26} checked />
        </div>
        <span className="text-[27px] font-extrabold tracking-tight text-ink-warm">
          SIBLING WARRANTY<span className="align-super text-[13px]">™</span>
        </span>
        <span className="text-xs font-bold tracking-[0.16em] text-marigold-deep uppercase">Lifetime Coverage, With Love</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <InfoTile label="For" value={to} />
        <InfoTile label="From" value={from} />
        <InfoTile label="Since" value="Always" />
        <InfoTile label="Type" value="Permanent" />
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="border-b border-line pb-2 text-[11px] font-bold tracking-[0.1em] text-tan uppercase">Coverage Includes</span>
        {memory && (
          <div className="flex items-start gap-2.5">
            <HeartIcon size={16} color="#F2994A" className="mt-0.5 shrink-0" />
            <span className="text-[13.5px] leading-relaxed text-ink-warm">{memory}</span>
          </div>
        )}
        {DEFAULT_ITEMS.map((item) => (
          <div key={item.text} className="flex items-start gap-2.5">
            <HeartIcon size={16} color={item.color} className="mt-0.5 shrink-0" />
            <span className="text-[13.5px] leading-relaxed text-ink-warm">{item.text}</span>
          </div>
        ))}
      </div>

      <RibbonDivider />

      <div className="mt-auto flex flex-col gap-3.5">
        <div className="flex items-center justify-between rounded-[10px] border border-line bg-[#FDEBD3] px-3.5 py-3">
          <div className="flex items-center gap-2">
            <HeartIcon size={16} className="animate-pulseHeart" />
            <span className="text-xs font-bold text-maroon">RAKHI ATTACHED</span>
          </div>
          <span className="text-[11px] font-semibold text-tan">VALID: LIFETIME</span>
        </div>

        <div className="flex flex-col items-center gap-0.5 pt-0.5 text-center">
          <span className="text-[13.5px] text-ink">Some bonds come with a warranty.</span>
          <span className="text-[13.5px] font-bold text-rose underline decoration-rose">This one&apos;s unconditional.</span>
          <div className="mt-1.5 flex items-center justify-center gap-1.5">
            <span className="font-script text-[22px] font-bold text-maroon">Happy Raksha Bandhan.</span>
            <HeartIcon size={16} className="animate-pulseHeart" />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl border border-line bg-card px-3.5 py-3">
      <span className="text-[10px] font-semibold tracking-wide text-tan uppercase">{label}</span>
      <span className="truncate text-[15px] font-bold text-ink">{value}</span>
    </div>
  );
}

function RibbonDivider() {
  return (
    <svg width="100%" height="34" viewBox="0 0 360 34" className="block">
      <path d="M0,19 C40,34 80,4 120,19 C160,34 200,4 240,19 C280,34 320,4 360,19" stroke="#B23A48" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M0,17 C40,2 80,32 120,17 C160,2 200,32 240,17 C280,2 320,32 360,17" stroke="#D8B25E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="180" cy="17" r="13" fill="#FDF6EE" stroke="#D8B25E" strokeWidth="2.5" className="animate-pulseHeart" />
      <circle cx="180" cy="17" r="7.5" fill="#B23A48" />
    </svg>
  );
}
