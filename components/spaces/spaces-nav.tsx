"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Building2 } from "lucide-react";

type Space = {
id: string;
name: string;
workspaceId: string;
};

export function SpacesNav() {
const pathname = usePathname();

const [spaces, setSpaces] =
useState<Space[]>([]);

const [loading, setLoading] =
useState(true);

async function syncWorkspace(
workspaceId: string
) {
localStorage.setItem(
"workspaceId",
workspaceId
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
      workspaceId,
    }),
  }
);


}

useEffect(() => {
async function loadSpaces() {
try {
const res =
await fetch(
"/api/spaces"
);


    if (!res.ok) return;

    const data =
      await res.json();

    const workspaceId =
      localStorage.getItem(
        "workspaceId"
      );

    const filtered =
      workspaceId
        ? data.filter(
            (
              space: Space
            ) =>
              space.workspaceId ===
              workspaceId
          )
        : data;

    setSpaces(filtered);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

loadSpaces();


}, []);

if (loading) {
return ( <div
     className="
       px-3
       py-2
       text-xs
       text-slate-500
     "
   >
Loading spaces... </div>
);
}

if (!spaces.length) {
return ( <div
     className="
       px-3
       py-2
       text-xs
       text-slate-500
     "
   >
No spaces found </div>
);
}

return ( <div className="space-y-2">
{spaces.map(
(space) => {
const active =
pathname.startsWith(
`/dashboard/spaces/${space.id}`
);


      return (
        <Link
          key={space.id}
          href={`/dashboard/spaces/${space.id}`}
          onClick={() =>
            syncWorkspace(
              space.workspaceId
            )
          }
          className={`
            group
            flex
            items-center
            gap-3
            rounded-2xl
            px-4
            py-3
            transition-all
            duration-200

            ${
              active
                ? `
                  bg-gradient-to-r
                  from-indigo-600
                  to-violet-600
                  text-white
                  shadow-lg
                  shadow-indigo-500/20
                `
                : `
                  text-slate-400
                  hover:bg-slate-900
                  hover:text-white
                `
            }
          `}
        >
          <Building2 size={18} />

          <span className="truncate font-medium">
            {space.name}
          </span>
        </Link>
      );
    }
  )}
</div>


);
}
