import { json, useLoaderData, useFetcher } from "@remix-run/react";
import { Tabs, Button, Page } from "@shopify/polaris";
import { useState, useCallback, useRef, useEffect } from "react";
import { authenticate } from "../shopify.server";
import MenuComponent from "../components/menuComponent";
import { saveMenue } from "../components/UtilityFuncs/menuSave";
import { getMenuData } from "../components/UtilityFuncs/getMenu";
import SplashComponent from "../components/splashComponent";
import { getSplashData } from "../components/UtilityFuncs/getSplash";
import { saveSplash } from "../components/UtilityFuncs/splashSave";
import { saveAnnouncement } from "../components/UtilityFuncs/announcementSave";
import { getAnnouncementData } from "../components/UtilityFuncs/getAnnouncement";
import { getHeaderData } from "../components/UtilityFuncs/getHeader";
import { saveHeader } from "../components/UtilityFuncs/headerSave";
import BottomBarComponent from "../components/botomBarComponent";
import { saveBottomBar } from "../components/UtilityFuncs/bottomBarSave";
import { getBottomBarData } from "../components/UtilityFuncs/getBottomBar";
import { savePromotion } from "../components/UtilityFuncs/promotionSave";
import { getPromotionData } from "../components/UtilityFuncs/getPromotions";
import { saveNewArrival } from "../components/UtilityFuncs/newArrivalSave";
import { getNewArrivalData } from "../components/UtilityFuncs/getNewArrival";
import { saveShopByBrand } from "../components/UtilityFuncs/shopByBrandSave";
import { getShopByBrandData } from "../components/UtilityFuncs/getShopByBRand";
import { getCollectionData } from "../components/UtilityFuncs/getCollection";
import { saveCollection } from "../components/UtilityFuncs/collectionSave";
import { saveGrid } from "../components/UtilityFuncs/gridSave";
import { getGridsData } from "../components/UtilityFuncs/getGrids";
import { saveCollectionSorting } from "../components/UtilityFuncs/collectionSortingSave";
import { getCollectionSortingData } from "../components/UtilityFuncs/getCollectionSorting";
import ProductTileComponent from "../components/productTileComponent";
import { saveTile } from "../components/UtilityFuncs/tileSave";
import { getTilesData } from "../components/UtilityFuncs/getTiles";
import { getPdpData } from "../components/UtilityFuncs/getPDP";
import { savePdpElements } from "../components/UtilityFuncs/pdpSave";
import PDPThemingComponent from "../components/pdpThemeComponent";
import { changeSubTabOnPraentId } from "../helpers/changeSubTabOnPraentId";
import { homeTabContent } from "../helpers/homeTabContent";
import { subTabsHome } from "../helpers/subTabsHome";
import {
  announcemnePropsData,
  bottomBarPropsData,
  collectionSortingPropsData,
  headerPropsDate,
  menuItemsPropsData,
  propmotionPropsData,
} from "../helpers/componentsPropsData";
import { hsbToHex } from "../helpers/convertToHexa";
import { ITEMS } from "../helpers/collectionItems";
import { generateRandomId } from "../helpers/genrateRandomId";
import CustomSpinner from "../components/Spinner";
import logger from "../components/UtilityFuncs/logger";
import { validationSchemaForSplash } from "../components/Validations/splashvalidation";
import { validationSchemaForAnnoucement } from "../components/Validations/announcementValidation";
import { validationSchemaForHeader } from "../components/Validations/headerValidation";
import { validationSchemaForCollection } from "../components/Validations/collectionValidation";
import { validationSchemaPromotion } from "../components/Validations/promotionBannerValidation";
import * as Yup from "yup";
import { validationSchemaForProductGridItems } from "../components/Validations/productGridValidation";
import { validationSchemaForNewArrival } from "../components/Validations/newArrivalvalidation";
import { validationSchemaForPdp } from "../components/Validations/pdpValiation";
import { validationSchemaForMenu } from "../components/Validations/menuValidation";
import { validationSchemaForBottomBar } from "../components/Validations/bottomBarValidation";
export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const [
    splashRes,
    menuRes,
    announcementRes,
    headerRes,
    promotionRes,
    newArrivalRes,
    collectionRes,
    bottomBarRes,
    collectionSortingRes,
    productGridRes,
    productTileRes,
    pdpRes,
    shopByBrandRes,
  ] = await Promise.all([
    getSplashData(session),
    getMenuData(session),
    getAnnouncementData(session),
    getHeaderData(session),
    getPromotionData(session),
    getNewArrivalData(session),
    getCollectionData(session),
    getBottomBarData(session),
    getCollectionSortingData(session),
    getGridsData(session),
    getTilesData(session),
    getPdpData(session),
    getShopByBrandData(session),
  ]);
  return json({
    splashRes,
    menuRes,
    announcementRes,
    headerRes,
    promotionRes,
    newArrivalRes,
    collectionRes,
    bottomBarRes,
    collectionSortingRes,
    productGridRes,
    productTileRes,
    pdpRes,
    shopByBrandRes,
  });
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const data = await request.formData();

  try {
    const res = await Promise.all([
      saveSplash(session, data),
      saveMenue(session, data),
      saveAnnouncement(session, data),
      saveHeader(session, data),
      savePromotion(session, data),
      saveNewArrival(session, data),
      saveCollection(session, data),
      saveBottomBar(session, data),
      saveCollectionSorting(session, data),
      saveGrid(session, data),
      saveTile(session, data),
      savePdpElements(session, data),
      saveShopByBrand(session, data),
    ]);

    return {
      status: 200,
      data: res[9],
    };
  } catch (error) {
    logger.error(error.message, error);
    return {
      status: 500,
      error: error.message,
    };
  }
};

