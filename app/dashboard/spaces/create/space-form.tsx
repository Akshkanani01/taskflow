"use client";

import {
useState,
} from "react";
import {
useRouter,
} from "next/navigation";

type Workspace = {
id: string;
name: string;
};

export default function SpaceForm({
workspaces,
}: {
workspaces: Workspace[];
}) {
const router =
useRouter();

const [name, setName] =
useState("");

const [
workspaceId,
setWorkspaceId,
] = useState(
workspaces[0]?.id || ""
);

const [color, setColor] =
useState("blue");

const [loading,
setLoading] =
useState(false);

async function handleSubmit(
e: React.FormEvent
) {
e.preventDefault();

try {
  setLoading(true);

  const res =
    await fetch(
      "/api/spaces/create",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          color,
          workspaceId,
        }),
      }
    );

  if (!res.ok) {
    alert(
      "Failed to create space"
    );
    return;
  }

  router.push(
    "/dashboard/spaces"
  );

  router.refresh();
} catch (error) {
  console.error(error);
} finally {
  setLoading(false);
}


}

return (
<form
onSubmit={
handleSubmit
}
className="space-y-5"
> <div> <label className="mb-2 block text-sm text-slate-400">
Workspace </label>

    <select
      value={
        workspaceId
      }
      onChange={(e) =>
        setWorkspaceId(
          e.target.value
        )
      }
      className="
        w-full rounded-xl
        border border-white/10
        bg-slate-950
        px-4 py-3
        text-white
      "
    >
      {workspaces.map(
        (
          workspace
        ) => (
          <option
            key={
              workspace.id
            }
            value={
              workspace.id
            }
          >
            {
              workspace.name
            }
          </option>
        )
      )}
    </select>
  </div>

  <div>
    <label className="mb-2 block text-sm text-slate-400">
      Space Name
    </label>

    <input
      value={name}
      onChange={(e) =>
        setName(
          e.target.value
        )
      }
      placeholder="Development"
      className="
        w-full rounded-xl
        border border-white/10
        bg-slate-950
        px-4 py-3
        text-white
      "
    />
  </div>

  <div>
    <label className="mb-2 block text-sm text-slate-400">
      Color
    </label>

    <select
      value={color}
      onChange={(e) =>
        setColor(
          e.target.value
        )
      }
      className="
        w-full rounded-xl
        border border-white/10
        bg-slate-950
        px-4 py-3
        text-white
      "
    >
      <option value="blue">
        Blue
      </option>

      <option value="green">
        Green
      </option>

      <option value="purple">
        Purple
      </option>

      <option value="orange">
        Orange
      </option>
    </select>
  </div>

  <button
    disabled={
      loading
    }
    className="
      rounded-xl
      bg-indigo-600
      px-5 py-3
      text-white
    "
  >
    {loading
      ? "Creating..."
      : "Create Space"}
  </button>
</form>


);
}
