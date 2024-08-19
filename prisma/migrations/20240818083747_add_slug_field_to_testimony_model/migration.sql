/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Testimony` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Testimony" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Testimony_slug_key" ON "Testimony"("slug");
