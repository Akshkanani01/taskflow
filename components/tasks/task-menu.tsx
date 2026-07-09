"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  MoreHorizontal,
  ExternalLink,
  Pencil,
  Copy,
  Archive,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import DeleteDialog from "@/components/tasks/common/delete-dialog";

import {
  duplicateTask,
  deleteTask,
} from "@/app/actions/task-row-actions";

type Props = {
  taskId: string;
  spaceId: string;
  listId: string;
};

export default function TaskMenu({
  taskId,
  spaceId,
  listId,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  const [openDelete, setOpenDelete] =
    useState(false);

  function openTask() {
    router.push(
      `/dashboard/spaces/${spaceId}/lists/${listId}/tasks/${taskId}`
    );
  }

  function handleDuplicate() {
    startTransition(async () => {
      await duplicateTask(taskId);
      router.refresh();
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteTask(taskId);

      setOpenDelete(false);

      router.refresh();
    });
  }

  return (
    <>
      <DropdownMenu>

        <DropdownMenuTrigger asChild>

          <button className="rounded-lg p-2 transition hover:bg-slate-800">

            <MoreHorizontal className="h-4 w-4 text-slate-400" />

          </button>

        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 border-white/10 bg-slate-900 text-white"
        >

          <DropdownMenuItem onClick={openTask}>

            <ExternalLink className="mr-2 h-4 w-4" />

            Open

          </DropdownMenuItem>

          <DropdownMenuItem onClick={openTask}>

            <Pencil className="mr-2 h-4 w-4" />

            Edit

          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={pending}
            onClick={handleDuplicate}
          >

            <Copy className="mr-2 h-4 w-4" />

            Duplicate

          </DropdownMenuItem>

          <DropdownMenuItem>

            <Archive className="mr-2 h-4 w-4" />

            Archive

          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() =>
              setOpenDelete(true)
            }
            className="text-red-400 focus:text-red-400"
          >

            <Trash2 className="mr-2 h-4 w-4" />

            Delete

          </DropdownMenuItem>

        </DropdownMenuContent>

      </DropdownMenu>

      <DeleteDialog
        open={openDelete}
        loading={pending}
        title="Delete Task"
        description="This action cannot be undone."
        onClose={() =>
          setOpenDelete(false)
        }
        onConfirm={handleDelete}
      />
    </>
  );
}