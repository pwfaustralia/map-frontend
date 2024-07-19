import { SWRConfig } from "swr";
import { laravelFetcher } from "../services/fetcher";
import { disableRevalidation } from "../helpers";

function SWRProvider({ children }: { children: JSX.Element }) {
  return (
    <SWRConfig
      value={{
        fetcher: laravelFetcher,
        ...disableRevalidation(),
      }}
    >
      {children}
    </SWRConfig>
  );
}

export default SWRProvider;
