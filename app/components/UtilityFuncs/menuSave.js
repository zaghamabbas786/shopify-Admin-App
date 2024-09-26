import prisma from "../../db.server";
export const saveMenue = async (session, formdata) => {
  const data = formdata.get("menuData");
  try {
    if (!data) {
      throw new Error(" Menu data is undefined");
    }
    let res;
    const {
      selectedWeight,
      menuItme,
      dealText,
      menuColor,
      socialIcon1,
      socialIcon2,
      socialIcon3,
      socialIcon4,
      socialicon1Color,
      socialicon2Color,
      socialicon3Color,
      socialicon4Color,
      socialMediaLinks,
      
    } = JSON.parse(data);

    const exist = await prisma.MenuConFig.findFirst({
      where: {
        userId: session.id,
      },
    });

    if (exist) {
      res = await prisma.MenuConFig.update({
        where: {
          userId: session.id,
        },
        data: {
          menuItme: JSON.stringify(menuItme),
          menuColor: JSON.stringify(menuColor),
          dealText: JSON.stringify(dealText),
          fontWeight: selectedWeight,
          socialIcon1: socialIcon1,
          socialIcon2: socialIcon2,
          socialIcon3: socialIcon3,
          socialIcon4: socialIcon4,
          socialicon1Color: JSON.stringify(socialicon1Color),
          socialicon2Color: JSON.stringify(socialicon2Color),
          socialicon3Color: JSON.stringify(socialicon3Color),
          socialicon4Color: JSON.stringify(socialicon4Color),
          socialLinks: JSON.stringify(socialMediaLinks),
        },
      });
      return res;
    }

    res = await prisma.MenuConFig.create({
      data: {
        userId: session.id,
        menuItme: JSON.stringify(menuItme),
        menuColor: JSON.stringify(menuColor),
        dealText: JSON.stringify(dealText),
        fontWeight: selectedWeight,
        socialIcon1: socialIcon1,
        socialIcon2: socialIcon2,
        socialIcon3: socialIcon3,
        socialIcon4: socialIcon4,
        socialicon1Color: JSON.stringify(socialicon1Color),
        socialicon2Color: JSON.stringify(socialicon2Color),
        socialicon3Color: JSON.stringify(socialicon3Color),
        socialicon4Color: JSON.stringify(socialicon4Color),
        socialLinks: JSON.stringify(socialMediaLinks),
      },
    });
    return res;
  } catch (error) {
    console.log("Error creating Menue:", error);
    throw new Error("Error creating Menue:", error);
  }
};
