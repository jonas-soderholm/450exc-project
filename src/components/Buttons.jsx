import React, { useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Html } from "@react-three/drei";
import { useDataContext } from "./SharedContext";

export function Button({ setTransitionDuration, setSpecific, handleZoomInTransition, setRotate, pos, specific, nr }) {
  // eslint-disable-next-line
  const { informationNr, setInformationNr } = useDataContext();
  const { specificInfoToggle } = useDataContext();
  // eslint-disable-next-line
  const { backToOrignalview, setBackToOrignalview } = useDataContext();
  const { buttonHider, setButtonHider } = useDataContext(false);
  const { isMobile } = useDataContext(false);

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
        className={`md:text-xl text-sm ${
          !buttonHider ? "hover:opacity-100" : ""
        } text-slate-700 md:w-[2.85rem] w-[1.75rem] px-2 md:py-2 py-1 bg-slate-200 rounded-full transition-opacity duration-500 ${
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

// PropTypes validation
Button.propTypes = {
  setTransitionDuration: PropTypes.func.isRequired,
  setSpecific: PropTypes.func.isRequired,
  handleZoomInTransition: PropTypes.func.isRequired,
  setRotate: PropTypes.func.isRequired,
  rotate: PropTypes.bool.isRequired,
  pos: PropTypes.arrayOf(PropTypes.number).isRequired,
  specific: PropTypes.arrayOf(PropTypes.number).isRequired,
  nr: PropTypes.number.isRequired,
};
