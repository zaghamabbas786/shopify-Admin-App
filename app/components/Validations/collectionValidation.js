import * as Yup from "yup";

export const validationSchemaForCollection = Yup.object().shape({
  heading: Yup.string().required("Heading is required"),
  handle: Yup.array()
    .of(Yup.string().required("Each handle must be a string"))
    .min(1, "At least one handle is required"),
  handleId: Yup.array()
    .of(Yup.string().required("Each handle ID must be a string"))
    .min(1, "At least one handle ID is required"),
});
