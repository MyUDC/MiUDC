/*
  Warnings:

  - Added the required column `semesters` to the `Career` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Career" ADD COLUMN     "semesters" INTEGER NOT NULL;
