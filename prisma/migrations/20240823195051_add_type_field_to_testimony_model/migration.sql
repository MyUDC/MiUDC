/*
  Warnings:

  - Added the required column `type` to the `Testimony` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('QUESTION', 'TESTIMONY');

-- AlterTable
ALTER TABLE "Testimony" ADD COLUMN     "type" "PostType" NOT NULL;
