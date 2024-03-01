import { useEffect, useState } from "react";
import { useDataContext } from "./SharedContext";

function LoadingScreen() {
  const { buttonHider, setButtonHider } = useDataContext(false);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [precentageLoaded, setPrecentageLoaded] = useState(0);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setButtonHider(false);
  //     //setLoadingScreen(false);
  //   }, 2000);
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrecentageLoaded((prevPercentage) => {
        const nextPercentage = prevPercentage + 1;
        if (nextPercentage >= 100) {
          clearInterval(interval); // Stop the interval when reaching 100%
          setTimeout(() => {
            setButtonHider(false);
            setLoadingScreen(false);
          }, 100); // Delay hiding loading screen after reaching 100%
        }
        return nextPercentage;
      });
    }, 2); // Adjust the interval duration for smoother animation
    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, []);

  return (
    <>
      <div
        className={`absolute rubik-wet text-slate-200 flex-col top-0 gray-background z-[100] w-full h-full loaded flex justify-center items-center 
     text-center  ${loadingScreen ? "show-loading" : "show-loading-hide"}`}
      >
        <div className="md:text-[4rem] text-[2rem]">KTM EXC 450</div>
        <div className="md:text-[8rem] text-[4rem]">{precentageLoaded}%</div>
      </div>
    </>
  );
}

export default LoadingScreen;
