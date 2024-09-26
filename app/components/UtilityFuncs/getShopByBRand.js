import prisma from "../../db.server";

export const getShopByBrandData = async (session) => {
  try {
    const res = await prisma.ShopByBrand.findFirst({
      where: {
        userId: session.id,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};
