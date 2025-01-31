-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "short_code" TEXT NOT NULL,
    "original_url" TEXT NOT NULL,
    "user_id" INTEGER,
    "access_count" INTEGER DEFAULT 0,
    "last_access" TIMESTAMP(6),
    "delete_after_2_years" BOOLEAN DEFAULT true,
    "is_disabled" BOOLEAN DEFAULT false,
    "ip_creation" TEXT,
    "deactivate_in" TIMESTAMP(6),
    "creation_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "is_admin" BOOLEAN DEFAULT false,
    "is_banned" BOOLEAN DEFAULT false,
    "banned_reason" TEXT,
    "creation_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links_short_code_key" ON "links"("short_code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
