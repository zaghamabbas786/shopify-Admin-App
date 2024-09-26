import prisma from "../../db.server";
export const saveBottomBar = async (session, formdata) => {
  const data = formdata.get("bottomBarData");
  try {
    if (!data) {
      throw new Error("Bottom bar is undefined");
    }

    const { bottomBarData } = JSON.parse(data);

    // Check if a collection already exists for the user
    const existingBottomBarData = await prisma.BottomBar.findFirst({
      where: {
        userId: session.id,
      },
    });

    if (existingBottomBarData) {
      // Update the existing collection
      const response = await prisma.BottomBar.update({
        where: {
          id: existingBottomBarData.id,
        },
        data: {
          bottomBarData: JSON.stringify(bottomBarData),
        },
      });
      return response;
    } else {
      const response = await prisma.BottomBar.create({
        data: {
          userId: session.id,
          bottomBarData: JSON.stringify(bottomBarData),
        },
      });
      return response;
    }
  } catch (error) {
    console.log("Error creating BottomBar:", error);
    return new Error("Error creating BottomBar:", error);
  }
};
