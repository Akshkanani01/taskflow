"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateSpaceForm() {
const router = useRouter();

const [name, setName] = useState("");
const [color, setColor] = useState("blue");
const [loading, setLoading] = useState(false);

async function createSpace() {
try {
setLoading(true);


  const response = await fetch("/api/spaces", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      color,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed");
  }

  router.push("/dashboard/spaces");
  router.refresh();
} finally {
  setLoading(false);
}


}

return ( <div className="space-y-6">


  <input
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Space Name"
    className="
      w-full rounded-xl
      border border-white/10
      bg-slate-900
      px-4 py-3
      text-white
    "
  />

  <select
    value={color}
    onChange={(e) => setColor(e.target.value)}
    className="
      w-full rounded-xl
      border border-white/10
      bg-slate-900
      px-4 py-3
      text-white
    "
  >
    <option value="blue">Blue</option>
    <option value="green">Green</option>
    <option value="red">Red</option>
    <option value="purple">Purple</option>
  </select>

  <button
    onClick={createSpace}
    disabled={loading}
    className="
      rounded-xl
      bg-indigo-600
      px-6 py-3
      text-white
    "
  >
    {loading ? "Creating..." : "Create Space"}
  </button>

</div>

);
}
