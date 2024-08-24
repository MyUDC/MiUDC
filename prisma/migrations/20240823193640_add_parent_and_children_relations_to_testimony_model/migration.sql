-- AlterTable
ALTER TABLE "Testimony" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "Testimony" ADD CONSTRAINT "Testimony_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Testimony"("id") ON DELETE SET NULL ON UPDATE CASCADE;
