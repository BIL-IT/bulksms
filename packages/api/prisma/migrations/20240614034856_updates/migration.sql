-- AlterTable
ALTER TABLE "Sms" ADD COLUMN     "branchCode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "partyCode" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" TEXT NOT NULL DEFAULT '';
