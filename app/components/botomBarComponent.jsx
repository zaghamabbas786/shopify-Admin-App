import { Card, Text, TextField } from "@shopify/polaris";
import { memo, useCallback } from "react";
import ColorPickerModel from "./ColorPickerModel";

const BottomBarComponent = (props) => {
  const { bottomBarData, setBottomBarData, bottomError } = props;
  const handleSetChange = useCallback(
    (key) => (e) => {
      setBottomBarData((prev) => ({ ...prev, [key]: e }));
    },
    [],
  );

  return (
    <div className="bottom-bar-main">
      <Card>
        <div style={{ marginBottom: "20px" }}>
          <Text variant="headingLg" as="h5">
            Bottom Bar
          </Text>
        </div>

        <div className="bottom-bar-color">
          <div style={{ marginTop: 10 }}>
            <div style={{ marginBottom: 10 }}>
              <Text>
                <strong>Background Color</strong>
              </Text>
            </div>
            <div>
              <ColorPickerModel
                onChange={handleSetChange("backgroundColor")}
                color={bottomBarData.backgroundColor}
              />
            </div>
          </div>

          <div style={{ marginTop: 10 }}>
            <div style={{ marginBottom: 10 }}>
              <Text>
                <strong>Badge Color</strong>
              </Text>
            </div>
            <div>
              <ColorPickerModel
                onChange={handleSetChange("badgeColor")}
                color={bottomBarData.badgeColor}
              />
            </div>
          </div>

          <div style={{ marginTop: 10 }}>
            <div style={{ marginBottom: 10 }}>
              <Text>
                <strong>Badge Count Color</strong>
              </Text>
            </div>
            <div>
              <ColorPickerModel
                onChange={handleSetChange("badgeCountColor")}
                color={bottomBarData.badgeCountColor}
              />
            </div>
          </div>

          <div>
            <div style={{ marginBottom: 10 }}>
              <Text>
                <strong>Active Color</strong>
              </Text>
            </div>
            <ColorPickerModel
              onChange={handleSetChange("activeColor")}
              color={bottomBarData.activeColor}
            />
          </div>

          <div>
            <div style={{ marginBottom: 10 }}>
              <Text>
                <strong>Inactive Color</strong>
              </Text>
            </div>
            <ColorPickerModel
              onChange={handleSetChange("inActiveColor")}
              color={bottomBarData.inActiveColor}
            />
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <div className="bottom-bar-svg">
            <div style={{ marginBottom: 10 }}>
              <Text>
                <strong>Enter Home Svg</strong>
              </Text>
            </div>
            <TextField
              value={bottomBarData.homeSvg}
              type="text"
              onChange={handleSetChange("homeSvg")}
              label=""
            />
          </div>
          {bottomError && !bottomBarData.homeSvg && (
            <div style={{ color: "red" }}> Home Svg is required </div>
          )}

          <div className="bottom-bar-svg">
            <div style={{ marginBottom: 10 }}>
              <Text>
                <strong>Enter Cart Svg</strong>
              </Text>
            </div>
            <TextField
              value={bottomBarData.cartSvg}
              type="text"
              onChange={handleSetChange("cartSvg")}
              label=""
            />
          </div>
          {bottomError && !bottomBarData.cartSvg && (
            <div style={{ color: "red" }}> Cart Svg is required </div>
          )}

          <div className="bottom-bar-svg">
            <div style={{ marginBottom: 10 }}>
              <Text>
                <strong>Enter Search Svg</strong>
              </Text>
            </div>
            <TextField
              value={bottomBarData.searchSvg}
              type="text"
              onChange={handleSetChange("searchSvg")}
              label=""
            />
          </div>
          {bottomError && !bottomBarData.searchSvg && (
            <div style={{ color: "red" }}> Search Svg is required </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default memo(BottomBarComponent);
