import { useCallback, useState } from "react";
import * as xtk from "xtk";

const useBrainRender = () => {
  const [renderer3D, setRenderer3D] = useState(null);
  const [volume, setVolume] = useState(null);
  const [volumeColor, setVolumeColor] = useState({
    min: { r: 255, g: 255, b: 255 },
    max: { r: 0, g: 0, b: 0 },
  });
  const [opacity, setOpacity] = useState({ value: 5, range: [0, 100] });
  const [windowLevel, setWindowLevel] = useState({
    values: [0, 625],
    range: [0, 625],
  });
  const [threshold, setThreshold] = useState({
    values: [0, 625],
    range: [0, 625],
  });
  const [volumeRender, setVolumeRender] = useState("2D");
  const [indexX, setIndexX] = useState({ value: 0, range: [0, 100] });
  const [indexY, setIndexY] = useState({ value: 0, range: [0, 100] });
  const [indexZ, setIndexZ] = useState({ value: 0, range: [0, 100] });

  const updateIndexXScroll = useCallback((newVolume) => {
    if (!newVolume) return;

    setIndexX((prev) => ({ ...prev, value: newVolume.indexX }));
  }, []);

  const updateIndexYScroll = useCallback((newVolume) => {
    if (!newVolume) return;

    setIndexY((prev) => ({ ...prev, value: newVolume.indexY }));
  }, []);

  const updateIndexZScroll = useCallback((newVolume) => {
    if (!newVolume) return;

    setIndexZ((prev) => ({ ...prev, value: newVolume.indexZ }));
  }, []);
  const setUI = useCallback((newVolume) => {
    if (!newVolume) return;

    setThreshold({ values: [4, newVolume.max], range: [0, newVolume.max] });
    newVolume.lowerThreshold = 4;

    setWindowLevel({ values: [0, newVolume.max], range: [0, newVolume.max] });

    setOpacity({ value: 5, range: [0, 100] });
    newVolume.opacity = 0.05; // re-propagate

    newVolume.modified();

    const dim = newVolume.dimensions;
    setIndexX({ value: newVolume.indexX, range: [0, dim[0] - 1] });
    setIndexY({ value: newVolume.indexY, range: [0, dim[1] - 1] });
    setIndexZ({ value: newVolume.indexZ, range: [0, dim[2] - 1] });
    const minColor = newVolume.minColor;
    const maxColor = newVolume.maxColor;
    console.log({minColor, maxColor})
    setVolumeColor({
      min: { r: minColor[0] * 255, g: minColor[1] * 255, b: minColor[2] * 255 },
      max: { r: maxColor[0] * 255, g: maxColor[1] * 255, b: maxColor[2] * 255 },
    });
  }, []);

  const InitializeRender = useCallback(
    async (fileName, arrayBuffer = null) => {
      if (renderer3D) return;
      console.log("triggered");

      const newRender = new xtk.X.renderer3D();
      newRender.config.INTERMEDIATE_RENDERING = true;
      setRenderer3D(newRender);
      newRender.container = "3D";
      newRender.init();

      const sliceX = new xtk.X.renderer2D();
      sliceX.container = "sliceX";
      sliceX.orientation = "X";
      sliceX.init();

      const sliceY = new xtk.X.renderer2D();
      sliceY.container = "sliceY";
      sliceY.orientation = "Y";
      sliceY.init();

      const sliceZ = new xtk.X.renderer2D();
      sliceZ.container = "sliceZ";
      sliceZ.orientation = "Z";
      sliceZ.init();

      const newVolume = new xtk.X.volume();
      setVolume(newVolume);
      newVolume.file = fileName;
      if (arrayBuffer) newVolume.filedata = arrayBuffer;

      // add the object
      newRender.add(newVolume);

      newRender.onShowtime = function () {
        window.console.log("Loading completed.");

        // show any volume also in 2d
        sliceX.add(newVolume);
        sliceY.add(newVolume);
        sliceZ.add(newVolume);
        sliceX.render();
        sliceY.render();
        sliceZ.render();
        // render();

        setUI(newVolume);
      };

      newRender.camera.focus = [0, 0, 0];
      newRender.camera.up = [0, 1, 0];
      newRender.camera.view = new Float32Array([
        -0.5093217615929089, 0.15980913879519168, -0.8456077000154597, 0,
        -0.8570143021091494, -0.1834973848251334, 0.48151344295118087, 0,
        -0.07821655290449646, 0.9699431678814355, 0.23041792884205461, 0, 10,
        17, -330, 1,
      ]);

      sliceX.onScroll = () => updateIndexXScroll(newVolume);
      sliceY.onScroll = () => updateIndexYScroll(newVolume);
      sliceZ.onScroll = () => updateIndexZScroll(newVolume);

      // .. and render it
      newRender.render();
    },
    [
      renderer3D,
      setUI,
      updateIndexXScroll,
      updateIndexYScroll,
      updateIndexZScroll,
    ]
  );

  /*
    useEffect(() => {
        if(!renderer3D) InitializeRender("https://res.cloudinary.com/dkzwhfcm6/raw/upload/v1716894564/brain.nii.gz")
    }, [InitializeRender, renderer3D])
*/

  function volumerenderingOnOff(bool) {
    if (!volume) {
      return;
    }
    if (volume.volumeRendering !== bool) {
      volume.volumeRendering = bool;
    }
  }

  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0];

      const arrayBuffer = await file.arrayBuffer();

      InitializeRender(file.name, arrayBuffer);
    } catch (err) {
      console.log(err);
    }
  };

  const display3D = () => {
    setVolumeRender("3D");
    volumerenderingOnOff(true);
  };

  const display2D = () => {
    setVolumeRender("2D");
    volumerenderingOnOff(false);
  };

  const handleOpacityChange = (e, value) => {
    volume.opacity = value / 100;
    setOpacity((prev) => ({ ...prev, value }));
  };

  const handleWindowLevelChange = (e, values) => {
    volume.windowLow = values[0];
    volume.windowHigh = values[1];
    setWindowLevel((prev) => ({ ...prev, values }));
  };

  const handleThresholdChange = (e, values) => {
    volume.lowerThreshold = values[0];
    volume.upperThreshold = values[1];
    setThreshold((prev) => ({ ...prev, values }));
  };

  function volumeslicingX(e, value) {
    if (!volume) {
      return;
    }

    volume.indexX = Math.floor(value);
    setIndexX((prev) => ({ ...prev, value }));
  }

  function volumeslicingY(e, value) {
    if (!volume) {
      return;
    }

    volume.indexY = Math.floor(value);
    setIndexY((prev) => ({ ...prev, value }));
  }

  function volumeslicingZ(e, value) {
    if (!volume) {
      return;
    }

    volume.indexZ = Math.floor(value);
    setIndexZ((prev) => ({ ...prev, value }));
  }

  const minColorVolumePicker = (color) => {
    volume.minColor = [color.rgb.r / 255, color.rgb.g / 255, color.rgb.b / 255];
    setVolumeColor((prev) => ({ ...prev, min: color.rgb }));
  };

  const maxColorVolumePicker = (color) => {
    volume.maxColor = [color.rgb.r / 255, color.rgb.g / 255, color.rgb.b / 255];
    setVolumeColor((prev) => ({ ...prev, max: color.rgb }));
  };

  return {
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
  };
};

export default useBrainRender;
