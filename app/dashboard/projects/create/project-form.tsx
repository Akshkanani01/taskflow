"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Space = {
id: string;
name: string;
};

export default function ProjectForm() {
const router = useRouter();

const [spaces, setSpaces] = useState<Space[]>([]);
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [spaceId, setSpaceId] = useState("");
const [loading, setLoading] = useState(false);

useEffect(() => {
async function loadSpaces() {
const res = await fetch("/api/spaces");

  if (!res.ok) return;

  const data = await res.json();

  setSpaces(data);

  if (data.length > 0) {
    setSpaceId(data[0].id);
  }
}

loadSpaces();


}, []);

async function createProject() {
try {
setLoading(true);

  const response = await fetch(
    "/api/projects",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        spaceId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error();
  }

  const project =
  await response.json();

router.replace(
  `/dashboard/spaces/${project.spaceId}/lists/${project.id}`
);

router.refresh();
} catch {
  alert("Failed to create project");
} finally {
  setLoading(false);
}


}

return ( <div
   className="
     mx-auto
     max-w-2xl
     rounded-3xl
     border border-white/10
     bg-slate-900
     p-8
   "
 > <h1
     className="
       mb-6
       text-3xl
       font-bold
       text-white
     "
   >
Create List </h1>
  <div className="space-y-5">
    <div>
      <label
        className="
          mb-2 block
          text-sm
          text-slate-300
        "
      >
        Project Name
      </label>

      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="
          w-full
          rounded-xl
          border border-white/10
          bg-slate-950
          px-4 py-3
          text-white
        "
        placeholder="Website Redesign"
      />
    </div>

    <div>
      <label
        className="
          mb-2 block
          text-sm
          text-slate-300
        "
      >
        Description
      </label>

      <textarea
        rows={4}
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        className="
          w-full
          rounded-xl
          border border-white/10
          bg-slate-950
          px-4 py-3
          text-white
        "
      />
    </div>

    <div>
      <label
        className="
          mb-2 block
          text-sm
          text-slate-300
        "
      >
        Space
      </label>

      <select
        value={spaceId}
        onChange={(e) =>
          setSpaceId(
            e.target.value
          )
        }
        className="
          w-full
          rounded-xl
          border border-white/10
          bg-slate-950
          px-4 py-3
          text-white
        "
      >
        {spaces.map((space) => (
          <option
            key={space.id}
            value={space.id}
          >
            {space.name}
          </option>
        ))}
      </select>
    </div>

    <button
      onClick={createProject}
      disabled={loading}
      className="
        w-full
        rounded-xl
        bg-indigo-600
        py-3
        font-medium
        text-white
      "
    >
      {loading
        ? "Creating..."
        : "Create Project"}
    </button>
  </div>
</div>
);
}
