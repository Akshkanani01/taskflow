"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import {
  WorkspaceRole,
  NotificationPriority,
  NotificationType,
} from "@prisma/client";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  PermissionError,
  requirePermission,
  requireOwner,
} from "@/lib/rbac/server";
import {
  assertCanRemoveMember,
  assertCanChangeMemberRole,
  assertRoleTransition,
  assertValidRole,
} from "@/lib/permissions";

async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user;
}

async function getWorkspaceMember(
  workspaceId: string,
  userId: string
) {
  const member = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId,
      },
    },
  });

  if (!member) {
    throw new Error("Workspace member not found.");
  }

  return member;
}

interface ChangeRoleInput {
  workspaceId: string;
  targetUserId: string;
  role: WorkspaceRole;
}

export async function changeMemberRole({
  workspaceId,
  targetUserId,
  role,
}: ChangeRoleInput) {
  const currentUser = await getCurrentUser();

  try {
    await requirePermission(
      currentUser.id,
      workspaceId,
      "member.role.update"
    );
  } catch (error) {
    if (error instanceof PermissionError) {
      throw error;
    }
    throw error;
  }

  assertValidRole(role);

  const actor = await getWorkspaceMember(
    workspaceId,
    currentUser.id
  );

  const target = await getWorkspaceMember(
    workspaceId,
    targetUserId
  );

  assertCanChangeMemberRole(
    actor.userId,
    target.userId,
    actor.role,
    target.role
  );

  assertRoleTransition(target.role, role);

  await prisma.$transaction(async (tx) => {
    await tx.workspaceMember.update({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: targetUserId,
        },
      },
      data: {
        role,
      },
    });

    const spaces = await tx.space.findMany({
      where: {
        workspaceId,
      },
      select: {
        id: true,
      },
    });

    if (spaces.length) {
      await tx.spaceMember.updateMany({
        where: {
          userId: targetUserId,
          spaceId: {
            in: spaces.map((space) => space.id),
          },
        },
        data: {
          role,
        },
      });
    }

    await tx.notification.create({
      data: {
        userId: targetUserId,
        title: "Role Updated",
        message: `Your workspace role has been changed to ${role}.`,
        type: NotificationType.ROLE_CHANGED,
        priority: NotificationPriority.HIGH,
      },
    });

    await tx.auditLog.create({
      data: {
        workspaceId,
        actorId: actor.userId,
        action: "MEMBER_ROLE_CHANGED",
        target: target.userId,
        metadata: {
          previousRole: target.role,
          newRole: role,
        },
      },
    });

    const memberTasks = await tx.task.findMany({
      where: {
        space: {
          workspaceId,
        },
        taskAssignees: {
          some: {
            userId: targetUserId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (memberTasks.length) {
      await tx.taskActivity.createMany({
        data: memberTasks.map((task) => ({
          taskId: task.id,
          userId: actor.userId,
          action: "ROLE_CHANGED",
          message: `${currentUser.name ?? currentUser.email} changed member role to ${role}.`,
          metadata: {
            targetUserId,
            role,
          },
        })),
      });
    }
  });

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Member role updated successfully.",
  };
}

interface RemoveMemberInput {
  workspaceId: string;
  targetUserId: string;
}

export async function removeMember({
  workspaceId,
  targetUserId,
}: RemoveMemberInput) {
  const currentUser = await getCurrentUser();

  try {
    await requirePermission(
      currentUser.id,
      workspaceId,
      "member.remove"
    );
  } catch (error) {
    if (error instanceof PermissionError) {
      throw error;
    }
    throw error;
  }

  const actor = await getWorkspaceMember(
    workspaceId,
    currentUser.id
  );

  const target = await getWorkspaceMember(
    workspaceId,
    targetUserId
  );

  assertCanRemoveMember(
    actor.userId,
    target.userId,
    actor.role,
    target.role
  );

  if (target.role === "OWNER") {
    const ownerCount = await prisma.workspaceMember.count({
      where: {
        workspaceId,
        role: "OWNER",
      },
    });

    if (ownerCount <= 1) {
      throw new Error("Workspace must always have at least one owner.");
    }
  }

  await prisma.$transaction(async (tx) => {
    const spaces = await tx.space.findMany({
      where: {
        workspaceId,
      },
      select: {
        id: true,
      },
    });

    if (spaces.length) {
      await tx.spaceMember.deleteMany({
        where: {
          userId: targetUserId,
          spaceId: {
            in: spaces.map((space) => space.id),
          },
        },
      });
    }

    await tx.workspaceMember.delete({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: targetUserId,
        },
      },
    });

    await tx.workspaceInvite.deleteMany({
      where: {
        workspaceId,
        email: {
          equals: (
            await tx.user.findUnique({
              where: {
                id: targetUserId,
              },
              select: {
                email: true,
              },
            })
          )?.email,
        },
      },
    });

    await tx.notification.create({
      data: {
        userId: targetUserId,
        title: "Removed From Workspace",
        message: "You have been removed from the workspace.",
        type: NotificationType.SYSTEM,
        priority: NotificationPriority.HIGH,
      },
    });

    await tx.auditLog.create({
      data: {
        workspaceId,
        actorId: actor.userId,
        action: "MEMBER_REMOVED",
        target: target.userId,
        metadata: {
          role: target.role,
        },
      },
    });

    const tasks = await tx.task.findMany({
      where: {
        space: {
          workspaceId,
        },
        taskAssignees: {
          some: {
            userId: targetUserId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (tasks.length) {
      await tx.taskActivity.createMany({
        data: tasks.map((task) => ({
          taskId: task.id,
          userId: actor.userId,
          action: "MEMBER_REMOVED",
          message: `${currentUser.name ?? currentUser.email} removed a workspace member.`,
          metadata: {
            removedUserId: targetUserId,
          },
        })),
      });
    }
  });

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Member removed successfully.",
  };
}

interface LeaveWorkspaceInput {
  workspaceId: string;
}

export async function leaveWorkspace({
  workspaceId,
}: LeaveWorkspaceInput) {
  const currentUser = await getCurrentUser();

  const member = await getWorkspaceMember(
    workspaceId,
    currentUser.id
  );

  if (member.role === "OWNER") {
    const ownerCount = await prisma.workspaceMember.count({
      where: {
        workspaceId,
        role: "OWNER",
      },
    });

    if (ownerCount <= 1) {
      throw new Error("Transfer ownership before leaving the workspace.");
    }
  }

  await prisma.$transaction(async (tx) => {
    const spaces = await tx.space.findMany({
      where: {
        workspaceId,
      },
      select: {
        id: true,
      },
    });

    await tx.spaceMember.deleteMany({
      where: {
        userId: currentUser.id,
        spaceId: {
          in: spaces.map((space) => space.id),
        },
      },
    });

    await tx.workspaceMember.delete({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: currentUser.id,
        },
      },
    });

    await tx.auditLog.create({
      data: {
        workspaceId,
        actorId: currentUser.id,
        action: "MEMBER_LEFT",
        target: currentUser.id,
      },
    });
  });

  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

interface TransferOwnershipInput {
  workspaceId: string;
  newOwnerId: string;
}

export async function transferOwnership({
  workspaceId,
  newOwnerId,
}: TransferOwnershipInput) {
  const currentUser = await getCurrentUser();

  try {
    await requireOwner(currentUser.id, workspaceId);
  } catch (error) {
    if (error instanceof PermissionError) {
      throw error;
    }
    throw error;
  }

  

  const newOwner = await getWorkspaceMember(
    workspaceId,
    newOwnerId
  );

  if (newOwner.userId === currentUser.id) {
    throw new Error("You are already the owner.");
  }

  if (newOwner.role === "OWNER") {
    throw new Error("Selected member is already an owner.");
  }

  await prisma.$transaction(async (tx) => {
    await tx.workspaceMember.update({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: currentUser.id,
        },
      },
      data: {
        role: "ADMIN",
      },
    });

    await tx.workspaceMember.update({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: newOwnerId,
        },
      },
      data: {
        role: "OWNER",
      },
    });

    const spaces = await tx.space.findMany({
      where: {
        workspaceId,
      },
      select: {
        id: true,
      },
    });

    await tx.spaceMember.updateMany({
      where: {
        userId: currentUser.id,
        spaceId: {
          in: spaces.map((space) => space.id),
        },
      },
      data: {
        role: "ADMIN",
      },
    });

    await tx.spaceMember.updateMany({
      where: {
        userId: newOwnerId,
        spaceId: {
          in: spaces.map((space) => space.id),
        },
      },
      data: {
        role: "OWNER",
      },
    });

    await tx.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        ownerId: newOwnerId,
      },
    });

    await tx.notification.create({
      data: {
        userId: newOwnerId,
        title: "Workspace Ownership",
        message: "You are now the workspace owner.",
        type: NotificationType.ROLE_CHANGED,
        priority: NotificationPriority.URGENT,
      },
    });

    await tx.auditLog.create({
      data: {
        workspaceId,
        actorId: currentUser.id,
        action: "OWNERSHIP_TRANSFERRED",
        target: newOwnerId,
      },
    });
  });

  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

interface UpdateNotificationPreferencesInput {
  emailEnabled?: boolean;
  pushEnabled?: boolean;
  taskAssigned?: boolean;
  taskCompleted?: boolean;
  taskCommented?: boolean;
  mentions?: boolean;
  invites?: boolean;
}

export async function updateNotificationPreferences(
  input: UpdateNotificationPreferencesInput
) {
  const currentUser = await getCurrentUser();

  await prisma.notificationPreference.upsert({
    where: {
      userId: currentUser.id,
    },
    create: {
      userId: currentUser.id,
      ...input,
    },
    update: input,
  });

  revalidatePath("/dashboard/settings");

  return {
    success: true,
  };
}

interface UpdateProfileInput {
  name: string;
  image?: string;
}

export async function updateMemberProfile({
  name,
  image,
}: UpdateProfileInput) {
  const currentUser = await getCurrentUser();

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      name,
      image,
    },
  });

  revalidatePath("/dashboard");

  return {
    success: true,
  };
}
