/*
  Warnings:

  - You are about to alter the column `playCount` on the `Music` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Music` MODIFY `playCount` INTEGER NOT NULL DEFAULT 0;
