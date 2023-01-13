import Planet from "Components/Planets/Planet";
import useWindowDimensions from "Utility/useWindowDimensions";
import randomNumber from "Utility/randomNumber";
import PlanetProperties from "../../../../../Utility/PlanetProperties";
import VARIABLES from "../../../../../_variables.module.sass";
import "./Clouds.sass";
import { useEffect, useState } from "react";

const clouds = Array(randomNumber({ min: 10, max: 20 }))
  .fill("")
  .map(() => {
    const randomZ = randomNumber({ min: -50, max: 50 });
    const randomY = randomNumber({ min: 0, max: 36 }) * 10;
    const clouds = Object.values(PlanetProperties["earth"]["clouds"]).map(
      (properties) => properties["label"]
    );
    const randomCloud =
      clouds[randomNumber({ min: 0, max: clouds.length - 1 })];
    const randomScale = randomNumber({ min: 21, max: 30 });
    return { randomZ, randomY, randomCloud, randomScale };
  });

const Clouds = () => {
  const { vmin } = useWindowDimensions();
  const [zoomLevel, setZoomLevel] = useState(100);
  const scale = 720 - vmin;
  let scaleReduction = Math.floor((scale - (scale % 10)) / 20);
  if (scaleReduction > 20) scaleReduction = 20;
  if (scaleReduction < 0) scaleReduction = 0;

  useEffect(() => {
    const handleResize = () => {
      const browserZoomLevel = Math.round(window.devicePixelRatio * 100);
      setZoomLevel(browserZoomLevel);
    };
    window.addEventListener("resize", () => handleResize());
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="Earth__Clouds"
      style={zoomLevel > 175 ? { display: "none" } : {}}
    >
      {clouds.map((cloud) => (
        <Planet
          planetClassname={`Planet--Clouds Planet--Clouds--y-rotation--${cloud.randomY}`}
          hemisphereProps={{
            style: {
              transform: `rotateY(${cloud.randomY}deg) rotateZ(${cloud.randomZ}deg)`,
            },
          }}
        >
          <div
            className={`Island Cloud Cloud--${cloud.randomCloud} Cloud--scale-${
              cloud.randomScale - scaleReduction
            }`}
          >
            {Array(parseInt(VARIABLES["cloud-layers"]) + 1) // Plus one for final layer to be centered
              .fill("")
              .map((_, i) => (
                <div key={i} />
              ))}
          </div>
        </Planet>
      ))}
    </div>
  );
};

export default Clouds;
