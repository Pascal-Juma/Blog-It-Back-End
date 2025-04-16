-- CreateTable
CREATE TABLE "entries" (
    "id" TEXT NOT NULL,
    "entry_title" TEXT NOT NULL,
    "entry_description" TEXT NOT NULL,
    "entry_content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "author_id" TEXT NOT NULL,
    "is_pinned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "entries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "entries" ADD CONSTRAINT "entries_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
