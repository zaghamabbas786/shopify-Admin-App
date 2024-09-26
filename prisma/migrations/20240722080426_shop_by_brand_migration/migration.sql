-- CreateTable
CREATE TABLE "ShopByBrand" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "shopByBrandData" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ShopByBrand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShopByBrand_userId_key" ON "ShopByBrand"("userId");

-- AddForeignKey
ALTER TABLE "ShopByBrand" ADD CONSTRAINT "ShopByBrand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
