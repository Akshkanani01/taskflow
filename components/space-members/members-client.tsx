"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import MembersToolbar from "@/components/space-members/toolbar";
import MembersTable from "@/components/space-members/table";
import InviteDialog from "@/components/space-members/invite-dialog";
import PendingInvites, {
  PendingInvite,
} from "@/components/space-members/pending-invites";

import {
  SpaceMember,
} from "@/components/space-members/types";

interface Props {
  members: SpaceMember[];
  pendingInvites: PendingInvite[];
  spaceId: string;
  workspaceId: string;
}

export default function MembersClient({
  members,
  pendingInvites,
  spaceId,
  workspaceId,
}: Props) {
  const router = useRouter();

  const [search, setSearch] =
    useState("");

  const [role, setRole] =
    useState("ALL");

  const [gridView, setGridView] =
    useState(false);

  const [
    inviteOpen,
    setInviteOpen,
  ] = useState(false);

  const filteredMembers =
    useMemo(() => {
      return members.filter(
        (member) => {
          const matchesSearch =
            member.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            member.email
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesRole =
            role === "ALL" ||
            member.role === role;

          return (
            matchesSearch &&
            matchesRole
          );
        }
      );
    }, [
      members,
      role,
      search,
    ]);

  async function cancelInvite(
    id: string
  ) {
    const ok = confirm(
      "Cancel this invitation?"
    );

    if (!ok) {
      return;
    }

    try {
      const res = await fetch(
        `/api/invites/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const result =
          await res.json();

        alert(
          result.message ??
            "Failed to cancel invitation."
        );

        return;
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Cancel Invite Error:",
        error
      );

      alert(
        "Failed to cancel invitation."
      );
    }
  }

  async function inviteMember(
    data: {
      email: string;
      role: string;
      message: string;
    }
  ) {
    try {
      const res = await fetch(
        "/api/team/invite",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            workspaceId,
            spaceId,
            email: data.email,
            role: data.role,
          }),
        }
      );

      const result =
        await res.json();

      if (!res.ok) {
        alert(
          result.message ??
            "Failed to send invitation."
        );

        return;
      }

      alert(
        result.message ??
          "Invitation email sent successfully."
      );

      setInviteOpen(false);

      router.refresh();
    } catch (error) {
      console.error(
        "Invite Error:",
        error
      );

      alert(
        "Failed to send invitation."
      );
    }
  }

  return (
    <main className="flex h-full flex-col gap-6 bg-[#0B1017] p-6">
      <MembersToolbar
        search={search}
        onSearch={setSearch}
        role={role}
        onRoleChange={setRole}
        gridView={gridView}
        onToggleView={() =>
          setGridView(
            !gridView
          )
        }
        onInvite={() =>
          setInviteOpen(true)
        }
      />

      <div className="min-h-0 flex-1">
        <MembersTable
          members={
            filteredMembers
          }
          spaceId={spaceId}
        />
      </div>

      <PendingInvites
        invites={
          pendingInvites
        }
        onCancel={
          cancelInvite
        }
      />

      <InviteDialog
        open={inviteOpen}
        onOpenChange={
          setInviteOpen
        }
        onInvite={
          inviteMember
        }
      />
    </main>
  );
}