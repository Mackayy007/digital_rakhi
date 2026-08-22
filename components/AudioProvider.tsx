"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { MuteIcon } from "./icons";

const TARGET_VOLUME = 0.55;
const FADE_SECONDS = 1.5;

interface AudioCtxValue {
  /** Start (or no-op if already started) the one continuous ambient loop for
   * this visit. Must be called from inside a user-gesture handler — that's
   * what satisfies autoplay policy, and what lets iOS Safari unlock audio. */
  arm: (src: string) => void;
  playing: boolean;
}

const AudioCtx = createContext<AudioCtxValue | null>(null);

export function useAmbientAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAmbientAudio must be used inside <AudioProvider>");
  return ctx;
}

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };

/**
 * Lives in the root layout so the ambient loop survives client-side route
 * changes across the whole create → share → reveal flow, instead of
 * restarting (or dying) on every page.
 *
 * Uses the Web Audio API (decode-to-buffer + AudioBufferSourceNode with
 * loop=true) rather than a plain <audio loop> element. A native <audio>
 * element has to physically seek back to time 0 on every loop, which on a
 * lot of mobile browsers causes an audible stutter/pause right at the loop
 * point — exactly the "stops and restarts" symptom. Decoding the whole clip
 * into memory once and looping the raw buffer is sample-accurate and gapless
 * regardless of device or network conditions.
 */
export default function AudioProvider({ children }: { children: React.ReactNode }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const armedRef = useRef(false);
  const mutedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const arm = useCallback((src: string) => {
    if (armedRef.current) return;
    armedRef.current = true;

    const AudioContextCtor = window.AudioContext || (window as WebkitWindow).webkitAudioContext;
    if (!AudioContextCtor) return;

    const audioCtx = new AudioContextCtor();
    ctxRef.current = audioCtx;
    // Some mobile browsers create the context in a "suspended" state even
    // inside a user gesture — explicitly resume to unlock it.
    audioCtx.resume().catch(() => {});

    const gain = audioCtx.createGain();
    gain.gain.value = 0;
    gain.connect(audioCtx.destination);
    gainRef.current = gain;

    fetch(src)
      .then((res) => res.arrayBuffer())
      .then((bytes) => audioCtx.decodeAudioData(bytes))
      .then((buffer) => {
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        source.connect(gain);
        source.start(0);
        setPlaying(true);

        const now = audioCtx.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(mutedRef.current ? 0 : TARGET_VOLUME, now + FADE_SECONDS);
      })
      .catch(() => {
        // Fetch/decode failed — stay silent rather than break the page.
      });
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      mutedRef.current = next;
      const gain = gainRef.current;
      const audioCtx = ctxRef.current;
      if (gain && audioCtx) {
        gain.gain.setTargetAtTime(next ? 0 : TARGET_VOLUME, audioCtx.currentTime, 0.05);
      }
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
