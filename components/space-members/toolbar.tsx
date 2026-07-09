"use client";

import {
  Search,
  Filter,
  ArrowUpDown,
  LayoutGrid,
  List,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  search: string;
  onSearch: (value: string) => void;

  role: string;
  onRoleChange: (value: string) => void;

  
  gridView: boolean;
  onToggleView: () => void;

  onInvite: () => void;
}
export default function MembersToolbar({
  search,
  onSearch,
  role,
  onRoleChange,
  gridView,
  onToggleView,
  onInvite,
}: Props) {
  return (
    <div className="sticky top-0 z-20 rounded-2xl border border-[#222B37] bg-[#121722] p-5">

      <div className="flex flex-wrap items-center justify-between gap-4">

        {/* Left */}

        <div className="flex flex-1 flex-wrap items-center gap-3">

          {/* Search */}

          <div className="relative w-full max-w-sm">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <Input
              value={search}
              onChange={(e) =>
                onSearch(e.target.value)
              }
              placeholder="Search members..."
              className="
                h-11
                border-[#2A3443]
                bg-[#0F141C]
                pl-10
                text-white
              "
            />

          </div>

          {/* Role */}

          <select
            value={role}
            onChange={(e) =>
              onRoleChange(e.target.value)
            }
            className="
              h-11
              rounded-xl
              border
              border-[#2A3443]
              bg-[#0F141C]
              px-4
              text-sm
              text-white
            "
          >
            <option value="ALL">
              All Roles
            </option>

            <option value="OWNER">
              Owner
            </option>

            <option value="MANAGER">
              Manager
            </option>

            <option value="MEMBER">
              Member
            </option>

            <option value="VIEWER">
              Viewer
            </option>

          </select>

    

          {/* Sort */}

          <Button
            variant="outline"
            className="
              h-11
              border-[#2A3443]
              bg-[#0F141C]
            "
          >
            <ArrowUpDown
              className="mr-2 h-4 w-4"
            />

            Sort

          </Button>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <Button
            variant="outline"
            onClick={onToggleView}
            className="
              h-11
              border-[#2A3443]
              bg-[#0F141C]
            "
          >
            {gridView ? (
              <List className="h-4 w-4" />
            ) : (
              <LayoutGrid className="h-4 w-4" />
            )}
          </Button>

          <Button
            onClick={onInvite}
            className="
              h-11
              rounded-xl
              bg-blue-600
              px-5
              hover:bg-blue-500
            "
          >
            <UserPlus className="mr-2 h-4 w-4" />

            Invite

          </Button>

        </div>

      </div>

    </div>
  );
}