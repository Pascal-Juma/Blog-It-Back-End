/*
  Warnings:

  - You are about to drop the `entries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "entries" DROP CONSTRAINT "entries_author_id_fkey";

-- DropTable
DROP TABLE "entries";
