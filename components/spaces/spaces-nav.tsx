"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
FolderOpen,
ChevronDown,
ChevronRight,
Building2,
} from "lucide-react";

type Project = {
id: string;
name: string;
};

type Space = {
id: string;
name: string;
workspaceId: string;
projects: Project[];
};

export function SpacesNav() {
const pathname =
usePathname();

const [spaces, setSpaces] =
useState<Space[]>([]);

const [loading, setLoading] =
useState(true);

const [openSpaces, setOpenSpaces] =
useState<
Record<string, boolean>
>({});

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

    const expanded:
      Record<
        string,
        boolean
      > = {};

    filtered.forEach(
      (
        space: Space
      ) => {
        expanded[
          space.id
        ] = true;
      }
    );

    setOpenSpaces(
      expanded
    );
  } catch (error) {
    console.error(
      error
    );
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

return ( <div className="space-y-3">
{spaces.map(
(space) => {
const activeSpace =
pathname.startsWith(
`/dashboard/spaces/${space.id}`
);


      return (
        <div
          key={
            space.id
          }
        >
          <button
            onClick={async () => {
              await syncWorkspace(
                space.workspaceId
              );

              setOpenSpaces(
                (
                  prev
                ) => ({
                  ...prev,
                  [space.id]:
                    !prev[
                      space.id
                    ],
                })
              );
            }}
            className={`
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              px-3
              py-3
              transition-all

              ${
                activeSpace
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <Building2
                size={
                  16
                }
              />

              <span className="truncate font-medium">
                {
                  space.name
                }
              </span>
            </div>

            {openSpaces[
              space.id
            ] ? (
              <ChevronDown
                size={
                  14
                }
              />
            ) : (
              <ChevronRight
                size={
                  14
                }
              />
            )}
          </button>

          {openSpaces[
            space.id
          ] &&
            space.projects
              ?.length >
              0 && (
              <div
                className="
                  ml-7
                  mt-2
                  space-y-1
                "
              >
                {space.projects.map(
                  (
                    project
                  ) => {
                    const active =
                      pathname.includes(
                        project.id
                      );

                    return (
                      <Link
                        key={
                          project.id
                        }
                        href={`/dashboard/spaces/${space.id}/lists/${project.id}`}
                        className={`
                          flex
                          items-center
                          gap-2
                          rounded-lg
                          px-3
                          py-2
                          text-sm
                          transition-all

                          ${
                            active
                              ? "bg-slate-800 text-white"
                              : "text-slate-400 hover:bg-slate-900 hover:text-white"
                          }
                        `}
                      >
                        <FolderOpen
                          size={
                            14
                          }
                        />

                        <span className="truncate">
                          {
                            project.name
                          }
                        </span>
                      </Link>
                    );
                  }
                )}
              </div>
            )}
        </div>
      );
    }
  )}
</div>


);
}
