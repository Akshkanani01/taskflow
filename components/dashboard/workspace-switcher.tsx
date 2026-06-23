"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Plus, Check } from "lucide-react";

type Workspace = {
id: string;
name: string;
};

export function WorkspaceSwitcher() {
const [open, setOpen] = useState(false);
const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
const [selected, setSelected] = useState<Workspace | null>(null);

useEffect(() => {
async function loadWorkspaces() {
const res = await fetch("/api/workspaces/list");


  if (!res.ok) return;

  const data = await res.json();

  setWorkspaces(data);

const savedWorkspaceId =
  localStorage.getItem("workspaceId");

if (savedWorkspaceId) {
  const workspace = data.find(
    (w: Workspace) =>
      w.id === savedWorkspaceId
  );

  if (workspace) {
    setSelected(workspace);
    return;
  }
}

if (data.length) {
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
}

loadWorkspaces();

}, []);

return ( <div className="relative">

  <button
    onClick={() => setOpen(!open)}
    className="
      flex items-center gap-3
      rounded-xl
      border border-white/10
      bg-slate-900
      px-4 py-3
      text-white
    "
  >
    

    <span className="font-medium">
      {selected?.name ?? "Workspace"}
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
        border border-white/10
        bg-slate-900
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
          text-slate-500
        "
      >
        Workspaces
      </p>

      <div className="space-y-1">

        {workspaces.map((workspace) => (
          <button
            key={workspace.id}
  onClick={async () => {
  setSelected(workspace);

  localStorage.setItem(
    "workspaceId",
    workspace.id
  );

  localStorage.setItem(
    "workspaceName",
    workspace.name
  );

  await fetch(
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

  setOpen(false);

  window.location.reload();
}}
            className="
              flex w-full items-center
              justify-between
              rounded-xl
              px-3 py-3
              text-left
              text-white
              hover:bg-slate-800
            "
          >
            <div className="flex items-center gap-3">

              <div
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg
                  bg-indigo-600
                  text-xs font-semibold
                "
              >
                {workspace.name.charAt(0)}
              </div>

              <span>
                {workspace.name}
              </span>

            </div>

            {selected?.id === workspace.id && (
              <Check
                size={18}
                className="text-indigo-400"
              />
            )}
          </button>
        ))}

      </div>

      <div className="my-3 border-t border-white/10" />

      <Link
        href="/dashboard/workspaces/create"
        className="
          flex items-center gap-3
          rounded-xl
          px-3 py-3
          text-white
          hover:bg-slate-800
        "
      >
        <Plus size={18} />
        Create Workspace
      </Link>

    </div>
  )}

</div>


);
}
