import prisma from "../../db.server";
export const saveCollectionSorting = async (session, formdata) => {
  const data = formdata.get("collectionSorting");
  const gridData = formdata.get("productGridData");

  let res;
  const { collectionSorting } = JSON.parse(data);
  const { grids } = JSON.parse(gridData);

  const newData = grids
    ? grids
        ?.filter(
          (gridItem) =>
            !collectionSorting?.some(
              (collectionItem) => collectionItem.id === gridItem.id,
            ),
        )
        .map(({ id, gridTitle }) => ({
          id: id,
          title: gridTitle,
          type: "product-grid",
        }))
    : [];

  const updateCollection = [...collectionSorting, ...newData];
  try {
    const exist = await prisma.CollectionSorting.findFirst({
      where: {
        userId: session.id,
      },
    });

    if (exist) {
      res = await prisma.collectionSorting.update({
        where: {
          userId: session.id,
        },
        data: {
          collectionSorting: JSON.stringify(updateCollection),
        },
      });
      return res;
    }

    res = await prisma.CollectionSorting.create({
      data: {
        userId: session.id,
        collectionSorting: JSON.stringify(updateCollection),
      },
    });
    return res;
  } catch (error) {
    throw new Error("Error creating Collection Sorting", error);
  }
};
