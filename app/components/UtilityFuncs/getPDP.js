import prisma from "../../db.server";

export const getPdpData = async (session) => {
  try {
    const res = await prisma.PdpElements.findFirst({
      where: {
        userId: session.id,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};
