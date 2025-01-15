-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountNumbre" INTEGER,
ADD COLUMN     "careerId" TEXT,
ADD COLUMN     "semester" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE SET NULL ON UPDATE CASCADE;
