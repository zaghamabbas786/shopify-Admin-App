import { Label } from "@shopify/polaris";
import React, { Suspense, useMemo, useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { cleanContent } from "../helpers/cleanHtmContent";

const JoditEditor = React.lazy(() => import("jodit-react"));

const InputEditorComponent = ({
  value,
  onChange,
  limitChars = 20,
  label = null,
}) => {
  const [editorInstance, setEditorInstance] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      limitChars: limitChars,
      toolbarAdaptive: false,
      uploader: { url: "none" },
      buttons: [
        "bold",
        "italic",
        "underline",
        "font",
        "fontsize",
        "link",
        "brush",
        {
          name: "emojiPicker",
          iconURL:
            "https://cdnjs.cloudflare.com/ajax/libs/twemoji/13.0.1/72x72/1f600.png",
          exec: () => setShowEmojiPicker((prev) => !prev),
        },
      ],
      controls: {
        fontsize: {
          list: {
            8: "8",
            9: "9",
            10: "10",
            11: "11",
            12: "12",
            13: "13",
            14: "14",
            15: "15",
            16: "16",
            17: "17",
            18: "18",
            19: "19",
            20: "20",
            21: "21",
            22: "22",
            23: "23",
            24: "24",
            25: "25",
            26: "26",
            27: "27",
            28: "28",
            29: "29",
            30: "30",
            31: "31",
            32: "32",
            33: "33",
            34: "34",
            35: "35",
            36: "36",
          },
        },
      },
      events: {
        afterInit: (editor) => {
          const content = editor.getEditorValue();
          editor.setEditorValue(cleanContent(content));
          setEditorInstance(editor);
        },
        change: (newValue) => {
          const cleanedContent = cleanContent(newValue);
          if (cleanedContent.length === 0) {
            onChange("");
          }
        },
      },
    }),
    [limitChars, showEmojiPicker],
  );

  const handleChange = (e) => {
    let cleanedString = cleanContent(e);
    onChange(cleanedString);
  };

  const handleEmojiSelect = (emoji) => {
    if (editorInstance) {
      const currentContent = editorInstance.value.replace(/<br\s*\/?>/gi, "");
      editorInstance.value = currentContent + emoji.native;
      handleChange(editorInstance.value);
    }
    setShowEmojiPicker(false);
  };

  return (
    <>
      {label && <Label>{label}</Label>}
      <div style={{ position: "relative" }}>
        <Suspense fallback={<div>Loading editor...</div>}>
          <JoditEditor
            value={value}
            config={config}
            onBlur={(newContent) => handleChange(newContent)}
          />
        </Suspense>
        {showEmojiPicker && (
          <div
            style={{
              position: "absolute",
              zIndex: 1000,
              top: "43px",
              left: "261px",
              transform: "scale(0.7)",
              transformOrigin: "top left",
            }}
          >
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(InputEditorComponent);
