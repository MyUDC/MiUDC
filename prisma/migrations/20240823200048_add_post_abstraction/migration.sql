/*
  Warnings:

  - You are about to drop the column `testimonyId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Testimony` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestimonyLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "PostType" ADD VALUE 'REPLY';

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_testimonyId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_testimonyId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_careerId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionLike" DROP CONSTRAINT "QuestionLike_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionLike" DROP CONSTRAINT "QuestionLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "Testimony" DROP CONSTRAINT "Testimony_careerId_fkey";

-- DropForeignKey
ALTER TABLE "Testimony" DROP CONSTRAINT "Testimony_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Testimony" DROP CONSTRAINT "Testimony_userId_fkey";

-- DropForeignKey
ALTER TABLE "TestimonyLike" DROP CONSTRAINT "TestimonyLike_testimonyId_fkey";

-- DropForeignKey
ALTER TABLE "TestimonyLike" DROP CONSTRAINT "TestimonyLike_userId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "testimonyId",
ADD COLUMN     "PostId" TEXT;

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "QuestionLike";

-- DropTable
DROP TABLE "Testimony";

-- DropTable
DROP TABLE "TestimonyLike";

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "type" "PostType" NOT NULL,
    "userId" TEXT NOT NULL,
    "careerId" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostLike" (
    "id" TEXT NOT NULL,
    "PostId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_PostId_fkey" FOREIGN KEY ("PostId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_PostId_fkey" FOREIGN KEY ("PostId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
