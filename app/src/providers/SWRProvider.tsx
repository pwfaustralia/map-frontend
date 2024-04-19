import { SWRConfig } from "swr";
import fetcher from "../services/fetcher";
import { disableRevalidation } from "../helpers";

function SWRProvider({ children }: { children: JSX.Element }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        ...disableRevalidation(),
      }}
    >
      {children}
    </SWRConfig>
  );
}

export default SWRProvider;
