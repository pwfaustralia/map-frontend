import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import { userStorage } from "./lib/easy-peasy/stores";
const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <StoreProvider store={userStorage}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
