import { Button } from '@/components/ui/button';
import Client from '@/lib/types/user';

interface TransactionStatusProps {
  client: Client;
}

const ImportTransactionsSection = () => {
  return (
    <>
      <Button>Import Transactions</Button>
    </>
  );
};

export default function TransactionStatus(props: TransactionStatusProps) {
  const { client } = props;

  if (client.accounts_count === 0) return <ImportTransactionsSection />;

  return <div>{client.accounts_count}</div>;
}
