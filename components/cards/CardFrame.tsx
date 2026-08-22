import type { CardData } from "@/lib/cardData";
import WarrantyCard from "./WarrantyCard";
import AlgorithmCard from "./AlgorithmCard";
import LoveNoteCard from "./LoveNoteCard";

export default function CardFrame(data: CardData) {
  switch (data.frame) {
    case "warranty":
      return <WarrantyCard {...data} />;
    case "algorithm":
      return <AlgorithmCard {...data} />;
    case "lovenote":
    default:
      return <LoveNoteCard {...data} />;
  }
}
