import {
  NotificationPreference,
  Space,
  SpaceMember,
  User,
  Workspace,
  WorkspaceRole,
} from "@prisma/client";

export type MemberUser = User;

export type MemberWorkspace = Workspace;

export interface MemberSpace
  extends Space {
  workspace: MemberWorkspace;
}

export interface MemberSettingsData
  extends SpaceMember {
  user: MemberUser;
  space: MemberSpace;
}

export type NotificationPreferenceData =
  NotificationPreference;

export interface ProfileCardProps {
  member: MemberSettingsData;
}

export interface WorkspaceSettingsCardProps {
  member: MemberSettingsData;
}

export interface DangerZoneProps {
  member: MemberSettingsData;
}

export interface NotificationSettingsProps {
  preference:
    | NotificationPreferenceData
    | null;
}

export interface UpdateProfileInput {
  name: string;
  image?: string;
}

export interface LeaveWorkspaceInput {
  workspaceId: string;
}

export interface RemoveMemberInput {
  workspaceId: string;
  targetUserId: string;
}

export interface TransferOwnershipInput {
  workspaceId: string;
  newOwnerId: string;
}

export interface NotificationToggleInput {
  emailEnabled: boolean;
  pushEnabled: boolean;
  taskAssigned: boolean;
  taskCompleted: boolean;
  taskCommented: boolean;
  mentions: boolean;
  invites: boolean;
}

export interface MemberStats {

  assignedTasks: number;

  completedTasks: number;

  activityCount: number;

  attachmentCount: number;

}