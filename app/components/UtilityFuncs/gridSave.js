import prisma from "../../db.server";
export const saveGrid = async (session, formdata) => {
  const data = formdata.get("productGridData");
  let res;
  const { grids } = JSON.parse(data);

  try {
    const exist = await prisma.ProductGrid.findFirst({
      where: {
        userId: session.id,
      },
    });

    if (exist) {
      res = await prisma.ProductGrid.update({
        where: {
          userId: session.id,
        },
        data: {
          productGridData: JSON.stringify(grids),
        },
      });
      return res;
    }

    res = await prisma.ProductGrid.create({
      data: {
        userId: session.id,
        productGridData: JSON.stringify(grids),
        userId: session.id,
      },
    });
    return res;
  } catch (error) {
    throw new Error("error creating productGridData", error);
  }
};
