import React, { useEffect, useState, useRef } from "react";
import { useDataContext } from "./SharedContext";

const ktmInformation = [
  {
    // General info
    info: `The KTM 450 EXC: A powerhouse off-road bike renowned for its agility and reliability. Built to conquer rugged terrain with ease, it's the ultimate choice for adrenaline-fueled adventures.`,
  },
  {
    // Handle bars
    info: `The KTM 450 EXC features Pro Taper handlebars, expertly crafted from lightweight, high-strength aluminum alloy. With customizable bend options, these handlebars offer precise control and ergonomic comfort, tailored to the rider's preferences and riding demands.`,
    img: "./protaper.png",
  },
  {
    // Engine
    info: `The KTM 450 EXC features a cutting-edge 450cc single-cylinder engine, equipped with fuel injection and advanced engine management. This high-performance powerplant delivers exceptional torque and throttle response, providing agile and precise performance on any terrain.`,
    img: "./engine.png",
  },
  {
    // Shocks
    info: `The KTM 450 EXC comes equipped with a high-performance shock absorber, meticulously tuned for off-road riding. Featuring advanced damping technology and adjustable settings, this shock offers superb suspension performance, ensuring a smooth and controlled ride over challenging terrain.`,
    img: "./shocks.png",
  },
  {
    // Exhaust
    info: `The KTM 450 EXC is equipped with a high-performance exhaust system from renowned brand, meticulously engineered for optimal airflow and power delivery. Crafted from premium materials, it features precision tuning and a tuned exhaust note, balancing performance with environmental responsibility.`,
    img: "./exhaust.png",
  },
];

export function EXCInformation() {
  const [showGeneralInfo, setShowGeneralInfo] = useState(false);
  const [showSpecificInfo, setShowSpecificInfo] = useState(false);
  const [clickedSpecific, setClickedSpecific] = useState(false);
  const { informationNr, setInformationNr } = useDataContext();
  const { specificInfoToggle, setSpecificInfoToggle } = useDataContext();
  const { backToOrignalview, setBackToOrignalview } = useDataContext();
  const { buttonHider, setButtonHider } = useDataContext(true);
  const firstUpdate = useRef(true);
  const { isMobile, setIsMobile } = useDataContext(false);

  const handleGeneralInfoClick = () => {
    setShowGeneralInfo((prev) => !prev);
    isMobile && setButtonHider((prev) => !prev);
  };

  const handleCloseSpecific = () => {
    setShowSpecificInfo(false);
    setSpecificInfoToggle((prev) => !prev);

    setTimeout(() => {
      setClickedSpecific(false);
      setButtonHider(false);
    }, 700);
  };

  // Show specific info and general button setup
  useEffect(() => {
    setShowGeneralInfo(false);
    !firstUpdate.current && setClickedSpecific(true);

    const timer = setTimeout(() => {
      !firstUpdate.current ? setShowSpecificInfo(true) : (firstUpdate.current = false);
    }, 500);

    return () => clearTimeout(timer);
  }, [backToOrignalview]);

  return (
    <>
      {/* KTM header and info button */}
      <div className="absolute top-0 md:left-0 w-full flex md:p-[2rem] text-center md:justify-normal justify-center transition ease-in-out duration-500">
        <div className="flex flex-col items-center justify-center">
          <h1 className="rubik-wet text-white md:text-[5rem] text-[3rem]">KTM 450 EXC</h1>
          <button
            className={` montserrat-body hover:cursor-pointer bg-slate-200 
            md:hover:opacity-100 z-20 px-2 py-1 rounded-full opacity-50 
     
            ${
              clickedSpecific
                ? " pointer-events-none show-general-button-hide"
                : "pointer-events-auto show-general-button"
            }`}
            onClick={() => {
              {
                !clickedSpecific && handleGeneralInfoClick();
              }
            }}
          >
            {showGeneralInfo ? "hide info" : "more info"}
          </button>
        </div>
      </div>
      {/* KTM EXC general information */}
      <div
        className={`information absolute top-0 left-0  md:w-[38.2rem] md:mt-[10rem] mt-[6rem] 
    flex p-[2rem] pointer-events-none ${showGeneralInfo ? "show-info" : ""}`}
      >
        <div className="bg-[#000000d5] mt-3 flex w-full items-center rounded-2xl opacity-90 overflow-hidden">
          <p className="info montserrat-body text-center text-white md:text-2xl text-xl p-4">
            {ktmInformation[0].info}
          </p>
        </div>
      </div>
      {/* KTM EXC specific information after button clicks */}
      <div
        className={`absolute top-0 left-0 h-full w-full 
    flex md:px-[20vw] px-[8vw] py-[10rem]
     ${showSpecificInfo ? "show-specific-info" : "show-specific-info-hide"}`}
      >
        <div className="flex flex-col bg-[#000000d5] rounded-2xl overflow-hidden relative">
          {/* Add close button here */}
          <button
            className={`absolute montserrat-body  show-specific-info top-4 right-4 z-10 md:opacity-75 md:hover:opacity-100 
            text-slate-700 rounded-full p-2 bg-[#f4f4f4]`}
            onClick={() => {
              handleCloseSpecific();
            }}
          >
            close
          </button>
          <div className="img flex  justify-center items-center  overflow-hidden">
            <img className="w-auto md:h-[25rem] mt-[3rem] p-10 " src={`${ktmInformation[informationNr].img}`} alt="" />
          </div>
          <p className="info my-auto montserrat-body text-center text-white md:text-2xl text-l p-5 px-[2vw]">
            {ktmInformation[informationNr].info}
          </p>
        </div>
      </div>
    </>
  );
}

export default EXCInformation;
