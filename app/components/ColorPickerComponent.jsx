import { ColorPicker } from "@shopify/polaris";
import HexaColorInput from "./HexaColorInput";
import { memo } from "react";

const ColorPickerComponent = ({ onChange, color }) => {
  return (
    <div>
      <ColorPicker onChange={onChange} color={color} />
      <div style={{ marginTop: 10 }}>
        <HexaColorInput onChange={onChange} value={color} />
      </div>
    </div>
  );
};

export default memo(ColorPickerComponent);
