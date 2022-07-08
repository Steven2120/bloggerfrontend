import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Install BrowserRouter with the command: 'npm install react-router-dom@6'
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

/*
 *Wrap <App /> component with <BrowserRouter /> component to enable <Routes />, <Route /> etc...
 */

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
