"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowRightIcon } from "./icons";
import { MAX_MEMORY_LEN, MAX_NAME_LEN, type AvatarId } from "@/lib/cardData";

export default function QuestionForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [to, setTo] = useState(params.get("to") ?? "");
  const [from, setFrom] = useState(params.get("from") ?? "");
  const [memory, setMemory] = useState(params.get("memory") ?? "");
  const [avatarTo, setAvatarTo] = useState<AvatarId>((params.get("avatarTo") as AvatarId) || "male");
  const [avatarFrom, setAvatarFrom] = useState<AvatarId>((params.get("avatarFrom") as AvatarId) || "female");

  const canContinue = to.trim().length > 0 && from.trim().length > 0;

  function handleContinue() {
    if (!canContinue) return;
    const qs = new URLSearchParams({
      to: to.trim(),
      from: from.trim(),
      memory: memory.trim(),
      avatarTo,
      avatarFrom,
    });
    router.push(`/create/frame?${qs.toString()}`);
  }

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-br from-cream to-cream-2 px-7 pt-9 pb-8">
      <div className="mb-7 flex flex-col gap-1.5">
        <span className="text-[22px] font-extrabold tracking-tight text-ink-warm">A few quick things</span>
        <span className="text-[13px] text-tan">Takes twenty seconds. The preview updates as you go.</span>
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <Field label="Who's this rakhi for?">
          <input
            value={to}
            onChange={(e) => setTo(e.target.value.slice(0, MAX_NAME_LEN))}
            placeholder="e.g. Arjun"
            className="w-full rounded-xl border border-line bg-card px-4 py-3.5 text-[15px] font-semibold text-ink outline-none focus:border-marigold"
            maxLength={MAX_NAME_LEN}
          />
          <AvatarToggle value={avatarTo} onChange={setAvatarTo} />
        </Field>

        <Field label="And who's it from?">
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value.slice(0, MAX_NAME_LEN))}
            placeholder="e.g. Riya"
            className="w-full rounded-xl border border-line bg-card px-4 py-3.5 text-[15px] font-semibold text-ink outline-none focus:border-marigold"
            maxLength={MAX_NAME_LEN}
          />
          <AvatarToggle value={avatarFrom} onChange={setAvatarFrom} />
        </Field>

        <Field label="One memory, in your own words" optional>
          <textarea
            value={memory}
            onChange={(e) => setMemory(e.target.value.slice(0, MAX_MEMORY_LEN))}
            placeholder="You broke my favourite bangles and blamed the cat..."
            rows={4}
            className="w-full resize-none rounded-xl border border-line bg-card px-4 py-3.5 text-[15px] leading-relaxed text-ink outline-none focus:border-marigold"
          />
          <span className="self-end text-[11px] font-medium text-tan-light">
            {memory.length}/{MAX_MEMORY_LEN}
          </span>
        </Field>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!canContinue}
        className="mt-6 flex items-center justify-center gap-2 rounded-[11px] bg-gradient-to-r from-marigold to-rose py-4 text-[15.5px] font-bold whitespace-nowrap text-white disabled:opacity-40"
      >
        Continue
        <ArrowRightIcon />
      </button>
    </div>
  );
}

function Field({
  label,
  optional = false,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[13px] font-bold text-ink-warm">
        {label}
        {optional && <span className="ml-1.5 font-medium text-tan-light">(optional)</span>}
      </span>
      {children}
    </div>
  );
}

function AvatarToggle({ value, onChange }: { value: AvatarId; onChange: (v: AvatarId) => void }) {
  return (
    <div className="flex items-center gap-2 pt-0.5">
      <span className="text-[11px] font-medium text-tan-light">Avatar for the Algorithm card:</span>
      <button
        type="button"
        onClick={() => onChange("male")}
        aria-pressed={value === "male"}
        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
          value === "male" ? "bg-marigold text-white" : "bg-line text-tan"
        }`}
      >
        🧑
      </button>
      <button
        type="button"
        onClick={() => onChange("female")}
        aria-pressed={value === "female"}
        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
          value === "female" ? "bg-rose text-white" : "bg-line text-tan"
        }`}
      >
        👩
      </button>
    </div>
  );
}
