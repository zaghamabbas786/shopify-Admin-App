import prisma from "../../db.server";
export const getPromotionData = async (session) => {
  try {
    const res = await prisma.DealOfTheDay.findFirst({
      where: {
        userId: session.id,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};
