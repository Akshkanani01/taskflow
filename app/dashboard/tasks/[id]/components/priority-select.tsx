"use client";

import { useState } from "react";

export default function PrioritySelect({
  taskId,
  value,
}: {
  taskId: string;
  value: string;
}) {
  const [priority, setPriority] =
    useState(value);

  async function updatePriority(
    newPriority: string
  ) {
    setPriority(newPriority);

    await fetch(
      `/api/tasks/${taskId}/priority`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          priority: newPriority,
        }),
      }
    );
  }

  return (
    <select
      value={priority}
      onChange={(e) =>
        updatePriority(
          e.target.value
        )
      }
      className={`
        rounded-lg
        border border-white/10
        px-2 py-1
        text-xs
        ${
          priority === "urgent"
            ? "bg-red-500/20 text-red-300"
            : priority === "high"
            ? "bg-orange-500/20 text-orange-300"
            : priority === "medium"
            ? "bg-yellow-500/20 text-yellow-300"
            : "bg-green-500/20 text-green-300"
        }
      `}
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
      <option value="urgent">Urgent</option>
    </select>
  );
}