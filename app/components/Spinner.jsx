import { Spinner } from "@shopify/polaris";
import { memo } from "react";

const CustomSpinner = () => {
  return <Spinner accessibilityLabel="Spinner" size="large" />;
};

export default memo(CustomSpinner);
