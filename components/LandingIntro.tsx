"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAmbientAudio } from "./AudioProvider";
import { ArrowRightIcon } from "./icons";

const PETALS = [
  { left: "8%", delay: "0s", duration: "9s", drift: "40px", size: 10 },
  { left: "22%", delay: "2.4s", duration: "11s", drift: "-30px", size: 8 },
  { left: "40%", delay: "5s", duration: "8.5s", drift: "50px", size: 11 },
  { left: "58%", delay: "1.2s", duration: "10s", drift: "-45px", size: 9 },
  { left: "74%", delay: "4s", duration: "9.5s", drift: "35px", size: 10 },
  { left: "90%", delay: "6.5s", duration: "10.5s", drift: "-25px", size: 8 },
];

const STARS = [
  { left: "10%", top: "8%", delay: "0s" },
  { left: "85%", top: "12%", delay: "0.6s" },
  { left: "20%", top: "18%", delay: "1.2s" },
  { left: "72%", top: "22%", delay: "1.8s" },
  { left: "50%", top: "6%", delay: "0.9s" },
];

export default function LandingIntro() {
  const router = useRouter();
  const { arm } = useAmbientAudio();
  const [leaving, setLeaving] = useState(false);

  function begin() {
    arm("/audio/ambient-loop.mp3");
    setLeaving(true);
    setTimeout(() => router.push("/create"), 420);
  }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-gradient-to-br from-[#2C1B3D] via-[#5C2A4A] to-[#F2994A]">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute h-[5px] w-[5px] animate-twinkleSoft rounded-full bg-[#F7E0A8]"
          style={{ left: s.left, top: s.top, animationDelay: s.delay }}
        />
      ))}

      {PETALS.map((p, i) => (
        <span
          key={i}
          className="absolute -top-4 rounded-[2px] bg-[#D6447E]/70"
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size * 1.3,
              animation: `driftPetal ${p.duration} linear infinite`,
              animationDelay: p.delay,
              "--drift-x": p.drift,
            } as React.CSSProperties
          }
        />
      ))}

      <div
        className={`relative z-10 flex flex-1 flex-col items-center justify-center gap-8 px-8 text-center transition-all duration-400 ${
          leaving ? "-translate-y-3 opacity-0" : "opacity-100"
        }`}
      >
        <DiyaAndThread />

        <div className="flex flex-col items-center gap-2">
          <span className="font-script text-[52px] leading-none font-bold text-[#FDEBD3]">Raksha Bandhan</span>
          <span className="text-sm font-medium tracking-wide text-[#F7E0A8]">Tie one, from wherever you are.</span>
        </div>

        <button
          type="button"
          onClick={begin}
          className="animate-pulseGlow mt-2 flex items-center gap-2 rounded-full bg-gradient-to-r from-marigold to-rose px-7 py-3.5 text-[15.5px] font-bold text-white shadow-lg"
        >
          Tap to Begin
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

function DiyaAndThread() {
  return (
    <div className="relative flex h-32 items-end justify-center">
      <svg width="70" height="90" viewBox="0 0 70 90" className="absolute -top-4 left-1/2 -translate-x-1/2 animate-swayCharm opacity-90">
        <ellipse cx="35" cy="78" rx="26" ry="9" fill="#D8B25E" opacity="0.85" />
        <path d="M14 78 Q10 62 35 60 Q60 62 56 78 Z" fill="#B23A48" opacity="0.9" />
        <path d="M18 60 Q35 40 52 60" stroke="#D8B25E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="24" cy="52" r="3" fill="#F2994A" />
        <circle cx="46" cy="52" r="3" fill="#2A9D8F" />
      </svg>
      <svg width="26" height="34" viewBox="0 0 26 34" className="absolute -top-14 left-1/2 -translate-x-1/2 animate-flicker">
        <path d="M13 34 C4 22 6 10 13 0 C20 10 22 22 13 34Z" fill="#F2994A" />
        <path d="M13 26 C9 19 10 12 13 6 C16 12 17 19 13 26Z" fill="#FCE38A" />
      </svg>
    </div>
  );
}
