import { notFound } from "next/navigation";

import {
  Shield,
  Lock,
  CheckCircle2,
  XCircle,
  Crown,
  UserCog,
  Users,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
    memberId: string;
  }>;
}

export default async function MemberPermissionsPage({
  params,
}: Props) {

  const {
    id: spaceId,
    memberId,
  } = await params;

  const member = await prisma.spaceMember.findFirst({
    where: {
      id: memberId,
      spaceId,
    },
    include: {
      user: true,
      space: {
        include: {
          workspace: true,
        },
      },
    },
  });

  if (!member) {

    notFound();

  }

  const permissions = {

    manageWorkspace:
      member.role === "OWNER",

    manageMembers:
      ["OWNER", "ADMIN"].includes(
        member.role
      ),

    manageSpaces:
      ["OWNER", "ADMIN", "MANAGER"].includes(
        member.role
      ),

    manageProjects:
      ["OWNER", "ADMIN", "MANAGER"].includes(
        member.role
      ),

    manageTasks:
      member.role !== "VIEWER",

    manageFiles:
      member.role !== "VIEWER",

    comment:
      true,

    createTasks:
      member.role !== "VIEWER",

    deleteTasks:
      ["OWNER", "ADMIN"].includes(
        member.role
      ),

    inviteMembers:
      ["OWNER", "ADMIN"].includes(
        member.role
      ),

  };

  const cards = [

    {
      title: "Workspace Management",
      enabled:
        permissions.manageWorkspace,
      description:
        "Create, update and delete workspace.",
    },

    {
      title: "Member Management",
      enabled:
        permissions.manageMembers,
      description:
        "Invite, remove and change roles.",
    },

    {
      title: "Space Management",
      enabled:
        permissions.manageSpaces,
      description:
        "Manage spaces inside workspace.",
    },

    {
      title: "Project Management",
      enabled:
        permissions.manageProjects,
      description:
        "Create and edit projects.",
    },

    {
      title: "Task Management",
      enabled:
        permissions.manageTasks,
      description:
        "Manage tasks and workflow.",
    },

    {
      title: "File Management",
      enabled:
        permissions.manageFiles,
      description:
        "Upload and remove attachments.",
    },

    {
      title: "Comments",
      enabled:
        permissions.comment,
      description:
        "Comment and mention members.",
    },

    {
      title: "Create Tasks",
      enabled:
        permissions.createTasks,
      description:
        "Create new tasks.",
    },

    {
      title: "Delete Tasks",
      enabled:
        permissions.deleteTasks,
      description:
        "Delete existing tasks.",
    },

    {
      title: "Invite Members",
      enabled:
        permissions.inviteMembers,
      description:
        "Invite new workspace members.",
    },

  ];

  return (

    <main className="space-y-8">

      {/* Header */}

      <section className="rounded-3xl border border-white/10 bg-[#111827] p-8">

        <div className="flex items-center gap-5">

          <div className="rounded-2xl bg-indigo-600/10 p-5">

            <Shield className="h-10 w-10 text-indigo-400" />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-white">

              Permissions

            </h1>

            <p className="mt-2 text-slate-400">

              Review this member&apos;s access level and workspace permissions.

            </p>

          </div>

        </div>

      </section>
            {/* Role Summary */}

      <section className="grid gap-6 xl:grid-cols-[340px_1fr]">

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-7">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">

                Current Role

              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">

                {member.role}

              </h2>

            </div>

            <div className="rounded-2xl bg-indigo-600/10 p-4">

              {member.role === "OWNER" ? (

                <Crown className="h-9 w-9 text-yellow-400" />

              ) : member.role === "ADMIN" ? (

                <Shield className="h-9 w-9 text-indigo-400" />

              ) : member.role === "MANAGER" ? (

                <UserCog className="h-9 w-9 text-cyan-400" />

              ) : (

                <Users className="h-9 w-9 text-slate-400" />

              )}

            </div>

          </div>

          <div className="mt-8 space-y-4">

            <PermissionSummaryRow

              label="Workspace"

              value={
                permissions.manageWorkspace
              }

            />

            <PermissionSummaryRow

              label="Members"

              value={
                permissions.manageMembers
              }

            />

            <PermissionSummaryRow

              label="Spaces"

              value={
                permissions.manageSpaces
              }

            />

            <PermissionSummaryRow

              label="Projects"

              value={
                permissions.manageProjects
              }

            />

            <PermissionSummaryRow

              label="Tasks"

              value={
                permissions.manageTasks
              }

            />

            <PermissionSummaryRow

              label="Files"

              value={
                permissions.manageFiles
              }

            />

          </div>

        </div>

        {/* Statistics */}

        <div className="grid gap-5 md:grid-cols-2">

          <StatCard

            title="Granted Permissions"

            value={
              cards.filter(
                (c) => c.enabled
              ).length
            }

            icon={
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            }

          />

          <StatCard

            title="Restricted"

            value={
              cards.filter(
                (c) => !c.enabled
              ).length
            }

            icon={
              <Lock className="h-8 w-8 text-red-400" />
            }

          />

          <StatCard

            title="Workspace"

            value={
              member.space.workspace.name
            }

            icon={
              <Shield className="h-8 w-8 text-indigo-400" />
            }

          />

          <StatCard

            title="Space"

            value={
              member.space.name
            }

            icon={
              <Users className="h-8 w-8 text-cyan-400" />
            }

          />

        </div>

      </section>

      {/* Permission Matrix */}

      <section className="rounded-3xl border border-white/10 bg-[#111827] p-7">

        <div className="mb-8">

          <h2 className="text-2xl font-bold text-white">

            Permission Matrix

          </h2>

          <p className="mt-2 text-slate-400">

            Access granted based on the current member role.

          </p>

        </div>

        <div className="grid gap-5 lg:grid-cols-2">
                  {cards.map((permission) => (

          <PermissionCard
            key={permission.title}
            title={permission.title}
            description={permission.description}
            enabled={permission.enabled}
          />

        ))}

        </div>

      </section>

      {/* Role Hierarchy */}

      <section className="rounded-3xl border border-white/10 bg-[#111827] p-7">

        <div className="mb-8">

          <h2 className="text-2xl font-bold text-white">

            Workspace Role Hierarchy

          </h2>

          <p className="mt-2 text-slate-400">

            Higher roles automatically inherit permissions from lower roles.

          </p>

        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">

          <RoleCard
            title="OWNER"
            color="yellow"
            permissions={[
              "Everything",
              "Delete Workspace",
              "Transfer Ownership",
              "Manage Billing",
            ]}
          />

          <RoleCard
            title="ADMIN"
            color="indigo"
            permissions={[
              "Manage Members",
              "Manage Spaces",
              "Manage Projects",
              "Manage Tasks",
            ]}
          />

          <RoleCard
            title="MANAGER"
            color="cyan"
            permissions={[
              "Manage Projects",
              "Manage Tasks",
              "Manage Files",
              "Reports",
            ]}
          />

          <RoleCard
            title="MEMBER"
            color="emerald"
            permissions={[
              "Assigned Tasks",
              "Comments",
              "Upload Files",
              "View Projects",
            ]}
          />

          <RoleCard
            title="VIEWER"
            color="slate"
            permissions={[
              "View Workspace",
              "Read Tasks",
              "Read Files",
            ]}
          />

        </div>

      </section>

    </main>

  );

}

