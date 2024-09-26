import { Text } from "@shopify/polaris";
import AnnouncementComponent from "../components/announcementComponent";
import HeaderComponent from "../components/headerComponent";
import PromotionBanner from "../components/promotionBanners";
import NewArrivalComponent from "../components/newArrivalComponent";
import CollectionComponent from "../components/collectionComponent";
import CollectionBlocks from "../components/collectionBlocks";
import ProductGridComponent from "../components/productGridComponent";
import ShopByBrandComponent from "../components/shopByBrandComponent";

export const homeTabContent = (
  id = "",
  {
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
    collectionError,
    setCollection,
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
    headerError,
    setMenuIconcolor,
    profileIconColor,
    setProfileIconColor,
    logoIconColor,
    setLogoIconColor,
    logoAlignment,
    setLogoAlignment,
    iconsAlignment,
    setIconsAlignment,
    backgroundColor,
    setBackgroundColor,
    promotions,
    promotionError,
    setPromotions,
    alignBannerHeading,
    setAlignBannerHeading,
    alignBannerButton,
    setAlignBannerButton,
    alignBannerTimer,
    setAlignBannerTimer,
  },
) => {
  const componentMap = {
    announcement: AnnouncementComponent,
    header: HeaderComponent,
    banner: PromotionBanner,
    "new-arrival": NewArrivalComponent,
    "home-collections": CollectionComponent,
    "collection-sorting": CollectionBlocks,
    "product-grid": ProductGridComponent,
    "shop-by-brand": ShopByBrandComponent
  };
  const propsMap = {
    announcement: {
      hexaColor,
      setHexaColor,
      iconImage,
      setIconImage,
      announcements,
      setAnnouncements,
      announcementSvgColor,
      setAnnouncementSvgColor,
      alignAnnounceText,
      setAlignAnnounceText,
      announcementError,
    },
    header: {
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
      backgroundColor,
      setBackgroundColor,
      headerError,
      logoAlignment,
      setLogoAlignment,
      iconsAlignment,
      setIconsAlignment,
    },
    banner: {
      promotions,
      setPromotions,
      alignBannerHeading,
      setAlignBannerHeading,
      alignBannerButton,
      setAlignBannerButton,
      alignBannerTimer,
      setAlignBannerTimer,
      promotionError,
    },
    "new-arrival": {
      newArrival,
      setNewArrival,
      newArrivalError,
    },
    "home-collections": {
      collection,
      setCollection,
      collectionError,
    },
    "collection-sorting": {
      collectionSorting,
      setCollectionSorting,
    },
    "product-grid": {
      grids,
      setGridData,
      gridsError,
    },
    "shop-by-brand":{
      shopByBrand,
      setShopByBrand,
    }
  };
  const getComponent = (key) => {
    return componentMap[key] || null;
  };

  const Component = getComponent(id);

  if (!Component) {
    return <Text>No component found for the given key.</Text>;
  }
  const componentProps = propsMap[id] || {};

  return <Component {...componentProps} />;
};
