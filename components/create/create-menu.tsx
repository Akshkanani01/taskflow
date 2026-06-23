"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import {
Plus,
Building2,
FolderOpen,
FolderKanban,
CheckSquare,
UserPlus,
} from "lucide-react";

export function CreateMenu() {
const [open, setOpen] = useState(false);

const menuRef =
useRef<HTMLDivElement>(null);

useEffect(() => {
function handleClickOutside(
event: MouseEvent
) {
if (
menuRef.current &&
!menuRef.current.contains(
event.target as Node
)
) {
setOpen(false);
}
}

document.addEventListener(
  "mousedown",
  handleClickOutside
);

return () => {
  document.removeEventListener(
    "mousedown",
    handleClickOutside
  );
};


}, []);

return ( <div
   ref={menuRef}
   className="relative"
 >
<button
onClick={() =>
setOpen(!open)
}
className="
flex items-center gap-2
rounded-xl
bg-indigo-600
px-4 py-2.5
text-sm font-medium
text-white
"
> <Plus size={16} />
Create </button>

  {open && (
    <div
      className="
        absolute right-0 top-14
        z-50
        w-72
        rounded-2xl
        border border-white/10
        bg-slate-900
        p-2
        shadow-2xl
      "
    >
      <p
        className="
          px-3 py-2
          text-xs
          uppercase
          tracking-wider
          text-slate-500
        "
      >
        Create New
      </p>

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
        <Building2 size={18} />
        Workspace
      </Link>

      <Link
        href="/dashboard/spaces/create"
        className="
          flex items-center gap-3
          rounded-xl
          px-3 py-3
          text-white
          hover:bg-slate-800
        "
      >
        <FolderOpen size={18} />
        Space
      </Link>

      <Link
  href="/dashboard/projects/create"
  className="
    flex items-center gap-3
    rounded-xl
    px-3 py-3
    text-white
    hover:bg-slate-800
  "
>
  <FolderKanban size={18} />
  List
</Link>

      <Link
        href="/dashboard/tasks/create"
        className="
          flex items-center gap-3
          rounded-xl
          px-3 py-3
          text-white
          hover:bg-slate-800
        "
      >
        <CheckSquare size={18} />
        Task
      </Link>

      <Link
        href="/dashboard/team/invite"
        className="
          flex items-center gap-3
          rounded-xl
          px-3 py-3
          text-white
          hover:bg-slate-800
        "
      >
        <UserPlus size={18} />
        Invite Member
      </Link>
    </div>
  )}
</div>
);
}
