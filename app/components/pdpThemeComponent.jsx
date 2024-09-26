import { Text, Card } from "@shopify/polaris";
import InputEditorComponent from "./inputEditor";
import { hsbToHex } from "../helpers/convertToHexa";
import React, { useCallback } from "react";
import ColorPickerModel from "./ColorPickerModel";

// Function to convert hex color to HSB format
const hexToHsb = (hex) => {
  let r = 0,
    g = 0,
    b = 0;
  if (hex?.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex?.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    v = max;

  const d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
        break;
    }
    h /= 6;
  }

  return {
    hue: h * 360,
    saturation: s,
    brightness: v,
  };
};
const colorFields = [
  "typeColor",
  "titleColor",
  "subTitleColor",
  "descriptionColor",
  "discountPriceColor",
  "actualPriceColor",
  "variantSelectedColor",
  "variantUnselectedColor",
  "variantActiveTitleColor",
  "variantInActiveTitleColor",
  "quatityDigitColor",
  "quatityBackgroundColor",
  "quatityBorderColor",
  "atcBackgroundColor",
  "atcBorderColor",
  "buyNowBackgroundColor",
  "buyNowBorderColor",
];
const PDPThemingComponent = (props) => {
  const { pdpElements, setPdpElements, pdpError } = props;

  const handleInputChange = useCallback(
    (field) => (value) => {
      setPdpElements((prev) => ({
        ...prev,
        [field]: colorFields.includes(field) ? hsbToHex(value) : value,
      }));
    },
    [],
  );

  return (
    <div className="pdp-main">
      <Card>
        <Text variant="headingLg" as="h5">
          Product Detail Page
        </Text>

        <div className="pdp-colors-main">
          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Type Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("typeColor")}
              color={hexToHsb(pdpElements.typeColor)}
            />
          </div>

          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Title Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("titleColor")}
              color={hexToHsb(pdpElements.titleColor)}
            />
          </div>

          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Description Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("descriptionColor")}
              color={hexToHsb(pdpElements.descriptionColor)}
            />
          </div>

          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Discounted Price Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("discountPriceColor")}
              color={hexToHsb(pdpElements.discountPriceColor)}
            />
          </div>

          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Actual Price Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("actualPriceColor")}
              color={hexToHsb(pdpElements.actualPriceColor)}
            />
          </div>
        </div>

        <div className="pdp-align-div">
          <label>
            <strong>Variant Heading</strong>
          </label>
        </div>
        <InputEditorComponent
          value={pdpElements.variantHeading}
          onChange={handleInputChange("variantHeading")}
        />

        {pdpError && !pdpElements.variantHeading && (
          <div style={{ color: "red" }}>Variant Heading is Required</div>
        )}

        <div className="pdp-colors-main">
          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Selected Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("variantSelectedColor")}
              color={hexToHsb(pdpElements.variantSelectedColor)}
            />
          </div>

          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Unselected Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("variantUnselectedColor")}
              color={hexToHsb(pdpElements.variantUnselectedColor)}
            />
          </div>

          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Active Title Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("variantActiveTitleColor")}
              color={hexToHsb(pdpElements.variantActiveTitleColor)}
            />
          </div>
          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>InActive Title Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("variantInActiveTitleColor")}
              color={hexToHsb(pdpElements.variantInActiveTitleColor)}
            />
          </div>
        </div>

        <div className="pdp-align-div">
          <label>
            <strong>Quantity Selector Heading</strong>
          </label>
        </div>
        <InputEditorComponent
          value={pdpElements.quatityHeading}
          onChange={handleInputChange("quatityHeading")}
        />

        {pdpError && !pdpElements.quatityHeading && (
          <div style={{ color: "red" }}>Quatity Heading is Required</div>
        )}

        <div className="pdp-colors-main">
          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Input Digit Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("quatityDigitColor")}
              color={hexToHsb(pdpElements.quatityDigitColor)}
            />
          </div>

          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Input Background Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("quatityBackgroundColor")}
              color={hexToHsb(pdpElements.quatityBackgroundColor)}
            />
          </div>

          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Input Border Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("quatityBorderColor")}
              color={hexToHsb(pdpElements.quatityBorderColor)}
            />
          </div>
        </div>

        <div className="pdp-align-div">
          <label>
            <strong>Add to Cart Text</strong>
          </label>
        </div>
        <InputEditorComponent
          value={pdpElements.atcText}
          onChange={handleInputChange("atcText")}
        />

        {pdpError && !pdpElements.atcText && (
          <div style={{ color: "red" }}>Add To Cart Text Required</div>
        )}

        <div className="pdp-colorPick-main">
          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Background Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("atcBackgroundColor")}
              color={hexToHsb(pdpElements.atcBackgroundColor)}
            />
          </div>

          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Border Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("atcBorderColor")}
              color={hexToHsb(pdpElements.atcBorderColor)}
            />
          </div>
        </div>

        <div className="pdp-align-div">
          <label>
            <strong>Buy Now Text</strong>
          </label>
        </div>
        <InputEditorComponent
          value={pdpElements.buyNowText}
          onChange={handleInputChange("buyNowText")}
        />

        {pdpError && !pdpElements.buyNowText && (
          <div style={{ color: "red" }}>Buy Now Text Required</div>
        )}

        <div className="pdp-colorPick-main">
          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Background Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("buyNowBackgroundColor")}
              color={hexToHsb(pdpElements.buyNowBackgroundColor)}
            />
          </div>

          <div className="pdp-sub-align">
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Border Color</strong>
              </label>
            </div>
            <ColorPickerModel
              onChange={handleInputChange("buyNowBorderColor")}
              color={hexToHsb(pdpElements.buyNowBorderColor)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default React.memo(PDPThemingComponent);
