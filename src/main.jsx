import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "../server.js";
import "./index.css";

// example.com
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
