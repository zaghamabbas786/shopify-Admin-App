import prisma from "../../db.server";
import { saveTocken } from "./saveStoreFrontAccesTocken";

export const getStoreFrontAccessTocken = async (admin, session) => {
  try {
    const res = await prisma.Session.findFirst({
      where: {
        id: session.id,
      },
      select: {
        storefrontAccessToken: true,
      },
    });
    if (res?.storefrontAccessToken) {
      return res.storefrontAccessToken;
    } else {
      const storefront_access_token =
        new admin.rest.resources.StorefrontAccessToken({
          session: session,
        });
      storefront_access_token.title = "Test";
      await storefront_access_token.save({
        update: true,
      });
      await saveTocken(storefront_access_token.access_token, session);
      return storefront_access_token.access_token;
    }
  } catch (error) {
    console.log("error", error);
  }
};
