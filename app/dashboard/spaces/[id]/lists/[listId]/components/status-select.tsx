"use client";

import { useState } from "react";

export default function StatusSelect({
  taskId,
  value,
}: {
  taskId: string;
  value: string;
}) {
  const [status, setStatus] =
    useState(value);

  async function updateStatus(
    newStatus: string
  ) {
    setStatus(newStatus);

    await fetch(
      `/api/tasks/${taskId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );
  }

  return (
    <select
      value={status}
      onChange={(e) =>
        updateStatus(
          e.target.value
        )
      }
      className="
        rounded-lg
        border border-white/10
        bg-slate-800
        px-2 py-1
        text-xs
        text-white
      "
    >
      <option value="todo">
        Todo
      </option>

      <option value="in_progress">
        In Progress
      </option>

      <option value="done">
        Done
      </option>
    </select>
  );
}