import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useControlledSWR(key: [string, any, any] | string, fetcher: (args: any) => any) {
  const [control, setControl] = useState(true);
  const { data, mutate, isLoading, isValidating, error } = useSWR(key, fetcher, {
    isPaused: () => {
      return control;
    },
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
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
