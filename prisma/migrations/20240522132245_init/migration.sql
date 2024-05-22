-- DropForeignKey
ALTER TABLE "changes" DROP CONSTRAINT "changes_groceryId_fkey";

-- DropForeignKey
ALTER TABLE "groseries" DROP CONSTRAINT "groseries_userId_fkey";

-- AddForeignKey
ALTER TABLE "groseries" ADD CONSTRAINT "groseries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "changes" ADD CONSTRAINT "changes_groceryId_fkey" FOREIGN KEY ("groceryId") REFERENCES "groseries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
