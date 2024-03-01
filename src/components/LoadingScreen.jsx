import { useEffect, useState } from "react";
import { useDataContext } from "./SharedContext";

function LoadingScreen() {
  // eslint-disable-next-line
  const { buttonHider, setButtonHider } = useDataContext(false);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [precentageLoaded, setPrecentageLoaded] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrecentageLoaded((prevPercentage) => {
        const nextPercentage = prevPercentage + 1;
        if (nextPercentage >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setButtonHider(false);
            setLoadingScreen(false);
          }, 100);
        }
        return nextPercentage;
      });
    }, 2);
    return () => clearInterval(interval);
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
