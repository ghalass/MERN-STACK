-- AlterTable
ALTER TABLE `site` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `typeparc` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Parc` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `typeparcId` INTEGER NULL,

    UNIQUE INDEX `Parc_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Engin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `parcId` INTEGER NULL,
    `siteId` INTEGER NULL,

    UNIQUE INDEX `Engin_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Typelubrifiant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Typelubrifiant_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lubrifiant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `typelubrifiantId` INTEGER NULL,

    UNIQUE INDEX `Lubrifiant_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Saisielubrifiant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `du` DATETIME(3) NOT NULL,
    `au` DATETIME(3) NOT NULL,
    `enginId` INTEGER NOT NULL,
    `lubrifiantId` INTEGER NOT NULL,
    `hrm` DOUBLE NOT NULL,
    `qte` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Parc` ADD CONSTRAINT `Parc_typeparcId_fkey` FOREIGN KEY (`typeparcId`) REFERENCES `Typeparc`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Engin` ADD CONSTRAINT `Engin_parcId_fkey` FOREIGN KEY (`parcId`) REFERENCES `Parc`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Engin` ADD CONSTRAINT `Engin_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lubrifiant` ADD CONSTRAINT `Lubrifiant_typelubrifiantId_fkey` FOREIGN KEY (`typelubrifiantId`) REFERENCES `Typelubrifiant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saisielubrifiant` ADD CONSTRAINT `Saisielubrifiant_enginId_fkey` FOREIGN KEY (`enginId`) REFERENCES `Engin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saisielubrifiant` ADD CONSTRAINT `Saisielubrifiant_lubrifiantId_fkey` FOREIGN KEY (`lubrifiantId`) REFERENCES `Lubrifiant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
