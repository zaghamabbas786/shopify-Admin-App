import * as Yup from "yup";
 export const validationSchemaForSplash = Yup.object({
   heading: Yup.string().required("Heading is required"),
   subHeading: Yup.string().required("Sub Heading is required"),
   image: Yup.string().required("Image is required"),
 });
