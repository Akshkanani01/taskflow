/*
  Warnings:

  - The values [Manager] on the enum `WorkspaceRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WorkspaceRole_new" AS ENUM ('OWNER', 'MANAGER', 'ADMIN', 'MEMBER', 'VIEWER');
ALTER TABLE "public"."SpaceMember" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."WorkspaceInvite" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."WorkspaceMember" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "WorkspaceMember" ALTER COLUMN "role" TYPE "WorkspaceRole_new" USING ("role"::text::"WorkspaceRole_new");
ALTER TABLE "WorkspaceInvite" ALTER COLUMN "role" TYPE "WorkspaceRole_new" USING ("role"::text::"WorkspaceRole_new");
ALTER TABLE "SpaceMember" ALTER COLUMN "role" TYPE "WorkspaceRole_new" USING ("role"::text::"WorkspaceRole_new");
ALTER TYPE "WorkspaceRole" RENAME TO "WorkspaceRole_old";
ALTER TYPE "WorkspaceRole_new" RENAME TO "WorkspaceRole";
DROP TYPE "public"."WorkspaceRole_old";
ALTER TABLE "SpaceMember" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
ALTER TABLE "WorkspaceInvite" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
ALTER TABLE "WorkspaceMember" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
COMMIT;
