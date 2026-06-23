"use client";

import { useState } from "react";
import {
  MailPlus,
  Shield,
  Users,
  Eye,
  Briefcase,
} from "lucide-react";

import { createInvite } from "@/app/dashboard/team/invites/actions";

const roleConfig = {
  ADMIN: {
    icon: Shield,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    description:
      "Full workspace management access",
    permissions: [
      "Manage members",
      "Create spaces & lists",
      "Manage tasks",
      "View reports",
      "Workspace settings",
    ],
  },

  MANAGER: {
    icon: Briefcase,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    description:
      "Manage teams and project execution",
    permissions: [
      "Create tasks",
      "Assign tasks",
      "Manage lists",
      "View reports",
      "Track progress",
    ],
  },

  MEMBER: {
    icon: Users,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    description:
      "Collaborate and complete assigned work",
    permissions: [
      "Update status",
      "Comment",
      "Upload files",
      "Create subtasks",
      "Log time",
    ],
  },

  VIEWER: {
    icon: Eye,
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    border: "border-slate-500/20",
    description:
      "Read-only workspace access",
    permissions: [
      "View spaces",
      "View lists",
      "View tasks",
      "View activity",
    ],
  },
};

export default function InviteModal({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("MEMBER");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const currentRole =
    roleConfig[
      role as keyof typeof roleConfig
    ];

  const RoleIcon =
    currentRole.icon;

  async function handleInvite() {
    try {
      if (!email.trim()) {
        alert(
          "Please enter an email address"
        );
        return;
      }

      setLoading(true);

      await createInvite(
        workspaceId,
        email,
        role
      );

      setSuccess(true);

      setEmail("");

      setRole("MEMBER");

      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (error: any) {
      alert(
        error?.message ||
          "Failed to send invite"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        sticky top-24
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-slate-900/95
        backdrop-blur-xl
        shadow-2xl
      "
    >
      <div
        className="
          border-b
          border-white/10
          bg-gradient-to-r
          from-indigo-500/10
          via-violet-500/10
          to-purple-500/10
          p-6
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-600
              to-violet-600
              text-white
              shadow-lg
            "
          >
            <MailPlus size={22} />
          </div>

          <div>
            <h2
              className="
                text-xl
                font-bold
                text-white
              "
            >
              Invite Team Member
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >
              Secure role-based workspace
              invitations
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-300
            "
          >
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter email here"
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-slate-950
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-500/20
            "
          />
        </div>

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-300
            "
          >
            Workspace Role
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-slate-950
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-indigo-500
            "
          >
            <option value="ADMIN">
              Admin
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
        </div>

        <div
          className={`
            rounded-2xl
            border
            p-4
            ${currentRole.border}
            ${currentRole.bg}
          `}
        >
          <div className="flex items-center gap-3">
            <div
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-slate-950
                ${currentRole.color}
              `}
            >
              <RoleIcon size={18} />
            </div>

            <div>
              <h4
                className={`
                  font-semibold
                  ${currentRole.color}
                `}
              >
                {role}
              </h4>

              <p className="text-xs text-slate-400">
                {
                  currentRole.description
                }
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {currentRole.permissions.map(
              (permission) => (
                <div
                  key={permission}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-300
                  "
                >
                  <div
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-indigo-400
                    "
                  />

                  {permission}
                </div>
              )
            )}
          </div>
        </div>

        <button
          onClick={handleInvite}
          disabled={
            loading || !email.trim()
          }
          className="
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-indigo-600
            via-violet-600
            to-purple-600
            py-3
            font-semibold
            text-white
            shadow-lg
            transition-all
            hover:scale-[1.02]
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "Sending Invitation..."
            : "Send Invitation"}
        </button>

        {success && (
          <div
            className="
              rounded-2xl
              border
              border-emerald-500/20
              bg-emerald-500/10
              p-4
            "
          >
            <p
              className="
                font-medium
                text-emerald-300
              "
            >
              Invitation Sent Successfully
            </p>

            <p
              className="
                mt-1
                text-xs
                text-emerald-400
              "
            >
              The user will receive a
              secure email invitation to
              join this workspace.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}