import * as Yup from "yup";

const gridItemSchema = Yup.object().shape({
  gridTitle: Yup.string().required("Grid Title is required"),
  handle: Yup.string().required("Handle is required"),
  handleId: Yup.string().required("Handle ID is required"),
  buttonTxt: Yup.string().required("Button Text is required"),
  title: Yup.string().required(),
});

export const validationSchemaForProductGridItems = Yup.array()
  .of(gridItemSchema)
  .min(1, "At least one item is required");
