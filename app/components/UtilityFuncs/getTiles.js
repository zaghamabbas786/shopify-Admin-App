import prisma from "../../db.server";

export const getTilesData = async (session) => {
  try {
    const res = await prisma.ProductTile.findFirst({
      where: {
        userId: session.id,
      },
    });
    return res;
  } catch (error) {
    console.log("Tile Error", error);
  }
};
