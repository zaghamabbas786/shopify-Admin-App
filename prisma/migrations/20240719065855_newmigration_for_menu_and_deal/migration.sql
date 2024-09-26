-- AlterTable
ALTER TABLE "DealOfTheDay" ADD COLUMN     "bannerButtonAlign" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "bannerHeadingAlign" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "bannerTimerAlign" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "MenuConFig" ADD COLUMN     "dealText" TEXT NOT NULL DEFAULT '';
