"use client";

import { useRouter } from "next/navigation";

import {
  MoreHorizontal,
  Pencil,
  Copy,
  Archive,
  Trash2,
  ExternalLink,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function TaskActions({
  taskId,
}: {
  taskId: string;
}) {
  const router = useRouter();

  async function deleteTask() {
    const confirmed = confirm(
      "Delete this task?"
    );

    if (!confirmed) return;

    try {
      await fetch(
        `/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
            rounded-lg
            p-2
            text-slate-400
            hover:bg-slate-800
            hover:text-white
          "
        >
          <MoreHorizontal size={16} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          w-52
          border-white/10
          bg-slate-900
          text-white
        "
      >
        <DropdownMenuItem
          onClick={() =>
            router.push(
              `/dashboard/tasks/${taskId}`
            )
          }
        >
          <ExternalLink
            size={14}
            className="mr-2"
          />
          Open Task
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Pencil
            size={14}
            className="mr-2"
          />
          Edit Task
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Copy
            size={14}
            className="mr-2"
          />
          Duplicate
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Archive
            size={14}
            className="mr-2"
          />
          Archive
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={deleteTask}
          className="
            text-red-400
            focus:text-red-400
          "
        >
          <Trash2
            size={14}
            className="mr-2"
          />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}