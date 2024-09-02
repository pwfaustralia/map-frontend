import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AccountData } from '@/lib/types/yodlee';
import clsx from 'clsx';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react';

export const renderAccountsSlider = (
  emblaRef: any,
  accountData: AccountData | undefined,
  { selectedAccount, setSelectedAccount }: any,
  handleGetTransactions: any
) =>
  accountData?.account?.length && (
    <>
      <div ref={emblaRef}>
        <div className="flex space-x-6">
          {accountData.account.map((account) => {
            const {
              id,
              accountName,
              accountNumber,
              accountStatus,
              accountType,
              providerName,
              balance,
              amountDue,
              availableBalance,
              currentBalance,
            } = account;
            return (
              <Card
                key={id}
                className={clsx(
                  'cursor-pointer min-w-[340px] snap-start select-none hover:border hover:border-accent',
                  {
                    'shadow-xl border border-accent': selectedAccount?.id === id,
                  }
                )}
                onClick={() => {
                  setSelectedAccount(account);
                  handleGetTransactions({
                    accountId: account.id.toString(),
                  });
                }}
              >
                <CardHeader>
                  <CardTitle>{accountName}</CardTitle>
                  <CardDescription>
                    <span className="font-light">{accountType}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl">{accountNumber}</p>
                </CardContent>
                <CardFooter>
                  <p className="font-semibold text-primary">
                    {currentBalance?.currency} {currentBalance?.amount}
                  </p>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );

export const renderAccountsSliderPagination = (emblaApi: any, selectedIndex: any) => (
  <>
    <div className="flex space-x-1">
      {emblaApi?.scrollSnapList().map((pos: any, index: any) => (
        <div
          className={clsx('rounded-[50%] w-2 h-2 bg-grey-2 cursor-pointer hover:bg-primary', {
            'bg-primary': selectedIndex === index,
          })}
          onClick={() => {
            emblaApi?.scrollTo(index, false);
          }}
          key={pos}
        ></div>
      ))}
    </div>
    <div className="flex items-center space-x-2">
      <Button
        onClick={() => {
          emblaApi?.scrollPrev();
        }}
        variant="ghost-2"
        className="p-0"
      >
        <ArrowLeftCircleIcon className="[&>*]:stroke-primary w-8 h-8" />
      </Button>
      <Button
        onClick={() => {
          emblaApi?.scrollNext();
        }}
        variant="ghost-2"
        className="p-0"
      >
        <ArrowRightCircleIcon className="[&>*]:stroke-primary w-8 h-8" />
      </Button>
    </div>
  </>
);
