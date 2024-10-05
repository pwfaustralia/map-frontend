'use client';

import { LARAVEL_API_ROUTES } from '@/app/(actions)/laravel/laravel-api-routes';
import Client from '@/lib/types/user';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function LoanBalancePage({ searchParams }: { searchParams: any }) {
  const { 'client-id': clientId } = useParams();
  const { data: primaryAccountData } = useSWR<Client['primary_account']>(
    LARAVEL_API_ROUTES.getPrimaryLoanAccount(clientId + '')
  );
  const { data: normalLoanBalance } = useSWR(
    !primaryAccountData ? null : LARAVEL_API_ROUTES.listLoanBalances('normal', primaryAccountData.account_id, 'year')
  );
  const { data: offsetLoanBalance } = useSWR(
    !primaryAccountData ? null : LARAVEL_API_ROUTES.listLoanBalances('offset', primaryAccountData.account_id, 'year')
  );

  return <div></div>;
}
