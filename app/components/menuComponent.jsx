import { Card, Text, TextField } from "@shopify/polaris";
import { useCallback, memo } from "react";
import ColorPickerModel from "./ColorPickerModel";
import FontWeightSelect from "./FontWeightSelect";
import SvgInputComponent from "./svgInputcomponent";
import InputEditorComponent from "./inputEditor";
import { hsbToHex } from "../helpers/convertToHexa";

const MenuComponent = (props) => {
  const {
    menuItme,
    setMenuItems,
    dealText,
    setDealText,
    menuColor,
    setMenuColor,
    socialIcon1,
    setSocialIcon1,
    socialIcon2,
    setSocialIcon2,
    socialIcon3,
    setSocialIcon3,
    socialIcon4,
    setSocialIcon4,
    socialicon1Color,
    setSocialicon1Color,
    socialicon2Color,
    setSocialicon2Color,
    socialicon3Color,
    setSocialicon3Color,
    socialicon4Color,
    setSocialicon4Color,
    socialMediaLinks,
    setSocialMediaLinks,
    setSelectedWeight,
    selectedWeight,
    menuError,
  } = props;

  const handleSetColor = useCallback(
    (color) => (e) => {
      if (color == "background") {
        setMenuColor((prev) => ({ ...prev, ["backgroundColor"]: e }));
        const { hue, saturation, brightness } = e;
        const hexColor = hsbToHex(hue, saturation, brightness);
        setHex(hexColor);
      } else {
        setMenuColor((prev) => ({ ...prev, ["color"]: e }));
        const { hue, saturation, brightness } = e;
        const hexColor = hsbToHex(hue, saturation, brightness);
        setTextHex(hexColor);
      }
    },
    [],
  );
  const handleSelectChange = useCallback(
    (value) => setSelectedWeight(value),
    [],
  );

  const handleMenueText = useCallback(
    (item) => (e) => {
      if (item == "home") {
        setMenuItems((prev) => ({ ...prev, home: e }));
      }

      if (item == "collection") {
        setMenuItems((prev) => ({ ...prev, collection: e }));
      }
      if (item == "contact") {
        setMenuItems((prev) => ({ ...prev, contact: e }));
      }

      if (item == "handle") {
        setMenuItems((prev) => ({ ...prev, handle: e }));
      }
    },
    [],
  );

  // social icons functions

  const handleSocialIconLink = useCallback(
    (item) => (e) => {
      if (item === 1) {
        setSocialMediaLinks((prev) => ({ ...prev, ["link1"]: e }));
      }
      if (item === 2) {
        setSocialMediaLinks((prev) => ({ ...prev, ["link2"]: e }));
      }
      if (item === 3) {
        setSocialMediaLinks((prev) => ({ ...prev, ["link3"]: e }));
      }
      if (item === 4) {
        setSocialMediaLinks((prev) => ({ ...prev, ["link4"]: e }));
      }
    },
    [],
  );
  const tooltipContent =
    "To get your handle, go to Online Store > Navigation, click on the desired menu, and copy the handle from the handle section.";
  const handleInputChange = useCallback((newContent) => {
    setDealText(newContent);
  }, []);

  return (
    <div className="menu-main">
      <Card>
        <div style={{ marginBottom: 20 }}>
          <Text variant="headingLg" as="h5">
            Menu
          </Text>
        </div>
        <div className="menu-colors-main">
          <div className="menu-colors-sub">
            <div style={{ marginBottom: 10 }}>
              <Text>
                <strong>Background Color</strong>
              </Text>
            </div>

            <ColorPickerModel
              onChange={handleSetColor("background")}
              color={menuColor.backgroundColor}
            />
          </div>
          <div className="menu-colors-sub">
            <div style={{ marginBottom: 10 }}>
              <Text>
                <strong>Text Color</strong>
              </Text>
            </div>
            <ColorPickerModel
              onChange={handleSetColor("color")}
              color={menuColor.color}
            />
          </div>
        </div>

        <div className="menu-font-main">
          <div style={{ marginBottom: 10 }}>
            <Text>
              <strong>Font Weight Menu</strong>
            </Text>
          </div>
          <FontWeightSelect
            label=""
            value={selectedWeight}
            onChange={handleSelectChange}
          />
          <div className="menu-handle-main" title={tooltipContent}>
            <TextField
              value={menuItme.handle}
              // label="Home"
              type="text"
              helpText={
                <span>
                  <strong>Handle For Menu</strong>
                </span>
              }
              onChange={handleMenueText("handle")}
            />
          </div>
          {menuError && !menuItme.handle && (
            <div style={{ color: "red" }}> Hnadle for Menu is required </div>
          )}
        </div>

        <div className="menu-deal">
          <Text>
            <strong>Today's Deal Label</strong>
          </Text>
        </div>
        <InputEditorComponent value={dealText} onChange={handleInputChange} />
        {menuError && !dealText && (
          <div style={{ color: "red" }}> Deal Text is required </div>
        )}
        <div style={{ margin: "20px 0" }}>
          <Text variant="headingLg" as="h5">
            Social Media Icons
          </Text>
        </div>

        <div className="menu-social-icon">
          {/* social icon 1 */}

          <div className="menu-social-sub">
            <div style={{ width: "45%" }}>
              <div style={{ marginBottom: 10 }}>
                <Text>
                  <strong>Link for Social Icons</strong>
                </Text>
              </div>
              <TextField
                value={socialMediaLinks.link1}
                // label="Home"
                type="text"
                label=""
                // placeholder="put link For social Icons"
                onChange={handleSocialIconLink(1)}
              />
            </div>

            <div style={{ width: "50%" }}>
              <div style={{ marginBottom: 10 }}>
                <Text>
                  <strong>Social Svg</strong>
                </Text>
              </div>
              <SvgInputComponent
                onChangeSvgColor={(e) => setSocialicon1Color(e)}
                svgColor={socialicon1Color}
                onChangeSvgUri={(e) => setSocialIcon1(e)}
                svgUri={socialIcon1}
              />
            </div>
          </div>

          {/* scoial icons 2 */}

          <div className="menu-social-sub">
            <div style={{ width: "45%" }}>
              <TextField
                value={socialMediaLinks.link2}
                // label="Home"
                type="text"
                label=""
                onChange={handleSocialIconLink(2)}
              />
            </div>

            <div style={{ width: "50%" }}>
              <SvgInputComponent
                onChangeSvgColor={(e) => setSocialicon2Color(e)}
                svgColor={socialicon2Color}
                onChangeSvgUri={(e) => setSocialIcon2(e)}
                svgUri={socialIcon2}
              />
            </div>
          </div>
          {/* social icon 3 */}

          <div className="menu-social-sub">
            <div style={{ width: "45%" }}>
              <TextField
                value={socialMediaLinks.link3}
                // label="Home"
                type="text"
                label=""
                onChange={handleSocialIconLink(3)}
              />
            </div>

            <div style={{ width: "50%" }}>
              <SvgInputComponent
                onChangeSvgColor={(e) => setSocialicon3Color(e)}
                svgColor={socialicon3Color}
                onChangeSvgUri={(e) => setSocialIcon3(e)}
                svgUri={socialIcon3}
              />
            </div>
          </div>
          {/* social icon 4 */}

          <div className="menu-social-sub">
            <div style={{ width: "45%" }}>
              <TextField
                value={socialMediaLinks.link4}
                // label="Home"
                type="text"
                label=""
                onChange={handleSocialIconLink(4)}
              />
            </div>

            <div style={{ width: "50%" }}>
              <SvgInputComponent
                onChangeSvgColor={(e) => setSocialicon4Color(e)}
                svgColor={socialicon4Color}
                onChangeSvgUri={(e) => setSocialIcon4(e)}
                svgUri={socialIcon4}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default memo(MenuComponent);
