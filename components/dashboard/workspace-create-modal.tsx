"use client";

import WorkspaceForm from "@/app/dashboard/workspaces/create/workspace-form";

type WorkspaceCreateModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function WorkspaceCreateModal({
  open,
  onClose,
  onSuccess,
}: WorkspaceCreateModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0
        z-[100]
        flex items-center justify-center
        bg-black/50
        backdrop-blur-sm
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-xl
          rounded-3xl
          border border-border
          bg-card
          shadow-2xl
        "
      >
        <div
          className="
            flex items-center justify-between
            border-b border-border
            px-6 py-5
          "
        >
          <div>
            <h2 className="text-xl font-semibold">
              Create Workspace
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Create a new workspace for your team.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              px-3 py-2
              text-muted-foreground
              transition
              hover:bg-background
              hover:text-foreground
            "
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <WorkspaceForm
            onSuccess={() => {
              onSuccess();
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}