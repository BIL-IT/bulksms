-- CreateTable
CREATE TABLE "Cron" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "to" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Cron_pkey" PRIMARY KEY ("id")
);
