"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  MoreHorizontal,
  Eye,
  Copy,
  Archive,
  RotateCcw,
  Trash2,
} from "lucide-react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
  archiveTask,
  deleteTask,
  restoreTask,
  duplicateTask,
} from "@/app/dashboard/spaces/[id]/lists/[listId]/actions";

type Props = {
  taskId: string;
  spaceId: string;
  listId: string;
  archived?: boolean;
};

export default function TaskActionsMenu({
  taskId,
  spaceId,
  listId,
  archived = false,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  function onDelete() {
    if (!confirm("Delete this task?")) {
      return;
    }

    startTransition(async () => {
      await deleteTask(taskId);

      router.refresh();
    });
  }

  function onArchive() {
    startTransition(async () => {
      if (archived) {
        await restoreTask(taskId);
      } else {
        await archiveTask(taskId);
      }

      router.refresh();
    });
  }

  function onDuplicate() {
    startTransition(async () => {
      await duplicateTask(taskId);

      router.refresh();
    });
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          disabled={pending}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            border
            border-border
            bg-card/80
            text-muted-foreground
            transition
            hover:border-border
            hover:bg-background
            hover:text-foreground
            disabled:pointer-events-none
            disabled:opacity-50
          "
        >
          <MoreHorizontal size={15} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={10}
          align="end"
          className="
            z-50
            w-60
            rounded-2xl
            border
            border-border
            bg-card
            p-2
            shadow-2xl
            backdrop-blur-xl
          "
        >
          <DropdownMenu.Item asChild>
            <Link
              href={`/dashboard/spaces/${spaceId}/lists/${listId}/tasks/${taskId}`}
              className="
                flex
                cursor-pointer
                items-center
                gap-3
                rounded-xl
                px-3
                py-2.5
                text-sm
                text-foreground
                outline-none
                transition-colors
                duration-150
                hover:bg-background
                data-[highlighted]:bg-background
              "
            >
              <Eye size={16} />
              Open Task
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={onDuplicate}
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-xl
              px-3
              py-2.5
              text-sm
              text-foreground
              outline-none
              transition-colors
              duration-150
              hover:bg-background
              data-[highlighted]:bg-background
            "
          >
            <Copy size={16} />
            Duplicate
          </DropdownMenu.Item>

          <DropdownMenu.Separator
            className="
              my-2
              h-px
              bg-background/10
            "
          />

          <DropdownMenu.Item
            onClick={onArchive}
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-xl
              px-3
              py-2.5
              text-sm
              text-foreground
              outline-none
              transition-colors
              duration-150
              hover:bg-background
              data-[highlighted]:bg-background
            "
          >
            {archived ? (
              <>
                <RotateCcw size={16} />
                Restore Task
              </>
            ) : (
              <>
                <Archive size={16} />
                Archive Task
              </>
            )}
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={onDelete}
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-xl
              px-3
              py-2.5
              text-sm
              text-destructive
              outline-none
              transition-colors
              duration-150
              hover:bg-destructive/10
              data-[highlighted]:bg-destructive/10
            "
          >
            <Trash2 size={16} />
            Delete Task
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}