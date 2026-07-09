export type SpaceRole =
  | "OWNER"
  | "MANAGER"
  | "MEMBER"
  | "VIEWER";

export interface PermissionItem {
  id: string;
  label: string;
}

export interface PermissionGroup {
  title: string;
  permissions: PermissionItem[];
}