'use client';

import { fetchYodlee } from '@/app/(actions)/fetcher/actions';
import { getYodleeAccessToken } from '@/app/(actions)/utils/actions';
import { FastLink, FastLinkConfig, FastLinkOpenInterface } from '@/lib/types/fastlink';
import Script from 'next/script';
import { useEffect, useMemo, useRef, useState } from 'react';
import { YODLEE_API_ROUTES } from '../routes';
import {
  AccountData,
  ErrorResponse,
  TransactionCategoryData,
  TransactionCount,
  TransactionData,
  YodleeFetchData,
  YodleeInitConfig,
} from '../types/yodlee';
import { serialize } from '../utils';

export default function useYodlee(initConfig: {
  fastLinkConfig: FastLinkConfig;
  initialModuleConfig?: YodleeInitConfig;
  manualErrorHandling?: boolean;
  userId?: string;
  onError?: (error: ErrorResponse) => void;
}) {
  const { fastLinkConfig, initialModuleConfig, manualErrorHandling, userId, onError } = initConfig;
  const {
    accounts: initAccounts,
    transactions: initTransactions = {},
    categories: initCategories,
  } = initialModuleConfig || {};
  const _moduleOptions = useRef<typeof initialModuleConfig>(initialModuleConfig);
  const _config = useRef<FastLinkConfig>(fastLinkConfig);
  const [isReady, setIsReady] = useState({
    apiReady: false,
    accountsReady: false,
    transactionsReady: false,
    categoriesReady: false,
  });
  const _isReady = useRef<typeof isReady>(isReady);
  const { apiReady, accountsReady } = isReady;
  const [error, setError] = useState<ErrorResponse | null>();
  const [username, setUsername] = useState<string>('');
  const [accountData, setAccountData] = useState<AccountData>();
  const [categoryData, setCategoryData] = useState<TransactionCategoryData>();
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

  const handleError = (error: ErrorResponse | null) => {
    if (!error) {
      setError(null);
      return;
    }
    setError(error);
    if (onError) onError(error);
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

  const fetchData = async ({ url, before = async () => {}, after = async () => {} }: YodleeFetchData) => {
    if (!apiReady) return;
    await before();
    const data = await fetchYodlee(url, {
      headers: {
        Authorization: `Bearer ${config().accessToken}`,
      },
    });
    if (data?.errorCode) {
      handleError(data);
      if (manualErrorHandling) {
        return;
      }
    }
    await after(data);
    return data;
  };

  const getAccounts = async (): Promise<AccountData> => {
    return await fetchData({
      url: YODLEE_API_ROUTES.transactions.accounts,
      before: () => {
        setReadyStatus('accountsReady', false);
      },
      after: (data) => {
        setAccountData(data);
        setReadyStatus('accountsReady', true);
        if (!data) {
          handleError({
            errorCode: 'Y008',
            errorMessage: 'Invalid token',
            referenceCode: '',
          });
        }
      },
    });
  };

  const getTransactions = async (filter: typeof initTransactions, accountId: string | undefined) => {
    if (!filter.accountId && accountId) {
      filter.accountId = accountId;
    }
    let params = filter && typeof filter !== 'boolean' ? serialize(filter) : '';
    return await fetchData({
      url: YODLEE_API_ROUTES.transactions.transactions + '?' + params,
      before: () => {
        setReadyStatus('transactionsReady', false);
      },
      after: async (data) => {
        await fetchData({
          url: YODLEE_API_ROUTES.transactions.count + '?' + params,
          before: () => {},
          after: (count) => {
            setTransactionCount(count);
            setTransactionData(data);
            setReadyStatus('transactionsReady', true);
            if (_moduleOptions.current) _moduleOptions.current.transactions = filter;
          },
        });
      },
    });
  };

  const getCategories = async () => {
    return await fetchData({
      url: YODLEE_API_ROUTES.transactions.categories,
      before: () => {
        setReadyStatus('categoriesReady', false);
      },
      after: (data) => {
        setCategoryData(data);
        setReadyStatus('categoriesReady', true);
      },
    });
  };

  const getModuleConfig = () => _moduleOptions.current;

  const authenticate = async (revalidate: boolean = false) => {
    let yodleeTokens = await getYodleeAccessToken(userId, username, revalidate);
    if (yodleeTokens.length) {
      let theToken = yodleeTokens.find((q) => q.username === username);
      if (theToken) {
        handleError(null);
        setToken(theToken.accessToken);
      }
    } else {
      handleError({
        errorCode: '0',
        errorMessage: 'No Yodlee account linked.',
        referenceCode: '',
      });
    }
  };

  const initModules = async () => {
    let accounts, transactions;
    if (initAccounts) accounts = await getAccounts();
    if (Object.keys(initTransactions).length && accounts)
      transactions = await getTransactions(initTransactions, accounts?.account?.[0].id.toString());
    if (initCategories && transactions) getCategories();
  };

  useEffect(() => {
    if (username) authenticate();
  }, [username]);

  useEffect(() => {
    if (apiReady) {
      initModules();
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
    getModuleConfig,
    authenticate,
    setUsername,
    initModules,
    initialModuleConfig,
    error,
    transactionData,
    categoryData,
    transactionCount,
    accountData,
    isReady,
    yodleeTags,
  };
}
