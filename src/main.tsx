import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import { store } from "./lib/easy-peasy/store";
import { SWRConfig } from "swr";
import fetcher from "./services/fetcher";
const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <SWRConfig value={{ fetcher }}>
        <App />
      </SWRConfig>
    </StoreProvider>
  </React.StrictMode>
);
