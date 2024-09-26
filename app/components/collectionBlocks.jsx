import { Card, BlockStack, Text, Icon, Button } from "@shopify/polaris";
import { useRef, useEffect, memo } from "react";
import { DragHandleIcon } from "@shopify/polaris-icons";

const CollectionBlocks = (props) => {
  const { collectionSorting, setCollectionSorting } = props;
  const onDragStartRef = useRef(0);
  const onDragEnterRef = useRef(0);

  useEffect(() => {
    const updatedItems = collectionSorting?.map((item) => ({
      ...item,
      show: item?.show !== undefined ? item.show : true,
    }));
    setCollectionSorting(updatedItems);
  }, []);

  const handleDragEnd = () => {
    const drageItems = [...collectionSorting];
    const [movedItem] = drageItems.splice(onDragStartRef.current, 1);
    drageItems.splice(onDragEnterRef.current, 0, movedItem);
    setCollectionSorting(drageItems);
  };

  const toggleStrikeThrough = (index) => {
    setCollectionSorting((prevCollectionSorting) => {
      const updatedCollectionSorting = [...prevCollectionSorting];
      updatedCollectionSorting[index] = {
        ...updatedCollectionSorting[index],
        show: !updatedCollectionSorting[index].show,
      };
      return updatedCollectionSorting;
    });
  };

  return (
    <div className="sorting-main">
      <Card>
        <div style={{ marginBottom: "20px" }}>
          <Text variant="headingLg" as="h1">
            Collection Sorting
          </Text>
        </div>
        <BlockStack>
          {collectionSorting?.map((item, index) => (
            <div
              className="sorting-list"
              key={index}
              draggable
              onDragStart={() => (onDragStartRef.current = index)}
              onDragEnter={() => (onDragEnterRef.current = index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              style={{
                borderBottom:
                  index === collectionSorting.length - 1
                    ? "none"
                    : "1px solid #ccc",
              }}
            >
              <div>
                <Icon source={DragHandleIcon} tone="base" />
              </div>
              <div style={{ flex: 1 }}>
                <Text variant="headingLg" as="h5">
                  {item.type === "product-grid"
                    ? item.title.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")
                    : item.title}
                </Text>
              </div>
              <Button
                plain
                onClick={() => toggleStrikeThrough(index)}
                accessibilityLabel="Toggle visibility"
              >
                {item.show ? (
                  // Visible eye icon
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    height="30px"
                  >
                    <path d="m0 0h24v24h-24z" fill="#fff" opacity="0" />
                    <g fill="#231f20">
                      <path d="m21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zm-9.65 5.5c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5z" />
                      <path d="m12 8.5a3.5 3.5 0 1 0 3.5 3.5 3.5 3.5 0 0 0 -3.5-3.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1 -1.5 1.5z" />
                    </g>
                  </svg>
                ) : (
                  // Invisible eye icon
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    height="30px"
                  >
                    <g
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    >
                      <path d="m2 2 20 20" />
                      <path d="m6.71277 6.7226c-3.04798 2.07267-4.71277 5.2774-4.71277 5.2774s3.63636 7 10 7c2.0503 0 3.8174-.7266 5.2711-1.7116m-6.2711-12.23018c.3254-.03809.6588-.05822 1-.05822 6.3636 0 10 7 10 7s-.6918 1.3317-2 2.8335" />
                      <path d="m14 14.2362c-.5308.475-1.2316.7639-2 .7639-1.6569 0-3-1.3431-3-3 0-.8237.33193-1.5698.86932-2.11192" />
                    </g>
                  </svg>
                )}
              </Button>
            </div>
          ))}
        </BlockStack>
      </Card>
    </div>
  );
};

export default memo(CollectionBlocks);
