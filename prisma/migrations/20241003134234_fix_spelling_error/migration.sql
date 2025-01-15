/*
  Warnings:

  - You are about to drop the column `accountNumbre` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountNumbre",
ADD COLUMN     "accountNumber" INTEGER;
