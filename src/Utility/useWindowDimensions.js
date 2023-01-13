import { useState, useEffect } from "react";

function getVmin() {
  const { innerWidth: width, innerHeight: height } = window;
  const vmin = Math.min(width, height);
  return {
    vmin,
  };
}

export default function useWindowDimensions() {
  const [vmin, setVmin] = useState(getVmin());
  useEffect(() => {
    function handleResize() {
      setVmin(getVmin());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return vmin;
}
