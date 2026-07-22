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

  const [pending, startTransition] = useTransition();

  const [role, setRole] = useState<WorkspaceRole>(
    member.role
  );

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const currentUserId = currentUser.id;

const currentUserRole = currentUser.role;

const isSelf =
  currentUserId === member.userId;

const canEditRole =
  currentUserRole === WorkspaceRole.OWNER ||
  currentUserRole === WorkspaceRole.ADMIN;

  const isDirty = useMemo(
    () => role !== member.role,
    [role, member.role]
  );

  const visibleRoles = useMemo(() => {
    if (currentUserRole === WorkspaceRole.OWNER) {
      return ROLE_OPTIONS;
    }

    return ROLE_OPTIONS.filter(
      (role) => role !== WorkspaceRole.OWNER
    );
  }, [currentUserRole]);

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
      const response = await fetch(
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
    <section className="rounded-3xl border border-white/10 bg-[#111827] p-7">
      <div className="mb-8 flex items-center gap-3">
        <Building2 className="h-6 w-6 text-indigo-400" />
        <div>
          <h2 className="text-xl font-semibold text-white">
            Workspace Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage this member&apos;s workspace role and access.
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Workspace
          </p>

          <h3 className="mt-3 text-xl font-semibold text-white">
            {member.space.workspace.name}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Space
          </p>

          <h3 className="mt-3 text-xl font-semibold text-white">
            {member.space.name}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-400" />

              <span className="text-xs uppercase tracking-widest text-slate-500">
                Workspace Role
              </span>
            </div>

            {!canEditRole && (
              <div className="flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-300">
                <Lock className="h-3.5 w-3.5" />
                Read Only
              </div>
            )}
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm text-slate-400">
              Change Role
            </label>

            <select
              value={role}
              disabled={disableRoleSelect}
              onChange={(e) =>
                setRole(e.target.value as WorkspaceRole)
              }
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-slate-950
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-indigo-500
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {visibleRoles.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>

            {isSelf && (
              <p className="mt-3 text-sm text-yellow-400">
                You cannot change your own role.
              </p>
            )}

            {!canEditRole && (
              <p className="mt-3 text-sm text-yellow-400">
                You don&apos;t have permission to update member roles.
              </p>
            )}

            {member.role === WorkspaceRole.OWNER && (
              <p className="mt-3 text-sm text-cyan-400">
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
                bg-indigo-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-indigo-500
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
                border-white/10
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-white/5
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Reset
            </button>
          </div>

          {message && (
            <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-400" />

            <span className="text-xs uppercase tracking-widest text-slate-500">
              Joined
            </span>
          </div>

          <h3 className="mt-3 text-lg font-semibold text-white">
            {new Date(member.joinedAt).toLocaleDateString("en-GB")}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <div className="flex items-center gap-2">
            <MailCheck className="h-5 w-5 text-emerald-400" />

            <span className="text-xs uppercase tracking-widest text-slate-500">
              Email Status
            </span>
          </div>

          <h3 className="mt-3 text-lg font-semibold text-emerald-400">
            {member.user.emailVerified
              ? "Verified"
              : "Not Verified"}
          </h3>
        </div>

        
      </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 text-center">
          <Users className="mx-auto mb-3 h-8 w-8 text-indigo-400" />

          <p className="text-sm text-slate-500">
            Workspace Role
          </p>

          <div className="mt-3">
            <span
              className={`
                inline-flex
                items-center
                rounded-full
                px-4
                py-1.5
                text-sm
                font-semibold
                ${
                  member.role === WorkspaceRole.OWNER
                    ? "bg-yellow-500/20 text-yellow-300"
                    : member.role === WorkspaceRole.ADMIN
                    ? "bg-red-500/20 text-red-300"
                    : member.role === WorkspaceRole.MANAGER
                    ? "bg-indigo-500/20 text-indigo-300"
                    : member.role === WorkspaceRole.MEMBER
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-slate-700 text-slate-300"
                }
              `}
            >
              {member.role}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 text-center">
          <Calendar className="mx-auto mb-3 h-8 w-8 text-cyan-400" />

          <p className="text-sm text-slate-500">
            Member Since
          </p>

          <h3 className="mt-2 text-lg font-bold text-white">
            {new Date(member.joinedAt).getFullYear()}
          </h3>

          <p className="mt-2 text-xs text-slate-500">
            Joined on{" "}
            {new Date(member.joinedAt).toLocaleDateString(
              "en-GB"
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 text-center">
          <Shield className="mx-auto mb-3 h-8 w-8 text-emerald-400" />

          <p className="text-sm text-slate-500">
            Access Level
          </p>

          <h3 className="mt-2 text-lg font-bold text-white">
            {member.role}
          </h3>

          <p className="mt-2 text-xs text-slate-500">
            {member.user.emailVerified
              ? "Verified Account"
              : "Email Verification Pending"}
          </p>
        </div>
      </div>
    </section>
  );
}