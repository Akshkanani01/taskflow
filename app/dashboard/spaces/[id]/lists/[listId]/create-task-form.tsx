"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Calendar,
  Flag,
  Plus,
  Users,
} from "lucide-react";

import CreateTaskContent from "@/components/tasks/create/create-task-content";

import { createTask } from "./actions";

type UserOption = {
  id: string;
  name: string;
};

type Props = {
  listId: string;
  spaceId: string;
  createdById: string;
  members: UserOption[];
  onSuccess?: () => void;
};

export default function CreateTaskForm({
  listId,
  spaceId,
  createdById,
  members,
  onSuccess,
}: Props) {
  const router = useRouter();

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [priority, setPriority] =
    useState("MEDIUM");

  const [dueDate, setDueDate] =
    useState("");

  const [
    estimatedHours,
    setEstimatedHours,
  ] = useState("");

  const [assignees, setAssignees] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  )
  
  {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);

      await createTask({
        title: title.trim(),

        description:
          description.trim(),

        projectId: listId,

        spaceId,

        createdById,

        status: "TODO",

        priority: priority as any,

        dueDate: dueDate
          ? new Date(dueDate)
          : undefined,

        estimatedHours:
          estimatedHours
            ? Number(
                estimatedHours
              )
            : undefined,

        assignees,
      });

      setTitle("");

      setDescription("");

      setPriority("MEDIUM");

      setDueDate("");

      setEstimatedHours("");

      setAssignees([]);

      onSuccess?.();

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create task."
      );
    } finally {
      setLoading(false);
    }
  }
    return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold text-white">
          Create Task
        </h2>

        <p className="mt-2 text-slate-400">
          Create and assign work for your team.
        </p>
      </div>

      {/* Content */}

      <CreateTaskContent
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
      />

      {/* TODO: Next parts will add Priority, Due Date,
          Estimate, Assignees and Uploads */}

      <button
        type="submit"
        disabled={loading}
        className="
          flex
          h-12
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-indigo-600
          font-semibold
          text-white
          transition
          hover:bg-indigo-500
          disabled:opacity-50
        "
      >
        <Plus size={18} />

        {loading
          ? "Creating..."
          : "Create Task"}
      </button>
    </form>
  );
}