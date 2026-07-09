"use client";

import {
  Activity,
  ShieldCheck,
  User,
} from "lucide-react";

import {
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function DrawerTabs() {
  return (
    <div className="px-8 py-5">

      <TabsList
        className="
          grid

          h-14

          w-full

          grid-cols-3

          rounded-2xl

          border
          border-zinc-800

          bg-[#161F2D]

          p-1
        "
      >

        <TabsTrigger
          value="overview"
          className="
            flex
            items-center
            gap-2

            rounded-xl

            text-sm
            font-medium

            transition-all

            data-[state=active]:bg-blue-600
            data-[state=active]:text-white
          "
        >
          <User size={16} />

          Overview
        </TabsTrigger>

        <TabsTrigger
          value="permissions"
          className="
            flex
            items-center
            gap-2

            rounded-xl

            text-sm
            font-medium

            transition-all

            data-[state=active]:bg-blue-600
            data-[state=active]:text-white
          "
        >
          <ShieldCheck size={16} />

          Permissions
        </TabsTrigger>

        <TabsTrigger
          value="activity"
          className="
            flex
            items-center
            gap-2

            rounded-xl

            text-sm
            font-medium

            transition-all

            data-[state=active]:bg-blue-600
            data-[state=active]:text-white
          "
        >
          <Activity size={16} />

          Activity
        </TabsTrigger>

      </TabsList>

    </div>
  );
}