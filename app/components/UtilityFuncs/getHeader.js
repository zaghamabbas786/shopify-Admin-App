import prisma from "../../db.server";
export const getHeaderData = async (session) => {
  try {
    const res = await prisma.Logo.findFirst({
      where: {
        userId: session.id,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};
