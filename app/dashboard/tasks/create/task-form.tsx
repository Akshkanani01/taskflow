"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  name: string;
};

export default function TaskForm({
  projects,
}: {
  projects: Project[];
}) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] =
    useState("todo");

  const [priority, setPriority] =
    useState("medium");

  const [dueDate, setDueDate] =
    useState("");

  const [projectId, setProjectId] =
    useState(
      projects[0]?.id || ""
    );

  const [loading, setLoading] =
    useState(false);

async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();

  const payload = {
    title,
    description,
    status,
    priority,
    dueDate,
    projectId,
  };

  console.log(
    "PAYLOAD =>",
    payload
  );

  try {
    setLoading(true);

    const res = await fetch(
      "/api/tasks/create",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          payload
        ),
      }
    );

    const data =
      await res.json();

    console.log(
      "RESPONSE =>",
      data
    );

    if (!res.ok) {
      alert(
        JSON.stringify(data)
      );
      return;
    }

    router.push(
      "/dashboard/tasks"
    );

    router.refresh();

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <select
        value={projectId}
        onChange={(e) =>
          setProjectId(
            e.target.value
          )
        }
        className="
          w-full rounded-xl
          border border-white/10
          bg-slate-950
          px-4 py-3
          text-white
        "
      >
        {projects.map(
          (project) => (
            <option
              key={project.id}
              value={project.id}
            >
              {project.name}
            </option>
          )
        )}
      </select>

      <input
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
        placeholder="Task Title"
        className="
          w-full rounded-xl
          border border-white/10
          bg-slate-950
          px-4 py-3
          text-white
        "
      />

      <textarea
        rows={4}
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        placeholder="Description..."
        className="
          w-full rounded-xl
          border border-white/10
          bg-slate-950
          px-4 py-3
          text-white
        "
      />

      <button
        disabled={loading}
        className="
          rounded-xl
          bg-indigo-600
          px-5 py-3
          text-white
        "
      >
        {loading
          ? "Creating..."
          : "Create Task"}
      </button>
    </form>
  );
}