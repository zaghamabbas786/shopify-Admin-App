import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getBannersData = async (session) => {
  try {
    const res = await prisma.HeroBanner.findFirst({
      where: {
        userId: session.id,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};
