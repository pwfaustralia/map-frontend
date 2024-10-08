'use client';

import { Account } from '@/lib/types/yodlee';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { formatCurrency } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import clsx from 'clsx';

export default function LoanContainer({
  account,
  primaryAccountId,
}: {
  account?: Account;
  primaryAccountId: number | undefined;
}) {
  if (!account) return <LoanContainerLoading />;

  return (
    <Card
      className={clsx(
        'relative overflow-hidden mb-3 cursor-pointer min-w-[340px] snap-start select-none hover:border hover:border-accent active:scale-95 transition-transform border-gray-300 shadow-lg shadow-gray-400',
        {
          'pl-[70px]': primaryAccountId === account.id,
        }
      )}
    >
      {primaryAccountId === account.id && (
        <div className="absolute left-0 top-0 h-16 w-16">
          <div className="absolute transform rotate-[-45deg] bg-primary text-center text-white font-semibold py-2 left-[-45px] top-[22px] w-[170px]">
            Primary
          </div>
        </div>
      )}
      <CardHeader>
        <CardTitle>{account.accountName}</CardTitle>
        <CardDescription className="text-black">{account.accountNumber}</CardDescription>
      </CardHeader>
      <CardContent>
        {account.originalLoanAmount && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-black">Starting Balance</div>
            <div className="text-2xl font-bold text-red-500">
              {formatCurrency(account.originalLoanAmount.amount, account.originalLoanAmount.currency)}
            </div>
          </div>
        )}
      </CardContent>
      <CardContent>
        {account.balance && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-black">Current Balance</div>
            <div className="text-2xl font-bold text-green-500">
              {formatCurrency(account.balance.amount, account.balance.currency)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function LoanContainerLoading() {
  return (
    <Card className="mb-3 border-gray-300 shadow-lg shadow-gray-400">
      <CardHeader>
        <Skeleton className="w-full h-[40px]" />
        <Skeleton className="w-72 h-[25px]" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm text-black">Starting Balance</div>
          <div className="text-2xl font-bold text-red-500">
            <Skeleton className="w-52 h-[40px]" />
          </div>
        </div>
      </CardContent>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm text-black">Current Balance</div>
          <div className="text-2xl font-bold text-green-500">
            <Skeleton className="w-52 h-[40px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
