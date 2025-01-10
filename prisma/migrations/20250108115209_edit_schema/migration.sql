/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `refreshtoken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customer` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `refreshtoken` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `user` MODIFY `updatedAt` DATETIME(3) NULL;
