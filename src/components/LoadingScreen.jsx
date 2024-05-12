/* eslint-disable */
import { useEffect, useState } from "react";
import { useDataContext } from "./SharedContext";

function LoadingScreen({ showModelLoading, showEnvironmentLoading }) {
  const { setButtonHider } = useDataContext();
  const [percentageLoaded, setPercentageLoaded] = useState(0);

  useEffect(() => {
    const steps = 100;
    const duration = 1300; // 3 seconds in milliseconds
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      setPercentageLoaded((prevPercentage) => {
        const nextPercentage = prevPercentage + 1;
        if (nextPercentage >= 100) {
          clearInterval(interval);
          if (showEnvironmentLoading) {
            setButtonHider(false); // Hide loading screen when environment loading is complete
          }
        }
        return nextPercentage;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [showEnvironmentLoading]);

  return (
    <>
      return (
      <>
        <div
          className={`absolute rubik-wet text-slate-200 flex-col top-0 gray-background z-[200] w-full h-full loaded flex justify-center items-center 
   text-center ${showEnvironmentLoading && percentageLoaded === 100 ? "show-loading-hide" : ""}`}
        >
          {showModelLoading && <div className="md:text-[2rem] text-[2rem]">Loading model: {percentageLoaded}%</div>}
          {showEnvironmentLoading && (
            <div className="md:text-[2rem] text-[2rem]">Loading environment: {percentageLoaded}%</div>
          )}
          {/* <div className="md:text-[4rem] text-[2rem]">KTM EXC 450</div> */}
        </div>
      </>
      );
    </>
  );
}

export default LoadingScreen;
