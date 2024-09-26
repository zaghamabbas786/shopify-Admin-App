import * as Yup from "yup";

const logoIcon = Yup.string().required("logo  required");
const menuIcon = Yup.string().required("menu  required");
const profileIcon = Yup.string().required("profileIcon  required");

export const validationSchemaForHeader= Yup.object().shape({
  logoIcon,
  menuIcon,
  profileIcon,
});
