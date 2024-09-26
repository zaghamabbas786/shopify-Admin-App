import prisma from "../../db.server";
export const savePdpElements = async (session, formdata) => {
  const data = formdata.get("pdpData");
  try {
    if (!data) throw new Error("pdpData is undefined");
    let res;
    const { pdpElements } = JSON.parse(data);

    const exist = await prisma.pdpElements.findFirst({
      where: {
        userId: session.id,
      },
    });

    if (exist) {
      res = await prisma.pdpElements.update({
        where: {
          userId: session.id,
        },
        data: {
          pdpData: JSON.stringify(pdpElements),
        },
      });
      return res;
    }

    res = await prisma.pdpElements.create({
      data: {
        userId: session.id,
        pdpData: JSON.stringify(pdpElements),
      },
    });
    return res;
  } catch (error) {
    throw new Error("Error creating pdpData", error);
  }
};
