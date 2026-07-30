"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Check, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { WorkspaceCreateModal } from "@/components/dashboard/workspace-create-modal";

type Workspace = {
  id: string;
  name: string;
};

export function WorkspaceSwitcher() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [createModalOpen, setCreateModalOpen] =
    useState(false);

  const [workspaces, setWorkspaces] = useState<
    Workspace[]
  >([]);

  const [selected, setSelected] =
    useState<Workspace | null>(null);

  useEffect(() => {
    async function loadWorkspaces() {
      try {
        const res = await fetch(
          "/api/workspaces/list"
        );

        if (!res.ok) {
          return;
        }

        const data: Workspace[] =
          await res.json();

        setWorkspaces(data);

        const savedWorkspaceId =
          localStorage.getItem(
            "workspaceId"
          );

        if (savedWorkspaceId) {
          const workspace = data.find(
            (w) =>
              w.id === savedWorkspaceId
          );

          if (workspace) {
            setSelected(workspace);
            return;
          }
        }

        if (data.length > 0) {
          setSelected(data[0]);

          localStorage.setItem(
            "workspaceId",
            data[0].id
          );

          localStorage.setItem(
            "workspaceName",
            data[0].name
          );
        }
      } catch (error) {
        console.error(error);
      }
    }

    void loadWorkspaces();
  }, []);

  async function handleWorkspaceSelect(
    workspace: Workspace
  ) {
    try {
      setSelected(workspace);

      localStorage.setItem(
        "workspaceId",
        workspace.id
      );

      localStorage.setItem(
        "workspaceName",
        workspace.name
      );

      const res = await fetch(
        "/api/workspace/select",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            workspaceId:
              workspace.id,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to switch workspace."
        );
      }

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshWorkspaces() {
    const res = await fetch(
      "/api/workspaces/list"
    );

    if (!res.ok) {
      return;
    }

    const data: Workspace[] =
      await res.json();

    setWorkspaces(data);

    if (data.length > 0) {
      const latest =
        data[data.length - 1];

      setSelected(latest);

      localStorage.setItem(
        "workspaceId",
        latest.id
      );

      localStorage.setItem(
        "workspaceName",
        latest.name
      );
    }

    router.refresh();
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="
            flex items-center gap-3
            rounded-xl
            border border-border
            bg-card
            px-4 py-3
            text-foreground
          "
        >
          <span className="font-medium">
            {selected?.name ??
              "Workspace"}
          </span>

          <ChevronDown size={16} />
        </button>
                {open && (
          <div
            className="
              absolute left-0 top-14
              z-50
              w-80
              rounded-2xl
              border border-border
              bg-card
              p-3
              shadow-2xl
            "
          >
            <p
              className="
                px-3 pb-3
                text-xs
                font-medium
                uppercase
                tracking-wider
                text-muted-foreground
              "
            >
              Workspaces
            </p>

            <div className="space-y-1">
              {workspaces.map(
                (workspace) => (
                  <button
                    key={workspace.id}
                    onClick={() =>
                      handleWorkspaceSelect(
                        workspace
                      )
                    }
                    className="
                      flex w-full
                      items-center
                      justify-between
                      rounded-xl
                      px-3 py-3
                      text-left
                      text-foreground
                      hover:bg-background
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex h-8 w-8
                          items-center
                          justify-center
                          rounded-lg
                          bg-primary
                          text-xs
                          font-semibold
                          text-primary-foreground
                        "
                      >
                        {workspace.name.charAt(
                          0
                        )}
                      </div>

                      <span>
                        {workspace.name}
                      </span>
                    </div>

                    {selected?.id ===
                      workspace.id && (
                      <Check
                        size={18}
                        className="text-primary"
                      />
                    )}
                  </button>
                )
              )}
            </div>

            <div className="my-3 border-t border-border" />

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setCreateModalOpen(true);
              }}
              className="
                flex w-full
                items-center gap-3
                rounded-xl
                px-3 py-3
                text-left
                text-foreground
                hover:bg-background
              "
            >
              <Plus size={18} />

              <span>
                New Workspace
              </span>
            </button>
          </div>
        )}
      </div>

      <WorkspaceCreateModal
        open={createModalOpen}
        onClose={() =>
          setCreateModalOpen(false)
        }
        onSuccess={() => {
          void refreshWorkspaces();
          setCreateModalOpen(false);
        }}
      />
    </>
  );
}