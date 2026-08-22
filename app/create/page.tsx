import { Suspense } from "react";
import QuestionForm from "@/components/QuestionForm";

export const metadata = { title: "Make a rakhi" };

export default function CreatePage() {
  return (
    <Suspense fallback={null}>
      <QuestionForm />
    </Suspense>
  );
}
