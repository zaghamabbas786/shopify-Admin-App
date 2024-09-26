import * as Yup from "yup";

const heroBannerSchema = Yup.object().shape({
  showVideo: Yup.boolean().optional(),
  videoLink: Yup.string().when("showVideo", {
    is: true,
    then: () => Yup.string().required("Video link is required"),
  }),
  heading: Yup.string().when("showVideo", {
    is: false,
    then: () => Yup.string().required(),
  }),
  subHeading: Yup.string().optional(),
  image: Yup.string().when("showVideo", {
    is: false,
    then: () => Yup.string().required(),
  }),
  buttonTxt: Yup.string().when("showVideo", {
    is: false,
    then: () => Yup.string().required(),
  }),
  handle: Yup.string().when("showVideo", {
    is: false,
    then: () => Yup.string().required(),
  }),
  handleId: Yup.string().when("showVideo", {
    is: false,
    then: () => Yup.string().required(),
  }),
  title: Yup.string().when("showVideo", {
    is: false,
    then: () => Yup.string().required(),
  }),
});

const promotionBannerSchema = Yup.object().shape({
  showTimer: Yup.boolean().optional(),
  timeStart: Yup.string().when("showTimer", {
    is: true,
    then: () => Yup.string().required("Start time is required"),
  }),
  timeEnd: Yup.string().when("showTimer", {
    is: true,
    then: () => Yup.string().required("End time is required"),
  }),
  heading: Yup.string().required("Heading is required"),
  subHeading: Yup.string().optional(),
  image: Yup.string().required("Image is required"),
  buttonTxt: Yup.string().required(),
  handle: Yup.string().required(),
  handleId: Yup.string().required(),
  title: Yup.string().required(),
});

export const validationSchemaPromotion = Yup.array().of(
  Yup.lazy((value) => {
    if (
      value.hasOwnProperty("videoLink") &&
      value.hasOwnProperty("showVideo")
    ) {
      return heroBannerSchema;
    } else if (
      value.hasOwnProperty("showTimer") &&
      value.hasOwnProperty("timeStart")
    ) {
      return promotionBannerSchema;
    } else {
      return Yup.mixed().test(
        "is-hero-or-promotion",
        "Invalid banner type",
        (value) =>
          heroBannerSchema.isValidSync(value) ||
          promotionBannerSchema.isValidSync(value),
      );
    }
  }),
);
