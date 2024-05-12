import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./components/MainPage.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import "./main.css";
import { DataContextProvider } from "./components/SharedContext.jsx";

// Function to render the MainPage component after a delay
function renderMainPageAfterDelay() {
  setTimeout(() => {
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <DataContextProvider>
          <MainPage />
          <LoadingScreen showEnvironmentLoading />
        </DataContextProvider>
      </React.StrictMode>
    );
  }, 500); // 1000 milliseconds = 1 second delay
}

// Initial render with LoadingScreen
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataContextProvider>
      <LoadingScreen showModelLoading />
    </DataContextProvider>
  </React.StrictMode>
);

// Call the function to render MainPage after a delay
renderMainPageAfterDelay();
