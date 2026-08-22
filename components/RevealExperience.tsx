"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import CardFrame from "./cards/CardFrame";
import { ArrowRightIcon, HeartIcon } from "./icons";
import { useAmbientAudio } from "./AudioProvider";
import { playChime } from "@/lib/chime";
import type { CardData } from "@/lib/cardData";

type Stage = "locked" | "untying" | "revealed";

// Reading localStorage differs between server and client, so it's modeled as
// an external store (useSyncExternalStore) rather than an effect+setState —
// that keeps the very first client render hydration-safe without a manual
// "checking" placeholder stage.
const emptySubscribe = () => () => {};
const getServerSnapshot = () => false;

const BURST_PETALS = [
  { left: "20%", drift: "-60px", delay: "0.05s", size: 9 },
  { left: "40%", drift: "30px", delay: "0.15s", size: 8 },
  { left: "55%", drift: "-25px", delay: "0.05s", size: 10 },
  { left: "70%", drift: "55px", delay: "0.2s", size: 9 },
  { left: "35%", drift: "70px", delay: "0.3s", size: 8 },
  { left: "62%", drift: "-45px", delay: "0.1s", size: 9 },
];

export default function RevealExperience({ data, encoded }: { data: CardData; encoded: string }) {
  const { arm } = useAmbientAudio();
  const storageKey = `rakhi-seen-${encoded}`;

  const hasSeenBefore = useSyncExternalStore(
    emptySubscribe,
    () => {
      try {
        return window.localStorage.getItem(storageKey) === "1";
      } catch {
        return false;
      }
    },
    getServerSnapshot,
  );

  const [manualStage, setManualStage] = useState<Stage | null>(null);
  const stage: Stage = manualStage ?? (hasSeenBefore ? "revealed" : "locked");

  function untie() {
    if (stage !== "locked") return;
    setManualStage("untying");
    arm("/audio/ambient-loop.mp3");
    playChime();
    try {
      window.localStorage.setItem(storageKey, "1");
    } catch {
      // localStorage unavailable (private mode, etc.) — the animation still
      // plays, it'll just replay on a future visit. Not worth blocking on.
    }
    setTimeout(() => setManualStage("revealed"), 1150);
  }

  const tieBackHref = useMemo(
    () => ({
      pathname: "/create",
      query: {
        to: data.from,
        from: data.to,
        avatarTo: data.avatarFrom,
        avatarFrom: data.avatarTo,
      },
    }),
    [data],
  );

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-gradient-to-br from-cream to-cream-2 px-6 py-9">
      {stage === "revealed" ? (
        <div className="flex w-full max-w-[400px] flex-col gap-6">
          <div className="aspect-[1/2] w-full overflow-hidden rounded-[28px] border border-line shadow-xl">
            <CardFrame {...data} />
          </div>

          <Link
            href={tieBackHref}
            className="animate-pulseGlow flex items-center justify-center gap-2 rounded-[11px] bg-gradient-to-r from-marigold to-rose py-4 text-[15.5px] font-bold whitespace-nowrap text-white"
          >
            Tie It Back
            <ArrowRightIcon />
          </Link>

          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[12px] text-tan">Made with</span>
            <HeartIcon size={12} />
            <span className="text-[12px] text-tan">on Digital Rakhi</span>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={untie}
          disabled={stage === "untying"}
          className="relative flex aspect-[1/2] w-full max-w-[340px] flex-col items-center justify-center gap-4 overflow-hidden rounded-[28px] border border-line bg-gradient-to-br from-[#FBE3EC] via-[#FDEBD3] to-[#E4F2EF] shadow-xl"
        >
          {stage === "untying" &&
            BURST_PETALS.map((p, i) => (
              <span
                key={i}
                className="absolute top-1/2 rounded-[2px] bg-rose/70"
                style={
                  {
                    left: p.left,
                    width: p.size,
                    height: p.size * 1.3,
                    animation: "driftPetal 1.4s ease-in forwards",
                    animationDelay: p.delay,
                    "--drift-x": p.drift,
                  } as React.CSSProperties
                }
              />
            ))}

          <svg
            viewBox="0 0 300 560"
            className="absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)]"
            style={{ pointerEvents: "none" }}
          >
            <rect
              x="4"
              y="4"
              width="292"
              height="552"
              rx="24"
              fill="none"
              stroke="#B23A48"
              strokeWidth="3"
              pathLength={100}
              strokeDasharray={100}
              style={{
                strokeDashoffset: stage === "untying" ? 100 : 0,
                transition: "stroke-dashoffset 1.05s ease-in-out",
              }}
            />
          </svg>

          <div
            className="flex flex-col items-center gap-2 transition-all duration-500"
            style={
              stage === "untying"
                ? { transform: "rotate(200deg) translateY(40px) scale(0.5)", opacity: 0 }
                : { transform: "rotate(0deg) translateY(0) scale(1)", opacity: 1 }
            }
          >
            <div className="animate-swayCharm flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-card shadow-md">
              <span className="text-2xl">🪢</span>
            </div>
            <span className="text-sm font-bold text-ink-warm">A rakhi from {data.from}</span>
          </div>

          <span className="animate-pulseGlow rounded-full bg-gradient-to-r from-marigold to-rose px-5 py-2.5 text-[13.5px] font-bold text-white">
            {stage === "untying" ? "Untying…" : "Tap to untie"}
          </span>
        </button>
      )}
    </div>
  );
}
