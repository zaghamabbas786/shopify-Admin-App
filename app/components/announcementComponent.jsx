import { Card, Text, Button, Select } from "@shopify/polaris";
import { useCallback, memo } from "react";
import InputEditorComponent from "./inputEditor";
import ColorPickerModel from "./ColorPickerModel";
import SvgInputComponent from "./svgInputcomponent";

const options = [
  { label: "Left", value: "flex-start" },
  { label: "Center", value: "center" },
];

const AnnouncementComponent = (props) => {
  const {
    iconImage,
    setIconImage,
    announcements,
    setAnnouncements,
    announcementSvgColor,
    setAnnouncementSvgColor,
    alignAnnounceText,
    setAlignAnnounceText,
    announcementError,
  } = props;

  const handleContentChange = useCallback((index, newContent) => {
    setAnnouncements((prev) =>
      prev?.map((announcement, i) =>
        i === index ? { ...announcement, content: newContent } : announcement,
      ),
    );
  }, []);

  const handleColorChange = useCallback((index, newColor) => {
    setAnnouncements((prev) =>
      prev?.map((announcement, i) =>
        i === index
          ? { ...announcement, backgroundColor: newColor }
          : announcement,
      ),
    );
  }, []);

  const addAnnouncement = () => {
    if (announcements?.length < 3) {
      setAnnouncements([
        ...announcements,
        {
          content: "",
          backgroundColor: { hue: 120, brightness: 1, saturation: 1 },
          image: null,
        },
      ]);
    }
  };

  const removeAnnouncement = (index) => {
    if (announcements?.length === 1) return;
    setAnnouncements(announcements?.filter((_, i) => i !== index));
  };

  const handleSelectChange = useCallback(
    (value) => setAlignAnnounceText(value),
    [],
  );

  return (
    <div className="announce-main">
      <Card>
        <Text variant="headingLg" as="h5">
          Announcement Bar
        </Text>

        <div style={{ marginTop: 40 }}>
          <div style={{ marginBottom: 10 }}>
            <Text>
              <strong>Text Alignment</strong>
            </Text>
          </div>
          <Select
            label=""
            options={options}
            onChange={handleSelectChange}
            value={alignAnnounceText}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={{ marginBottom: 10 }}>
            <Text>
              <strong>Cross Icon SVG and Color</strong>
            </Text>
          </div>
          <div style={{ width: "60%" }}>
            <SvgInputComponent
              onChangeSvgColor={(e) => setAnnouncementSvgColor(e)}
              svgColor={announcementSvgColor}
              onChangeSvgUri={(e) => setIconImage(e)}
              svgUri={iconImage}
            />
          </div>
          {announcementError && !iconImage && (
            <div style={{ color: "red" }}> Svg required </div>
          )}
        </div>
      </Card>

      {announcements.map((announcement, index) => (
        <div key={index} style={{ marginTop: 20 }}>
          <Card>
            <div style={{ marginTop: 20 }}>
              <InputEditorComponent
                value={announcement.content}
                onChange={(newContent) =>
                  handleContentChange(index, newContent)
                }
                limitChars={35}
              />
              {announcementError && !announcement.content && (
                <div style={{ color: "red" }}> Announcment required </div>
              )}
              <div style={{ marginTop: 10 }}>
                <div className="announce-bg-main">
                  <Text>
                    <strong>Background Color</strong>{" "}
                  </Text>
                </div>
                <div className="colorPicker-main">
                  <ColorPickerModel
                    onChange={(color) => handleColorChange(index, color)}
                    color={announcement.backgroundColor}
                  />
                </div>
              </div>
              {announcements?.length > 1 && (
                <div className="announce-removeBtn-main">
                  <Button onClick={() => removeAnnouncement(index)}>
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      ))}
      {announcements?.length < 3 && (
        <div className="announce-addBtn-main">
          <Button
            disabled={announcements?.length >= 3}
            onClick={addAnnouncement}
          >
            Add Announcement
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(AnnouncementComponent);
