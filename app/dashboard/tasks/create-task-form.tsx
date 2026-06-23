"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Paperclip,
  Users,
  Calendar,
  Flag,
} from "lucide-react";

import { createTask } from "@/app/dashboard/tasks/actions";

type UserOption = {
  id: string;
  name: string;
};

export default function CreateTaskForm({
  listId,
  members,
}: {
  listId: string;
  members: UserOption[];
}) {
  const router = useRouter();

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("NORMAL");

  const [dueDate, setDueDate] =
    useState("");

  const [assignees, setAssignees] =
    useState<string[]>([]);

  const [files, setFiles] =
    useState<FileList | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "description",
        description
      );

      formData.append(
        "priority",
        priority
      );

      formData.append(
        "dueDate",
        dueDate
      );

      formData.append(
        "listId",
        listId
      );

      assignees.forEach((id) => {
        formData.append(
          "assignees",
          id
        );
      });

      if (files) {
        Array.from(files).forEach(
          (file) => {
            formData.append(
              "files",
              file
            );
          }
        );
      }

      await createTask(formData);

      router.refresh();

      setTitle("");
      setDescription("");
      setDueDate("");
      setAssignees([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-5
        rounded-3xl
        border
        border-white/10
        bg-slate-900
        p-6
      "
    >
      <div>
        <h2
          className="
            text-xl
            font-bold
            text-white
          "
        >
          Create Task
        </h2>

        <p
          className="
            text-sm
            text-slate-400
          "
        >
          Create and assign work
          instantly.
        </p>
      </div>

      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Task title"
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-slate-950
          p-3
          text-white
        "
      />

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        rows={4}
        placeholder="Description..."
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-slate-950
          p-3
          text-white
        "
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            className="
              mb-2 block
              text-sm text-slate-400
            "
          >
            <Flag
              size={14}
              className="inline mr-2"
            />
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-slate-950
              p-3
              text-white
            "
          >
            <option>
              LOW
            </option>

            <option>
              NORMAL
            </option>

            <option>
              HIGH
            </option>

            <option>
              URGENT
            </option>
          </select>
        </div>

        <div>
          <label
            className="
              mb-2 block
              text-sm text-slate-400
            "
          >
            <Calendar
              size={14}
              className="inline mr-2"
            />
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-slate-950
              p-3
              text-white
            "
          />
        </div>
      </div>

      <div>
        <label
          className="
            mb-2 block
            text-sm text-slate-400
          "
        >
          <Users
            size={14}
            className="inline mr-2"
          />
          Assignees
        </label>

        <select
          multiple
          value={assignees}
          onChange={(e) =>
            setAssignees(
              Array.from(
                e.target.selectedOptions
              ).map(
                (option) =>
                  option.value
              )
            )
          }
          className="
            min-h-[140px]
            w-full
            rounded-2xl
            border
            border-white/10
            bg-slate-950
            p-3
            text-white
          "
        >
          {members.map(
            (member) => (
              <option
                key={member.id}
                value={member.id}
              >
                {member.name}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label
          className="
            mb-2 block
            text-sm text-slate-400
          "
        >
          <Paperclip
            size={14}
            className="inline mr-2"
          />
          Attachments
        </label>

        <input
          type="file"
          multiple
          onChange={(e) =>
            setFiles(
              e.target.files
            )
          }
          className="
            block
            w-full
            rounded-2xl
            border
            border-dashed
            border-white/10
            bg-slate-950
            p-4
            text-slate-300
          "
        />
      </div>

      <button
        disabled={loading}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-indigo-600
          py-3
          font-medium
          text-white
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