/*
  Warnings:

  - Made the column `hash` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hashedRt` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "hash" SET NOT NULL,
ALTER COLUMN "hashedRt" SET NOT NULL;
