import prisma from "../../db.server";
export const saveAnnouncement = async (session, formdata) => {
  const data = formdata.get("announcementData");

  let res;
  const { announcements, iconImage, announcementSvgColor, alignAnnounceText } =
    JSON.parse(data);

  try {
    const exist = await prisma.Announcment.findFirst({
      where: {
        userId: session.id,
      },
    });

    if (exist) {
      const res = await prisma.Announcment.update({
        where: {
          userId: session.id,
        },
        data: {
          announcmentText: JSON.stringify(announcements),
          crossIcon: iconImage,
          announcementSvgColor: JSON.stringify(announcementSvgColor),
          alignAnnounceText: JSON.stringify(alignAnnounceText),
        },
      });
    } else {
      const res = await prisma.Announcment.create({
        data: {
          userId: session.id,
          announcmentText: JSON.stringify(announcements),
          crossIcon: iconImage,
          announcementSvgColor: JSON.stringify(announcementSvgColor),
          alignAnnounceText: JSON.stringify(alignAnnounceText),
        },
      });
    }
    return res;
  } catch (error) {
    console.error("Error creating/update announcement:", error);
  }
};
