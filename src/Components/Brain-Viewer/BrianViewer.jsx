//import { CircularProgress, Divider, Slider } from "@mui/material";
import useBrainRender from "../../Hooks/useBrainRender";
import { useEffect, useState ,useCallback} from "react";
import classes from "./BrainViewer.module.css";
import VolumeController from "../Volume-Controller/VolumeController";
import VolumeCalculator from "../Volume-Calculator/VolumeCalculator";
import SlicesSection from "../Slices-Section/SlicesSection";
import request from "../../utils/request";
import { useSelector } from "react-redux";

const BrainViewer = ({ renderFile, mriId, fileName }) => {

  const { user } = useSelector((state) => state.auth);
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
  } = useBrainRender({ renderFile });
  const [thresholdVolume, setThresholdVolume] = useState({
    volume: null,
    threshold: null,
  });
  const [loadingEl, setLoadingEl] = useState(null);
  const [volumeHistory, setVolumeHistory] = useState([]);
  const [displayedSections, setDisplayedSections] = useState({
    volume: true,
    calculateVolume: false,
  });
   const fetchVolumeHistory = useCallback(async () => {
     try {
       const res = await request.get(`/api/volume/${mriId}`);

       setVolumeHistory(res.data);
     } catch (err) {
       console.log(err);
     }
   }, [mriId]);

   useEffect(() => {
     fetchVolumeHistory();
   }, [fetchVolumeHistory]);

  const saveNewVolume = async() => {
    setLoadingEl("save-volume");
    try {
        const res = await request.post(
          `/api/volume/save-volume`,
          {
            volume: thresholdVolume.volume,
            threshold: thresholdVolume.threshold,
            displayedNII: {
              public_id: fileName,
              secure_url: renderFile,
            },
            btSegmentationId: mriId,
          },
          {
            headers: {
              token: user.token,
            },
          }
        );
      console.log(res);
      setVolumeHistory((prev) => [
        {
          threshold: thresholdVolume.threshold,
          volume: thresholdVolume.volume,
          createdAt: res.data.createdAt,
        },
        ...prev,
      ]);
      setThresholdVolume({
        volume: null,
        threshold: null,
      });
      setLoadingEl(null);
      
    } catch (error) {
      console.log(error);
    }
  };

  const calculateVolume = async () => {
    setLoadingEl("calculate-volume");
    try {
      const res = await request.post(
        `/api/volume`,
        { threshold: thresholdVolume.threshold, id: mriId },
        {
          headers: {
            token: user.token,
          },
        }
      );
      console.log(res);
      setThresholdVolume((prev) => ({ ...prev, volume: res.data.volume }));
      setLoadingEl(null);
    } catch (error) {
      console.log(error);
    }
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
        <div id="3D" style={{ width: "70%" , backgroundColor: 'rgb(131, 130, 130)'}}></div>
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
