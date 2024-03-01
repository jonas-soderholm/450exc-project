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

  // Set view to original
  useEffect(() => {
    setTransitionDuration(1);
    setSpecific([-1.5, 0, -1]);
    handleZoomInTransition([0, 0.25, 0]);
    setRotate(true);
  }, [specificInfoToggle]);

  return (
    <Html className="flex" position={pos}>
      <button
        className={`text-xl ${
          !buttonHider ? "hover:opacity-100" : ""
        } text-slate-700 w-[2.85rem] px-2 py-2 bg-slate-200 rounded-full transition-opacity duration-500 ${
          !buttonHider ? "opacity-70" : "opacity-0"
        }`}
        onClick={() => {
          setRotate(false);
          setBackToOrignalview((prev) => !prev);
          setInformationNr(nr);
          setTransitionDuration(1);
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
