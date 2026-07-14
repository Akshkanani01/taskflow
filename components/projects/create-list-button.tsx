"use client";

import { useState } from "react";
import CreateProjectDialog from "./create-project-dialog";

type Props = {
  spaceId: string;
};

export default function CreateListButton({
  spaceId,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          rounded-xl
          bg-indigo-600
          px-5
          py-3
          font-medium
          text-white
          transition-all
          hover:bg-indigo-500
        "
      >
        + Create List
      </button>

      <CreateProjectDialog
        open={open}
        onOpenChange={setOpen}
        spaceId={spaceId}
      />
    </>
  );
}