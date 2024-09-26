import prisma from "../../db.server";

export const getGridsData = async (session) => {
  try {
    const res = await prisma.ProductGrid.findFirst({
      where: {
        userId: session.id,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};
