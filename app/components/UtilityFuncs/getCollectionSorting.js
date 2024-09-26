import prisma from "../../db.server";

export const getCollectionSortingData = async (session) => {
  try {
    const res = await prisma.CollectionSorting.findFirst({
      where: {
        userId: session.id,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};
