import { Card, Text, Button } from "@shopify/polaris";
import { memo, useCallback } from "react";
import InputEditorComponent from "./inputEditor";
import { generateRandomId } from "../helpers/genrateRandomId";
import ColorPickerModel from "./ColorPickerModel";

const ProductGridComponent = (props) => {
  const { grids, setGridData, gridsError } = props;
  const handleInputChange = useCallback(
    (field, index) => (newValue) => {
      setGridData((prevGrids) =>
        prevGrids.map((grid, i) =>
          i === index ? { ...grid, [field]: newValue } : grid,
        ),
      );
    },
    [],
  );

  const removeGrid = (index) => () => {
    if (grids?.length === 1) return;
    setGridData((prevGrids) => prevGrids?.filter((_, i) => i !== index));
  };

  const addGrid = () => {
    setGridData((prevGrids) => [
      ...prevGrids,
      {
        id: generateRandomId(),
        gridTitle: "",
        buttonTxt: "",
        backgroundColor: {
          hue: 120,
          brightness: 1,
          saturation: 1,
          alpha: 1,
        },
        borderColor: {
          hue: 120,
          brightness: 1,
          saturation: 1,
          alpha: 1,
        },
        handle: "",
        handleId: "",
        title: "",
      },
    ]);
  };

  const collectionResource = useCallback(
    (index, id) => async () => {
      var selected;
      if (id) {
        selected = await shopify.resourcePicker({
          type: "collection",
          selectionIds: [{ id }],
        });
        const handle = selected[0]?.handle;
        setGridData((prev) =>
          prev.map((grid, i) =>
            i === index
              ? {
                  ...grid,
                  ["handle"]: handle,
                  ["handleId"]: selected[0]?.id,
                  ["title"]: selected[0]?.title,
                }
              : grid,
          ),
        );
      } else {
        selected = await shopify.resourcePicker({
          type: "collection",
        });
        const handle = selected[0]?.handle;
        setGridData((prev) =>
          prev.map((grid, i) =>
            i === index
              ? {
                  ...grid,
                  ["handle"]: handle,
                  ["handleId"]: selected[0]?.id,
                  ["title"]: selected[0]?.title,
                }
              : grid,
          ),
        );
      }
    },
    [],
  );

  return (
    <div className="grid-main">
      <div style={{ marginBottom: "20px" }}>
        <Text variant="headingLg" as="h5">
          Product Grid
        </Text>
      </div>
      {Array.isArray(grids) &&
        grids.map((grid, index) => (
          <div key={index} style={{ marginTop: 20 }}>
            <Card>
              <div style={{ padding: "10px 0" }}>
                <div className="grid-title">
                  <label>
                    <strong>Title</strong>
                  </label>
                </div>
                <InputEditorComponent
                  value={grid.gridTitle}
                  onChange={handleInputChange("gridTitle", index)}
                />

                {gridsError && !grid.gridTitle && (
                  <div style={{ color: "red" }}>Title is Required</div>
                )}

                <div className="grid-btn">
                  <label>
                    <strong>Button</strong>
                  </label>
                </div>
                <InputEditorComponent
                  value={grid.buttonTxt}
                  onChange={handleInputChange("buttonTxt", index)}
                />
                {gridsError && !grid.buttonTxt && (
                  <div style={{ color: "red" }}>Button text is Required</div>
                )}
                <div className="grid-colors-main">
                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <label>
                        <strong>Button Background Color</strong>
                      </label>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <ColorPickerModel
                        onChange={handleInputChange("backgroundColor", index)}
                        color={grid?.backgroundColor}
                      />
                    </div>
                  </div>

                  <div style={{ marginLeft: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <label>
                        <strong>Button Border Color</strong>
                      </label>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <ColorPickerModel
                        onChange={handleInputChange("borderColor", index)}
                        color={grid?.borderColor}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid-col">
                  <div style={{ marginRight: 10 }}>
                    <Button onClick={collectionResource(index, grid.handleId)}>
                      Choose Collection
                    </Button>
                  </div>
                </div>

                {gridsError && (!grid.handleId || !grid.title) && (
                  <div style={{ color: "red" }}>Collection is Required</div>
                )}
                {grid?.title && (
                  <div className="grid-title">
                    <strong>{grid.title}</strong>
                  </div>
                )}

                {grids.length > 1 && (
                  <div>
                    <div className="grid-remove-btn">
                      <Button onClick={removeGrid(index)}>Remove Grid</Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ))}

      <div className="grid-remove-btn">
        <Button onClick={addGrid}>Add Grid</Button>
      </div>
    </div>
  );
};

export default memo(ProductGridComponent);
