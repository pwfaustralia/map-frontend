import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useControlledSWR(
  key: [string, any, any] | string | null,
  fetcher: (args: any) => any,
  config?: {
    onSuccess?: (args: any) => void;
    suspense?: boolean;
  },
  isSWRPaused: boolean | null = null
) {
  const [control, setControl] = useState(true);
  const { data, mutate, isLoading, isValidating, error } = useSWR(key, fetcher, {
    isPaused: () => {
      if (isSWRPaused != null) {
        return isSWRPaused;
      }
      return control;
    },
    onSuccess: (data: any) => {
      setControl(true);
      if (config?.onSuccess) {
        config.onSuccess(data);
      }
    },
    onError: () => {
      setControl(true);
    },
    suspense: config?.suspense || false,
  });
  const start = () => {
    setControl(false);
  };

  const pause = () => {
    setControl(true);
  };

  useEffect(() => {
    if (!control) {
      mutate();
    }
  }, [control, mutate]);

  return { data, mutate, isLoading, isValidating, error, start, pause };
}
