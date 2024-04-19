import { StoreProvider } from "easy-peasy";
import { store } from "../lib/easy-peasy/store";

function EasyPeasyProvider({ children }: { children: JSX.Element }) {
  return <StoreProvider store={store}>{children}</StoreProvider>;
}

export default EasyPeasyProvider;
