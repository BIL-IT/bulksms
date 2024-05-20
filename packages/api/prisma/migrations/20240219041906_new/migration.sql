/*
  Warnings:

  - You are about to drop the `SMS` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SMS";

-- CreateTable
CREATE TABLE "Sms" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Sms_pkey" PRIMARY KEY ("id")
);
