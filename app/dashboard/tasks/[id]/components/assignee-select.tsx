"use client";

import { useState } from "react";

export default function AssigneeSelect({
  taskId,
  assigneeId,
}: {
  taskId: string;
  assigneeId: string | null;
}) {
  const [value, setValue] =
    useState(
      assigneeId || ""
    );

  async function updateUser(
    userId: string
  ) {
    setValue(userId);

    await fetch(
      `/api/tasks/${taskId}/assignee`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          assigneeId:
            userId || null,
        }),
      }
    );
  }

  return (
    <select
      value={value}
      onChange={(e) =>
        updateUser(
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
      <option value="">
        Unassigned
      </option>

      <option value="user1">
        Aksh
      </option>

      <option value="user2">
        Developer
      </option>

      <option value="user3">
        Designer
      </option>
    </select>
  );
}