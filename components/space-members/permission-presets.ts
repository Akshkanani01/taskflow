import { SpaceRole } from "./permission-types";

export const ROLE_PERMISSIONS: Record<
  SpaceRole,
  string[]
> = {
  OWNER: [
    "Manage Space",
    "Invite Members",
    "Remove Members",
    "Change Roles",
    "Create Lists",
    "Edit Lists",
    "Delete Lists",
    "Create Tasks",
    "Edit Any Task",
    "Delete Tasks",
    "Assign Tasks",
    "Change Status",
    "Upload Attachments",
    "Comment",
    "View Reports",
  ],

  MANAGER: [
    "Invite Members",
    "Create Lists",
    "Edit Lists",
    "Create Tasks",
    "Edit Any Task",
    "Assign Tasks",
    "Change Status",
    "Upload Attachments",
    "Comment",
    "View Reports",
  ],

  MEMBER: [
    "Create Tasks",
    "Edit Assigned Tasks",
    "Change Status",
    "Upload Attachments",
    "Comment",
  ],

  VIEWER: [
    "View Tasks",
    "View Lists",
    "View Reports",
  ],
};