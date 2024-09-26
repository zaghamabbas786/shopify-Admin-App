import prisma from "../../db.server";

export const getBottomBarData = async (session) => {
  try {
    const response = await prisma.BottomBar.findFirst({
      where: {
        userId: session.id,
      },
    });
    return response;
  } catch (error) {
    console.log("error", error);
  }
};
