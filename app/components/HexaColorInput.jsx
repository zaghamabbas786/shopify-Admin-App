import { TextField } from "@shopify/polaris";
import { hsbToHex } from "../helpers/convertToHexa";
import { hexToHsb } from "../helpers/hexToHsb";
import { useState, useEffect, memo, useCallback } from "react";

const HexaColorInput = ({ label, onChange, value, helpText }) => {
  const [inputValue, setInputValue] = useState(hsbToHex(value));
  const [length, setLenth] = useState(7);

  useEffect(() => {
    setInputValue(hsbToHex(value, length));
  }, [value]);

  const handleInputChange = useCallback((newValue) => {
    if (newValue.length > 7) return;
    setLenth(newValue.length);
    setInputValue(newValue);
    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(newValue)) {
      onChange(hexToHsb(newValue));
    }
  },[]);

  const handleBlur = useCallback(() => {
    if (
      inputValue.trim() === "" ||
      !/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(inputValue)
    ) {
      setInputValue(hsbToHex(value));
    } else if (/^#([0-9A-Fa-f]{3})$/.test(inputValue)) {
      const fullHex = `#${inputValue[1]}${inputValue[1]}${inputValue[2]}${inputValue[2]}${inputValue[3]}${inputValue[3]}`;
      setInputValue(fullHex);
      onChange(hexToHsb(fullHex));
    }
  },[]);

  return (
    <TextField
      value={inputValue}
      label={label}
      type="text"
      onChange={handleInputChange}
      onBlur={handleBlur}
      helpText={helpText}
    />
  );
};

export default memo(HexaColorInput);
