'use client';

import { fetchYodlee } from '@/app/(actions)/fetcher/actions';
import { getYodleeAccessToken } from '@/app/(actions)/utils/actions';
import { FastLink, FastLinkConfig, FastLinkOpenInterface } from '@/lib/types/fastlink';
import Script from 'next/script';
import { useEffect, useMemo, useRef, useState } from 'react';
import { YODLEE_API_ROUTES } from '../routes';
import { AccountData, ErrorResponse, TransactionCount, TransactionData, YodleeInitConfig } from '../types/yodlee';
import { serialize } from '../utils';

export default function useYodlee(init: {
  fastLinkConfig: FastLinkConfig;
  initialize?: YodleeInitConfig;
  manualErrorHandling?: boolean;
  userId?: string;
  onError?: (error: ErrorResponse) => void;
}) {
  const { fastLinkConfig, initialize, manualErrorHandling, userId, onError } = init;
  const { accounts: initAccounts, transactions: initTransactions = {} } = initialize || {};
  const _moduleOptions = useRef<typeof initialize>(initialize);
  const _config = useRef<FastLinkConfig>(fastLinkConfig);
  const [isReady, setIsReady] = useState({ apiReady: false, accountsReady: false, transactionsReady: false });
  const _isReady = useRef<typeof isReady>(isReady);
  const { apiReady, accountsReady } = isReady;
  const [error, setError] = useState<ErrorResponse>();
  const [accountData, setAccountData] = useState<AccountData>();
  const [transactionData, setTransactionData] = useState<TransactionData>();
  const [transactionCount, setTransactionCount] = useState<TransactionCount>();

  const yodleeTags = useMemo(() => <Script src="https://cdn.yodlee.com/fastlink/v4/initialize.js" />, []);
  const fastLink = (): FastLink => (window as any).fastlink;
  const config = () => _config.current;

  const openFastLink = (params: FastLinkOpenInterface, container: string) => {
    if (!fastLink() || !config()) return;

    fastLink()?.open({ ...config(), ...params }, container);
  };

  const closeFastLink = () => {
    fastLink()?.close();
  };

  const setReadyStatus = (key: keyof typeof isReady, status: boolean) => {
    _isReady.current[key] = status;
    const newReadyStatus = { ..._isReady.current, [key]: status };
    setIsReady(newReadyStatus);
    return newReadyStatus;
  };

  const setToken = (token: string) => {
    if (!token) {
      return setReadyStatus('apiReady', false);
    }
    setReadyStatus('apiReady', true);
    config().accessToken = token;
  };

  const getToken = () => {
    return config().accessToken;
  };

  const getAccounts = async () => {
    if (!apiReady) return;
    setReadyStatus('accountsReady', false);
    const data = await fetchYodlee(YODLEE_API_ROUTES.transactions.accounts, {
      headers: {
        Authorization: `Bearer ${config().accessToken}`,
      },
    });
    if (data?.errorCode) {
      setError(data);
      if (manualErrorHandling) {
        return;
      }
    }
    setAccountData(data);
    setReadyStatus('accountsReady', true);
    return data;
  };

  const getTransactions = async (filter: typeof initTransactions) => {
    if (!apiReady) return;
    setReadyStatus('transactionsReady', false);
    let params = filter && typeof filter !== 'boolean' ? serialize(filter) : '';
    const data = await fetchYodlee(YODLEE_API_ROUTES.transactions.transactions + '?' + params, {
      headers: {
        Authorization: `Bearer ${config().accessToken}`,
      },
    });
    const count = await fetchYodlee(YODLEE_API_ROUTES.transactions.count + '?' + params, {
      headers: {
        Authorization: `Bearer ${config().accessToken}`,
      },
    });
    if (data?.errorCode) {
      setError(data);
      if (manualErrorHandling) {
        return;
      }
    }
    setTransactionCount(count);
    setTransactionData(data);
    setReadyStatus('transactionsReady', true);
    if (_moduleOptions.current) _moduleOptions.current.transactions = filter;
    return data;
  };

  const getModuleOptions = () => _moduleOptions.current;

  useEffect(() => {
    (async () => {
      let yodleeTokens = await getYodleeAccessToken(userId);
      if (yodleeTokens.length && yodleeTokens[0]?.username) {
        setToken(yodleeTokens[0].accessToken);
      } else {
        setError({
          errorCode: '0',
          errorMessage: 'No Yodlee account linked.',
          referenceCode: '',
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (apiReady) {
      if (initAccounts) getAccounts();
      if (Object.keys(initTransactions).length) getTransactions(initTransactions);
    }
  }, [apiReady]);

  useEffect(() => {
    if (error && onError) {
      onError(error as ErrorResponse);
    }
  }, [error]);

  return {
    fastLink,
    openFastLink,
    setToken,
    closeFastLink,
    getToken,
    getAccounts,
    getTransactions,
    getModuleOptions,
    error,
    transactionData,
    transactionCount,
    accountData,
    isReady,
    yodleeTags,
  };
}
