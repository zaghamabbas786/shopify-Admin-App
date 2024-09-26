import prisma from "../../db.server";
export const getAnnouncementData = async (session) => {
  try {
    const res = await prisma.Announcment.findFirst({
      where: {
        userId: session.id,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};
