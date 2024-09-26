import prisma from "../../db.server";
export const saveNewArrival = async (session, formdata) => {
  const data = formdata.get("newArrivalData");
  let res;
  const { newArrival } = JSON.parse(data);

  try {
    const exist = await prisma.NewArrival.findFirst({
      where: {
        userId: session.id,
      },
    });

    if (exist) {
      res = await prisma.NewArrival.update({
        where: {
          userId: session.id,
        },
        data: {
          newArrivalData: JSON.stringify(newArrival),
        },
      });
      return res;
    }

    res = await prisma.NewArrival.create({
      data: {
        userId: session.id,
        newArrivalData: JSON.stringify(newArrival),
      },
    });
    return res;
  } catch (error) {
    throw new Error("Erro creting newArrivalData", error);
  }
};
