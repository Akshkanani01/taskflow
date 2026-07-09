-- AlterTable
ALTER TABLE "WorkspaceInvite" ADD COLUMN     "spaceId" TEXT;

-- CreateIndex
CREATE INDEX "WorkspaceInvite_spaceId_idx" ON "WorkspaceInvite"("spaceId");

-- AddForeignKey
ALTER TABLE "WorkspaceInvite" ADD CONSTRAINT "WorkspaceInvite_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;
