"use client";

import {
  MoreHorizontal,
  Shield,
  User,
  Trash2,
  ExternalLink,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  onRole?: () => void;
  onPermissions?: () => void;
  onProfile?: () => void;
  onRemove?: () => void;
}

export default function MemberActions({
  onRole,
  onPermissions,
  onProfile,
  onRemove,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-transparent
            text-zinc-500
            transition-all
            hover:border-zinc-700
            hover:bg-zinc-800
            hover:text-white
          "
        >
          <MoreHorizontal size={18} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          w-56
          rounded-xl
          border-zinc-800
          bg-[#141A24]
          text-white
        "
      >
        <DropdownMenuItem
          onClick={onRole}
          className="cursor-pointer"
        >
          <Shield className="mr-2 h-4 w-4" />
          Change Role
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onPermissions}
          className="cursor-pointer"
        >
          <Shield className="mr-2 h-4 w-4" />
          Manage Permissions
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onProfile}
          className="cursor-pointer"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onRemove}
          className="cursor-pointer text-red-400 focus:text-red-400"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove from Space
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}