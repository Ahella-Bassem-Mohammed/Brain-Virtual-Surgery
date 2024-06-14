import React, { useState } from "react";
import classes from "./ColorPickerSection.module.css";
import { rgbToHex } from "../../utils";
import { SketchPicker } from "react-color";

const ColorPickerSection = ({
  volumeColor,
  minColorVolumePicker,
  maxColorVolumePicker,
}) => {
  const [displayPicker, setDisplayPicker] = useState(null);
  const handleClickPicker = (type) => () => {
    setDisplayPicker(type);
  };

  const handleClosePicker = () => {
    setDisplayPicker(null);
  };
  return (
    <div className={classes.mainColorContainer}>
      <div>
        <div className={classes.minMaxColorContainer}>
          <div
            className={classes.colorContainer}
            style={{
              backgroundColor: rgbToHex(volumeColor.min),
            }}
            onClick={handleClickPicker("min-color")}
          ></div>
          <span>Min Color</span>
        </div>
        {displayPicker === "min-color" ? (
          <div className={classes.mainSketchContainer}>
            <div
              className={classes.sketchContainer}
              onClick={handleClosePicker}
            />
            <SketchPicker
              color={volumeColor.min}
              onChangeComplete={minColorVolumePicker}
            />
          </div>
        ) : null}
      </div>
      <div>
        <div className={classes.minMaxColorContainer}>
          <div
            className={classes.colorContainer}
            style={{
              backgroundColor: rgbToHex(volumeColor.max),
            }}
            onClick={handleClickPicker("max-color")}
          ></div>
          <span>Max Color</span>
        </div>
        {displayPicker === "max-color" ? (
          <div className={classes.mainSketchContainer}>
            <div
              className={classes.sketchContainer}
              onClick={handleClosePicker}
            />
            <SketchPicker
              color={volumeColor.max}
              onChangeComplete={maxColorVolumePicker}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ColorPickerSection;
