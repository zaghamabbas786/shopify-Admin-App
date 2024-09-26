import { Select } from "@shopify/polaris";
import React from "react";

const fontweightOptions = [
  { label: "100", value: "100" },
  { label: "200", value: "200" },
  { label: "300", value: "300" },
  { label: "400", value: "400" },
  { label: "500", value: "500" },
  { label: "600", value: "600" },
  { label: "700", value: "700" },
  { label: "800", value: "800" },
  { label: "900", value: "900" },
  { label: "bold", value: "bold" },
  { label: "normal", value: "normal" },
];

const FontWeightSelect = ({ label, value, onChange }) => {
  return (
    <Select
      label={label}
      options={fontweightOptions}
      onChange={onChange}
      value={value}
    />
  );
};

export default React.memo(FontWeightSelect);
