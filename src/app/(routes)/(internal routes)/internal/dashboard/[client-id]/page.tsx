'use client';

import { LARAVEL_API_ROUTES } from '@/app/(actions)/laravel/laravel-api-routes';
import Summary_Graph from '@/components/budgeting/Graph';
import Expenses_Summary from '@/components/budgeting/Summary';
import Graph from '@/components/dashboard/graph';
import InterestPaidContainer from '@/components/dashboard/interest-paid-container';
import LoanContainer, { LoanContainerLoading } from '@/components/dashboard/loan-container';
import TimeSavedContainer from '@/components/dashboard/time-saved-container';
import WelcomeContainer from '@/components/dashboard/welcome-container';
import useYodlee from '@/lib/hooks/use-yodlee';
import { INTERNAL_ROUTES } from '@/lib/routes';
import Client from '@/lib/types/user';
import { TransactionSummaryData } from '@/lib/types/yodlee';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function Internal_DashboardPage() {
  const { 'client-id': clientId } = useParams();
  const [expensesSummary, setExpensesSummary] = useState<TransactionSummaryData>();
  const { data: clientData } = useSWR<Client>(LARAVEL_API_ROUTES.getClientDetailsFn(clientId + ''));

  const yodlee = useYodlee({
    initialModuleConfig: {
      accounts: {
        container: 'loan',
      },
    },
    clientId: clientId + '',
    manualErrorHandling: true,
    onError: async (error) => {
      if (error?.errorCode === 'Y008') {
        await authenticate(true);
      }
    },
  });
  const {
    getTransactionSummary,
    authenticate,
    setUsername: setYodleeUsername,
    accountData,
    error,
    isReady: { accountsReady, apiReady },
  } = yodlee;

  useEffect(() => {
    if (apiReady) {
      getTransactionSummary({
        groupBy: 'CATEGORY',
        categoryType: 'EXPENSE',
      }).then((expensesData) => setExpensesSummary(expensesData));
    }
  }, [apiReady]);

  useEffect(() => {
    if (clientData?.yodlee_username) {
      setYodleeUsername(clientData.yodlee_username);
    }
  }, [clientData]);

  return (
    <>
      <main className=" mx-auto flex-1 px-4 py-8 sm:px-6 md:py-6">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          <div className="col-span-2">
            <WelcomeContainer />
            <div className="col-span-1 text-3xl font-semibold my-10">Client Overview</div>
            <Graph clientData={clientData} />
          </div>
          <div className="mb-3">
            <div className="col-span-1 text-3xl font-semibold mb-3">Client Loans</div>

            {error && (
              <div className="rounded-3xl w-full bg-white py-10 px-12 overflow-hidden mb-3">
                <h3 className="text-xl opacity-[0.6] text-center">{error?.errorMessage}</h3>
              </div>
            )}
            {!accountsReady && !error && <LoanContainerLoading />}
            {accountsReady &&
              accountData?.account?.map((account) => (
                <Link
                  href={INTERNAL_ROUTES['My Clients'].path + '/' + clientId + '?accountId=' + account.id}
                  key={account.id}
                >
                  <LoanContainer
                    account={account}
                    key={account.id}
                    primaryAccountId={clientData?.primary_account?.account_id}
                  />
                </Link>
              ))}

            <TimeSavedContainer />

            <InterestPaidContainer />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <Summary_Graph />
          <Expenses_Summary expensesSummary={expensesSummary} />
        </div>
      </main>
    </>
  );
}
