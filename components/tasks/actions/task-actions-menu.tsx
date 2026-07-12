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

  const router =
    useRouter();

  const [
    pending,
    startTransition,
  ] = useTransition();
    function onDelete() {

    if (
      !confirm(
        "Delete this task?"
      )
    ) {
      return;
    }

    startTransition(
      async () => {

        await deleteTask(
          taskId
        );

        router.refresh();

      }
    );

  }

  function onArchive() {

    startTransition(
      async () => {

        if (archived) {

          await restoreTask(
            taskId
          );

        } else {

          await archiveTask(
            taskId
          );

        }

        router.refresh();

      }
    );

  }
  function onDuplicate() {

  startTransition(
    async () => {

      await duplicateTask(
        taskId
      );

      router.refresh();

    }
  );

}
    return (

    <DropdownMenu.Root>

      <DropdownMenu.Trigger asChild>

        <button

          type="button"

          disabled={pending}

          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-slate-900
            text-slate-400
            transition-all
            hover:bg-slate-800
            hover:text-white
            disabled:opacity-50
          "

        >

          <MoreHorizontal size={16} />

        </button>

      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>

        <DropdownMenu.Content

          sideOffset={8}

          align="end"

          className="
            z-50
            w-60
            rounded-2xl
            border
            border-white/10
            bg-[#111827]
            p-2
            shadow-2xl
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
                text-slate-200
                outline-none
                transition
                hover:bg-slate-800
              "

            >

              <Eye size={16} />

              Open Task

            </Link>

          </DropdownMenu.Item>

          <DropdownMenu.Item

            className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-xl
              px-3
              py-2.5
              text-sm
              text-slate-200
              outline-none
              transition
              hover:bg-slate-800
            "
onClick={onDuplicate}

          >

            <Copy size={16} />

            Duplicate

          </DropdownMenu.Item>
                    <DropdownMenu.Separator
            className="
              my-2
              h-px
              bg-white/10
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
              text-slate-200
              outline-none
              transition
              hover:bg-slate-800
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
              text-red-400
              outline-none
              transition
              hover:bg-red-500/10
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