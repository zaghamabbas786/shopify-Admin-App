import * as Yup from "yup";

export const validationSchemaForPdp = Yup.object().shape({
  variantHeading: Yup.string().required("Heading is required"),
  quatityHeading: Yup.string().required(),
  atcText: Yup.string().required(),
  buyNowText: Yup.string().required(),
});
