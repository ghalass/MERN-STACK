/*
  Warnings:

  - You are about to drop the column `reatedAt` on the `workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `workout` DROP COLUMN `reatedAt`,
    ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);
