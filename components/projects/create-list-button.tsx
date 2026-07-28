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
          bg-primary
          px-5
          py-3
          font-medium
          text-primary-foreground
          transition
          hover:bg-primary/90
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