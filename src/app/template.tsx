'use client';

import { SWRConfig } from 'swr';
import { fetchLaravelJson } from './(actions)/fetcher/actions';

export default function Template({ children }: { children: React.ReactNode }) {
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
