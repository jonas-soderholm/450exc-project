/* eslint-disable */
import React, { createContext, useContext, useState } from "react";

const ContextProvider = createContext();

export const useDataContext = () => useContext(ContextProvider);

export const DataContextProvider = ({ children }) => {
  const [informationNr, setInformationNr] = useState(0);
  const [specificInfoToggle, setSpecificInfoToggle] = useState(false);
  const [backToOrignalview, setBackToOrignalview] = useState(false);
  const [buttonHider, setButtonHider] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  return (
    <ContextProvider.Provider
      value={{
        informationNr,
        setInformationNr,
        specificInfoToggle,
        setSpecificInfoToggle,
        backToOrignalview,
        setBackToOrignalview,
        buttonHider,
        setButtonHider,
        isMobile,
        setIsMobile,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};
