-- DropForeignKey
ALTER TABLE "changes" DROP CONSTRAINT "changes_groceryId_fkey";

-- DropForeignKey
ALTER TABLE "groseries" DROP CONSTRAINT "groseries_userId_fkey";

-- AlterTable
ALTER TABLE "changes" ALTER COLUMN "groceryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "groseries" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "groseries" ADD CONSTRAINT "groseries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "changes" ADD CONSTRAINT "changes_groceryId_fkey" FOREIGN KEY ("groceryId") REFERENCES "groseries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
