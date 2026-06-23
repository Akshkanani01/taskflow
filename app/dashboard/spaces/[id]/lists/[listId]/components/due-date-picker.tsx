"use client";

import { useState } from "react";

export default function DueDatePicker({
  taskId,
  dueDate,
}: {
  taskId: string;
  dueDate: Date | null;
}) {
  const [value, setValue] =
    useState(
      dueDate
        ? new Date(dueDate)
            .toISOString()
            .split("T")[0]
        : ""
    );

  async function updateDate(
    date: string
  ) {
    setValue(date);

    await fetch(
      `/api/tasks/${taskId}/due-date`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          dueDate:
            date || null,
        }),
      }
    );
  }

  return (
    <input
      type="date"
      value={value}
      onChange={(e) =>
        updateDate(
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
    />
  );
}