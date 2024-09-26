import { Card, Text } from "@shopify/polaris";
import { memo, useCallback } from "react";
import FontWeightSelect from "./FontWeightSelect";
import ColorPickerModel from "./ColorPickerModel";

const ProductTileComponent = (props) => {
  const { grid, setGridDataTiles } = props;

  const handleFontWeightChange = useCallback(
    (field) => (newValue) => {
      setGridDataTiles((prevGrid) => ({ ...prevGrid, [field]: newValue }));
    },
    [],
  );

  const handleSetColor = useCallback(
    (field, setHexField) => (color) => {
      setGridDataTiles((prevGrid) => ({ ...prevGrid, [field]: color }));
    },
    [],
  );

  return (
    <div className="tile-main">
      <Card>
        <div style={{ marginBottom: "20px" }}>
          <Text variant="headingLg" as="h5">
            Product Tiles
          </Text>
        </div>

        <div className="tile-sub-main">
          <div className="tile-sub">
            <div style={{ width: "50%" }}>
              <div style={{ marginBottom: 10 }}>
                <label>
                  <strong>Font Weight</strong>
                </label>
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>
                  <strong>Type</strong>
                </label>
              </div>
              <FontWeightSelect
                label=""
                onChange={handleFontWeightChange("fontWeightProductType")}
                value={grid.fontWeightProductType}
              />
            </div>
            <div className="tile-color">
              <div style={{ marginBottom: 10 }}>
                <Text>
                  <strong>Color</strong>
                </Text>
              </div>

              <ColorPickerModel
                onChange={handleSetColor("productTypeColor", "ProductTypehex")}
                color={grid.productTypeColor}
              />
            </div>
          </div>

          <div className="tile-title">
            <div style={{ width: "50%" }}>
              <div style={{ marginBottom: 10 }}>
                <label>
                  <strong>Title</strong>
                </label>
              </div>
              <FontWeightSelect
                label=""
                onChange={handleFontWeightChange("fontWeightProductTitle")}
                value={grid.fontWeightProductTitle}
              />
            </div>
            <div className="tile-title-color-main">
              <div className="tile-dum"></div>

              <ColorPickerModel
                onChange={handleSetColor(
                  "productTitleColor",
                  "ProductTitlehex",
                )}
                color={grid.productTitleColor}
              />
            </div>
          </div>

          <div className="tile-description">
            <div style={{ width: "50%" }}>
              <div style={{ marginBottom: 10 }}>
                <label>
                  <strong>Description</strong>
                </label>
              </div>
              <FontWeightSelect
                label=""
                onChange={handleFontWeightChange(
                  "fontWeightProductDescription",
                )}
                value={grid.fontWeightProductDescription}
              />
            </div>
            <div className="tile-description-color-main">
              <div className="tile-dum"></div>
              <div>
                <ColorPickerModel
                  onChange={handleSetColor(
                    "productDescriptionColor",
                    "ProductDescriptionhex",
                  )}
                  color={grid.productDescriptionColor}
                />
              </div>
            </div>
          </div>

          <div className="tile-price">
            <div style={{ width: "50%" }}>
              <div style={{ marginBottom: 10 }}>
                <label>
                  <strong>Price</strong>
                </label>
              </div>
              <FontWeightSelect
                label=""
                onChange={handleFontWeightChange("fontWeightProductPrice")}
                value={grid.fontWeightProductPrice}
              />
            </div>
            <div className="tile-price-color-main">
              <div className="tile-dum"></div>
              <div>
                <ColorPickerModel
                  onChange={handleSetColor(
                    "productPriceColor",
                    "ProductPricehex",
                  )}
                  color={grid.productPriceColor}
                />
              </div>
            </div>
          </div>

          <div className="tile-discount-price">
            <div style={{ width: "50%" }}>
              <div style={{ marginBottom: 10 }}>
                <label>
                  <strong>Discount Price</strong>
                </label>
              </div>
              <FontWeightSelect
                label=""
                onChange={handleFontWeightChange(
                  "fontWeightProductDiscountPrice",
                )}
                value={grid.fontWeightProductDiscountPrice}
              />
            </div>
            <div className="tile-dprice-color-main">
              <div className="tile-dum"></div>
              <div>
                <ColorPickerModel
                  onChange={handleSetColor(
                    "productDiscountPriceColor",
                    "ProductDiscountPricehex",
                  )}
                  color={grid.productDiscountPriceColor}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default memo(ProductTileComponent);
