/*
  Warnings:

  - You are about to drop the `Grocery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Update` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Grocery" DROP CONSTRAINT "Grocery_userId_fkey";

-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_groceryId_fkey";

-- DropTable
DROP TABLE "Grocery";

-- DropTable
DROP TABLE "Update";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "hashedRt" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groseries" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "groseries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "changes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groceryId" INTEGER NOT NULL,

    CONSTRAINT "changes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "groseries_title_key" ON "groseries"("title");

-- CreateIndex
CREATE INDEX "changes_createdAt_idx" ON "changes"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "groseries" ADD CONSTRAINT "groseries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "changes" ADD CONSTRAINT "changes_groceryId_fkey" FOREIGN KEY ("groceryId") REFERENCES "groseries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
