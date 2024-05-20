-- CreateIndex
CREATE INDEX "groseries_id_idx" ON "groseries"("id");

-- CreateIndex
CREATE INDEX "users_id_email_idx" ON "users"("id", "email");
