import { notFound } from "next/navigation";

import {
  User2,
  Bell,
  Shield,
  Settings,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

import ProfileCard from "@/components/member-settings/profile-card";
import NotificationSettings from "@/components/member-settings/notification-settings";
import WorkspaceSettingsCard from "@/components/member-settings/workspace-settings-card";
import DangerZone from "@/components/member-settings/danger-zone";

interface Props {
  params: Promise<{
    id: string;
    memberId: string;
  }>;
}

export default async function MemberSettingsPage({
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

  const notificationPreference =
    await prisma.notificationPreference.findUnique({

      where: {

        userId: memberId,

      },

    });

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <section className="rounded-3xl border border-white/10 bg-[#111827] p-8">

        <div className="flex items-center gap-5">

          {member.user.image ? (

            <img
              src={member.user.image}
              alt=""
              className="h-24 w-24 rounded-full border-4 border-white/10 object-cover"
            />

          ) : (

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-4xl font-bold text-white">

              {(member.user.name ??
                member.user.email)
                .charAt(0)
                .toUpperCase()}

            </div>

          )}

          <div>

            <h1 className="text-3xl font-bold text-white">

              Member Settings

            </h1>

            <p className="mt-2 text-slate-400">

              Manage profile, notifications,
              workspace preferences and security.

            </p>

          </div>

        </div>

      </section>

      {/* PROFILE */}

      <ProfileCard

        member={member}

      />

      {/* NOTIFICATIONS */}

      <NotificationSettings

        preference={notificationPreference}

      />

      {/* WORKSPACE */}

      <WorkspaceSettingsCard

        member={member}

      />

      {/* DANGER */}

      <DangerZone

        member={member}

      />

    </div>

  );

}