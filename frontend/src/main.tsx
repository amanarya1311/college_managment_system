import React from "react";

import { Toaster } from "sonner";

import { createRoot } from "react-dom/client";

import App from "./app/App.tsx";

import "./styles/index.css";

createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

    <App />

    <Toaster
      richColors
      position="top-right"
    />

  </React.StrictMode>

);