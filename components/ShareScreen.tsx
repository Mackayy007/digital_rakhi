"use client";

import { useState } from "react";
import Link from "next/link";
import CardFrame from "./cards/CardFrame";
import { CopyIcon, WhatsAppIcon } from "./icons";
import type { CardData } from "@/lib/cardData";
import { buildWhatsAppShareUrl, getSiteUrl } from "@/lib/whatsapp";

export default function ShareScreen({ data, encoded }: { data: CardData; encoded: string }) {
  const [copied, setCopied] = useState(false);
  const recipientUrl = `${getSiteUrl()}/r/${encoded}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(recipientUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the visible link text is the fallback.
    }
  }

  return (
    <div className="flex min-h-dvh flex-col gap-6 bg-gradient-to-br from-cream to-cream-2 px-6 pt-9 pb-8">
      <div className="flex flex-col gap-1.5 text-center">
        <span className="text-[22px] font-extrabold tracking-tight text-ink-warm">It&apos;s ready</span>
        <span className="text-[13px] text-tan">Here&apos;s exactly what {data.to} will see once they untie it.</span>
      </div>

      <div className="mx-auto aspect-[1/2] w-full max-w-[340px] overflow-hidden rounded-[28px] border border-line shadow-xl">
        <CardFrame {...data} />
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <a
          href={buildWhatsAppShareUrl(recipientUrl, data.to, data.frame)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-[11px] bg-[#25D366] py-4 text-[15.5px] font-bold text-white"
        >
          <WhatsAppIcon />
          Share on WhatsApp
        </a>

        <button
          type="button"
          onClick={copyLink}
          className="flex items-center justify-center gap-2 rounded-[11px] border border-line bg-card py-3.5 text-[14.5px] font-bold text-ink-warm"
        >
          <CopyIcon />
          {copied ? "Link copied" : "Copy link instead"}
        </button>

        <Link
          href={{
            pathname: "/create/frame",
            query: {
              to: data.to,
              from: data.from,
              memory: data.memory,
              avatarTo: data.avatarTo,
              avatarFrom: data.avatarFrom,
            },
          }}
          className="text-center text-[12.5px] font-semibold text-tan underline decoration-tan-light underline-offset-2"
        >
          Try a different frame
        </Link>
      </div>
    </div>
  );
}
