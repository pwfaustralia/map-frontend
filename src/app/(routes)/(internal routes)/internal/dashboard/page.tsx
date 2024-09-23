'use client';

import { useSession } from 'next-auth/react';
import WelcomeContainer from '@/components/admin-dashboard/welcome-container';
import LoanContainer from '@/components/admin-dashboard/loan-container';
import Graph from '@/components/admin-dashboard/graph';
import TimeSavedContainer from '@/components/admin-dashboard/time-saved-container';
import InterestPaidContainer from '@/components/admin-dashboard/interest-paid-container';

export default function Internal_DashboardPage() {
  const session = useSession();
  return (
    <>
      <main className=" mx-auto flex-1 px-4 py-8 sm:px-6 md:py-6">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          <div className="col-span-2">
            <WelcomeContainer />
            <div className="col-span-1 text-3xl font-semibold my-8">Client Overview</div>
            <Graph />
          </div>
          <div>
            <div className="col-span-1 text-3xl font-semibold mb-3">Client Loans</div>
            <LoanContainer />

            <LoanContainer />

            <LoanContainer />

            <TimeSavedContainer />

            <InterestPaidContainer />
          </div>
        </div>
      </main>
    </>
  );
}
