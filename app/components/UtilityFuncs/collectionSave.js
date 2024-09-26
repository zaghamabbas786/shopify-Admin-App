import prisma from "../../db.server";
export const saveCollection = async (session, formdata) => {
  const data = formdata.get("collectionData");
  let res;
  const { collection } = JSON.parse(data);

  try {
    const exist = await prisma.Collection.findFirst({
      where: {
        userId: session.id,
      },
    });

    if (exist) {
      res = await prisma.Collection.update({
        where: {
          userId: session.id,
        },
        data: {
          collectionData: JSON.stringify(collection),
        },
      });
      return res;
    }

    res = await prisma.Collection.create({
      data: {
        userId: session.id,
        collectionData: JSON.stringify(collection),
      },
    });
    return res;
  } catch (error) {
    throw new Error("Error creating collectionData", error);
  }
};
