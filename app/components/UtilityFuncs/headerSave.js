import prisma from "../../db.server";
import logger from "./logger";
export const saveHeader = async (session, formdata) => {
  const data = formdata.get("headerData");
  try {
    if (!data) throw new Error("Header data is undefined");
    const {
      logoIcon,
      menuIcon,
      profileIcon,
      menuIconcolor,
      profileIconColor,
      logoIconColor,
      backgroundColor,
      logoAlignment,
      iconsAlignment
    } = JSON.parse(data);

    const exist = await prisma.Logo.findFirst({
      where: {
        userId: session.id,
      },
    });

    if (exist) {
      const res = await prisma.Logo.update({
        where: {
          userId: session.id,
        },
        data: {
          menuIcon: menuIcon,
          logoIcon: logoIcon,
          profileIcon: profileIcon,
          menuIconcolor: JSON.stringify(menuIconcolor),
          profileIconColor: JSON.stringify(profileIconColor),
          logoIconColor: JSON.stringify(logoIconColor),
          backgroundColor: JSON.stringify(backgroundColor),
          logoAlignment: JSON.stringify(logoAlignment),
          iconsAlignment: JSON.stringify(iconsAlignment),
        },
      });
      return res;
    }

    const res = await prisma.Logo.create({
      data: {
        userId: session.id,
        menuIcon: menuIcon,
        logoIcon: logoIcon,
        profileIcon: profileIcon,
        menuIconcolor: JSON.stringify(menuIconcolor),
        profileIconColor: JSON.stringify(profileIconColor),
        logoIconColor: JSON.stringify(logoIconColor),
        backgroundColor: JSON.stringify(backgroundColor),
        logoAlignment: JSON.stringify(logoAlignment),
        iconsAlignment: JSON.stringify(iconsAlignment),
      },
    });
  } catch (error) {
    logger.error(error.message, error);
    console.log("Error creating logo:", error);
    throw new Error("Error creating Header:", error);
  }
};
