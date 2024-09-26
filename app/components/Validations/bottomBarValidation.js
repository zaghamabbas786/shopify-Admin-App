import * as Yup from "yup";

export const validationSchemaForBottomBar= Yup.object().shape({
  homeSvg: Yup.string().required("Heading is required"),
  cartSvg: Yup.string().required(),
  searchSvg: Yup.string().required(),
});
