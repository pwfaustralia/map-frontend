import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import EasyPeasyProvider from "./providers/EasyPeasyProvider";
import SWRProvider from "./providers/SWRProvider";
import { setupIonicReact } from "@ionic/react";
const container = document.getElementById("root");
const root = createRoot(container!);

import "./i18n";

setupIonicReact({
  platform: {
    /** The default `desktop` function returns false for devices with a touchscreen.
     * This is not always wanted, so this function tests the User Agent instead.
     **/
    desktop: (win) => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(win.navigator.userAgent);
      return !isMobile;
    },
  },
});

root.render(
  <React.StrictMode>
    <EasyPeasyProvider>
      <SWRProvider>
        <App />
      </SWRProvider>
    </EasyPeasyProvider>
  </React.StrictMode>
);
