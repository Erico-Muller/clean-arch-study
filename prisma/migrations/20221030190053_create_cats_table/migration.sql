-- CreateTable
CREATE TABLE "cats" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "age" SMALLINT NOT NULL,
    "breed" VARCHAR(30) NOT NULL,

    CONSTRAINT "cats_pkey" PRIMARY KEY ("id")
);
