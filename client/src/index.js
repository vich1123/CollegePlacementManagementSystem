import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Import global CSS styles

// Check if the root element exists before rendering
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Please ensure there is a 'root' div in your HTML.");
}
  