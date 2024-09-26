import prisma from "../../db.server";

export const getCollectionData = async (session) => {
  try {
    const res = await prisma.Collection.findFirst({
      where: {
        userId: session.id,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};
