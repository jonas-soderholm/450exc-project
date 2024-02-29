import React, { useEffect } from "react";
import { useState, useRef } from "react";

const ktmInformation = {
  general: {
    header: "KTM 450",
    info: `The KTM 450 EXC: A powerhouse off-road bike renowned for its agility and reliability. Built to conquer rugged terrain with ease, it's the ultimate choice for adrenaline-fueled adventures.`,
  },
  engine: {
    header: "KTM 450",
    info: `The KTM 450 EXC features a cutting-edge 450cc single-cylinder engine, equipped with fuel injection and advanced engine management. This high-performance powerplant delivers exceptional torque and throttle response, providing agile and precise performance on any terrain.`,
  },
  proTaper: {
    header: "KTM 450",
    info: `The KTM 450 EXC features Pro Taper handlebars, expertly crafted from lightweight, high-strength aluminum alloy. With customizable bend options, these handlebars offer precise control and ergonomic comfort, tailored to the rider's preferences and riding demands.`,
  },
  shock: {
    header: "KTM 450",
    info: `The KTM 450 EXC comes equipped with a high-performance shock absorber, meticulously tuned for off-road riding. Featuring advanced damping technology and adjustable settings, this shock offers superb suspension performance, ensuring a smooth and controlled ride over challenging terrain.`,
  },
  exhaust: {
    header: "KTM 450",
    info: `The KTM 450 EXC is equipped with a high-performance exhaust system from renowned brand, meticulously engineered for optimal airflow and power delivery. Crafted from premium materials, it features precision tuning and a tuned exhaust note, balancing performance with environmental responsibility.`,
  },
};

export function EXCInformation() {
  const [header, setHeader] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    setHeader(ktmInformation.general.header);
    setInfo(ktmInformation.general.info);
  }, []);

  return (
    <div className="absolute ov top-0 left-0 w-1/3 h-auto flex p-[2rem] transition ease-in-out duration-500 pointer-events-none">
      <div className="bg-black w-full rounded-2xl opacity-75">
        <h1 className="header text-white text-4xl p-6">{header}</h1>
        <p className="header text-white text-2xl p-6">{info}</p>
      </div>
    </div>
  );
}

export default EXCInformation;
