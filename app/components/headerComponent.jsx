import { Text, Card, Select } from "@shopify/polaris";
import { useCallback, memo, useMemo } from "react";
import ColorPickerModel from "./ColorPickerModel";
import SvgInputComponent from "./svgInputcomponent";

const headerIconsAlignOptions = [
  {
    label: "Menu Icon Left Aligned, Profile Icon Right Aligned",
    value: "left",
  },
  {
    label: "Menu Icon Right Aligned, Profile Icon Left Aligned",
    value: "right",
  },
];
const logoAlignOptions = [
  { label: "Left", value: "flex-start" },
  { label: "Center", value: "center" },
  { label: "Right", value: "flex-end" },
];
const HeaderComponent = (props) => {
  const {
    menuIcon,
    setMenuIcon,
    profileIcon,
    setProfileIcon,
    logoIcon,
    setLogoIcon,
    menuIconcolor,
    setMenuIconcolor,
    profileIconColor,
    setProfileIconColor,
    logoIconColor,
    setLogoIconColor,
    backgroundColor,
    setBackgroundColor,
    headerError,
    logoAlignment,
    setLogoAlignment,
    iconsAlignment,
    setIconsAlignment,
  } = props;

  const handleColorChange = useCallback((color) => {
    setBackgroundColor(color);
  }, []);

  const handleSelectLogoChange = useCallback(
    (value) => setLogoAlignment(value),
    [],
  );

  const handleSelectHeaderIconsChange = useCallback(
    (value) => setIconsAlignment(value),
    [],
  );

  return (
    <div className="header-main">
      <Card>
        <Text variant="headingLg" as="h5">
          Header
        </Text>

        <div style={{ paddingTop: 20 }}>
          <div style={{ marginBottom: 10 }}>
            <label>
              <strong>Menu Svg</strong>
            </label>
          </div>
          <div style={{ width: "90%" }}>
            <SvgInputComponent
              onChangeSvgColor={(e) => setMenuIconcolor(e)}
              svgColor={menuIconcolor}
              onChangeSvgUri={(e) => setMenuIcon(e)}
              svgUri={menuIcon}
            />
          </div>
          {headerError && !menuIcon && (
            <div style={{ color: "red" }}> menu Svg required </div>
          )}
        </div>

        <div className="header-logo-main">
          <label>
            <strong>Logo Svg</strong>
          </label>
        </div>
        <div style={{ width: "90%" }}>
          <SvgInputComponent
            onChangeSvgColor={(e) => setLogoIconColor(e)}
            svgColor={logoIconColor}
            onChangeSvgUri={(e) => setLogoIcon(e)}
            svgUri={logoIcon}
          />
        </div>
        {headerError && !logoIcon && (
          <div style={{ color: "red" }}> logo Svg required </div>
        )}

        <div className="header-profile-main">
          <label>
            <strong>Profile Svg</strong>
          </label>
        </div>
        <div style={{ width: "90%" }}>
          <SvgInputComponent
            onChangeSvgColor={(e) => setProfileIconColor(e)}
            svgColor={profileIconColor}
            onChangeSvgUri={(e) => setProfileIcon(e)}
            svgUri={profileIcon}
          />
        </div>
        {headerError && !profileIcon && (
          <div style={{ color: "red" }}> profile Svg required </div>
        )}

        <div className="header-logo-align">
          <Text>
            <strong>Logo Alignment</strong>
          </Text>
        </div>
        <Select
          label=""
          options={logoAlignOptions}
          onChange={handleSelectLogoChange}
          value={logoAlignment}
        />

        <div className="header-icons-align">
          <Text>
            <strong>Icons Alignment</strong>
          </Text>
        </div>
        <Select
          label=""
          options={headerIconsAlignOptions}
          onChange={handleSelectHeaderIconsChange}
          value={iconsAlignment}
        />

        <div style={{ marginTop: 20 }}>
          <div>
            <Text>
              <strong>Background Color</strong>
            </Text>
          </div>
          <div className="header-bg-colopicker">
            <ColorPickerModel
              onChange={handleColorChange}
              color={backgroundColor}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default memo(HeaderComponent);
