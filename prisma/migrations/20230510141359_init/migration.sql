/*
  Warnings:

  - Made the column `lyric` on table `Music` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Music` MODIFY `lyric` TEXT NOT NULL;
