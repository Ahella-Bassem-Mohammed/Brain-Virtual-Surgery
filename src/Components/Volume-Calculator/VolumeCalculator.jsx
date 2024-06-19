import React from "react";
import classes from "./VolumeCalculator.module.css";
import { formatDate, formatTime } from "../../utils";
import { CircularProgress, Divider } from "@mui/material";

const VolumeCalculator = ({
  displayedSections,
  displaySection,
  insertThreshold,
  thresholdVolume,
  calculateVolume,
  loadingEl,
  saveNewVolume,
  volumeHistory,
}) => {
  return (
    <>
      {!displayedSections.calculateVolume && (
        <div
          onClick={displaySection("calculateVolume", true)}
          className={`${classes.container} ${classes.calcVolumeContainer} ${classes.closedCalcVolumeContainer}`}
        >
          <h3>Calculate Volume</h3>
        </div>
      )}
      {displayedSections.calculateVolume && (
        <div
          className={`${classes.container} ${classes.calcVolumeContainer} ${classes.openedCalcVolumeContainer}`}
        >
          <button
            onClick={displaySection("calculateVolume", false)}
            className={classes.closeContainerBtn}
          >
            X
          </button>
          <div>
            <h3 style={{ marginTop: "0" }}>Calculate Volume</h3>
            <div className={classes.inputContainer}>
              <label>Threshold</label>
              <input
                onChange={insertThreshold}
                className={classes.input}
                placeholder="insert Threshold"
              ></input>
            </div>
          </div>
          <div>
            <button
              disabled={!thresholdVolume.threshold}
              onClick={calculateVolume}
            >
              Claculate Volume
            </button>{" "}
            <div className={classes.volumeResultContainer}>
              <span style={{ display: "block" }}>
                volume result for Threshold {thresholdVolume?.threshold || "_"}{" "}
                is{" "}
                {loadingEl !== "calculate-volume" && (
                  <span style={{ fontWeight: "bold" }}>
                    {parseFloat(thresholdVolume?.volume).toFixed(4) || "_"}
                  </span>
                )}
              </span>
              {loadingEl === "calculate-volume" && (
                <CircularProgress size={25} />
              )}
            </div>
          </div>

          <button
            disabled={!thresholdVolume.threshold || !thresholdVolume.volume}
            onClick={saveNewVolume}
            style={{ margin: "10px 0", display: "block" }}
          >
            Save Volume Result
          </button>
          <h3>Volume History</h3>
          <div
            className={classes.volumeResultHistoryList}
            style={{
              display: loadingEl !== "save-volume" ? "block" : "none",
            }}
          >
            {volumeHistory.map((volumeObj, index) => (
              <div>
                <label>Threshold</label>

                <span style={{ marginLeft: "10px" }}>
                  {volumeObj.threshold}
                </span>
                <br />
                <label>Volume</label>

                <span style={{ marginLeft: "10px" }}>
                  {parseFloat(volumeObj.volume).toFixed(4)}
                </span>
                <br />
                <label>Date</label>

                <span style={{ marginLeft: "10px" }}>
                  {formatDate(new Date(volumeObj.createdAt))}
                </span>
                <br />
                <label>Time</label>

                <span style={{ marginLeft: "10px" }}>
                  {formatTime(new Date(volumeObj.createdAt))}
                </span>
                {volumeHistory.length - 1 !== index && (
                  <Divider
                    style={{ margin: "5px 30px", backgroundColor: "white" }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={classes.volumeHistoryLoadingContianer}>
            {loadingEl === "save-volume" && <CircularProgress size={30} />}
          </div>
        </div>
      )}
    </>
  );
};

export default VolumeCalculator;
