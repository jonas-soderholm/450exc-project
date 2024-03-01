import React, { useEffect } from "react";
import { Html } from "@react-three/drei";
import { useDataContext } from "./SharedContext";

export function Button({
  setTransitionDuration,
  setSpecific,
  handleZoomInTransition,
  setRotate,
  rotate,
  pos,
  specific,
  nr,
}) {
  const { informationNr, setInformationNr } = useDataContext();
  const { specificInfoToggle, setSpecificInfoToggle } = useDataContext();
  const { backToOrignalview, setBackToOrignalview } = useDataContext();
  const { buttonHider, setButtonHider } = useDataContext(false);
  const { isMobile, setIsMobile } = useDataContext(false);

  // Set view to original
  useEffect(() => {
    setTransitionDuration(1);
    handleZoomInTransition([0, 0.35, 0]);
    setRotate(true);
    isMobile ? setSpecific([-3, 0, -1]) : setSpecific([-1, 0, -1]);
  }, [specificInfoToggle]);

  return (
    <Html className="flex" position={pos}>
      <button
        className={`text-xl ${
          !buttonHider ? "hover:opacity-100" : ""
        } text-slate-700 w-[2.85rem] px-2 py-2 bg-slate-200 rounded-full transition-opacity duration-500 ${
          !buttonHider ? "opacity-70 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setRotate(false);
          setBackToOrignalview((prev) => !prev);
          setInformationNr(nr);
          setTransitionDuration(1.5);
          setSpecific(specific);
          handleZoomInTransition(pos);
          setButtonHider(true);
        }}
      >
        {nr}
      </button>
    </Html>
  );
}