/* ------------------------- */
/* Helper Components */
/* ------------------------- */

function PermissionSummaryRow({
  label,
  value,
}: {
  label: string;
  value: boolean;
}) {

  return (

    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900 px-4 py-3">

      <span className="text-sm text-slate-300">

        {label}

      </span>

      {value ? (

        <CheckCircle2 className="h-5 w-5 text-emerald-400" />

      ) : (

        <XCircle className="h-5 w-5 text-red-400" />

      )}

    </div>

  );

}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {

  return (

    <div className="rounded-3xl border border-white/10 bg-[#111827] p-7">

      <div className="flex items-center justify-between">

        {icon}

        <p className="text-xs uppercase tracking-widest text-slate-500">

          {title}

        </p>

      </div>

      <h3 className="mt-6 text-3xl font-bold text-white">

        {value}

      </h3>

    </div>

  );

}

function PermissionCard({
  title,
  description,
  enabled,
}: {
  title: string;
  description: string;
  enabled: boolean;
}) {

  return (

    <div
      className={`rounded-2xl border p-6 transition ${
        enabled
          ? "border-emerald-500/20 bg-emerald-500/5"
          : "border-red-500/20 bg-red-500/5"
      }`}
    >

      <div className="flex items-center justify-between">

        <h3 className="font-semibold text-white">

          {title}

        </h3>

        {enabled ? (

          <CheckCircle2 className="h-6 w-6 text-emerald-400" />

        ) : (

          <XCircle className="h-6 w-6 text-red-400" />

        )}

      </div>

      <p className="mt-3 text-sm text-slate-400">

        {description}

      </p>

    </div>

  );

}

function RoleCard({
  title,
  permissions,
  color,
}: {
  title: string;
  permissions: string[];
  color: string;
}) {

  const colors: Record<string, string> = {

    yellow:
      "border-yellow-500/20 bg-yellow-500/5 text-yellow-300",

    indigo:
      "border-indigo-500/20 bg-indigo-500/5 text-indigo-300",

    cyan:
      "border-cyan-500/20 bg-cyan-500/5 text-cyan-300",

    emerald:
      "border-emerald-500/20 bg-emerald-500/5 text-emerald-300",

    slate:
      "border-slate-500/20 bg-slate-500/5 text-slate-300",

  };

  return (

    <div className={`rounded-3xl border p-6 ${colors[color]}`}>

      <h3 className="text-lg font-bold">

        {title}

      </h3>

      <ul className="mt-5 space-y-3 text-sm">

        {permissions.map((permission) => (

          <li
            key={permission}
            className="flex items-center gap-2"
          >

            <CheckCircle2 className="h-4 w-4" />

            {permission}

          </li>

        ))}

      </ul>

    </div>

  );

}