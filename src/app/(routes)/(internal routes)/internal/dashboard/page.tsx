'use client';

import Summary_Graph from '@/components/budgeting/Graph';
import Expenses_Summary from '@/components/budgeting/Summary';
import Graph from '@/components/dashboard/graph';
import InterestPaidContainer from '@/components/dashboard/interest-paid-container';
import LoanContainer from '@/components/dashboard/loan-container';
import TimeSavedContainer from '@/components/dashboard/time-saved-container';
import WelcomeContainer from '@/components/dashboard/welcome-container';
import { useSession } from 'next-auth/react';

export default function Internal_DashboardPage() {
  const session = useSession();
  return (
    <>
      <main className="mx-auto flex-1 px-4 py-8 sm:px-6 md:py-6">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          <div className="col-span-2">
            <WelcomeContainer />
            <div className="col-span-1 text-3xl font-semibold my-10">Client Overview</div>
            <Graph />
          </div>
          <div className="mb-3">
            <div className="col-span-1 text-3xl font-semibold mb-6">Client Loans</div>
            <LoanContainer primaryAccountId={session.data?.user.clients?.[0]?.primary_account?.account_id} />

            <LoanContainer primaryAccountId={session.data?.user.clients?.[0]?.primary_account?.account_id} />

            <LoanContainer primaryAccountId={session.data?.user.clients?.[0]?.primary_account?.account_id} />

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
