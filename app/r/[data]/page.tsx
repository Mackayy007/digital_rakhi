import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RevealExperience from "@/components/RevealExperience";
import { decodeCard } from "@/lib/cardData";
import { FRAME_META } from "@/lib/frames";

type Props = PageProps<"/r/[data]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: encoded } = await params;
  const data = decodeCard(encoded);
  if (!data) return { title: "Digital Rakhi" };

  const frameTitle = FRAME_META[data.frame].title;
  const teaser = data.memory ? data.memory.slice(0, 110) : `A ${frameTitle}, tied just for you.`;
  const title = `${data.from} sent you a rakhi`;

  return {
    title,
    description: teaser,
    openGraph: {
      title: `🪢 ${title}`,
      description: teaser,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `🪢 ${title}`,
      description: teaser,
    },
  };
}

export default async function RecipientPage({ params }: Props) {
  const { data: encoded } = await params;
  const data = decodeCard(encoded);
  if (!data) notFound();

  return <RevealExperience data={data} encoded={encoded} />;
}
