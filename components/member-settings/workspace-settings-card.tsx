"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type {
  WorkspaceSettingsCardProps,
} from "@/types/member";

import {
  Building2,
  Shield,
  Calendar,
  MailCheck,
  Users,
  Loader2,
  Lock,
} from "lucide-react";

import { WorkspaceRole } from "@prisma/client";
import { toast } from "sonner";


const ROLE_OPTIONS: WorkspaceRole[] = [
  WorkspaceRole.OWNER,
  WorkspaceRole.ADMIN,
  WorkspaceRole.MANAGER,
  WorkspaceRole.MEMBER,
  WorkspaceRole.VIEWER,
];


export default function WorkspaceSettingsCard({
  member,
  currentUser,
}: WorkspaceSettingsCardProps) {

  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  const [role, setRole] =
    useState<WorkspaceRole>(
      member.role
    );

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const currentUserId =
    currentUser.id;

  const currentUserRole =
    currentUser.role;

  const isSelf =
    currentUserId === member.userId;

  const canEditRole =
    currentUserRole === WorkspaceRole.OWNER ||
    currentUserRole === WorkspaceRole.ADMIN;


  const isDirty =
    useMemo(
      () => role !== member.role,
      [
        role,
        member.role,
      ]
    );


  const visibleRoles =
    useMemo(() => {

      if (
        currentUserRole ===
        WorkspaceRole.OWNER
      ) {
        return ROLE_OPTIONS;
      }

      return ROLE_OPTIONS.filter(
        (role) =>
          role !== WorkspaceRole.OWNER
      );

    }, [
      currentUserRole,
    ]);


  const disableRoleSelect =
    loading ||
    pending ||
    !canEditRole ||
    isSelf ||
    member.role === WorkspaceRole.OWNER;


  async function handleSave() {

    if (
      !isDirty ||
      disableRoleSelect
    ) {
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {

      const response =
        await fetch(
          "/api/team/role",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              workspaceId:
                member.space.workspace.id,

              spaceId:
                member.space.id,

              userId:
                member.userId,

              role,
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ??
          "Failed to update role."
        );
      }


      setMessage(
        data.message ??
        "Role updated successfully."
      );


      toast.success(
        data.message ??
        "Role updated successfully."
      );


      startTransition(() => {
        router.refresh();
      });


    } catch (err) {

      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong.";

      setError(msg);

      toast.error(msg);


    } finally {

      setLoading(false);

    }

  }


  return (
    <section className="rounded-3xl border border-border bg-card p-7">

      <div className="mb-8 flex items-center gap-3">

        <Building2 className="h-6 w-6 text-primary" />

        <div>

          <h2 className="text-xl font-semibold text-foreground">
            Workspace Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage this member&apos;s workspace role and access.
          </p>

        </div>

      </div>
            <div className="grid gap-5 lg:grid-cols-2">

        <div className="rounded-2xl border border-border bg-card p-5">

          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Workspace
          </p>

          <h3 className="mt-3 text-xl font-semibold text-foreground">
            {member.space.workspace.name}
          </h3>

        </div>


        <div className="rounded-2xl border border-border bg-card p-5">

          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Space
          </p>

          <h3 className="mt-3 text-xl font-semibold text-foreground">
            {member.space.name}
          </h3>

        </div>


        <div className="rounded-2xl border border-border bg-card p-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Shield className="h-5 w-5 text-primary" />

              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Workspace Role
              </span>

            </div>


            {!canEditRole && (

              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">

                <Lock className="h-3.5 w-3.5" />

                Read Only

              </div>

            )}

          </div>


          <div className="mt-5">

            <label className="mb-2 block text-sm text-muted-foreground">
              Change Role
            </label>


            <select
              value={role}
              disabled={disableRoleSelect}
              onChange={(e) =>
                setRole(
                  e.target.value as WorkspaceRole
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-4
                py-3
                text-foreground
                outline-none
                transition
                focus:border-primary
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {visibleRoles.map(
                (option) => (

                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>

                )
              )}

            </select>


            {isSelf && (

              <p className="mt-3 text-sm text-muted-foreground">
                You cannot change your own role.
              </p>

            )}


            {!canEditRole && (

              <p className="mt-3 text-sm text-muted-foreground">
                You don&apos;t have permission to update member roles.
              </p>

            )}


            {member.role === WorkspaceRole.OWNER && (

              <p className="mt-3 text-sm text-muted-foreground">
                Workspace Owner role cannot be changed.
              </p>

            )}

          </div>


          <div className="mt-6 flex flex-wrap items-center gap-3">

            <button
              type="button"
              onClick={handleSave}
              disabled={
                !isDirty ||
                disableRoleSelect
              }
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                bg-primary
                px-5
                py-2.5
                text-sm
                font-semibold
                text-primary-foreground
                transition
                hover:bg-primary/90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              {loading ? (

                <>

                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                  Saving...

                </>

              ) : (

                "Save Changes"

              )}

            </button>


            <button
              type="button"
              onClick={() => {
                setRole(member.role);
                setMessage("");
                setError("");
              }}
              disabled={
                !isDirty ||
                loading ||
                pending
              }
              className="
                rounded-xl
                border
                border-border
                px-5
                py-2.5
                text-sm
                font-semibold
                text-foreground
                transition
                hover:bg-muted
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              Reset

            </button>

          </div>
                    {message && (

            <div
              className="
                mt-5
                rounded-xl
                border
                border-primary/20
                bg-primary/10
                px-4
                py-3
                text-sm
                text-primary
              "
            >
              {message}
            </div>

          )}


          {error && (

            <div
              className="
                mt-5
                rounded-xl
                border
                border-destructive/20
                bg-destructive/10
                px-4
                py-3
                text-sm
                text-destructive
              "
            >
              {error}
            </div>

          )}

        </div>


        <div className="rounded-2xl border border-border bg-card p-5">

          <div className="flex items-center gap-3">

            <Users className="h-5 w-5 text-primary" />

            <div>

              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Member
              </p>

              <p className="mt-1 font-semibold text-foreground">
                {member.user.name ??
                  member.user.email}
              </p>

            </div>

          </div>

        </div>


        <div className="rounded-2xl border border-border bg-card p-5">

          <div className="flex items-center gap-3">

            <MailCheck className="h-5 w-5 text-primary" />

            <div>

              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Email
              </p>

              <p className="mt-1 text-foreground">
                {member.user.email}
              </p>

            </div>

          </div>

        </div>


        <div className="rounded-2xl border border-border bg-card p-5">

          <div className="flex items-center gap-3">

            <Calendar className="h-5 w-5 text-primary" />

            <div>

              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Joined
              </p>

              <p className="mt-1 text-foreground">
                {member.joinedAt.toLocaleDateString(
                  "en-GB"
                )}
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}