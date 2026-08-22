import { Suspense } from "react";
import FramePickerClient from "@/components/FramePickerClient";

export const metadata = { title: "Choose a frame" };

export default function FramePage() {
  return (
    <Suspense fallback={null}>
      <FramePickerClient />
    </Suspense>
  );
}
