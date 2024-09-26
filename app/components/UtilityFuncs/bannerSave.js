import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const saveBanner = async (session, formdata) => {
  const data = formdata.get("heroBannnerData");
  try {
    if (!data) throw new Error("Banner is undefined");
    let res;
    const { banners } = JSON.parse(data);

    const exist = await prisma.HeroBanner.findFirst({
      where: {
        userId: session.id,
      },
    });

    if (exist) {
      res = await prisma.HeroBanner.update({
        where: {
          userId: session.id,
        },
        data: {
          heroBannerData: JSON.stringify(banners),
        },
      });
      return res;
    }

    res = await prisma.HeroBanner.create({
      data: {
        userId: session.id,
        heroBannerData: JSON.stringify(banners),
        userId: session.id,
      },
    });
    return res;
  } catch (error) {
    console.log("Error creating Banner:", error);
    return null;
  }
};
