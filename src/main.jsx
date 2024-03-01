import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./components/MainPage.jsx";
import "./main.css";
import { DataContextProvider } from "./components/SharedContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataContextProvider>
      <MainPage />
    </DataContextProvider>
  </React.StrictMode>
);
