import prisma from "../../db.server";

export const getNewArrivalData = async (session) => {
  try {
    const res = await prisma.NewArrival.findFirst({
      where: {
        userId: session.id,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};
