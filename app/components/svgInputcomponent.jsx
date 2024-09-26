import { TextField } from "@shopify/polaris";
import ColorPickerModel from "./ColorPickerModel";
import { memo } from "react";

const SvgInputComponent = ({
  svgUri,
  onChangeSvgUri,
  svgColor = null,
  onChangeSvgColor = null,
  label = null,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: 'relative'
      }}
    >
      <div style={{ width: "100%" }} className="text-field-parent">
        <TextField
          value={svgUri}
          type="text"
          onChange={onChangeSvgUri}
          label={label}
        />
      </div>
      <div className="svgColorPicker" style={{position: 'absolute',width: 20,height: 20,right: 15, zIndex: 99999, top: 6, paddingLeft: 8, borderLeft: '1px solid #c3c6c8' }}>
        <ColorPickerModel onChange={onChangeSvgColor} color={svgColor} />
      </div>
    </div>
  );
};

export default memo(SvgInputComponent);
