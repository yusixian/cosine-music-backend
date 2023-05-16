/*
  Warnings:

  - You are about to drop the `MusicTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlayListTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MusicTag` DROP FOREIGN KEY `MusicTag_musicId_fkey`;

-- DropForeignKey
ALTER TABLE `MusicTag` DROP FOREIGN KEY `MusicTag_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `PlayListTag` DROP FOREIGN KEY `PlayListTag_playlistId_fkey`;

-- DropForeignKey
ALTER TABLE `PlayListTag` DROP FOREIGN KEY `PlayListTag_tagId_fkey`;

-- DropTable
DROP TABLE `MusicTag`;

-- DropTable
DROP TABLE `PlayListTag`;

-- CreateTable
CREATE TABLE `_MusicToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MusicToTag_AB_unique`(`A`, `B`),
    INDEX `_MusicToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PlaylistToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PlaylistToTag_AB_unique`(`A`, `B`),
    INDEX `_PlaylistToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MusicToTag` ADD CONSTRAINT `_MusicToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Music`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MusicToTag` ADD CONSTRAINT `_MusicToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlaylistToTag` ADD CONSTRAINT `_PlaylistToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Playlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlaylistToTag` ADD CONSTRAINT `_PlaylistToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
