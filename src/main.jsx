import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from 'virtual:pwa-register'
import "./index.css";
import App from "./App.jsx";

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {
    console.log('App is ready to work offline')
  },
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
