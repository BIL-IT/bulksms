-- CreateTable
CREATE TABLE "DemoSms" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sender" TEXT NOT NULL DEFAULT 'System',
    "branchCode" TEXT NOT NULL DEFAULT '',
    "partyCode" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT,

    CONSTRAINT "DemoSms_pkey" PRIMARY KEY ("id")
);
