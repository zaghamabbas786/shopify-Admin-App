import prisma from "../../db.server";
export const getMenuData = async (session) => {
  try {
    const res = await prisma.MenuConFig.findFirst({
      where: {
        userId: session.id,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};
