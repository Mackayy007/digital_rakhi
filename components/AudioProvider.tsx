"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { MuteIcon } from "./icons";

const TARGET_VOLUME = 0.55;
const FADE_MS = 1500;

interface AudioCtxValue {
  /** Start (or no-op if already started) the one continuous ambient loop for
   * this visit. Must be called from inside a user-gesture handler — that's
   * what satisfies autoplay policy. */
  arm: (src: string) => void;
  playing: boolean;
}

const AudioCtx = createContext<AudioCtxValue | null>(null);

export function useAmbientAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAmbientAudio must be used inside <AudioProvider>");
  return ctx;
}

/**
 * Lives in the root layout so the ambient loop survives client-side route
 * changes across the whole create → share → reveal flow, instead of
 * restarting (or dying) on every page. Exposes a single mute toggle,
 * rendered once, fixed top-right, only after audio actually starts playing.
 */
export default function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number>(0);
  const mutedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const arm = useCallback((src: string) => {
    if (audioRef.current) return;
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Blocked by autoplay policy — silently stay dormant.
      });

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / FADE_MS);
      audio.volume = mutedRef.current ? 0 : t * TARGET_VOLUME;
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      mutedRef.current = next;
      if (audioRef.current) audioRef.current.volume = next ? 0 : TARGET_VOLUME;
      return next;
    });
  }, []);

  return (
    <AudioCtx.Provider value={{ arm, playing }}>
      {children}
      {playing && (
        <button
          type="button"
          aria-label={muted ? "Unmute music" : "Mute music"}
          onClick={toggleMuted}
          className="fixed top-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card/90 shadow-sm backdrop-blur-sm"
        >
          <MuteIcon muted={muted} />
        </button>
      )}
    </AudioCtx.Provider>
  );
}
