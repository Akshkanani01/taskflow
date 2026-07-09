"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";

import DrawerHeader from "./drawer-header";
import DrawerTabs from "./drawer-tabs";

import OverviewTab from "./tabs/overview-tab";
import PermissionsTab from "./tabs/permissions-tab";
import ActivityTab from "./tabs/activity-tab";

import { SpaceMember } from "./types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: SpaceMember | null;
}

export default function MemberDialog({
  open,
  onOpenChange,
  member,
}: Props) {
  const [tab, setTab] = useState("overview");

  if (!member) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        showCloseButton={false}
        className="
          flex
          h-[90vh]
          w-[95vw]
          max-w-[1000px]
          flex-col

          overflow-hidden

          rounded-[32px]

          border
          border-zinc-800

          bg-[#0B1017]

          p-0

          text-white

          shadow-2xl
        "
      >
        {/* ================= Header ================= */}

        <DrawerHeader
          member={member}
          onClose={() =>
            onOpenChange(false)
          }
        />

        {/* ================= Tabs ================= */}

        <Tabs
          value={tab}
          onValueChange={setTab}
          className="
            flex
            min-h-0
            flex-1
            flex-col
          "
        >
          <div
            className="
              sticky
              top-0
              z-20

              border-b
              border-zinc-800

              bg-[#0F1623]
            "
          >
            <DrawerTabs />
          </div>

          {/* ================= Scroll Area ================= */}

          <div
  className="
    flex-1
    overflow-y-auto

    scrollbar-thin
    scrollbar-thumb-zinc-700
    scrollbar-track-transparent
  "
>
            <div className="mx-auto max-w-5xl p-10">

              <TabsContent
                value="overview"
                className="mt-0 outline-none"
              >
                <OverviewTab
                  member={member}
                />
              </TabsContent>

              <TabsContent
                value="permissions"
                className="mt-0 outline-none"
              >
                <PermissionsTab
                  member={member}
                />
              </TabsContent>

              <TabsContent
                value="activity"
                className="mt-0 outline-none"
              >
                <ActivityTab
                  member={member}
                />
              </TabsContent>

            </div>
          </div>

          {/* ================= Footer ================= */}

          <div
            className="
              border-t
              border-zinc-800

              bg-[#101826]

              p-5
            "
          >
            <button
              type="button"
              onClick={() =>
                onOpenChange(false)
              }
              className="
                w-full

                rounded-2xl

                bg-zinc-800

                py-3

                font-medium

                transition

                hover:bg-zinc-700
              "
            >
              Close
            </button>
          </div>

        </Tabs>
      </DialogContent>
    </Dialog>
  );
}