"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectName: string;
};

export default function DeleteProjectDialog({
  open,
  onOpenChange,
  projectId,
  projectName,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function deleteProject() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/projects/${projectId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      onOpenChange(false);

      router.refresh();
    } catch {
      alert("Failed to delete list.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="
          max-w-md
          border
          border-white/10
          bg-slate-900
          text-white
        "
      >
        <DialogHeader>
          <DialogTitle className="text-xl">
            Delete List
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <p className="text-slate-300">
            Are you sure you want to delete
          </p>

          <p className="font-semibold text-white">
  &quot;{projectName}&quot;
</p>

          <p className="text-sm text-red-400">
            This action cannot be undone.
          </p>
        </div>

        <DialogFooter className="gap-3 sm:justify-end">
          <button
            type="button"
            disabled={loading}
            onClick={() =>
              onOpenChange(false)
            }
            className="
              rounded-xl
              border
              border-white/10
              px-4
              py-2
              text-white
              hover:bg-slate-800
            "
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={deleteProject}
            className="
              rounded-xl
              bg-red-600
              px-4
              py-2
              font-medium
              text-white
              hover:bg-red-500
              disabled:opacity-50
            "
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}