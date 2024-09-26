import { Text, Card, Button, Tag } from "@shopify/polaris";
import { memo, useCallback } from "react";
import InputEditorComponent from "./inputEditor";
import { hsbToHex } from "../helpers/convertToHexa";
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

const CollectionComponent = (props) => {
  const { collection, setCollection, collectionError } = props;

  const handleInputChange = useCallback(
    (field) => (value) => {
      setCollection((prev) => ({
        ...prev,
        [field]:
          field == "backgroundColor" || field == "titleColor"
            ? hsbToHex(value)
            : value,
      }));
    },
    [],
  );

  const collectonResource = useCallback(
    (handle, handleId) => async () => {
      try {
        let selected;
        if (handle && handleId?.length > 0) {
          const selectionIds = handleId?.map((id, index) => ({ id: id }));
          selected = await shopify.resourcePicker({
            type: "collection",
            selectionIds: selectionIds,
            multiple: true,
          });
        } else {
          selected = await shopify.resourcePicker({
            type: "collection",
            multiple: true,
          });
        }
        if (!selected) return;
        const collectionHandles = selected?.map((item) => item.handle);
        const collectionIds = selected?.map((item) => item.id);
        const collectionTitles = selected?.map((item) => item.title);

        setCollection((prev) => ({
          ...prev,
          handle: collectionHandles,
          handleId: collectionIds,
          title: collectionTitles,
        }));
      } catch (error) {
        console.error("Error selecting collections: ", error);
      }
    },
    [],
  );

  return (
    <div className="collection-menu-main">
      <Card>
        <Text variant="headingLg" as="h5">
          Collections
        </Text>

        <div className="collection-menu-heading">
          <label>
            <strong>Heading</strong>{" "}
          </label>
        </div>
        <InputEditorComponent
          value={collection.heading}
          onChange={handleInputChange("heading")}
        />

        {collectionError && !collection.heading && (
          <div style={{ color: "red" }}> heading required </div>
        )}

        <div className="collection-menu-chooseBtn">
          <Button
            onClick={collectonResource(collection.handle, collection.handleId)}
          >
            Choose Collections
          </Button>
        </div>

        {collectionError && collection.handleId.length == 0 && (
          <div style={{ color: "red" }}> choose at least one collection </div>
        )}
        <div style={{ marginTop: 20 }}>
          {collection.title && collection.title.length > 0 && (
            <div className="collection-menu-list">
              {collection.title.map((title, index) => (
                <Tag
                  key={index}
                  onRemove={() => {
                    setCollection((prev) => ({
                      ...prev,
                      handle: prev.handle.filter((_, i) => i !== index),
                      handleId: prev.handleId.filter((_, i) => i !== index),
                      title: prev.title.filter((_, i) => i !== index),
                    }));
                  }}
                >
                  {title}
                </Tag>
              ))}
            </div>
          )}
        </div>

        <div className="collection-menu-colorMain">
          <div style={{ marginTop: 20 }}>
            <Text>
              <strong>Collection Background Color</strong>
            </Text>
            <div style={{ marginTop: 10 }}>
              <ColorPickerModel
                onChange={handleInputChange("backgroundColor")}
                color={hexToHsb(collection.backgroundColor)}
              />
            </div>
          </div>

          <div className="col-title-color">
            <Text>
              <strong>Collection Title Color</strong>
            </Text>
            <div style={{ marginTop: 10 }}>
              <ColorPickerModel
                onChange={handleInputChange("titleColor")}
                color={hexToHsb(collection.titleColor)}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default memo(CollectionComponent);
