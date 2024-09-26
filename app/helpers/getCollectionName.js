export const getSelectedCollectionName = (slug) => {
  let words = slug.split("-");

  let capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );

  let name = capitalizedWords.join(" ");

  return name;
};
