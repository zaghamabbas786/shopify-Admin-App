import prisma from "../../db.server";
export const savePromotion = async (session, formdata) => {
  const data = formdata.get("promotionData");
  try {
    if (!data) throw new Error("Promotion is undefined");
    let res;
    const { promotions, alignBannerHeading, alignBannerButton, alignBannerTimer } = JSON.parse(data);
    console.log();
    const exist = await prisma.DealOfTheDay.findFirst({
      where: {
        userId: session.id,
      },
    });

    if (exist) {
      res = await prisma.DealOfTheDay.update({
        where: {
          userId: session.id,
        },
        data: {
          promotionData: JSON.stringify(promotions),
          bannerHeadingAlign: JSON.stringify(alignBannerHeading),
          bannerButtonAlign: JSON.stringify(alignBannerButton),
          bannerTimerAlign: JSON.stringify(alignBannerTimer),
        },
      });
      return res;
    }

    res = await prisma.DealOfTheDay.create({
      data: {
        userId: session.id,
        promotionData: JSON.stringify(promotions),
        bannerHeadingAlign: JSON.stringify(alignBannerHeading),
        bannerButtonAlign: JSON.stringify(alignBannerButton),
        bannerTimerAlign: JSON.stringify(alignBannerTimer),
      },
    });
    return res;
  } catch (error) {
    console.log("Error creating Promtion:", error);
    throw new Error("Error creating Promtion:", error);
  }
};
