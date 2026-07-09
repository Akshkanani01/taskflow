"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="rounded-xl border border-white/10 px-4 py-2 text-white hover:bg-slate-800"
    >
      ← Back
    </button>
  );
}