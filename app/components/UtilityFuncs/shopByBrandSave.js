import prisma from "../../db.server";
export const saveShopByBrand = async (session, formdata) => {
  const data = formdata.get("shopByBrandData");
  let res;
  const { shopByBrand } = JSON.parse(data);

  try {
    const exist = await prisma.ShopByBrand.findFirst({
      where: {
        userId: session.id,
      },
    });

    if (exist) {
      res = await prisma.ShopByBrand.update({
        where: {
          userId: session.id,
        },
        data: {
            shopByBrandData: JSON.stringify(shopByBrand),
        },
      });
      return res;
    }

    res = await prisma.ShopByBrand.create({
      data: {
        userId: session.id,
        shopByBrandData: JSON.stringify(shopByBrand),
      },
    });
    return res;
  } catch (error) {
    throw new Error("Erro creating shopByBrandData", error);
  }
};
