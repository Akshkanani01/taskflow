"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteListButton({
  projectId,
}: {
  projectId: string;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleDelete() {
    const confirmed =
      confirm(
        "Delete this list and all tasks?"
      );

    if (!confirmed) return;

    try {
      setLoading(true);

      const res = await fetch(
        `/api/projects/${projectId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      router.refresh();
    } catch {
      alert(
        "Failed to delete list"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="
        rounded-xl
        border
        border-red-500/20
        bg-red-500/10
        p-2
        text-red-400
        transition
        hover:bg-red-500/20
      "
    >
      <Trash2 size={16} />
    </button>
  );
}