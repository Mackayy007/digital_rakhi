import type { FrameId } from "./cardData";

export interface FrameMeta {
  id: FrameId;
  title: string;
  tagline: string;
  swapText: string;
  labelColor: string;
  iconBg: string;
  previewBg: string;
}

export const FRAME_META: Record<FrameId, FrameMeta> = {
  warranty: {
    id: "warranty",
    title: "Sibling Warranty",
    tagline: "A certificate, warmly done. Sincere.",
    swapText: "Some bonds come with a warranty.",
    labelColor: "#B23A48",
    iconBg: "#FDEBD3",
    previewBg: "linear-gradient(160deg, #FDEBD3 0%, #FBDDBB 100%)",
  },
  algorithm: {
    id: "algorithm",
    title: "Sibling Algorithm",
    tagline: "Dashboard parody, run on love. Playful.",
    swapText: "They may not solve every problem.",
    labelColor: "#237F79",
    iconBg: "#E4F2EF",
    previewBg: "linear-gradient(160deg, #E4F2EF 0%, #D3ECE6 100%)",
  },
  lovenote: {
    id: "lovenote",
    title: "Handwritten Love Note",
    tagline: "Just a letter. Most emotional.",
    swapText: "Some things don't need proving.",
    labelColor: "#D6447E",
    iconBg: "#FBE3EC",
    previewBg: "linear-gradient(160deg, #FBE3EC 0%, #F8D2E1 100%)",
  },
};

export const FRAME_ORDER: FrameId[] = ["warranty", "algorithm", "lovenote"];
