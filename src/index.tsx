import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import RouteIndex from "./routes";
import { GlobalProvider } from "./context/Provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <RouteIndex />
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>
);
