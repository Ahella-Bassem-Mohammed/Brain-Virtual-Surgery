import React from "react";
import classes from "./VolumeController.module.css";
import { Slider } from "@mui/material";
import ColorPickerSection from "../Color-Picker-Section/ColorPickerSection";

const VolumeController = ({
  displayedSections,
  displaySection,
  volumeRender,
  display2D,
  display3D,
  opacity,
  handleOpacityChange,
  windowLevel,
  handleWindowLevelChange,
  threshold,
  handleThresholdChange,
  handleFileUpload,
  volumeColor,
  minColorVolumePicker,
  maxColorVolumePicker,
}) => {
  return (
    <>
      {!displayedSections.volume && (
        <div
          onClick={displaySection("volume", true)}
          className={`${classes.container} ${classes.volumeContainer} ${classes.closedVolumeContainer}`}
        >
          <h3>Volume</h3>
        </div>
      )}
      {displayedSections.volume && (
        <div
          className={`${classes.container} ${classes.volumeContainer} ${classes.openedVolumeContainer}`}
        >
          <button
            onClick={displaySection("volume", false)}
            className={classes.closeContainerBtn}
          >
            X
          </button>
          <button
            onClick={display3D}
            type="button"
            style={{
              color: "#234ca4",
              fontSize: "15px",
              fontWeight: "bold",
              borderRadius: "15px",
              borderColor: "white",
              padding: "2px",
              border: "1px solid",
              width: "80px",
              height: "25px",
              cursor: "pointer",
            }}
          >
            view 3D
          </button>
          <button
            onClick={display2D}
            type="button"
            style={{
              marginLeft: 5,
              color: "#234ca4",
              fontSize: "15px",
              fontWeight: "bold",
              borderRadius: "15px",
              borderColor: "white",
              padding: "2px",
              border: "1px solid",
              width: "80px",
              height: "25px",
              cursor: "pointer",
            }}
          >
            view 2D
          </button>
          {volumeRender === "3D" && (
            <div>
              <label>Opacity</label>
              <Slider
                min={opacity.range[0]}
                max={opacity.range[1]}
                value={opacity.value}
                onChange={handleOpacityChange}
              />
            </div>
          )}
          {volumeRender === "2D" && (
            <div>
              <label>Window Level</label>
              <Slider
                min={windowLevel.range[0]}
                max={windowLevel.range[1]}
                value={windowLevel.values}
                onChange={handleWindowLevelChange}
              />
            </div>
          )}
          <div>
            <label>Threshold</label>
            <Slider
              min={threshold.range[0]}
              max={threshold.range[1]}
              value={threshold.values}
              onChange={handleThresholdChange}
            />
          </div>
          <div style={{ display: "flex", columnGap: "20px" }}>
            <div className={classes.thresholdContainer}>
              <span>Min Threshold: {threshold.values[0] / 100}</span>
              <span>Max Threshold: {threshold.values[1] / 100}</span>
            </div>
            <ColorPickerSection
              volumeColor={volumeColor}
              minColorVolumePicker={minColorVolumePicker}
              maxColorVolumePicker={maxColorVolumePicker}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VolumeController;
