import prisma from "../../db.server";
export const saveTile = async (session, formdata) => {
  const data = formdata.get("productTileData");
  try {
    if (!data) throw new Error("Product Tiles Data is undefined");
    let res;

    const {
      grid: {
        fontWeightProductType,
        fontWeightProductTitle,
        fontWeightProductDescription,
        fontWeightProductPrice,
        fontWeightProductDiscountPrice,
        productTypeColor,
        productTitleColor,
        productDescriptionColor,
        productPriceColor,
        productDiscountPriceColor,
      },
    } = JSON.parse(data);

    const exist = await prisma.ProductTile.findFirst({
      where: {
        userId: session.id,
      },
    });

    if (exist) {
      res = await prisma.ProductTile.update({
        where: {
          userId: session.id,
        },
        data: {
          fontWeightProductType: fontWeightProductType,
          fontWeightProductTitle: fontWeightProductTitle,
          fontWeightProductDescription: fontWeightProductDescription,
          fontWeightProductPrice: fontWeightProductPrice,
          fontWeightProductDiscountPrice: fontWeightProductDiscountPrice,
          productTypeColor: JSON.stringify(productTypeColor),
          productTitleColor: JSON.stringify(productTitleColor),
          productDescriptionColor: JSON.stringify(productDescriptionColor),
          productPriceColor: JSON.stringify(productPriceColor),
          productDiscountPriceColor: JSON.stringify(productDiscountPriceColor),
        },
      });
      return res;
    }

    res = await prisma.ProductTile.create({
      data: {
        userId: session.id,
        fontWeightProductType: fontWeightProductType,
        fontWeightProductTitle: fontWeightProductTitle,
        fontWeightProductDescription: fontWeightProductDescription,
        fontWeightProductPrice: fontWeightProductPrice,
        fontWeightProductDiscountPrice: fontWeightProductDiscountPrice,
        productTypeColor: JSON.stringify(productTypeColor),
        productTitleColor: JSON.stringify(productTitleColor),
        productDescriptionColor: JSON.stringify(productDescriptionColor),
        productPriceColor: JSON.stringify(productPriceColor),
        productDiscountPriceColor: JSON.stringify(productDiscountPriceColor),
      },
    });
    return res;
  } catch (error) {
    console.log("Error creating Tiles:", error);
    return new Error("Error creating Tiles:", error);
  }
};
