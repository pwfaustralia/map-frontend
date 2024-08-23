'use client';

import Script from 'next/script';
import { useMemo, useRef } from 'react';
import { FastLink, FastLinkConfig, FastLinkOpenInterface } from '../types';

export default function useYodlee(fastLinkConfig: FastLinkConfig) {
  const _config = useRef<FastLinkConfig>(fastLinkConfig);

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
    config().accessToken = token;
  };

  const getToken = () => {
    return config().accessToken;
  };

  return { fastLink, open, setToken, close, getToken, yodleeTags };
}
