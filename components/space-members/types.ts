export type SpaceRole =
  | "OWNER"
  | "MANAGER"
  | "ADMIN"
  | "MEMBER"
  | "VIEWER";

export interface SpaceMember {
  id: string;

  name: string;

  email: string;

  avatar?: string | null;

  role: SpaceRole;

  joinedAt: string;

  taskCount: number;

  completedTasks: number;

  permissions?: string[];
}

export const ROLE_COLORS: Record<
  SpaceRole,
  string
> = {
  OWNER:
    "bg-violet-500/15 text-violet-300 border-violet-500/30",

  MANAGER:
    "bg-blue-500/15 text-blue-300 border-blue-500/30",

  ADMIN:
    "bg-amber-500/15 text-amber-300 border-amber-500/30",

  MEMBER:
    "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",

  VIEWER:
    "bg-zinc-700/40 text-zinc-300 border-zinc-600",
};



export const ROLE_OPTIONS: SpaceRole[] = [
  "OWNER",
  "MANAGER",
  "ADMIN",
  "MEMBER",
  "VIEWER",
];