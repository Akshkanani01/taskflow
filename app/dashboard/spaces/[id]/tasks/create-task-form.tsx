"use client";

import { useState } from "react";

export default function CreateTaskForm({
listId,
}: {
listId: string;
}) {
const [title, setTitle] = useState("");

async function submitTask() {
if (!title) return;

await fetch("/api/tasks", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title,
    listId,
  }),
});

location.reload();


}

return ( <div className="flex gap-3">

  <input
    value={title}
    onChange={(e) =>
      setTitle(e.target.value)
    }
    placeholder="Task title"
    className="
      flex-1 rounded-xl
      border border-white/10
      bg-slate-900
      px-4 py-3
      text-white
    "
  />

  <button
    onClick={submitTask}
    className="
      rounded-xl
      bg-indigo-600
      px-5 py-3
      text-white
    "
  >
    Add Task
  </button>

</div>

);
}