export default function denverAdmin() {
  const loader = useLoaderData();

  const {
    menuRes,
    splashRes,
    announcementRes,
    headerRes,
    promotionRes,
    newArrivalRes,
    collectionRes,
    bottomBarRes,
    collectionSortingRes,
    productGridRes,
    productTileRes,
    pdpRes,
    shopByBrandRes,
  } = loader;

  const heroBannerComponentRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  //<----------------------------- states of child component------------------------------>

  //<-------------------- Splash ---------------------------->

  const spData = splashRes ? splashRes : null;

  const data = {
    heading: spData?.heading,
    subHeading: spData?.subHeading,
    headingColor: spData?.headingColor ? JSON.parse(spData?.headingColor) : "",
    subHeadingColor: spData?.subHeadingColor
      ? JSON.parse(spData?.subHeadingColor)
      : "",
    image: spData?.image,
    fontWeightHeading: spData?.fontWeightHeading,
    fontweightSubHeading: spData?.fontweightSubHeading,
  };

  const [splashData, setSplashData] = useState(
    spData
      ? data
      : {
          heading: "",
          subHeading: "",
          headingColor: {
            hue: 120,
            brightness: 1,
            saturation: 1,
            alpha: 1,
          },
          subHeadingColor: {
            hue: 120,
            brightness: 1,
            saturation: 1,
            alpha: 1,
          },
          image: '',
        },
  );
  const [splashError, setSplashError] = useState(false);
  //---------------------------- Announcement --------------------------->

  const { announcementTxt, announceIcon, svgColor, announcementTextAlign } =
    announcemnePropsData(announcementRes);
  const [hexaColor, setHexaColor] = useState(
    announcementTxt?.length
      ? announcementTxt.map((item) => ({
          hexColor: hsbToHex(item.backgroundColor),
        }))
      : [{ hexColor: "" }],
  );
  const [announcements, setAnnouncements] = useState(
    announcementTxt ?? [
      {
        content: "",
        backgroundColor: { hue: 120, brightness: 1, saturation: 1 },
      },
    ],
  );
  const [iconImage, setIconImage] = useState(announceIcon ?? "");
  const [announcementSvgColor, setAnnouncementSvgColor] = useState(
    svgColor ?? { hue: 120, brightness: 1, saturation: 1 },
  );
  const [alignAnnounceText, setAlignAnnounceText] = useState(
    announcementTextAlign ?? "flex-start",
  );
  const [announcementError, setannouncementError] = useState(false);

  //<--------------------Header------------------------->

  const {
    menuImage,
    logoImage,
    profileImage,
    backgroundColorHeader,
    menuSvgcolor,
    profileSvgColor,
    logoSvgColor,
    logoAlignHeader,
    iconsAlignHeader,
  } = headerPropsDate(headerRes);

  const [menuIcon, setMenuIcon] = useState(menuImage ?? "");
  const [profileIcon, setProfileIcon] = useState(profileImage ?? "");
  const [logoIcon, setLogoIcon] = useState(logoImage ?? "");
  const [logoAlignment, setLogoAlignment] = useState(
    logoAlignHeader ?? "center",
  );
  const [iconsAlignment, setIconsAlignment] = useState(
    iconsAlignHeader ?? "flex-start",
  );
  const [menuIconcolor, setMenuIconcolor] = useState(
    menuSvgcolor
      ? menuSvgcolor
      : {
          hue: 120,
          brightness: 1,
          saturation: 1,
        },
  );
  const [profileIconColor, setProfileIconColor] = useState(
    profileSvgColor
      ? profileSvgColor
      : {
          hue: 120,
          brightness: 1,
          saturation: 1,
        },
  );
  const [logoIconColor, setLogoIconColor] = useState(
    logoSvgColor
      ? logoSvgColor
      : {
          hue: 120,
          brightness: 1,
          saturation: 1,
        },
  );
  const [backgroundColor, setBackgroundColor] = useState(
    backgroundColorHeader
      ? backgroundColorHeader
      : {
          hue: 120,
          brightness: 1,
          saturation: 1,
        },
  );
  const [headerError, setHeaderError] = useState(false);
  //<--------------------- Home Collections -------------------------->

  const collectionData =
    collectionRes?.collectionData && JSON.parse(collectionRes?.collectionData);

  const [collection, setCollection] = useState(
    collectionData ?? {
      heading: "",
      handle: [],
      handleId: [],
      backgroundColor: "",
      titleColor: "",
      title: "",
    },
  );
  const [collectionError, setCollectionError] = useState(false);

  //<--------------------- Product Grid ------------------------->

  const productGridData =
    productGridRes?.productGridData &&
    JSON.parse(productGridRes?.productGridData);

  const [grids, setGridData] = useState(
    productGridData ?? [
      {
        id: generateRandomId(),
        gridTitle: "",
        handle: "",
        handleId: "",
        buttonTxt: "",
        title:"",
        backgroundColor: {
          hue: 120,
          brightness: 1,
          saturation: 1,
          alpha: 1,
        },
        borderColor: {
          hue: 120,
          brightness: 1,
          saturation: 1,
          alpha: 1,
        },
      },
    ],
  );
  const [gridsError, setGridError] = useState(false);

  // const [hexColors, setHexColors] = useState(
  //   productGridData
  //     ? productGridData.map((grid) => ({
  //       ProductTypehex: hsbToHex(grid.productTypeColor),
  //       ProductTitlehex: hsbToHex(grid.productTitleColor),
  //       ProductDescriptionhex: hsbToHex(grid.productDescriptionColor),
  //       ProductPricehex: hsbToHex(grid.productPriceColor),
  //       ProductDiscountPricehex: hsbToHex(grid.productDiscountPriceColor),
  //     }))
  //     : [
  //       {
  //         ProductTypehex: "#FFFFFF",
  //         ProductTitlehex: "#FFFFFF",
  //         ProductDescriptionhex: "#FFFFFF",
  //         ProductPricehex: "#FFFFFF",
  //         ProductDiscountPricehex: "#FFFFFF",
  //       },
  //     ],
  // );

  //<--------------------- New Arrival ------------------------->

  const newArrivalData =
    newArrivalRes?.newArrivalData && JSON.parse(newArrivalRes?.newArrivalData);

  const [newArrival, setNewArrival] = useState(
    newArrivalData ?? {
      heading: "",
      subHeading: "",
      image: "",
      buttonTxt: "",
      handle: "",
      handleId: "",
      backgroundColor: "",
      btnBackgroundColor: "",
      btnBorderColor: "",
      title:""
    },
  );
  const [newArrivalError, setNewArrivalError] = useState(false);

  //<--------------------- Shop By Brand ------------------------->

  const shopByBrandData =
    shopByBrandRes?.shopByBrandData &&
    JSON.parse(shopByBrandRes?.shopByBrandData);

  const [shopByBrand, setShopByBrand] = useState(
    shopByBrandData ?? {
      heading: "",
      subHeading: "",
      image: [],
      backgroundColor: "",
    },
  );

  // <-----------------------Collection Sorting ----------------------->
  const filteredItems = collectionSortingPropsData(
    productGridRes,
    collectionSortingRes,
  );

  const [collectionSorting, setCollectionSorting] = useState(
    filteredItems?.length > 0 ? filteredItems : ITEMS,
  );

  //<------------------pdp------------------------->

  const pdpData = pdpRes?.pdpData && JSON.parse(pdpRes?.pdpData);

  const [pdpElements, setPdpElements] = useState(
    pdpData ?? {
      typeColor: "",
      titleColor: "",
      descriptionColor: "",
      discountPriceColor: "",
      actualPriceColor: "",
      variantHeading: "",
      variantSelectedColor: "",
      variantUnselectedColor: "",
      variantActiveTitleColor: "",
      variantInActiveTitleColor: "",
      quatityHeading: "",
      quatityDigitColor: "",
      quatityBackgroundColor: "",
      quatityBorderColor: "",
      atcText: "",
      atcBackgroundColor: "",
      atcBorderColor: "",
      buyNowText: "",
      buyNowBackgroundColor: "",
      buyNowBorderColor: "",
    },
  );
  const [pdpError, setPdpError] = useState(false);

  // <--------------------Menu Save ------------------------>
  const {
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
  } = menuItemsPropsData(menuRes);
  const [selectedWeight, setSelectedWeight] = useState(weight ?? "normal");

  const [menuItme, setMenuItems] = useState(
    menu ?? {
      home: "Home",
      collection: "Collection",
      contact: "Contact Us",
      handle: "main-menu",
    },
  );

  const [dealText, setDealText] = useState(dealHeading ?? "");

  const [menuColor, setMenuColor] = useState(
    color ?? {
      color: {
        hue: 120,
        brightness: 1,
        saturation: 1,
      },
      backgroundColor: {
        hue: 120,
        brightness: 1,
        saturation: 1,
      },
    },
  );

  const [socialIcon1, setSocialIcon1] = useState(socialicon1 ?? "");
  const [socialIcon2, setSocialIcon2] = useState(socialicon2 ?? "");
  const [socialIcon3, setSocialIcon3] = useState(socialicon3 ?? "");
  const [socialIcon4, setSocialIcon4] = useState(socialicon4 ?? "");
  const [socialMediaLinks, setSocialMediaLinks] = useState(
    socialmedialinks ?? {
      link1: "",
      link2: "",
      link3: "",
      link4: "",
    },
  );

  const [socialicon1Color, setSocialicon1Color] = useState(
    socialSvg1Color
      ? socialSvg1Color
      : {
          hue: 120,
          brightness: 1,
          saturation: 1,
        },
  );

  const [socialicon2Color, setSocialicon2Color] = useState(
    socialSvg2Color
      ? socialSvg2Color
      : {
          hue: 120,
          brightness: 1,
          saturation: 1,
        },
  );

  const [socialicon3Color, setSocialicon3Color] = useState(
    socialSvg3Color
      ? socialSvg3Color
      : {
          hue: 120,
          brightness: 1,
          saturation: 1,
        },
  );

  const [socialicon4Color, setSocialicon4Color] = useState(
    socialSvg1Color
      ? socialSvg4Color
      : {
          hue: 120,
          brightness: 1,
          saturation: 1,
        },
  );

  const [menuError, setMenuError] = useState(false);

  // <-------------------------End menu ------------------------>

  //<------------------------- Bottom Bar ---------------------->
  const { bottomBarResData } = bottomBarPropsData(bottomBarRes);
  const [bottomBarData, setBottomBarData] = useState(
    bottomBarResData ?? {
      backgroundColor: {
        hue: 120,
        brightness: 1,
        saturation: 1,
        alpha: 1,
      },
      badgeColor: {
        hue: 120,
        brightness: 1,
        saturation: 1,
        alpha: 1,
      },
      badgeCountColor: {
        hue: 120,
        brightness: 1,
        saturation: 1,
        alpha: 1,
      },
      activeColor: {
        hue: 120,
        brightness: 1,
        saturation: 1,
        alpha: 1,
      },
      inActiveColor: {
        hue: 120,
        brightness: 1,
        saturation: 1,
        alpha: 1,
      },

      homeSvg: "",
      cartSvg: "",
      searchSvg: "",
    },
  );
  const [bottomError, setBottomError] = useState(false);

  //<------------------------ Collections Tiles ------------------------>

  const productDiscountPriceColorVar = productTileRes?.productDiscountPriceColor
    ? JSON.parse(productTileRes?.productDiscountPriceColor)
    : null;
  const productTitleColorVar = productTileRes?.productTitleColor
    ? JSON.parse(productTileRes?.productTitleColor)
    : null;
  const productTypeColorVar = productTileRes?.productTypeColor
    ? JSON.parse(productTileRes?.productTypeColor)
    : null;
  const productDescriptionColorVar = productTileRes?.productDescriptionColor
    ? JSON.parse(productTileRes?.productDescriptionColor)
    : null;
  const productPriceColorVar = productTileRes?.productPriceColor
    ? JSON.parse(productTileRes?.productPriceColor)
    : null;
  const {
    fontWeightProductType = "",
    fontWeightProductTitle = "",
    fontWeightProductDescription = "",
    fontWeightProductPrice = "",
    fontWeightProductDiscountPrice = "",
  } = productTileRes || {};
  const [grid, setGridDataTiles] = useState({
    fontWeightProductType: fontWeightProductType ?? "200",
    fontWeightProductTitle: fontWeightProductTitle ?? "200",
    fontWeightProductDescription: fontWeightProductDescription ?? "200",
    fontWeightProductPrice: fontWeightProductPrice ?? "200",
    fontWeightProductDiscountPrice: fontWeightProductDiscountPrice ?? "200",
    productTypeColor: productTypeColorVar ?? {
      hue: 120,
      brightness: 1,
      saturation: 1,
      alpha: 1,
    },
    productTitleColor: productTitleColorVar ?? {
      hue: 120,
      brightness: 1,
      saturation: 1,
      alpha: 1,
    },
    productDescriptionColor: productDescriptionColorVar ?? {
      hue: 120,
      brightness: 1,
      saturation: 1,
      alpha: 1,
    },
    productPriceColor: productPriceColorVar ?? {
      hue: 120,
      brightness: 1,
      saturation: 1,
      alpha: 1,
    },
    productDiscountPriceColor: productDiscountPriceColorVar ?? {
      hue: 120,
      brightness: 1,
      saturation: 1,
      alpha: 1,
    },
  });

  // <----------------------------End States------------------------------------->

  // <------------------------------End Promotion Banner States ----------------->

  const {
    promotionData,
    bannerHeadingAlign,
    bannerButtonAlign,
    bannerTimerAlign,
  } = propmotionPropsData(promotionRes);
  const [promotions, setPromotions] = useState(promotionData ?? []);

  const [alignBannerHeading, setAlignBannerHeading] = useState(
    bannerHeadingAlign ?? "flex-start",
  );

  const [alignBannerButton, setAlignBannerButton] = useState(
    bannerButtonAlign ?? "flex-start",
  );

  const [alignBannerTimer, setAlignBannerTimer] = useState(
    bannerTimerAlign ?? "flex-start",
  );
  const [promotionError, setPromotionError] = useState(false);

  // <------------------------------Promotion Banner ---------------------------->

  const [selected, setSelected] = useState(0);

  const fetcher = useFetcher();

  const handleSubmit = async () => {
    const formData = new FormData();

    // Splash Work
    try {
      const validSplash = await validationSchemaForSplash.isValid(splashData);
      if (!validSplash) {
        setSplashError(true);
        shopify.toast.show(
          "You need to fill in all required fields in the Splash screen tab",
        );
        return;
      }
      setSplashError(false);
      formData.append("splashData", JSON.stringify({ splashData }));

      // Annuncement Work

      const validAnnouncement = await validationSchemaForAnnoucement.isValid({
        items: announcements,
        svg: iconImage,
      });

      if (!validAnnouncement) {
        setannouncementError(true);
        shopify.toast.show(
          "You need to fill in all required fields in the Announcement tab",
        );
        return;
      }
      setannouncementError(false);

      formData.append(
        "announcementData",
        JSON.stringify({
          announcements,
          iconImage,
          announcementSvgColor,
          alignAnnounceText,
        }),
      );
      // Header Work

      const validHeader = await validationSchemaForHeader.isValid({
        logoIcon,
        menuIcon,
        profileIcon,
      });

      if (!validHeader) {
        setHeaderError(true);
        shopify.toast.show(
          "You need to fill in all required fields in the Header tab",
        );
        return;
      }
      setHeaderError(false);
      formData.append(
        "headerData",
        JSON.stringify({
          logoIcon,
          menuIcon,
          profileIcon,
          menuIconcolor,
          profileIconColor,
          logoIconColor,
          backgroundColor,
          logoAlignment,
          iconsAlignment
        }),
      );

      // Menu Item Work
      const { handle } = menuItme;
      const validmenu = await validationSchemaForMenu.isValid({
        dealText,
        handle,
      });
      if (!validmenu) {
        setMenuError(true);
        shopify.toast.show(
          "You need to fill in all required fields in the Menu  tab",
        );
        return;
      }
      setMenuError(false);

      formData.append(
        "menuData",
        JSON.stringify({
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
        }),
      );
      // Promotions Banner Work
      const validPromotion =
        await validationSchemaPromotion.isValid(promotions);
      if (!validPromotion) {
        setPromotionError(true);
        shopify.toast.show(
          "You need to fill in all required fields in the Promotion  tab",
        );
        return;
      }
      setPromotionError(false);

      formData.append(
        "promotionData",
        JSON.stringify({
          promotions,
          alignBannerHeading,
          alignBannerButton,
          alignBannerTimer,
        }),
      );
      // Bottom Bar Work
      const validBottombar =
        await validationSchemaForBottomBar.isValid(bottomBarData);
      if (!validBottombar) {
        setBottomError(true);
        shopify.toast.show(
          "You need to fill in all required fields in the Bottom Bar  tab",
        );
        return;
      }
      setBottomError(false);

      formData.append("bottomBarData", JSON.stringify({ bottomBarData }));

      //New Arrival work
      const validNewArrival =
        await validationSchemaForNewArrival.isValid(newArrival);
      if (!validNewArrival) {
        setNewArrivalError(true);
        shopify.toast.show(
          "You need to fill in all required fields in the New Arrival  tab",
        );
        return;
      }
      setNewArrivalError(false);
      formData.append("newArrivalData", JSON.stringify({ newArrival }));
      //Shop By Brand work
      formData.append("shopByBrandData", JSON.stringify({ shopByBrand }));

      //Collection Work

      const validCollection =
        await validationSchemaForCollection.isValid(collection);
      if (!validCollection) {
        setCollectionError(true);
        shopify.toast.show(
          "You need to fill in all required fields in the Collection  tab",
        );
        return;
      }

      setCollectionError(false);

      formData.append("collectionData", JSON.stringify({ collection }));
      // Collection Sorting Work
      formData.append(
        "collectionSorting",
        JSON.stringify({ collectionSorting }),
      );
      //Product Grid Work

      const validGrid =
        await validationSchemaForProductGridItems.isValid(grids);
      if (!validGrid) {
        setGridError(true);
        shopify.toast.show(
          "You need to fill in all required fields in the Product Grid  tab",
        );
        return;
      }
      setGridError(false);
      formData.append("productGridData", JSON.stringify({ grids }));

      //PDP theme work
      const validPdp = await validationSchemaForPdp.isValid(pdpElements);
      if (!validPdp) {
        setPdpError(true);
        shopify.toast.show(
          "You need to fill in all required fields in the Product Deatil  tab",
        );
        return;
      }
      setPdpError(false);

      formData.append("pdpData", JSON.stringify({ pdpElements }));

      //Product Tile Work
      // const productTileData = productTileComponentRef?.current?.getFormData();
      formData.append("productTileData", JSON.stringify({ grid }));

      fetcher.submit(formData, {
        method: "post",
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log("Validation failed:", err.errors);
      } else {
        console.error("An unexpected error occurred:", err);
      }
    }
  };

  useEffect(() => {
    if (fetcher?.state !== "idle") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (fetcher?.data?.status == 200 && fetcher?.state === "idle") {
      shopify.toast.show("Data saved successfully!");
      const filteredItems = collectionSortingPropsData(
        fetcher?.data?.data,
        collectionSortingRes,
      );
      if (filteredItems.length > 0) {
        setCollectionSorting(filteredItems);
      }
    } else if (fetcher?.data?.status == 500) {
      shopify.toast.show(fetcher?.data?.error);
    }
  }, [fetcher?.state]);

  const [selectedParentTab, setSelectedParentTab] = useState(0);
  const [selectedSubTab, setSelectedSubTab] = useState(0);

  const handleParentTabChange = useCallback((selectedTabIndex) => {
    setSelectedParentTab(selectedTabIndex);
    setSelectedSubTab(0); // Reset sub-tab selection when parent tab changes
  }, []);

  const handleSubTabChange = useCallback(
    (selectedTabIndex) => setSelectedSubTab(selectedTabIndex),
    [],
  );

  const parentTabs = [
    {
      id: "splash",
      content: "Splash",
      panelID: "all-customers-content-0",
    },
    {
      id: "home",
      content: "Home",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
    },
    {
      id: "collectionTiles",
      content: "Collection",
      panelID: "accepts-marketing-content-2",
    },
    {
      id: "pdp",
      content: "Product Detail Page",
      panelID: "repeat-customers-content-3",
    },
    {
      id: "menu",
      content: "Menu",
      panelID: "prospects-content-4",
    },
    {
      id: "bottom-bar",
      content: "Bottom Bar",
      panelID: "prospects-content-4",
    },
  ];

  const getComponent = () => {
    if (parentTabs[selectedParentTab]?.id == "pdp") {
      return (
        <PDPThemingComponent
          pdpElements={pdpElements}
          setPdpElements={setPdpElements}
          pdpError={pdpError}
        />
      );
    }
    if (parentTabs[selectedParentTab]?.id == "menu") {
      return (
        <MenuComponent
          menuItme={menuItme}
          setMenuItems={setMenuItems}
          dealText={dealText}
          setDealText={setDealText}
          menuColor={menuColor}
          setMenuColor={setMenuColor}
          socialIcon1={socialIcon1}
          setSocialIcon1={setSocialIcon1}
          socialIcon2={socialIcon2}
          setSocialIcon2={setSocialIcon2}
          socialIcon3={socialIcon3}
          setSocialIcon3={setSocialIcon3}
          socialIcon4={socialIcon4}
          setSocialIcon4={setSocialIcon4}
          socialMediaLinks={socialMediaLinks}
          setSocialMediaLinks={setSocialMediaLinks}
          setSelectedWeight={setSelectedWeight}
          selectedWeight={selectedWeight}
          socialicon1Color={socialicon1Color}
          setSocialicon1Color={setSocialicon1Color}
          socialicon2Color={socialicon2Color}
          setSocialicon2Color={setSocialicon2Color}
          socialicon3Color={socialicon3Color}
          setSocialicon3Color={setSocialicon3Color}
          socialicon4Color={socialicon4Color}
          setSocialicon4Color={setSocialicon4Color}
          color={color}
          menuError={menuError}
        />
      );
    }
    if (parentTabs[selectedParentTab]?.id == "splash") {
      return (
        <SplashComponent
          splashData={splashData}
          setSplashData={setSplashData}
          splashError={splashError}
        />
      );
    }
    if (parentTabs[selectedParentTab]?.id == "collectionTiles") {
      return (
        <ProductTileComponent grid={grid} setGridDataTiles={setGridDataTiles} />
      );
    }
    if (parentTabs[selectedParentTab]?.id == "bottom-bar") {
      return (
        <BottomBarComponent
          bottomBarData={bottomBarData}
          setBottomBarData={setBottomBarData}
          bottomError={bottomError}
        />
      );
    }
    if (parentTabs[selectedParentTab]?.id == "collection") {
      return;
    } else {
      return (
        <Tabs
          tabs={changeSubTabOnPraentId(parentTabs[selectedParentTab]?.id)}
          selected={selectedSubTab}
          onSelect={handleSubTabChange}
          fitted
        >
          {homeTabContent(subTabsHome[selectedSubTab]?.id, {
            hexaColor,
            setHexaColor,
            iconImage,
            setIconImage,
            announcements,
            announcementError,
            setAnnouncements,
            announcementSvgColor,
            setAnnouncementSvgColor,
            alignAnnounceText,
            setAlignAnnounceText,
            collection,
            setCollection,
            collectionError,
            newArrival,
            setNewArrival,
            newArrivalError,
            shopByBrand,
            setShopByBrand,
            grids,
            gridsError,
            setGridData,
            collectionSorting,
            setCollectionSorting,
            menuIcon,
            setMenuIcon,
            profileIcon,
            setProfileIcon,
            logoIcon,
            setLogoIcon,
            menuIconcolor,
            setMenuIconcolor,
            profileIconColor,
            setProfileIconColor,
            logoIconColor,
            setLogoIconColor,
            headerError,
            logoAlignment,
            setLogoAlignment,
            iconsAlignment,
            setIconsAlignment,
            backgroundColor,
            setBackgroundColor,
            promotions,
            setPromotions,
            promotionError,
            alignBannerHeading,
            setAlignBannerHeading,
            alignBannerButton,
            setAlignBannerButton,
            alignBannerTimer,
            setAlignBannerTimer,
          })}
        </Tabs>
      );
    }
  };
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Page
        title="Denver Admin"
        fullWidth
        primaryAction={
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        }
      >
        {isLoading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white overlay
              zIndex: 999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomSpinner />
          </div>
        )}
        <Tabs
          tabs={parentTabs}
          selected={selectedParentTab}
          onSelect={handleParentTabChange}
          disclosureText="More views"
        >
          {getComponent()}
        </Tabs>
      </Page>
    </div>
  );
}
