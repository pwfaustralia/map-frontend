'use client';

import { useSession } from 'next-auth/react';
import WelcomeContainer from '@/components/dashboard/welcome-container';
import LoanContainer, { LoanContainerLoading } from '@/components/dashboard/loan-container';
import Graph from '@/components/dashboard/graph';
import TimeSavedContainer from '@/components/dashboard/time-saved-container';
import InterestPaidContainer from '@/components/dashboard/interest-paid-container';
import Expendature from '@/components/dashboard/expendature-graph';
import Summary_Graph from '@/components/budgeting/Graph';
import Expenses_Summary from '@/components/budgeting/Summary';
import { useEffect } from 'react';
import useYodlee from '@/lib/hooks/use-yodlee';
import { getClientDetails } from '@/app/(actions)/laravel/actions';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { INTERNAL_ROUTES } from '@/lib/routes';

export default function Internal_DashboardPage() {
  const { 'client-id': clientId } = useParams();
  const session = useSession();

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
    authenticate,
    setUsername: setYodleeUsername,
    accountData,
    error,
    isReady: { accountsReady },
  } = yodlee;

  useEffect(() => {
    getClientDetails(clientId + '').then((clientData) => {
      setYodleeUsername(clientData.yodlee_username);
    });
  }, []);

  return (
    <>
      <main className=" mx-auto flex-1 px-4 py-8 sm:px-6 md:py-6">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          <div className="col-span-2">
            <WelcomeContainer />
            <div className="col-span-1 text-3xl font-semibold my-10">Client Overview</div>
            <Graph />
          </div>
          <div className="mb-3">
            <div className="col-span-1 text-3xl font-semibold mb-3">Client Loans</div>

            {error && (
              <div className="rounded-3xl w-full bg-white py-10 px-12 overflow-hidden">
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
                  <LoanContainer account={account} key={account.id} />
                </Link>
              ))}

            <TimeSavedContainer />

            <InterestPaidContainer />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <Summary_Graph />
          <Expenses_Summary />
        </div>
      </main>
    </>
  );
}
