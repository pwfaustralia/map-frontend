import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import EasyPeasyProvider from "./providers/EasyPeasyProvider";
import SWRProvider from "./providers/SWRProvider";
const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <EasyPeasyProvider>
      <SWRProvider>
        <App />
      </SWRProvider>
    </EasyPeasyProvider>
  </React.StrictMode>
);
