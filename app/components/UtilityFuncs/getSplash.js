import { PrismaClient } from "@prisma/client";
import prisma from "../../db.server";

export const getSplashData = async (session) => {
  try {
      const response = await prisma.Splash.findFirst({
      where: {
        userId: session.id,
      },
    });
    return response;
  } catch (error) {
    console.log("error", error);
  }
};
