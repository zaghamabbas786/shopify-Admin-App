import {
  Card,
  Text,
  Button,
  Select,
  DropZone,
  Checkbox,
  TextField,
} from "@shopify/polaris";
import { useState, useCallback, memo, useMemo } from "react";
import dummyImage from "../assets/upload.png";
import InputEditorComponent from "./inputEditor";

const PromotionBanner = (props) => {
  const {
    promotions,
    setPromotions,
    alignBannerHeading,
    setAlignBannerHeading,
    alignBannerButton,
    setAlignBannerButton,
    alignBannerTimer,
    setAlignBannerTimer,
    promotionError,
  } = props;
  const COLLECTION = 1;
  const PRODUCT = 2;
  const PROMOTION = "promotion";
  const HERO_BANNER = "hero_banner";
  const currentDateTime = new Date().toISOString().slice(0, 16);
  const HeroBanner = {
    bannerType: COLLECTION,
    videoLink: "",
    showVideo: false,
    heading: "",
    subHeading: "",
    image: "",
    buttonTxt: "",
    handle: "",
    title: "",
    handleId: "",
  };

  const promotionBanner = {
    promotionType: COLLECTION,
    showTimer: false,
    timeStart: "",
    timeEnd: "",
    heading: "",
    subHeading: "",
    image: "",
    buttonTxt: "",
    handle: "",
    handleId: "",
    title: "",
  };
  const [type, setType] = useState(PROMOTION);
  const [imageError, setImageError] = useState(null);

  const handleDropZoneDrop = useCallback(
    (index) => async (_dropFiles, acceptedFiles, _rejectedFiles) => {
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
      setPromotions((prev) =>
        prev.map((promotion, i) =>
          i === index
            ? { ...promotion, image: base64Files[0]?.base64String }
            : promotion,
        ),
      );
    },
    [],
  );

  const convertImageToBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }, []);

  const collectonResource = useCallback(
    (index, type, id) => async () => {
      var selected;
      if (type === COLLECTION && id) {
        selected = await shopify.resourcePicker({
          type: "collection",
          selectionIds: [{ id }],
        });
        const handle = selected[0]?.handle;
        setPromotions((prev) =>
          prev.map((promotion, i) =>
            i === index
              ? {
                  ...promotion,
                  ["handle"]: handle,
                  ["handleId"]: selected[0]?.id,
                  ["title"]: selected[0]?.title,
                }
              : promotion,
          ),
        );
      } else {
        selected = await shopify.resourcePicker({
          type: "collection",
        });
        const handle = selected[0]?.handle;
        setPromotions((prev) =>
          prev.map((promotion, i) =>
            i === index
              ? {
                  ...promotion,
                  ["handle"]: handle,
                  ["handleId"]: selected[0]?.id,
                  ["title"]: selected[0]?.title,
                }
              : promotion,
          ),
        );
      }
    },
    [],
  );

  const productResource = useCallback(
    (index, type, id) => async () => {
      var selected;

      if (type === PRODUCT && id) {
        selected = await shopify.resourcePicker({
          type: "product",
          selectionIds: [{ id }],
        });
        const handle = selected[0]?.handle;
        setPromotions((prev) =>
          prev.map((promotion, i) =>
            i === index
              ? {
                  ...promotion,
                  ["handle"]: handle,
                  ["handleId"]: selected[0]?.id,
                  ["title"]: selected[0]?.title,
                }
              : promotion,
          ),
        );
      } else {
        selected = await shopify.resourcePicker({ type: "product" });
        const handle = selected[0]?.handle;
        setPromotions((prev) =>
          prev.map((promotion, i) =>
            i === index
              ? {
                  ...promotion,
                  ["handle"]: handle,
                  ["handleId"]: selected[0]?.id,
                  ["title"]: selected[0]?.title,
                }
              : promotion,
          ),
        );
      }
    },
    [],
  );

  const handleTime = useCallback((item, data, index) => {
    setPromotions((prev) =>
      prev.map((promotion, i) =>
        i === index
          ? item === "start"
            ? { ...promotion, timeStart: data }
            : { ...promotion, timeEnd: data }
          : promotion,
      ),
    );
  }, []);

  const handleInputChange = useCallback(
    (field, index) => (newValue) => {
      setPromotions((prev) => {
        const newPromotions = [...prev];
        newPromotions[index] = {
          ...newPromotions[index],
          [field]: newValue,
        };
        return newPromotions;
      });
    },
    [],
  );

  const handleSelectChange = useCallback(
    (index, key) => (newValue) => {
      setPromotions((prev) => {
        return prev.map((promotion, i) => {
          if (i === index) {
            const updatedPromotion = { ...promotion, [key]: Number(newValue) };
            if (promotion[key] !== Number(newValue)) {
              updatedPromotion.handle = "";
              updatedPromotion.handleId = "";
              updatedPromotion.title = "";
            }
            return updatedPromotion;
          }
          return promotion;
        });
      });
    },
    [],
  );

  const removePromotion = (index) => () => {
    if (promotions?.length === 1) return;
    setPromotions(promotions?.filter((_, i) => i !== index));
  };

  const addBanner = () => {
    setPromotions([
      ...promotions,
      type == PROMOTION ? promotionBanner : HeroBanner,
    ]);
  };
  const toggleVideoBanner = useCallback((checked, index) => {
    setPromotions((promotions) =>
      promotions.map((promotion, i) =>
        i === index ? { ...promotion, showVideo: checked } : promotion,
      ),
    );
  });
  const options = useMemo(() => [
    { label: "Promotion On Collection", value: COLLECTION },
    { label: "Promotion On Product", value: PRODUCT },
  ]);
  const typeOptions = useMemo(() => [
    { label: "Promotion Banner", value: PROMOTION },
    { label: "Hero Banner", value: HERO_BANNER },
  ]);

  const handleSelectHeadingChange = useCallback(
    (value) => setAlignBannerHeading(value),
    [],
  );

  const headingAlignOptions = useMemo(() => [
    { label: "Left", value: "flex-start" },
    { label: "Center", value: "center" },
    { label: "Right", value: "flex-end" },
  ]);

  const handleSelectButtonChange = useCallback(
    (value) => setAlignBannerButton(value),
    [],
  );

  const handleSelectTimerChange = useCallback(
    (value) => setAlignBannerTimer(value),
    [],
  );

  return (
    <div className="banners-main">
      <Card>
        <div style={{ marginBottom: "20px" }}>
          <Text variant="headingLg" as="h1">
            <strong>Promotions</strong>
          </Text>
        </div>

        <div className="banner-hd-align">
          <Text>
            <strong>Heading Alignment</strong>
          </Text>
        </div>
        <Select
          label=""
          options={headingAlignOptions}
          onChange={handleSelectHeadingChange}
          value={alignBannerHeading}
        />

        <div className="banner-btn-align">
          <Text>
            <strong>Button Alignment</strong>
          </Text>
        </div>
        <Select
          label=""
          options={headingAlignOptions}
          onChange={handleSelectButtonChange}
          value={alignBannerButton}
        />

        <div className="banner-timer-align">
          <Text>
            <strong>Timer Alignment</strong>
          </Text>
        </div>
        <Select
          label=""
          options={headingAlignOptions}
          onChange={handleSelectTimerChange}
          value={alignBannerTimer}
        />
      </Card>
      {promotions?.map((promotion, index) =>
        promotion.hasOwnProperty("promotionType") ? (
          <div style={{ marginTop: 20 }}>
            <Card>
              <div style={{ marginBottom: "20px" }}>
                <Text variant="headingLg" as="h1">
                  <strong>Promotion Banner</strong>
                </Text>
              </div>
              <div key={index} style={{ marginBottom: 20 }}>
                <div className="promo-timer-main">
                  <Checkbox
                    checked={promotion.showTimer}
                    onChange={(e) =>
                      setPromotions((prev) =>
                        prev.map((p, i) =>
                          i === index ? { ...p, showTimer: e } : p,
                        ),
                      )
                    }
                  />
                  <label>
                    <strong>Show timer</strong>
                  </label>
                </div>
                {promotion.showTimer && (
                  <div className="promo-showTimer-main">
                    <div className="promo-showTimer-sub">
                      <div style={{ marginBottom: 10 }}>
                        <label>
                          <strong>Start Date and Time</strong>
                        </label>
                      </div>
                      <input
                        className="start-timer-input"
                        type="datetime-local"
                        value={promotion.timeStart}
                        min={currentDateTime}
                        onChange={(e) =>
                          handleTime("start", e.target.value, index)
                        }
                      />
                    </div>
                    {promotionError &&
                      (!promotion.timeEnd || !promotion.timeStart) && (
                        <div style={{ color: "red" }}>
                          Start time is required
                        </div>
                      )}
                    <div className="promo-showTimer-sub">
                      <div style={{ marginBottom: 10 }}>
                        <label>
                          <strong>End Date and Time</strong>
                        </label>
                      </div>
                      <input
                        className="start-timer-input"
                        type="datetime-local"
                        value={promotion.timeEnd}
                        min={currentDateTime}
                        onChange={(e) =>
                          handleTime("end", e.target.value, index)
                        }
                      />
                      {promotionError &&
                        (!promotion.timeEnd || !promotion.timeEnd) && (
                          <div style={{ color: "red" }}>
                            End time is required
                          </div>
                        )}
                    </div>
                  </div>
                )}

                <div className="banner-hd">
                  <label>
                    <strong>Heading</strong>{" "}
                  </label>
                </div>
                <InputEditorComponent
                  value={promotion.heading}
                  onChange={handleInputChange("heading", index)}
                  limitChars={50}
                />
                {promotionError && !promotion.heading && (
                  <div style={{ color: "red" }}>heading is required</div>
                )}

                <div className="banner-sub-hd">
                  <label>
                    <strong>Sub Heading</strong>
                  </label>
                </div>
                <InputEditorComponent
                  value={promotion.subHeading}
                  onChange={handleInputChange("subHeading", index)}
                />

                <div className="banner-btn">
                  <label>
                    <strong>Button Text</strong>
                  </label>
                </div>
                <InputEditorComponent
                  value={promotion.buttonTxt}
                  onChange={handleInputChange("buttonTxt", index)}
                />
                {promotionError && !promotion.buttonTxt && (
                  <div style={{ color: "red" }}>button text is required</div>
                )}

                <div className="banner-promo-hd">
                  <label>
                    <strong>Promotion Type on Collection/Product</strong>
                  </label>
                </div>
                <Select
                  options={options}
                  onChange={handleSelectChange(index, "promotionType")}
                  value={Number(promotion.promotionType)}
                />
                <div className="banner-promo-type">
                  <div style={{ marginRight: 10 }}>
                    {promotion.promotionType === COLLECTION ? (
                      <Button
                        onClick={collectonResource(
                          index,
                          promotion.promotionType,
                          promotion.handleId,
                        )}
                      >
                        Promotion On Collection
                      </Button>
                    ) : (
                      <Button
                        onClick={productResource(
                          index,
                          promotion.promotionType,
                          promotion.handleId,
                        )}
                      >
                        Promotion On Product
                      </Button>
                    )}
                    {promotion.title && (
                      <div className="banner-promo-title">
                        <strong>{promotion.title}</strong>
                      </div>
                    )}
                  </div>
                </div>
                {promotionError &&
                  (!promotion.handleId || !promotion.title) && (
                    <div style={{ color: "red" }}>
                      collection/product is required
                    </div>
                  )}

                <div style={{ marginTop: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <label htmlFor="myfile">
                      <strong>Banner</strong>
                    </label>
                  </div>
                  <DropZone
                    allowMultiple={false}
                    onDrop={handleDropZoneDrop(index)}
                  >
                    {promotion.image && (
                      <div className="banner-promo-img">
                        <img
                          className="banner-img"
                          src={promotion.image || dummyImage}
                          alt="Upload"
                        />
                      </div>
                    )}
                    <div style={{ height: "auto", paddingTop: 0 }}>
                      <DropZone.FileUpload  actionTitle ={promotion.image ? 'Update file' : 'Add file'} />
                    </div>
                  </DropZone>
                  {imageError && (
                    <div style={{ color: "red" }}>{imageError}</div>
                  )}

                  {promotionError && !promotion.image && (
                    <div style={{ color: "red" }}>Image is required</div>
                  )}
                </div>
                <div className="banner-remove-btn">
                  <Button
                    onClick={removePromotion(index)}
                    style={{ marginTop: 20 }}
                  >
                    Remove Banner
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div style={{ marginTop: 20 }}>
            <Card>
              <div style={{ marginBottom: "20px" }}>
                <Text variant="headingLg" as="h1">
                  <strong>Hero Banner</strong>
                </Text>
              </div>
              <div key={index} style={{ padding: "30px 0" }}>
                <div className="video-bannner-main">
                  <Checkbox
                    checked={promotion.showVideo}
                    onChange={(newValue) => toggleVideoBanner(newValue, index)}
                  />

                  <label>
                    <strong>Select Checkbox for Video Banner</strong>
                  </label>
                </div>
                {promotion.showVideo ? (
                  <>
                    <div className="video-link-hd">
                      <label>
                        <strong>Video Link</strong>
                      </label>
                    </div>
                    <TextField
                      value={promotion.videoLink}
                      label=""
                      onChange={handleInputChange("videoLink", index)}
                      helpText="Please enter video link for only Vimeo, Webm"
                    />
                    {promotionError &&
                      promotion.showVideo &&
                      !promotion.videoLink && (
                        <div style={{ color: "red" }}>
                          videoLinkt is required
                        </div>
                      )}
                  </>
                ) : (
                  <>
                    <div className="banner-hero-hd">
                      <label>
                        <strong>Heading</strong>
                      </label>
                    </div>
                    <InputEditorComponent
                      value={promotion.heading}
                      onChange={handleInputChange("heading", index)}
                      limitChars={50}
                    />
                    {promotionError && !promotion.heading && (
                      <div style={{ color: "red" }}>heading is required</div>
                    )}

                    <div className="banner-hero-sub-hd">
                      <label>
                        <strong>Sub Heading</strong>
                      </label>
                    </div>
                    <InputEditorComponent
                      value={promotion.subHeading}
                      onChange={handleInputChange("subHeading", index)}
                      style={{ marginTop: 10 }}
                    />

                    <div className="banner-hero-btn">
                      <label>
                        <strong>Button Text</strong>
                      </label>
                    </div>
                    <InputEditorComponent
                      value={promotion.buttonTxt}
                      onChange={handleInputChange("buttonTxt", index)}
                      style={{ marginTop: 10 }}
                    />
                    {promotionError && !promotion.buttonTxt && (
                      <div style={{ color: "red" }}>
                        button text is required
                      </div>
                    )}

                    <div className="banner-hero-type">
                      <label>
                        <strong>Banner Type on Collection/Product</strong>
                      </label>
                    </div>
                    <Select
                      options={options}
                      onChange={handleSelectChange(index, "bannerType")}
                      value={Number(promotion.bannerType)}
                    />
                    <div className="banner-hero-type-main">
                      <div style={{ marginRight: 10 }}>
                        {promotion.bannerType === COLLECTION ? (
                          <Button
                            onClick={collectonResource(
                              index,
                              promotion.bannerType,
                              promotion.handleId,
                            )}
                          >
                            Banner On Collection
                          </Button>
                        ) : (
                          <Button
                            onClick={productResource(
                              index,
                              promotion.bannerType,
                              promotion.handleId,
                            )}
                          >
                            Banner On Product
                          </Button>
                        )}

                        {promotion.title && (
                          <div className="banner-hero-type-title">
                            <strong>{promotion.title}</strong>
                          </div>
                        )}
                      </div>
                    </div>
                    {promotionError &&
                      (!promotion.handleId || !promotion.title) && (
                        <div style={{ color: "red" }}>
                          collection/product is required
                        </div>
                      )}
                    <div className="banner-img-main">
                      <div className="banner-img-align">
                        <label htmlFor="myfile">
                          <strong>Banner Image</strong>
                        </label>
                      </div>
                      <DropZone onDrop={handleDropZoneDrop(index)}>
                        <div className="banner-hero-promo-img">
                          {promotion.image && (
                            <img
                              className="banner-hero--img"
                              src={promotion.image || dummyImage}
                              alt="Upload"
                            />
                          )}
                        </div>
                        <div style={{ height: "auto", paddingTop: 0 }}>
                          <DropZone.FileUpload actionTitle ={promotion.image ? 'Update file' : 'Add file'} />
                        </div>
                      </DropZone>
                      {imageError && (
                        <div style={{ color: "red" }}>{imageError}</div>
                      )}

                      {promotionError && !promotion.image && (
                        <div style={{ color: "red" }}>Image is required</div>
                      )}
                    </div>
                  </>
                )}

                <div className="banner-hero-remove-btn">
                  <Button
                    onClick={removePromotion(index)}
                    style={{ marginTop: 20 }}
                  >
                    Remove Banner
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ),
      )}

      <div className="banner--type">
        <label>
          <strong>Type Of Banner</strong>
        </label>
      </div>

      <Select
        options={typeOptions}
        onChange={(type) => setType(type)}
        value={type}
      />

      <div className="new-banner">
        <Button onClick={addBanner} style={{ marginTop: 20 }}>
          Add New Banner
        </Button>
      </div>

      {/* </Card> */}
    </div>
  );
};

export default memo(PromotionBanner);
