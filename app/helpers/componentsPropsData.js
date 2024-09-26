export const announcemnePropsData = (announcementRes) => {
  const announcementTxt = announcementRes?.announcmentText
    ? JSON.parse(announcementRes?.announcmentText)
    : null;
  const announceIcon = announcementRes?.crossIcon ?? null;
  const svgColor = announcementRes?.announcementSvgColor
    ? JSON.parse(announcementRes?.announcementSvgColor)
    : null;
  const announcementTextAlign = announcementRes?.alignAnnounceText
    ? JSON.parse(announcementRes?.alignAnnounceText)
    : null;

  return {
    announcementTxt,
    announceIcon,
    svgColor,
    announcementTextAlign,
  };
};

export const headerPropsDate = (headerRes) => {
  const menuImage = headerRes?.menuIcon;
  const logoImage = headerRes?.logoIcon;
  const profileImage = headerRes?.profileIcon;
  const menuSvgcolor = headerRes?.menuIconcolor
    ? JSON.parse(headerRes?.menuIconcolor)
    : null;
  const profileSvgColor = headerRes?.profileIconColor
    ? JSON.parse(headerRes?.profileIconColor)
    : null;
  const logoSvgColor = headerRes?.logoIconColor
    ? JSON.parse(headerRes?.logoIconColor)
    : null;
  const backgroundColorHeader = headerRes?.backgroundColor
    ? JSON.parse(headerRes?.backgroundColor)
    : null;
  const logoAlignHeader = headerRes?.logoAlignment
    ? JSON.parse(headerRes?.logoAlignment)
    : null;
  const iconsAlignHeader = headerRes?.iconsAlignment
    ? JSON.parse(headerRes?.iconsAlignment)
    : null;

  return {
    menuImage,
    logoImage,
    profileImage,
    profileSvgColor,
    logoSvgColor,
    menuSvgcolor,
    backgroundColorHeader,
    logoAlignHeader,
    iconsAlignHeader,
  };
};

export const collectionSortingPropsData = (
  productGridRes,
  collectionSortingRes,
) => {
  const productGridData = productGridRes?.productGridData
    ? JSON.parse(productGridRes?.productGridData)
    : null;

  const gridData = productGridData
    ? productGridData?.map(({ id, gridTitle }) => ({
        id: id,
        title: gridTitle,
        type: "product-grid",
        show: true,
      }))
    : [];

  const collectionSorting = collectionSortingRes?.collectionSorting
    ? JSON.parse(collectionSortingRes?.collectionSorting)
    : null;

  const filteredItems = collectionSorting?.filter((item) => {
    if (item.type === "product-grid") {
      return gridData.some((gridItem) => gridItem.id === item.id);
    }
    return true;
  });
  gridData.forEach((gridItem) => {
    if (
      gridItem.type === "product-grid" &&
      !collectionSorting.some((item) => item.id === gridItem.id)
    ) {
      filteredItems.push(gridItem);
    }
  });

  return filteredItems;
};

export const menuItemsPropsData = (menuRes) => {
  const weight = menuRes?.fontWeight;
  const menu = menuRes?.menuItme ? JSON.parse(menuRes?.menuItme) : null;
  const color = menuRes?.menuColor ? JSON.parse(menuRes?.menuColor) : null;
  const dealHeading = menuRes?.dealText ? JSON.parse(menuRes?.dealText) : null;
  const socialmedialinks = menuRes?.socialLinks?.trim()
    ? JSON.parse(menuRes?.socialLinks)
    : null;
  const socialicon1 = menuRes?.socialIcon1;
  const socialicon2 = menuRes?.socialIcon2;
  const socialicon3 = menuRes?.socialIcon3;
  const socialicon4 = menuRes?.socialIcon4;
  const socialSvg2Color = menuRes?.socialicon2Color
    ? JSON.parse(menuRes?.socialicon2Color)
    : null;
  const socialSvg1Color = menuRes?.socialicon1Color
    ? JSON.parse(menuRes?.socialicon1Color)
    : null;
  const socialSvg3Color = menuRes?.socialicon3Color
    ? JSON.parse(menuRes?.socialicon3Color)
    : null;
  const socialSvg4Color = menuRes?.socialicon4Color
    ? JSON.parse(menuRes?.socialicon4Color)
    : null;
  return {
    weight,
    menu,
    dealHeading,
    color,
    socialicon1,
    socialicon2,
    socialicon3,
    socialicon4,
    socialmedialinks,
    socialSvg1Color,
    socialSvg2Color,
    socialSvg3Color,
    socialSvg4Color,
  };
};

export const propmotionPropsData = (promotionRes) => {
  const promotionData =
    promotionRes?.promotionData && JSON.parse(promotionRes?.promotionData);

  const bannerHeadingAlign = promotionRes?.bannerHeadingAlign
    ? JSON.parse(promotionRes?.bannerHeadingAlign)
    : null;
  const bannerButtonAlign = promotionRes?.bannerButtonAlign
    ? JSON.parse(promotionRes?.bannerButtonAlign)
    : null;
  const bannerTimerAlign = promotionRes?.bannerTimerAlign
    ? JSON.parse(promotionRes?.bannerTimerAlign)
    : null;

  return {
    promotionData,
    bannerHeadingAlign,
    bannerButtonAlign,
    bannerTimerAlign,
  };
};

export const bottomBarPropsData = (bottomBarRes) => {
  const bottomBarResData = bottomBarRes?.bottomBarData
    ? JSON.parse(bottomBarRes?.bottomBarData)
    : null;

  return {
    bottomBarResData,
  };
};
