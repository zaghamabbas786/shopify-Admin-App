export const cleanContent = (content) => {
  return content
    .replace(/<p>\s*<\/p>/g, "")
    .replace(/<p><br\s*\/?><\/p>/g, "")
    .replace(/<br\s*\/?>/g, "")
    .replace(/<\/?p[^>]*>/g, "");
};
