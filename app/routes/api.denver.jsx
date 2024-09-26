import { getMenuData } from "../components/UtilityFuncs/getMenu";
import { getPromotionData } from "../components/UtilityFuncs/getPromotions";
import { getSplashData } from "../components/UtilityFuncs/getSplash";
import { getAnnouncementData } from "../components/UtilityFuncs/getAnnouncement";
import { getHeaderData } from "../components/UtilityFuncs/getHeader";
import { unauthenticated } from "../shopify.server";
import { json } from "@remix-run/react";
import { getBottomBarData } from "../components/UtilityFuncs/getBottomBar";
import { getBannersData } from "../components/UtilityFuncs/getBanners";
import { getCollectionData } from "../components/UtilityFuncs/getCollection";
import { getNewArrivalData } from "../components/UtilityFuncs/getNewArrival";
import { getCollectionSortingData } from "../components/UtilityFuncs/getCollectionSorting";
import { getGridsData } from "../components/UtilityFuncs/getGrids";
import { getTilesData } from "../components/UtilityFuncs/getTiles";
import { getPdpData } from "../components/UtilityFuncs/getPDP";
import { getShopByBrandData } from "../components/UtilityFuncs/getShopByBRand";
import { getStoreFrontAccessTocken } from "../components/UtilityFuncs/getStoreFrontAccesTocken";

export const loader = async ({ request }) => {
  try {
    // const store = request.headers.get("store");
    // if (!store) throw new Error("Store Not Found");

    const { admin, session } = await unauthenticated.admin(
      "zaghamtesting.myshopify.com",
    );
    if (!session) throw new Error(`Session Not Found against ${store}`);
    const [
      splashRes,
      menuRes,
      announcementRes,
      headerRes,
      promotionRes,
      newArrivalRes,
      collectionRes,
      bottomBarRes,
      heroBannerRes,
      collectionSortingRes,
      productGridRes,
      productTileRes,
      pdpRes,
      shopByBrandRes,
      tocken,
    ] = await Promise.all([
      getSplashData(session),
      getMenuData(session),
      getAnnouncementData(session),
      getHeaderData(session),
      getPromotionData(session),
      getNewArrivalData(session),
      getCollectionData(session),
      getBottomBarData(session),
      getBannersData(session),
      getCollectionSortingData(session),
      getGridsData(session),
      getTilesData(session),
      getPdpData(session),
      getShopByBrandData(session),
      getStoreFrontAccessTocken(admin, session),
    ]);
    return json({
      menuRes,
      splashRes,
      announcementRes,
      headerRes,
      promotionRes,
      newArrivalRes,
      collectionRes,
      bottomBarRes,
      heroBannerRes,
      collectionSortingRes,
      productGridRes,
      productTileRes,
      pdpRes,
      shopByBrandRes,
      tocken,
    });
  } catch (error) {
    return json({ error: error.message });
  }
};
