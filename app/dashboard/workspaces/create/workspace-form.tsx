"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkspaceForm() {
const router = useRouter();

const [name, setName] = useState("");
const [loading, setLoading] = useState(false);

async function createWorkspace() {
try {
setLoading(true);

  const response = await fetch("/api/workspaces", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create workspace");
  }

  router.push("/dashboard/workspaces");
  router.refresh();
} catch (error) {
  console.error(error);
  alert("Failed to create workspace");
} finally {
  setLoading(false);
}


}

return ( <div
   className="
     rounded-3xl
     border border-white/10
     bg-slate-900
     p-8
   "
 > <div className="space-y-5">
<input
type="text"
value={name}
onChange={(e) => setName(e.target.value)}
placeholder="Workspace Name"
className="
w-full
rounded-xl
border border-white/10
bg-slate-950
px-4 py-3
text-white
"
/>

    <button
      type="button"
      onClick={createWorkspace}
      disabled={loading}
      className="
        rounded-xl
        bg-indigo-600
        px-5 py-3
        text-white
      "
    >
      {loading ? "Creating..." : "Create Workspace"}
    </button>
  </div>
</div>


);
}
