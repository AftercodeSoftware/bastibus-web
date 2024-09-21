"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function GoBackButton() {
  const router = useRouter();

  return (
    <button
      className="absolute top-4 left-4 cursor-pointer"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className="w-6 h-6 text-verde-800" />
    </button>
  );
}
export default GoBackButton;
