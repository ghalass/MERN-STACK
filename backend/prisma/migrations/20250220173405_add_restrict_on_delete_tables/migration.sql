-- DropForeignKey
ALTER TABLE `engin` DROP FOREIGN KEY `Engin_parcId_fkey`;

-- DropForeignKey
ALTER TABLE `engin` DROP FOREIGN KEY `Engin_siteId_fkey`;

-- DropForeignKey
ALTER TABLE `lubrifiant` DROP FOREIGN KEY `Lubrifiant_typelubrifiantId_fkey`;

-- DropForeignKey
ALTER TABLE `parc` DROP FOREIGN KEY `Parc_typeparcId_fkey`;

-- DropForeignKey
ALTER TABLE `saisielubrifiant` DROP FOREIGN KEY `Saisielubrifiant_enginId_fkey`;

-- DropForeignKey
ALTER TABLE `saisielubrifiant` DROP FOREIGN KEY `Saisielubrifiant_lubrifiantId_fkey`;

-- DropIndex
DROP INDEX `Engin_parcId_fkey` ON `engin`;

-- DropIndex
DROP INDEX `Engin_siteId_fkey` ON `engin`;

-- DropIndex
DROP INDEX `Lubrifiant_typelubrifiantId_fkey` ON `lubrifiant`;

-- DropIndex
DROP INDEX `Parc_typeparcId_fkey` ON `parc`;

-- DropIndex
DROP INDEX `Saisielubrifiant_enginId_fkey` ON `saisielubrifiant`;

-- DropIndex
DROP INDEX `Saisielubrifiant_lubrifiantId_fkey` ON `saisielubrifiant`;

-- AddForeignKey
ALTER TABLE `Parc` ADD CONSTRAINT `Parc_typeparcId_fkey` FOREIGN KEY (`typeparcId`) REFERENCES `Typeparc`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Engin` ADD CONSTRAINT `Engin_parcId_fkey` FOREIGN KEY (`parcId`) REFERENCES `Parc`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Engin` ADD CONSTRAINT `Engin_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lubrifiant` ADD CONSTRAINT `Lubrifiant_typelubrifiantId_fkey` FOREIGN KEY (`typelubrifiantId`) REFERENCES `Typelubrifiant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saisielubrifiant` ADD CONSTRAINT `Saisielubrifiant_enginId_fkey` FOREIGN KEY (`enginId`) REFERENCES `Engin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saisielubrifiant` ADD CONSTRAINT `Saisielubrifiant_lubrifiantId_fkey` FOREIGN KEY (`lubrifiantId`) REFERENCES `Lubrifiant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
