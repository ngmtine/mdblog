-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "genre" VARCHAR(255),
    "create_date" DATE,
    "update_date" DATE,
    "published" BOOLEAN NOT NULL,
    "filetype" VARCHAR(20),
    "content" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
