import { notFound } from "next/navigation";
import ShareScreen from "@/components/ShareScreen";
import { decodeCard } from "@/lib/cardData";

export const metadata = { title: "Ready to send" };

export default async function SharePage({ params }: PageProps<"/share/[data]">) {
  const { data: encoded } = await params;
  const data = decodeCard(encoded);
  if (!data) notFound();

  return <ShareScreen data={data} encoded={encoded} />;
}
