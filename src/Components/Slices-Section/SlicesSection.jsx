import React from "react";
import classes from "./SlicesSection.module.css";
import { Slider } from "@mui/material";

const SlicesSection = ({
  volumeslicingX,
  volumeslicingY,
  volumeslicingZ,
  indexX,
  indexY,
  indexZ,
}) => {
  return (
    <div className={classes.slicesContainer}>
      <div className={classes.sliceContainer}>
        <Slider
          onChange={volumeslicingX}
          style={{
            left: "0",
            position: "absolute",
          }}
          orientation="vertical"
          value={indexX.value}
          min={indexX.range[0]}
          max={indexX.range[1]}
        />
        <div style={{ height: "100%" }} id="sliceX"></div>
      </div>

      <div className={classes.sliceContainer}>
        <Slider
          onChange={volumeslicingY}
          style={{
            left: "0",
            position: "absolute",
          }}
          orientation="vertical"
          value={indexY.value}
          min={indexY.range[0]}
          max={indexY.range[1]}
        />
        <div style={{ height: "100%" }} id="sliceY"></div>
      </div>
      <div className={classes.sliceContainer}>
        <Slider
          onChange={volumeslicingZ}
          style={{
            height:"95%",
            left: "0",
            position: "absolute",
          }}
          orientation="vertical"
          value={indexZ.value}
          min={indexZ.range[0]}
          max={indexZ.range[1]}
        />
        <div style={{ height: "100%" }} id="sliceZ"></div>
      </div>
    </div>
  );
};

export default SlicesSection;
