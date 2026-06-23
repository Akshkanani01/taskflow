"use client";

import { useState } from "react";

export default function TaskTitle({
  taskId,
  value,
}: {
  taskId: string;
  value: string;
}) {
  const [title, setTitle] =
    useState(value);

  async function save() {
    await fetch(
      `/api/tasks/${taskId}/title`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      }
    );
  }

  return (
    <input
      value={title}
      onChange={(e) =>
        setTitle(
          e.target.value
        )
      }
      onBlur={save}
      className="
        w-full
        bg-transparent
        text-white
        outline-none
      "
    />
  );
}