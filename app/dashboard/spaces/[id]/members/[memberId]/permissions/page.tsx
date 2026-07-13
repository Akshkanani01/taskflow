import { notFound } from "next/navigation";

import {
  Shield,
  CheckCircle2,
  XCircle,
  Crown,
  Users,
  FolderKanban,
  Settings,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
    memberId: string;
  }>;
}

type Permission = {
  title: string;
  enabled: boolean;
};

export default async function MemberPermissionsPage({
  params,
}: Props) {

  const {
    id: spaceId,
    memberId,
  } = await params;

  const member =
    await prisma.spaceMember.findFirst({

      where: {

        spaceId,

        userId: memberId,

      },

      include: {

        user: true,

      },

    });

  if (!member) {

    notFound();

  }

  const role =
    member.role;

  const permissions: Permission[] = [

    {
      title: "View Workspace",
      enabled: true,
    },

    {
      title: "Create Tasks",
      enabled:
        role !== "VIEWER",
    },

    {
      title: "Edit Tasks",
      enabled:
        role !== "VIEWER",
    },

    {
      title: "Delete Tasks",
      enabled:
        role === "OWNER" ||
        role === "ADMIN",
    },

    {
      title: "Invite Members",
      enabled:
        role === "OWNER" ||
        role === "ADMIN",
    },

    {
      title: "Manage Members",
      enabled:
        role === "OWNER" ||
        role === "ADMIN",
    },

    {
      title: "Manage Spaces",
      enabled:
        role === "OWNER" ||
        role === "ADMIN",
    },

    {
      title: "Workspace Settings",
      enabled:
        role === "OWNER",
    },

  ];

  const granted =
    permissions.filter(
      (p) => p.enabled
    ).length;

  const denied =
    permissions.length -
    granted;

  return (

    <div className="space-y-8">

      {/* HEADER STATS */}

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <Shield className="mb-4 h-8 w-8 text-indigo-400" />

          <p className="text-sm text-slate-400">

            Current Role

          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">

            {role}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <CheckCircle2 className="mb-4 h-8 w-8 text-emerald-400" />

          <p className="text-sm text-slate-400">

            Granted

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {granted}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <XCircle className="mb-4 h-8 w-8 text-red-400" />

          <p className="text-sm text-slate-400">

            Restricted

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {denied}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <Crown className="mb-4 h-8 w-8 text-yellow-400" />

          <p className="text-sm text-slate-400">

            Access Level

          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">

            {role === "OWNER"
              ? "Full"
              : role === "ADMIN"
              ? "High"
              : role === "MANAGER"
              ? "Medium"
              : role === "MEMBER"
              ? "Standard"
              : "Read Only"}

          </h2>

        </div>

      </div>
            {/* PERMISSION MATRIX */}

      <section className="rounded-3xl border border-white/10 bg-[#111827]">

        <div className="border-b border-white/10 p-6">

          <h2 className="text-xl font-semibold text-white">

            Permission Matrix

          </h2>

          <p className="mt-2 text-sm text-slate-400">

            Effective permissions for this member inside the current workspace.

          </p>

        </div>

        <div className="grid gap-6 p-6 xl:grid-cols-2">

          {/* Workspace */}

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

            <div className="mb-6 flex items-center gap-3">

              <div className="rounded-xl bg-indigo-500/15 p-3">

                <Users className="h-6 w-6 text-indigo-400" />

              </div>

              <div>

                <h3 className="font-semibold text-white">

                  Workspace

                </h3>

                <p className="text-sm text-slate-500">

                  Workspace level access

                </p>

              </div>

            </div>

            <div className="space-y-3">

              {permissions.slice(0,4).map((permission) => (

                <div
                  key={permission.title}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111827] p-4"
                >

                  <span className="text-sm text-white">

                    {permission.title}

                  </span>

                  {permission.enabled ? (

                    <span className="flex items-center gap-2 text-emerald-400">

                      <CheckCircle2 className="h-5 w-5" />

                      Allowed

                    </span>

                  ) : (

                    <span className="flex items-center gap-2 text-red-400">

                      <XCircle className="h-5 w-5" />

                      Denied

                    </span>

                  )}

                </div>

              ))}

            </div>

          </div>

          {/* Administration */}

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

            <div className="mb-6 flex items-center gap-3">

              <div className="rounded-xl bg-yellow-500/15 p-3">

                <Settings className="h-6 w-6 text-yellow-400" />

              </div>

              <div>

                <h3 className="font-semibold text-white">

                  Administration

                </h3>

                <p className="text-sm text-slate-500">

                  Administrative capabilities

                </p>

              </div>

            </div>

            <div className="space-y-3">

              {permissions.slice(4).map((permission) => (

                <div
                  key={permission.title}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111827] p-4"
                >

                  <span className="text-sm text-white">

                    {permission.title}

                  </span>

                  {permission.enabled ? (

                    <span className="flex items-center gap-2 text-emerald-400">

                      <CheckCircle2 className="h-5 w-5" />

                      Allowed

                    </span>

                  ) : (

                    <span className="flex items-center gap-2 text-red-400">

                      <XCircle className="h-5 w-5" />

                      Denied

                    </span>

                  )}

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* ROLE DETAILS */}

      <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">

        <div className="mb-6 flex items-center gap-3">

          <FolderKanban className="h-6 w-6 text-indigo-400" />

          <h2 className="text-xl font-semibold text-white">

            Role Description

          </h2>

        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

          {role === "OWNER" && (

            <p className="leading-7 text-slate-300">

              Owners have unrestricted access to every workspace resource.
              They can manage billing, invite members, remove members,
              transfer ownership and permanently delete the workspace.

            </p>

          )}

          {role === "ADMIN" && (

            <p className="leading-7 text-slate-300">

              Administrators can manage members, spaces, projects and tasks.
              Billing and ownership operations remain restricted.

            </p>

          )}

          {role === "MANAGER" && (

            <p className="leading-7 text-slate-300">

              Managers coordinate projects, assign work, review progress
              and supervise team members.

            </p>

          )}

          {role === "MEMBER" && (

            <p className="leading-7 text-slate-300">

              Members collaborate on tasks, comments, attachments and
              checklists but cannot manage workspace settings.

            </p>

          )}

          {role === "VIEWER" && (

            <p className="leading-7 text-slate-300">

              Viewers have read-only access. They can browse projects,
              tasks and files but cannot modify data.

            </p>

          )}

        </div>

      </section>
            {/* SECURITY SUMMARY */}

      <div className="grid gap-6 xl:grid-cols-2">

        <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <div className="mb-6 flex items-center gap-3">

            <Shield className="h-6 w-6 text-indigo-400" />

            <h2 className="text-xl font-semibold text-white">

              Security Summary

            </h2>

          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Current Role

              </span>

              <span className="font-semibold text-white">

                {role}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Granted Permissions

              </span>

              <span className="font-semibold text-emerald-400">

                {granted}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Restricted Permissions

              </span>

              <span className="font-semibold text-red-400">

                {denied}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Member

              </span>

              <span className="font-semibold text-white">

                {member.user.name ?? member.user.email}

              </span>

            </div>

          </div>

        </section>

        {/* DANGER ZONE */}

        <section className="rounded-3xl border border-red-500/20 bg-[#111827] p-6">

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-red-400">

              Danger Zone

            </h2>

            <p className="mt-2 text-sm text-slate-500">

              These operations affect this member permanently.

            </p>

          </div>

          <div className="space-y-4">

            <button
              disabled
              className="
                flex
                w-full
                items-center
                justify-center
                rounded-2xl
                border
                border-yellow-500/20
                bg-yellow-500/10
                py-3
                font-medium
                text-yellow-300
                opacity-60
              "
            >

              Change Role
              (Coming Soon)

            </button>

            <button
              disabled
              className="
                flex
                w-full
                items-center
                justify-center
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/10
                py-3
                font-medium
                text-red-300
                opacity-60
              "
            >

              Remove Member
              (Coming Soon)

            </button>

          </div>

        </section>

      </div>

    </div>

  );

}