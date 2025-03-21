/*
  Warnings:

  - You are about to drop the column `createdAt` on the `engin` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `engin` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `lubrifiant` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `lubrifiant` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `panne` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `panne` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `parc` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `parc` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `saisiehim` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `saisiehim` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `saisiehrm` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `saisiehrm` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `saisielubrifiant` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `saisielubrifiant` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `site` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `site` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `typelubrifiant` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `typelubrifiant` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `typepanne` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `typepanne` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `typeparc` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `typeparc` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `engin` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `lubrifiant` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `panne` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `parc` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `saisiehim` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `saisiehrm` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `saisielubrifiant` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `site` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `typelubrifiant` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `typepanne` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `typeparc` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
