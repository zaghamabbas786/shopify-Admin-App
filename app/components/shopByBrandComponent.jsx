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
const colorFields = new Set(["btnBackgroundColor", "backgroundColor"]);
const ShopByBrandComponent = (props) => {
  const { shopByBrand, setShopByBrand } = props;

  const [imageError, setImageError] = useState(null);

  // Ensure shopByBrand.images is initialized as an array
  const images = shopByBrand?.images || [];

  const convertImageToBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }, []);

  const handleDropZoneDrop = useCallback(
    async (_dropFiles, acceptedFiles, _rejectedFiles, index) => {
      setImageError("");
      const file = acceptedFiles[0];
      if (file.size > 256 * 1024) {
        setImageError("File size should not exceed 256 KB.");
        return;
      }
      const base64String = await convertImageToBase64(file);
      setShopByBrand((prev) => {
        const newImages = [...(prev.images || [])];
        newImages[index] = base64String;
        return { ...prev, images: newImages };
      });
    },
    [images],
  );

  const handleInputChange = useCallback(
    (field) => (value) => {
      setShopByBrand((prev) => ({
        ...prev,
        [field]: colorFields.has(field) ? hsbToHex(value) : value,
      }));
    },
    [],
  );

  const handleAddDropZone = useCallback(() => {
    setShopByBrand((prev) => ({
      ...prev,
      images: [...(prev.images || []), ""],
    }));
  }, []);

  const handleRemoveDropZone = useCallback((index) => {
    setShopByBrand((prev) => {
      const newImages = (prev.images || []).filter((_, i) => i !== index);
      return { ...prev, images: newImages };
    });
  }, []);

  const renderDropZones = useCallback(() => {
    return images?.map((image, index) => (
      <div style={{ marginTop: 20 }}>
        <Card>
          <div key={index} style={{ paddingTop: 20 }}>
            <label>
              <strong>{/* {index + 1} */} Vendor Image</strong>
            </label>
            <div className="shop-vendor-img-main">
              <DropZone
                allowMultiple={false}
                onDrop={(files, acceptedFiles, rejectedFiles) =>
                  handleDropZoneDrop(files, acceptedFiles, rejectedFiles, index)
                }
              >
                <div className="shop-vendor-img-sub">
                  <img
                    className="shop-vendor-img"
                    src={image || dummyImage}
                    alt="upload"
                  />
                </div>
                <div className="shop-vendor-img-zone">
                  <DropZone.FileUpload
                    actionTitle={image ? "Update file" : "Add file"}
                  />
                </div>
              </DropZone>
              <div className="shop-remove-btn">
                <Button onClick={() => handleRemoveDropZone(index)} destructive>
                  Remove
                </Button>
              </div>
            </div>
            {imageError && <div style={{ color: "red" }}>{imageError}</div>}
          </div>
        </Card>
      </div>
    ));
  }, [images]);

  return (
    <div className="shopBrand-main">
      <Card>
        <Text variant="headingLg" as="h5">
          Shop By Brand
        </Text>

        <div className="shop-hd">
          <label>
            <strong>Heading</strong>
          </label>
        </div>
        <InputEditorComponent
          value={shopByBrand.heading}
          onChange={handleInputChange("heading")}
        />

        <div className="shop-sub-hd">
          <label>
            <strong>Sub Heading</strong>
          </label>
        </div>
        <InputEditorComponent
          value={shopByBrand.subHeading}
          onChange={handleInputChange("subHeading")}
          limitChars={60}
        />

        <div className="shop-bg-main">
          <div>
            <div style={{ marginBottom: 10 }}>
              <label>
                <strong>Background Color</strong>
              </label>
            </div>
            <div style={{ marginTop: 10 }}>
              <ColorPickerModel
                onChange={handleInputChange("backgroundColor")}
                color={hexToHsb(shopByBrand.backgroundColor)}
              />
            </div>
          </div>
        </div>
      </Card>

      {renderDropZones()}
      <div className="shop-img-main">
        {images?.length < 4 && (
          <Button onClick={handleAddDropZone} primary>
            Add Vendor Image
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(ShopByBrandComponent);
