'use client';

import WelcomeContainer from '@/components/dashboard/welcome-container';
import LoanContainer from '@/components/dashboard/loan-container';
import TimeSavedContainer from '@/components/dashboard/time-saved-container';
import InterestPaidContainer from '@/components/dashboard/interest-paid-container';
import Graph from '@/components/dashboard/graph';

export default function DashboardPage() {
  return (
    <main className="mx-auto flex-1 py-3">
      <div className="grid gap-x-8 gap-y-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
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
