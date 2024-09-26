import * as Yup from "yup";

export const validationSchemaForMenu = Yup.object().shape({
  handle: Yup.string().required("Heading is required"),
  dealText: Yup.string().required(),
});
