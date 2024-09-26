import { Form } from "@remix-run/react";
import { Card, Text, FormLayout, DropZone } from "@shopify/polaris";
import { useState, useCallback, memo } from "react";
import InputEditorComponent from "./inputEditor";
import dummyImage from "../assets/upload.png";

const SplashComponent = (props) => {
  const { splashData, setSplashData, splashError } = props;

  const [imageError, setImageError] = useState("");

  const setHandleSplashHeadingText = (data) => {
    setSplashData((prev) => ({ ...prev, ["heading"]: data }));
  };

  const setHandleSplashSubHeadingText = (data) => {
    setSplashData((prev) => ({ ...prev, ["subHeading"]: data }));
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleDropZoneDrop = useCallback(
    async (_dropFiles, acceptedFiles, _rejectedFiles) => {
      setImageError("");
      const file = acceptedFiles[0];
      if (file.size > 256 * 1024) {
        setImageError("File size should not exceed 256 KB.");
        return;
      }
      try {
        const base64Files = await Promise.all(
          acceptedFiles.map(async (file) => {
            const base64String = await convertImageToBase64(file);
            return { file, base64String };
          }),
        );
        setSplashData((prev) => ({
          ...prev,
          ["image"]: base64Files[0]?.base64String,
        }));
      } catch (error) {
        console.error("Error converting image to base64", error);
      }
    },
    [],
  );

  return (
    <div className="splash-main">
      <Card>
        <div style={{ marginBottom: "20px" }}>
          <Text variant="headingLg" as="h5">
            Splash Screen
          </Text>
        </div>
        <Form>
          <FormLayout>
            <div style={{ marginBottom: -5 }}>
              <Text>
                <strong>Heading</strong>
              </Text>
            </div>
            <InputEditorComponent
              value={splashData.heading}
              type="text"
              autoComplete="heading"
              onChange={setHandleSplashHeadingText}
              limitChars={50}
            />
            {splashError && !splashData.heading && (
              <div style={{ color: "red" }}> heading required </div>
            )}

            <div style={{ marginBottom: -5 }}>
              <Text>
                <strong>Sub Heading</strong>
              </Text>
            </div>

            <InputEditorComponent
              value={splashData.subHeading}
              type="text"
              onChange={setHandleSplashSubHeadingText}
              autoComplete="text"
              limitChars={50}
            />
            {splashError && !splashData.subHeading && (
              <div style={{ color: "red" }}> SubHeading required </div>
            )}
            <DropZone
              allowMultiple={false}
              onDrop={handleDropZoneDrop}
              style={{}}
            >
              <div className="splash-img-main">
                <img
                  className="splash-img"
                  src={splashData.image || dummyImage}
                  alt="upload"
                />
              </div>
              <div style={{ height: "auto", paddingTop: 0 }}>
                <DropZone.FileUpload actionTitle ={splashData.image ? 'Update file' : 'Add file'} />
              </div>
            </DropZone>
            {imageError && <div style={{ color: "red" }}>{imageError}</div>}
            {splashError && !splashData.image && (
              <div style={{ color: "red" }}> Image required </div>
            )}
          </FormLayout>
        </Form>
      </Card>
    </div>
  );
};

export default memo(SplashComponent);
