/*
  Warnings:

  - The values [FINALIZING] on the enum `SearchStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SearchStatus_new" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');
ALTER TABLE "public"."Search" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Search" ALTER COLUMN "status" TYPE "SearchStatus_new" USING ("status"::text::"SearchStatus_new");
ALTER TYPE "SearchStatus" RENAME TO "SearchStatus_old";
ALTER TYPE "SearchStatus_new" RENAME TO "SearchStatus";
DROP TYPE "public"."SearchStatus_old";
ALTER TABLE "Search" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
