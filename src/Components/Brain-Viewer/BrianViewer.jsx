//import { CircularProgress, Divider, Slider } from "@mui/material";
import useBrainRender from "../../Hooks/useBrainRender";
import { useState } from "react";
import classes from "./BrainViewer.module.css";
import VolumeController from "../Volume-Controller/VolumeController";
import VolumeCalculator from "../Volume-Calculator/VolumeCalculator";
import SlicesSection from "../Slices-Section/SlicesSection";

const BrainViewer = ({renderFile}) => {
  const {
    display3D,
    display2D,
    volumeRender,
    opacity,
    handleOpacityChange,
    windowLevel,
    handleWindowLevelChange,
    threshold,
    handleThresholdChange,
    handleFileUpload,
    volumeslicingX,
    volumeslicingY,
    volumeslicingZ,
    indexX,
    indexY,
    indexZ,
    minColorVolumePicker,
    maxColorVolumePicker,
    volumeColor,
  } = useBrainRender({renderFile});
  const [thresholdVolume, setThresholdVolume] = useState({
    volume: null,
    threshold: null,
  });
  const [loadingEl, setLoadingEl] = useState(null);
  const [volumeHistory, setVolumeHistory] = useState([
    { volume: 20, threshold: 0.7, date: new Date() },
    { volume: 20, threshold: 0.7, date: new Date() },
    { volume: 20, threshold: 0.7, date: new Date() },
  ]);
  const [displayedSections, setDisplayedSections] = useState({
    volume: true,
    calculateVolume: false,
  });

  const saveNewVolume = () => {
    setLoadingEl("save-volume");
    setTimeout(() => {
      setLoadingEl(null);
      // save new volume in database then when res.status is 200 then we update the volume history list
      setVolumeHistory((prev) => [
        {
          threshold: thresholdVolume.threshold,
          volume: thresholdVolume.volume,
          date: new Date(),
        },
        ...prev,
      ]);
    }, [2000]);
  };

  const calculateVolume = () => {
    setLoadingEl("calculate-volume");
    setTimeout(() => {
      setLoadingEl(null);
      // send the threshold to the backend to calculate the volume when the backend sends the volume value we insert it in its state
      setThresholdVolume((prev) => ({ ...prev, volume: 0.6 }));
    }, [2000]);
  };

  const insertThreshold = (e) => {
    setThresholdVolume((prev) => ({ ...prev, threshold: e.target.value }));
  };

  const displaySection = (section, display) => () => {
    setDisplayedSections((prev) => ({ ...prev, [section]: display }));
  };

  return (
    <div style={{ position: "relative" }}>
      <VolumeController
        displayedSections={displayedSections}
        displaySection={displaySection}
        volumeRender={volumeRender}
        display2D={display2D}
        display3D={display3D}
        opacity={opacity}
        handleOpacityChange={handleOpacityChange}
        windowLevel={windowLevel}
        handleWindowLevelChange={handleWindowLevelChange}
        threshold={threshold}
        handleThresholdChange={handleThresholdChange}
        handleFileUpload={handleFileUpload}
        volumeColor={volumeColor}
        minColorVolumePicker={minColorVolumePicker}
        maxColorVolumePicker={maxColorVolumePicker}
      />
      <VolumeCalculator
        displayedSections={displayedSections}
        displaySection={displaySection}
        insertThreshold={insertThreshold}
        thresholdVolume={thresholdVolume}
        calculateVolume={calculateVolume}
        loadingEl={loadingEl}
        saveNewVolume={saveNewVolume}
        volumeHistory={volumeHistory}
      />

      <div className={classes.viewerContainer}>
        <div id="3D" style={{ width: "70%" }}></div>
        <SlicesSection
          volumeslicingX={volumeslicingX}
          volumeslicingY={volumeslicingY}
          volumeslicingZ={volumeslicingZ}
          indexX={indexX}
          indexY={indexY}
          indexZ={indexZ}
        />
      </div>
    </div>
  );
};

export default BrainViewer;
