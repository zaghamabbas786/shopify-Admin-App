import * as Yup from "yup";

export const validationSchemaForNewArrival = Yup.object().shape({
  heading: Yup.string().required("Heading is required"),
  subHeading: Yup.string().required(),
  image: Yup.string().required(),
  buttonTxt: Yup.string().required(),
  handle: Yup.string().required(),
  handleId: Yup.string().required(),
  title: Yup.string().required(),
});
