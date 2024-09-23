'use client';

import WelcomeContainer from '@/components/client-dashboard/welcome-container';
import LoanContainer from '@/components/client-dashboard/loan-container';
import TimeSavedContainer from '@/components/client-dashboard/time-saved-container';
import InterestPaidContainer from '@/components/client-dashboard/interest-paid-container';
import Graph from '@/components/client-dashboard/graph';

export default function DashboardPage() {
  return (
    <main className=" mx-auto flex-1 px-4 py-8 sm:px-6 md:py-6">
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-2">
          <WelcomeContainer />
          <div className="col-span-1 text-3xl font-semibold my-8">Overview</div>
          <Graph />
        </div>
        <div>
          <div className="col-span-1 text-3xl font-semibold mb-3">Your Loans</div>
          <LoanContainer />

          <LoanContainer />

          <LoanContainer />

          <TimeSavedContainer />

          <InterestPaidContainer />
        </div>
      </div>
    </main>
  );
}
