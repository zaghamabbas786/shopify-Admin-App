-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" TIMESTAMP(3),
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealOfTheDay" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "promotionData" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "DealOfTheDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturedCollection" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "collectionHandle" TEXT NOT NULL,
    "isChecked" BOOLEAN NOT NULL,

    CONSTRAINT "FeaturedCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcment" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "announcmentText" TEXT NOT NULL DEFAULT '',
    "crossIcon" TEXT NOT NULL DEFAULT '',
    "announcementSvgColor" TEXT NOT NULL DEFAULT '',
    "alignAnnounceText" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Announcment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logo" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "menuIcon" TEXT NOT NULL DEFAULT '',
    "logoIcon" TEXT NOT NULL DEFAULT '',
    "profileIcon" TEXT NOT NULL DEFAULT '',
    "menuIconcolor" TEXT NOT NULL DEFAULT '',
    "profileIconColor" TEXT NOT NULL DEFAULT '',
    "logoIconColor" TEXT NOT NULL DEFAULT '',
    "backgroundColor" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Logo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuConFig" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "menuItme" TEXT NOT NULL,
    "menuColor" TEXT NOT NULL,
    "fontWeight" TEXT NOT NULL DEFAULT '',
    "socialLinks" TEXT NOT NULL DEFAULT '',
    "socialIcon1" TEXT NOT NULL DEFAULT '',
    "socialIcon2" TEXT NOT NULL DEFAULT '',
    "socialIcon3" TEXT NOT NULL DEFAULT '',
    "socialIcon4" TEXT NOT NULL DEFAULT '',
    "socialicon1Color" TEXT NOT NULL DEFAULT '',
    "socialicon2Color" TEXT NOT NULL DEFAULT '',
    "socialicon3Color" TEXT NOT NULL DEFAULT '',
    "socialicon4Color" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "MenuConFig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Splash" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "heading" TEXT NOT NULL DEFAULT '',
    "headingColor" TEXT NOT NULL DEFAULT '',
    "subHeading" TEXT NOT NULL DEFAULT '',
    "subHeadingColor" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL,

    CONSTRAINT "Splash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BottomBar" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "bottomBarData" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "BottomBar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewArrival" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "newArrivalData" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "NewArrival_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "collectionData" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroBanner" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "heroBannerData" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "HeroBanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionSorting" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "collectionSorting" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "CollectionSorting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductGrid" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "productGridData" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ProductGrid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTile" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "fontWeightProductType" TEXT NOT NULL DEFAULT '',
    "fontWeightProductTitle" TEXT NOT NULL DEFAULT '',
    "fontWeightProductDescription" TEXT NOT NULL DEFAULT '',
    "fontWeightProductPrice" TEXT NOT NULL DEFAULT '',
    "fontWeightProductDiscountPrice" TEXT NOT NULL DEFAULT '',
    "productTypeColor" TEXT NOT NULL DEFAULT '',
    "productTitleColor" TEXT NOT NULL DEFAULT '',
    "productDescriptionColor" TEXT NOT NULL DEFAULT '',
    "productPriceColor" TEXT NOT NULL DEFAULT '',
    "productDiscountPriceColor" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ProductTile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PdpElements" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "pdpData" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "PdpElements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DealOfTheDay_userId_key" ON "DealOfTheDay"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturedCollection_userId_key" ON "FeaturedCollection"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Announcment_userId_key" ON "Announcment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Logo_userId_key" ON "Logo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MenuConFig_userId_key" ON "MenuConFig"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Splash_userId_key" ON "Splash"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BottomBar_userId_key" ON "BottomBar"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NewArrival_userId_key" ON "NewArrival"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_userId_key" ON "Collection"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HeroBanner_userId_key" ON "HeroBanner"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionSorting_userId_key" ON "CollectionSorting"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductGrid_userId_key" ON "ProductGrid"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTile_userId_key" ON "ProductTile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PdpElements_userId_key" ON "PdpElements"("userId");

-- AddForeignKey
ALTER TABLE "DealOfTheDay" ADD CONSTRAINT "DealOfTheDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturedCollection" ADD CONSTRAINT "FeaturedCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcment" ADD CONSTRAINT "Announcment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logo" ADD CONSTRAINT "Logo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuConFig" ADD CONSTRAINT "MenuConFig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Splash" ADD CONSTRAINT "Splash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BottomBar" ADD CONSTRAINT "BottomBar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewArrival" ADD CONSTRAINT "NewArrival_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroBanner" ADD CONSTRAINT "HeroBanner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionSorting" ADD CONSTRAINT "CollectionSorting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductGrid" ADD CONSTRAINT "ProductGrid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTile" ADD CONSTRAINT "ProductTile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PdpElements" ADD CONSTRAINT "PdpElements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
