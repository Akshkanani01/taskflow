"use client";

import { useState } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";

import DeleteProjectDialog from "./delete-project-dialog";

type Props = {
  projectId: string;
  projectName: string;
};

export default function ProjectActions({
  projectId,
  projectName,
}: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            setOpenMenu((v) => !v);
          }}
          className="
            rounded-lg
            p-2
            text-slate-400
            transition
            hover:bg-slate-800
            hover:text-white
          "
        >
          <MoreHorizontal size={18} />
        </button>

        {openMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpenMenu(false)}
            />

            <div
              className="
                absolute
                right-0
                top-12
                z-50
                w-44
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-slate-900
                shadow-2xl
              "
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setOpenMenu(false);
                  setOpenDelete(true);
                }}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  text-red-400
                  transition
                  hover:bg-slate-800
                "
              >
                <Trash2 size={16} />

                Delete List
              </button>
            </div>
          </>
        )}
      </div>

      <DeleteProjectDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        projectId={projectId}
        projectName={projectName}
      />
    </>
  );
}