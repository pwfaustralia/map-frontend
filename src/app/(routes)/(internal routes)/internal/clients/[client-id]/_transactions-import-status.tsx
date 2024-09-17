import { fetchLaravel } from '@/app/(actions)/fetcher/actions';
import { getYodleeStatus, importAccountTransactions } from '@/app/(actions)/laravel/actions';
import { LARAVEL_API_ROUTES } from '@/app/(actions)/laravel/laravel-api-routes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Client from '@/lib/types/user';
import dayjs from 'dayjs';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';

interface TransactionStatusProps {
  client: Client;
}

const ImportTransactionsSection = ({
  clientId,
  yodleeUsername,
  status,
}: {
  clientId: string;
  yodleeUsername: string;
  status: string;
}) => {
  const { data, trigger, isMutating } = useSWRMutation(
    LARAVEL_API_ROUTES.importAccountTransactions,
    async () => await importAccountTransactions(yodleeUsername, clientId)
  );
  const { toast } = useToast();

  useEffect(() => {
    if (data?.success === true) {
      toast({
        title: 'Import In Progress',
        description: `We're importing ${data?.details?.totalTransactions} transactions, ${data?.details?.totalAccounts} accounts in the background.`,
      });
    } else if (data?.success === false) {
      toast({
        title: 'Import Failed',
        description: data.message,
        variant: 'destructive'
      });
    }
  }, [data]);

  if (data?.success === true || status === 'IMPORTING') {
    return <Badge>Import In Progress</Badge>;
  } else if (status === 'IMPORT_FAILED') {
    return (
      <div className="flex items-center space-x-1">
        <Badge variant="destructive">Import Failed</Badge>
        <Button disabled={isMutating} onClick={() => trigger()} variant="ghost-2">
          {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button disabled={isMutating} onClick={() => trigger()}>
        {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Import Transactions
      </Button>
    </>
  );
};

export default function TransactionImportStatus(props: TransactionStatusProps) {
  const { client } = props;

  if (client.yodlee_status === 'IMPORT_SUCCESS') {
    return (
      <div className="space-x-3">
        <Badge>{client.accounts_count} Accounts</Badge>
        <Badge>{client.transactions_count} Transactions</Badge>
      </div>
    );
  }

  return (
    <ImportTransactionsSection
      clientId={client.id}
      yodleeUsername={client.yodlee_username}
      status={client.yodlee_status}
    />
  );
}
