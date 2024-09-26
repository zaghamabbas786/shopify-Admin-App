import { Modal, Text } from "@shopify/polaris";
import { memo, useCallback, useState } from "react";
import ColorPickerComponent from "./ColorPickerComponent";
import { hsbToHex } from "../helpers/convertToHexa";

const ColorPickerModel = ({ onChange, color }) => {
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const activeColor = hsbToHex(color) ?? "black";
  const activator = (
    <div
      onClick={toggleActive}
      title="Select Color"
      style={{ cursor: "pointer" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        fill={activeColor}
        version="1.1"
        id="Capa_1"
        width="30px"
        height="30px"
        viewBox="0 0 31.154 31.153"
        xml:space="preserve"
      >
        <g>
          <g>
            <path d="M22.826,10.854C22.826,4.861,17.966,0,11.971,0C5.976,0,1.117,4.861,1.117,10.854c0,1.252,0.147,2.067,0.561,3.32    c0.807,2.326,5.035-2.051,6.854,0.53c1.819,2.583-4.103,4.849-0.132,6.399c1.808,0.438,2.319,0.604,3.571,0.604    C17.966,21.708,22.826,16.85,22.826,10.854z M21.72,10.215c0,1.053-1.004,1.908-2.242,1.908c-1.237,0-2.241-0.854-2.241-1.908    c0-1.054,1.003-1.909,2.241-1.909C20.716,8.307,21.72,9.162,21.72,10.215z M17.237,3.618c1.237,0,2.241,0.855,2.241,1.909    c0,1.054-1.002,1.909-2.241,1.909s-2.241-0.855-2.241-1.909C14.996,4.473,15.999,3.618,17.237,3.618z M4.579,11.538    c-1.238,0-2.241-0.854-2.241-1.908c0-1.054,1.003-1.909,2.241-1.909c1.238,0,2.241,0.855,2.241,1.909    C6.82,10.684,5.817,11.538,4.579,11.538z M7.204,7.144c-1.238,0-2.241-0.854-2.241-1.908c0-1.054,1.003-1.909,2.241-1.909    c1.238,0,2.242,0.855,2.242,1.909C9.446,6.29,8.442,7.144,7.204,7.144z M9.936,3.059c0-1.054,1.004-1.909,2.242-1.909    s2.242,0.855,2.242,1.909c0,1.054-1.003,1.908-2.242,1.908C10.94,4.967,9.936,4.113,9.936,3.059z M13.78,20.173    c-1.239,0-2.242-0.854-2.242-1.909c0-1.054,1.003-1.908,2.242-1.908c1.237,0,2.241,0.854,2.241,1.908    C16.021,19.318,15.017,20.173,13.78,20.173z M16.021,14.998c0-1.054,1.003-1.909,2.241-1.909c1.238,0,2.242,0.855,2.242,1.909    c0,1.054-1.004,1.909-2.242,1.909C17.024,16.907,16.021,16.052,16.021,14.998z" />
            <path d="M29.742,17.021c0.375-0.363,0.396-0.963,0.041-1.363c-0.357-0.399-0.958-0.445-1.359-0.113l-0.002-0.003l-9.275,8.289    c-1.299-1.101-2.521-0.843-3.925,0.413c-1.172,1.047-1.393,2.791-2.055,4.349c-0.22,0.458-0.661,1.21-0.989,1.611    c-0.236,0.288-0.255,0.501-0.121,0.651c0.34,0.381,1.673,0.359,3.017,0.144v-0.001c1.721-0.275,3.678-0.923,4.494-1.791    c1.409-1.501,1.598-2.617,0.862-3.855l9.316-8.326L29.742,17.021z M14.775,30.262c-0.028,0.115-0.056,0.227-0.081,0.331    c-1.292,0.181-2,0.093-2.23-0.004c0.015-0.024,0.037-0.055,0.068-0.094c0.264-0.323,0.592-0.851,0.839-1.302    c0.469,0.191,1.041,0.274,1.599,0.234C14.913,29.695,14.841,29.996,14.775,30.262z" />
          </g>
        </g>
      </svg>
    </div>
  );
  return (
    <div style={{ textAlign: "center" }}>
      <Modal
        size="small"
        activator={activator}
        open={active}
        onClose={toggleActive}
        title="Color Picker"
        primaryAction={{
          content: "Save",
          onAction: toggleActive,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: toggleActive,
          },
        ]}
      >
        <Modal.Section>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ColorPickerComponent onChange={onChange} color={color} />
            <div
              style={{
                backgroundColor: hsbToHex(color),
                border: "1px solid black",
                height: 90,
                width: 90,
                marginInline: "auto",
              }}
            ></div>
          </div>
        </Modal.Section>
      </Modal>
      <Text variant="headingMd" as="h6">
        {hsbToHex(color)}
      </Text>
    </div>
  );
};

export default memo(ColorPickerModel);
