import {
  Card,
  Text,
  TextField,
  Button,
  DropZone,
  Checkbox,
  Select
} from "@shopify/polaris";
import { useState, useCallback, useImperativeHandle, forwardRef } from "react";
import dummyImage from '../assets/upload.png';
import InputEditorComponent from "./inputEditor";

const HeroBannerComponent = forwardRef((props, ref) => {
  const { heroBannerRes } = props;
  const heroBannerData =
    heroBannerRes?.heroBannerData && JSON.parse(heroBannerRes?.heroBannerData);

  const COLLECTION = 1;
  const PRODUCT = 2;

  const [banners, setBanners] = useState(
    heroBannerData ?? [
      {
        bannerType: COLLECTION,
        videoLink: "",
        showVideo: false,
        heading: "",
        subHeading: "",
        image: dummyImage,
        buttonTxt: "",
        handle: "",
        handleId: "",
      },
    ]);

  const [errorMessages, setErrorMessages] = useState({});


  // Toggle video banner checkbox and update the corresponding banner state
  const toggleVideoBanner = (checked, index) => {
    setBanners(banners => banners.map((banner, i) => i === index ? { ...banner, showVideo: checked } : banner));
  };

  const validateVideoLink = (link) => {
    const vimeoRegex = /vimeo\.com\/(\d+)/;
    const mp4Regex = /\.mp4$/i;
    const movRegex = /\.mov$/i;
    return vimeoRegex.test(link) || mp4Regex.test(link) || movRegex.test(link);
  };

  // Update input fields in the banner
  // const handleInputChange = (field, index) => (newValue) => {
  //   setBanners(banners => banners.map((banner, i) => i === index ? { ...banner, [field]: newValue } : banner));
  // };

  const handleInputChange = (field, index) => (newValue) => {
    setBanners(banners =>
      banners.map((banner, i) => {
        if (i === index) {
          const updatedBanner = { ...banner, [field]: newValue };
          if (field === "videoLink" && !validateVideoLink(newValue)) {
            setErrorMessages({ ...errorMessages, [index]: "Invalid video link. Only Vimeo, .mp4, and .mov links are allowed." });
          } else {
            setErrorMessages({ ...errorMessages, [index]: "" });
          }
          return updatedBanner;
        }
        return banner;
      })
    );
  };

  // Remove a video link by filtering out the banner
  const removeBanner = (index) => () => {
    if (banners?.length === 1) return; // Optionally prevent removing all banners
    setBanners(banners => banners?.filter((_, i) => i !== index));
  };

  // Add a new banner to the banners array
  const addBanner = () => {
    setBanners([...banners, {
      bannerType: COLLECTION,
      videoLink: "",
      showVideo: false,
      heading: "",
      subHeading: "",
      image: dummyImage,
      buttonTxt: "",
      handle: "",
      handleId: "",
    }]);
  };

  const options = [
    { label: "Banner On Collection", value: COLLECTION },
    { label: "Banner On Product", value: PRODUCT },
  ];

  const handleSelectChange = (index) => (newValue) =>
    setBanners((prev) =>
      prev.map((banner, i) =>
        i === index
          ? { ...banner, bannerType: Number(newValue) }
          : banner,
      ),
    );

  const collectionResource = (index, type, id) => async () => {
    var selected;
    if (type === COLLECTION && id) {
      selected = await shopify.resourcePicker({
        type: "collection",
        selectionIds: [{ id }],
      });
      const handle = selected[0]?.handle;
      setBanners((prev) =>
        prev.map((banner, i) =>
          i === index
            ? {
              ...banner,
              ["handle"]: handle,
              ["handleId"]: selected[0].id,
            }
            : banner,
        ),
      );
    } else {
      selected = await shopify.resourcePicker({
        type: "collection",
      });
      const handle = selected[0]?.handle;
      setBanners((prev) =>
        prev.map((banner, i) =>
          i === index
            ? {
              ...banner,
              ["handle"]: handle,
              ["handleId"]: selected[0].id,
            }
            : banner,
        ),
      );
    }
  };

  const productResource = (index, type, id) => async () => {
    var selected;

    if (type === PRODUCT && id) {
      selected = await shopify.resourcePicker({
        type: "product",
        selectionIds: [{ id }],
      });
      const handle = selected[0]?.handle;
      setBanners((prev) =>
        prev.map((banner, i) =>
          i === index
            ? {
              ...banner,
              ["handle"]: handle,
              ["handleId"]: selected[0].id,
            }
            : banner,
        ),
      );
    } else {
      selected = await shopify.resourcePicker({ type: "product" });
      const handle = selected[0]?.handle;
      setBanners((prev) =>
        prev.map((banner, i) =>
          i === index
            ? {
              ...banner,
              ["handle"]: handle,
              ["handleId"]: selected[0].id,
            }
            : banner,
        ),
      );
    }
  };

  // Handle file upload and convert to base64
  const handleDropZoneDrop = useCallback((_dropFiles, acceptedFiles, _rejectedFiles, index) => {
    const file = acceptedFiles[0];
    if (file.size > 256 * 1024) {
      alert("File size should not exceed 256 KB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      setBanners(banners => banners.map((banner, i) => i === index ? { ...banner, image: base64String } : banner));
    };
    reader.onerror = () => {
      alert("There was an error reading the file");
    };
    reader.readAsDataURL(file);
  }, []);

  useImperativeHandle(ref, () => ({
    getFormData() {
      return { banners };
    },
  }));

  return (
    <Card>
      <div style={{ marginBottom: "20px" }}>
        <Text variant="headingLg" as="h5">Hero Banner</Text>
      </div>
      {banners.map((banner, index) => (
        <div key={index} style={{ padding: "30px 0", borderBottom: "1px solid #5c4403", }}>
          <div style={{ marginBottom: 20 }}>
            <Checkbox
              label="Select Checkbox for Video Banner"
              checked={banner.showVideo}
              onChange={(newValue) => toggleVideoBanner(newValue, index)}
            />
          </div>
          {banner.showVideo ? (
            <>
              {errorMessages[index] && <div style={{ color: 'red' }}>{errorMessages[index]}</div>}
              <TextField
                value={banner.videoLink}
                label="Video Link"
                onChange={handleInputChange("videoLink", index)}
                helpText="Enter video link for only Vimeo,mp4,mov"
              />
            </>
          ) : (
            <>
              <div style={{ marginTop: 10 }}>
                <label>Heading:</label>
                <InputEditorComponent
                  label="Heading"
                  value={banner.heading}
                  onChange={handleInputChange("heading", index)}
                />
              </div>

              <div style={{ marginTop: 10 }}>
                <label>Sub Heading:</label>
                <InputEditorComponent
                  label="Sub Heading"
                  value={banner.subHeading}
                  onChange={handleInputChange("subHeading", index)}
                  style={{ marginTop: 10 }}
                />
              </div>

              <div style={{ marginTop: 10 }}>
                <label>Button Text:</label>
                <InputEditorComponent
                  label="Button Text"
                  value={banner.buttonTxt}
                  onChange={handleInputChange("buttonTxt", index)}
                  style={{ marginTop: 10 }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20, justifyContent: 'space-around', marginTop: 20 }}>
                <label htmlFor="myfile">Choose a Banner Image:</label>
                <DropZone onDrop={(files, acceptedFiles, rejectedFiles) => handleDropZoneDrop(files, acceptedFiles, rejectedFiles, index)}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '32px' }}>
                    {banner.image && <img src={banner.image} alt="Upload" style={{ width: 80, height: 80 }} />}
                  </div>
                  <div style={{ height: 'auto', paddingTop: 0 }}>
                    <DropZone.FileUpload />
                  </div>
                </DropZone>
              </div>

              <Select
                options={options}
                onChange={handleSelectChange(index)}
                value={Number(banner.bannerType)}
                helpText={<span>Select Type Of Banner</span>}
              />
              <div style={{ marginTop: 10, display: "flex" }}>
                <div style={{ marginRight: 10 }}>
                  {banner.bannerType === COLLECTION ? (
                    <Button
                      onClick={collectionResource(
                        index,
                        banner.bannerType,
                        banner.handleId,
                      )}
                    >
                      Choose Banner On Collection
                    </Button>
                  ) : (
                    <Button
                      onClick={productResource(
                        index,
                        banner.bannerType,
                        banner.handleId,
                      )}
                    >
                      Choose Banner On Product
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
          {banners?.length > 1 &&
            <div style={{ marginTop: 10 }}>
              <Button onClick={removeBanner(index)} style={{ marginTop: 20 }}>
                Remove Banner
              </Button>
            </div>
          }
        </div>
      ))}
      <div style={{ marginTop: 10 }}>
        <Button onClick={addBanner} style={{ marginTop: 20 }}>
          Add New Banner
        </Button>
      </div>
    </Card>
  );
});

export default HeroBannerComponent;
