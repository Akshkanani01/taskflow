"use client";

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Settings, User2, LogOut } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserAvatar } from "./user-avatar";
import { useSettings } from "@/components/settings/settings-provider";

export function UserMenu() {
  const router = useRouter();

  const { user } = useCurrentUser();

  const { openSettings } = useSettings();

  async function handleLogout() {
    await authClient.signOut();

    router.replace("/login");

    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full outline-none ring-offset-2 transition hover:opacity-90 focus-visible:ring-2">
          <UserAvatar className="h-10 w-10" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72"
      >
        <div className="flex items-center gap-3 p-4">
          <UserAvatar className="h-12 w-12" />

          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">
              {user.name ?? "Unnamed User"}
            </p>

            <p className="truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <User2 className="mr-2 h-4 w-4" />
          My Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            openSettings();
          }}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            void handleLogout();
          }}
          className="text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}