import React from "react";
import { Html } from "@react-three/drei";

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
  return (
    <Html className="flex" position={pos}>
      <button
        className="hover:opacity-100 opacity-80 text-xl text-slate-700 w-[2.85rem] px-2 py-2 
         rounded-full bg-[#dedede] transition ease-in-out duration-300"
        onClick={() => {
          setTransitionDuration(1);
          setSpecific(specific);
          handleZoomInTransition(pos);
          setRotate((prev) => !prev);

          if (!rotate) {
            setTransitionDuration(1.8);
            setSpecific([-2, 0, -1]);
            handleZoomInTransition([0, 0.25, 0]);
          }
        }}
      >
        {nr}
      </button>
    </Html>
  );
}
