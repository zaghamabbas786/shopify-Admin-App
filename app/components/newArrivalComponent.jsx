import { DropZone, Text, Card, Button } from "@shopify/polaris";
import { useState, memo, useCallback } from "react";
import InputEditorComponent from "./inputEditor";
import { hsbToHex } from "../helpers/convertToHexa";
import ColorPickerModel from "./ColorPickerModel";
import dummyImage from "../assets/upload.png";

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
const colorFields = new Set([
  "btnBackgroundColor",
  "backgroundColor",
  "btnBorderColor",
]);
const NewArrivalComponent = (props) => {
  const { newArrival, setNewArrival, newArrivalError } = props;

  const [imageError, setImageError] = useState(null);

  const convertImageToBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }, []);

  const handleDropZoneDrop = useCallback(
    async (_dropFiles, acceptedFiles, _rejectedFiles) => {
      setImageError("");
      const file = acceptedFiles[0];
      if (file.size > 256 * 1024) {
        setImageError("File size should not exceed 256 KB.");
        return;
      }
      const base64Files = await Promise.all(
        acceptedFiles.map(async (file) => {
          const base64String = await convertImageToBase64(file);
          return { file, base64String };
        }),
      );
      setNewArrival((prev) => ({
        ...prev,
        image: base64Files[0]?.base64String,
      }));
    },
    [],
  );

  const handleInputChange = useCallback(
    (field) => (value) => {
      setNewArrival((prev) => ({
        ...prev,
        [field]: colorFields.has(field) ? hsbToHex(value) : value,
      }));
    },
    [],
  );

  const collectonResource = useCallback(
    (handle, handleId) => async () => {
      var selected;
      if (handle && handleId) {
        selected = await shopify.resourcePicker({
          type: "collection",
          selectionIds: [{ id: handleId }],
        });
        const collectionHandle = selected[0]?.handle;
        setNewArrival((prev) => ({
          ...prev,
          ["handle"]: collectionHandle,
          ["handleId"]: selected[0]?.id,
          ["title"]: selected[0]?.title,
        }));
      } else {
        selected = await shopify.resourcePicker({
          type: "collection",
        });
        const collectionHandle = selected[0]?.handle;

        setNewArrival((prev) => ({
          ...prev,
          ["handle"]: collectionHandle,
          ["handleId"]: selected[0]?.id,
          ["title"]: selected[0]?.title,
        }));
      }
    },
    [],
  );

  return (
    <div className="newArrival-main">
      <Card>
        <Text variant="headingLg" as="h5">
          New Arrival
        </Text>

        <div className="newArrival-hd">
          <label>
            <strong>Heading</strong>
          </label>
        </div>
        <InputEditorComponent
          value={newArrival.heading}
          onChange={handleInputChange("heading")}
        />

        {newArrivalError && !newArrival.heading && (
          <div style={{ color: "red" }}>heading is Required</div>
        )}

        <div className="newArrival-sub-hd">
          <label>
            <strong>Sub Heading</strong>
          </label>
        </div>
        <InputEditorComponent
          value={newArrival.subHeading}
          onChange={handleInputChange("subHeading")}
        />

        {newArrivalError && !newArrival.subHeading && (
          <div style={{ color: "red" }}>subHeading is Required</div>
        )}

        <div className="newArrival-btn">
          <label>
            <strong>Button</strong>
          </label>
        </div>
        <InputEditorComponent
          value={newArrival.buttonTxt}
          onChange={handleInputChange("buttonTxt")}
        />

        {newArrivalError && !newArrival.buttonTxt && (
          <div style={{ color: "red" }}>Button text is Required</div>
        )}

        <div className="newArrival-col-main">
          <div style={{ marginRight: 10 }}>
            <Button
              onClick={collectonResource(
                newArrival.handle,
                newArrival.handleId,
              )}
            >
              Choose Collection
            </Button>
            {newArrival.title && (
              <div className="newArrival-title">
                <strong>{newArrival.title}</strong>
              </div>
            )}
          </div>
        </div>
        {newArrivalError && (!newArrival.handleId || !newArrival.title) && (
          <div style={{ color: "red" }}>Collection is Required</div>
        )}

        <div className="newArrival-colors-main">
          <div style={{ marginTop: 20 }}>
            <Text>
              <strong>Background Color</strong>
            </Text>
            <div style={{ marginTop: 10 }}>
              <ColorPickerModel
                onChange={handleInputChange("backgroundColor")}
                color={hexToHsb(newArrival.backgroundColor)}
              />
            </div>
          </div>

          <div className="newArrival-btn-bg">
            <Text>
              <strong>Button Background Color</strong>
            </Text>
            <div style={{ marginTop: 10 }}>
              <ColorPickerModel
                onChange={handleInputChange("btnBackgroundColor")}
                color={hexToHsb(newArrival.btnBackgroundColor)}
              />
            </div>
          </div>

          <div className="newArrival-btn-border">
            <Text>
              <strong>Button Border Color</strong>
            </Text>
            <div style={{ marginTop: 10 }}>
              <ColorPickerModel
                onChange={handleInputChange("btnBorderColor")}
                color={hexToHsb(newArrival.btnBorderColor)}
              />
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 20 }}>
          <div style={{ marginBottom: 10 }}>
            <label>
              <strong>Image</strong>
            </label>
          </div>
          <div className="newArrival-img-main">
            <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
              <div className="newArrival-img-sub">
                <img
                  className="newArrival-img"
                  src={newArrival?.image || dummyImage}
                  alt="upload"
                />
              </div>
              <div className="newArrival-zone">
                <DropZone.FileUpload
                  actionTitle={newArrival.image ? "Update file" : "Add file"}
                />
              </div>
            </DropZone>
          </div>
          {imageError && <div style={{ color: "red" }}>{imageError}</div>}
          {newArrivalError && !newArrival.image && (
            <div style={{ color: "red" }}>Image is Required</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default memo(NewArrivalComponent);
