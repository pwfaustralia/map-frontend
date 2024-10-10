'use client';

import { SWRConfig } from 'swr';
import { fetchLaravelJson } from './(actions)/fetcher/actions';
import { useLayoutStore } from '@/store/layout-store';

export default function Template({ children }: { children: React.ReactNode }) {
  const { hydrated } = useLayoutStore();

  if (!hydrated) {
    return <>Loading...</>
  }

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: fetchLaravelJson,
      }}
    >
      {children}
    </SWRConfig>
  );
}
