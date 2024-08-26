'use client';

import { fetchYodlee } from '@/app/(actions)/fetcher/actions';
import { getYodleeAccessToken } from '@/app/(actions)/utils/actions';
import { FastLink, FastLinkConfig, FastLinkOpenInterface } from '@/lib/types/fastlink';
import Script from 'next/script';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function useYodlee(fastLinkConfig: FastLinkConfig) {
  const _config = useRef<FastLinkConfig>(fastLinkConfig);
  const [isReady, setIsReady] = useState({ apiReady: false, accountsReady: false });
  const { apiReady, accountsReady } = isReady;
  const [accountData, setAccountData] = useState<AccountData>();

  const yodleeTags = useMemo(() => <Script src="https://cdn.yodlee.com/fastlink/v4/initialize.js" />, []);
  const fastLink = (): FastLink => (window as any).fastlink;
  const config = () => _config.current;

  const open = (params: FastLinkOpenInterface, container: string) => {
    if (!fastLink() || !config()) return;

    fastLink()?.open({ ...config(), ...params }, container);
  };

  const close = () => {
    fastLink()?.close();
  };

  const setToken = (token: string) => {
    if (!token) {
      return setIsReady({ ...isReady, apiReady: false });
    }
    setIsReady({ ...isReady, apiReady: true });
    config().accessToken = token;
  };

  const getToken = () => {
    return config().accessToken;
  };

  const getAccounts = async () => {
    if (!apiReady) return;
    setIsReady({ ...isReady, accountsReady: false });
    const data = await fetchYodlee('/accounts');
    setAccountData(data);
    setIsReady({ ...isReady, accountsReady: true });
    return data;
  };

  useEffect(() => {
    (async () => {
      let yodleeTokens = await getYodleeAccessToken();
      if (yodleeTokens.length) {
        setToken(yodleeTokens[0].accessToken);
      }
    })();
  }, []);

  useEffect(() => {
    if (apiReady) {
      getAccounts();
    }
  }, [apiReady]);

  return { fastLink, open, setToken, close, getToken, getAccounts, accountData, isReady, yodleeTags };
}
