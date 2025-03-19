/*
  Warnings:

  - You are about to drop the column `au` on the `saisielubrifiant` table. All the data in the column will be lost.
  - You are about to drop the column `du` on the `saisielubrifiant` table. All the data in the column will be lost.
  - You are about to drop the column `enginId` on the `saisielubrifiant` table. All the data in the column will be lost.
  - You are about to drop the column `hrm` on the `saisielubrifiant` table. All the data in the column will be lost.
  - You are about to drop the `workout` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `saisiehimId` to the `Saisielubrifiant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `saisielubrifiant` DROP FOREIGN KEY `Saisielubrifiant_enginId_fkey`;

-- DropIndex
DROP INDEX `Saisielubrifiant_enginId_fkey` ON `saisielubrifiant`;

-- AlterTable
ALTER TABLE `saisiehim` ADD COLUMN `obs` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `saisielubrifiant` DROP COLUMN `au`,
    DROP COLUMN `du`,
    DROP COLUMN `enginId`,
    DROP COLUMN `hrm`,
    ADD COLUMN `obs` VARCHAR(191) NULL,
    ADD COLUMN `saisiehimId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('SUPER_ADMIN', 'ADMIN', 'AGENT_SAISIE', 'USER', 'UNASSIGNED') NOT NULL DEFAULT 'UNASSIGNED';

-- DropTable
DROP TABLE `workout`;

-- AddForeignKey
ALTER TABLE `Saisielubrifiant` ADD CONSTRAINT `Saisielubrifiant_saisiehimId_fkey` FOREIGN KEY (`saisiehimId`) REFERENCES `Saisiehim`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
