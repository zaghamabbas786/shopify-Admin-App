export const hexToHsb = (hex) => {
  // Normalize the hex code
  if (hex.length === 4) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }

  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let bl = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, bl);
  let min = Math.min(r, g, bl);
  let h,
    s,
    b = max;

  let d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - bl) / d + (g < bl ? 6 : 0);
        break;
      case g:
        h = (bl - r) / d + 2;
        break;
      case bl:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    hue: Math.round(h * 360),
    saturation: s,
    brightness: b,
  };
};
