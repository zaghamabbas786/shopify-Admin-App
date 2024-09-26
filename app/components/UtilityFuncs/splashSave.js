import prisma from "../../db.server";
export const saveSplash = async (session, formdata) => {
  const data = formdata.get("splashData");
  try {
    if (!data) throw new Error("splashData is undefined");

    let response;

    const {
      splashData: { heading, subHeading, headingColor, subHeadingColor, image },
    } = JSON.parse(data);

    // Check if a collection already exists for the user
    const existingSplashData = await prisma.Splash.findFirst({
      where: {
        userId: session.id,
      },
    });

    if (existingSplashData) {
      // Update the existing collection
      const response = await prisma.Splash.update({
        where: {
          id: existingSplashData.id,
        },
        data: {
          heading: heading,
          headingColor: JSON.stringify(headingColor),
          subHeading: subHeading,
          subHeadingColor: JSON.stringify(subHeadingColor),
          image: image,
        },
      });
      return response;
    } else {
      const response = await prisma.Splash.create({
        data: {
          userId: session.id,
          heading: heading,
          headingColor: JSON.stringify(headingColor),
          subHeading: subHeading,
          subHeadingColor: JSON.stringify(subHeadingColor),
          image: image,
        },
      });
      return response;
    }
  } catch (error) {
    console.log("Error creating Splash:", error);
    throw Error("Error creating Splash:", error);
  }
};
