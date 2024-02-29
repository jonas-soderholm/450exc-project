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
        className="opacity-80 hover:opacity-100 text-sm text-slate-200 w-[2.3rem] px-2 py-2 
         rounded-full bg-slate-500 hover:bg-slate-700 transition ease-in-out duration-300"
        onClick={() => {
          setTransitionDuration(1);
          setSpecific(specific);
          handleZoomInTransition(pos);
          setRotate((prev) => !prev);

          if (!rotate) {
            setTransitionDuration(1.4);
            setSpecific([-1.3, 0, 0]);
            handleZoomInTransition([0, 0.5, 0]);
          }
        }}
      >
        {nr}
      </button>
    </Html>
  );
}
