import { WorkspaceRole } from "@prisma/client";

export const ROLE_LEVEL = {

  VIEWER: 0,

  MEMBER: 1,

  MANAGER: 2,

  ADMIN: 3,

  OWNER: 4,

} as const;

export function hasRole(

  current: WorkspaceRole,

  required: WorkspaceRole

) {

  return (
    ROLE_LEVEL[current] >=
    ROLE_LEVEL[required]
  );

}

export function isOwner(
  role: WorkspaceRole
) {

  return role === "OWNER";

}

export function isAdmin(
  role: WorkspaceRole
) {

  return (
    role === "OWNER" ||
    role === "ADMIN"
  );

}

export function isManager(
  role: WorkspaceRole
) {

  return (
    role === "OWNER" ||
    role === "ADMIN" ||
    role === "MANAGER"
  );

}

export function canViewWorkspace(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "VIEWER"
  );

}

export function canCreateTask(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "MEMBER"
  );

}

export function canEditTask(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "MEMBER"
  );

}

export function canDeleteTask(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "ADMIN"
  );

}

export function canAssignTask(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "MANAGER"
  );

}

export function canManageProjects(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "MANAGER"
  );

}

export function canManageSpaces(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "ADMIN"
  );

}

export function canManageMembers(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "ADMIN"
  );

}

export function canManageWorkspace(
  role: WorkspaceRole
) {

  return role === "OWNER";

}
export function canChangeRole(
  actor: WorkspaceRole,
  target: WorkspaceRole
) {

  // Only OWNER & ADMIN

  if (!isAdmin(actor)) {

    return false;

  }

  // Nobody can modify OWNER except OWNER

  if (
    target === "OWNER" &&
    actor !== "OWNER"
  ) {

    return false;

  }

  return true;

}

export function canRemoveMember(
  actor: WorkspaceRole,
  target: WorkspaceRole
) {

  if (!isAdmin(actor)) {

    return false;

  }

  // ADMIN cannot remove OWNER

  if (
    target === "OWNER" &&
    actor !== "OWNER"
  ) {

    return false;

  }

  return true;

}

export function canTransferOwnership(
  actor: WorkspaceRole
) {

  return actor === "OWNER";

}

export function canDeleteWorkspace(
  actor: WorkspaceRole
) {

  return actor === "OWNER";

}

export function canInviteMembers(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "ADMIN"
  );

}

export function canArchiveProject(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "MANAGER"
  );

}

export function canRestoreProject(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "MANAGER"
  );

}

export function canCreateSpace(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "ADMIN"
  );

}

export function canDeleteSpace(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "ADMIN"
  );

}

export function canCreateProject(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "MANAGER"
  );

}

export function canDeleteProject(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "ADMIN"
  );

}

export function canUploadAttachment(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "MEMBER"
  );

}

export function canComment(
  role: WorkspaceRole
) {

  return hasRole(
    role,
    "MEMBER"
  );

}

export function canManageNotifications(
  role: WorkspaceRole
) {

  return role === "OWNER";

}
export function assertWorkspacePermission(
  actor: WorkspaceRole,
  required: WorkspaceRole
) {

  if (!hasRole(actor, required)) {

    throw new Error("Forbidden");

  }

}

/**
 * Prevent changing your own role.
 */

export function assertCanChangeMemberRole(
  actorId: string,
  targetId: string,
  actorRole: WorkspaceRole,
  targetRole: WorkspaceRole
) {

  if (!canChangeRole(actorRole, targetRole)) {

    throw new Error("Forbidden");

  }

  if (actorId === targetId) {

    throw new Error(
      "You cannot change your own role."
    );

  }

}

/**
 * Prevent removing yourself / owner.
 */

export function assertCanRemoveMember(
  actorId: string,
  targetId: string,
  actorRole: WorkspaceRole,
  targetRole: WorkspaceRole
) {

  if (!canRemoveMember(actorRole, targetRole)) {

    throw new Error("Forbidden");

  }

  if (actorId === targetId) {

    throw new Error(
      "You cannot remove yourself."
    );

  }

}

/**
 * Prevent removing the last owner.
 */

export function assertLastOwner(
  ownerCount: number,
  targetRole: WorkspaceRole
) {

  if (
    targetRole === "OWNER" &&
    ownerCount <= 1
  ) {

    throw new Error(
      "Workspace must always have at least one owner."
    );

  }

}

/**
 * Prevent transferring ownership to owner.
 */

export function assertOwnershipTransfer(
  actorRole: WorkspaceRole,
  targetRole: WorkspaceRole
) {

  if (!canTransferOwnership(actorRole)) {

    throw new Error("Forbidden");

  }

  if (targetRole === "OWNER") {

    throw new Error(
      "Selected member is already an owner."
    );

  }

}

/**
 * Validate role transition.
 */

export function assertRoleTransition(
  current: WorkspaceRole,
  next: WorkspaceRole
) {

  if (current === next) {

    throw new Error(
      "Role is already assigned."
    );

  }

}

/**
 * Prevent invalid role values.
 */

export function assertValidRole(
  role: WorkspaceRole
) {

  const roles: WorkspaceRole[] = [

    "OWNER",

    "ADMIN",

    "MANAGER",

    "MEMBER",

    "VIEWER",

  ];

  if (!roles.includes(role)) {

    throw new Error(
      "Invalid role."
    );

  }

}