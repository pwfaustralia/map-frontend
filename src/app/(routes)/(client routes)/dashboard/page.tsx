'use client';

import WelcomeContainer from '@/components/dashboard/welcome-container';
import LoanContainer, { LoanContainerLoading } from '@/components/dashboard/loan-container';
import TimeSavedContainer from '@/components/dashboard/time-saved-container';
import InterestPaidContainer from '@/components/dashboard/interest-paid-container';
import Graph from '@/components/dashboard/graph';
import { useSession } from 'next-auth/react';
import useYodlee from '@/lib/hooks/use-yodlee';
import { useEffect } from 'react';

export default function DashboardPage() {
  const session = useSession();

  const yodlee = useYodlee({
    initialModuleConfig: {
      accounts: {
        container: 'loan',
      },
    },
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
    if (session.data?.user.clients.length) setYodleeUsername(session.data?.user.clients[0].yodlee_username);
  }, [session.data?.user]);

  return (
<<<<<<< HEAD
    <main className="mx-auto flex-1 py-3">
      <div className="grid gap-x-8 gap-y-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
=======
    <main className="mx-auto flex-1 py-8">
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
>>>>>>> 6362a073469a2ea3c74dfb6b239516fadc7c2418
        <div className="col-span-2">
          <WelcomeContainer />
          <div className="col-span-1 text-3xl font-semibold my-8">Overview</div>
          <Graph />
        </div>
        <div>
          <div className="col-span-1 text-3xl font-semibold mb-3">Your Loans</div>

          {error && (
            <div className="rounded-3xl w-full bg-white py-10 px-12 overflow-hidden mb-3">
              <h3 className="text-xl opacity-[0.6] text-center">{error?.errorMessage}</h3>
            </div>
          )}
          {!accountsReady && !error && <LoanContainerLoading />}
          {accountsReady &&
            accountData?.account?.map((account) => <LoanContainer account={account} key={account.id} />)}

          <TimeSavedContainer />

          <InterestPaidContainer />
        </div>
      </div>
    </main>
  );
}
