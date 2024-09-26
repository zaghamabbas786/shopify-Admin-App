import * as Yup from "yup";



const itemSchema = Yup.object().shape({
  content: Yup.string().required("Announcement is required"),
});

 const annoucement = Yup.array()
  .of(itemSchema)
    .min(1, "At least one item is required");
  
    
const stringSchema = Yup.string().required("svg  required");
export const validationSchemaForAnnoucement = Yup.object().shape({
  items: annoucement,
  svg: stringSchema,
});