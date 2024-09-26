import prisma from "../../db.server";

export const saveTocken = async (tocken, session) => {
  try {
    res = await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        storefrontAccessToken: tocken,
      },
    });
    return res;
  } catch (error) {
    return JSON.stringify(error);
    // throw new Error("error creating Store Front Tocken", error);
  }
};
