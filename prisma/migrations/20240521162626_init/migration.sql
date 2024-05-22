-- DropIndex
DROP INDEX "changes_createdAt_idx";

-- DropIndex
DROP INDEX "groseries_id_idx";

-- CreateIndex
CREATE INDEX "changes_createdAt_groceryId_idx" ON "changes"("createdAt" DESC, "groceryId");

-- CreateIndex
CREATE INDEX "groseries_id_userId_idx" ON "groseries"("id", "userId");
