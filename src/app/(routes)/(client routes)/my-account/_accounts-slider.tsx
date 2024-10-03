import { setPrimaryLoanAccount } from '@/app/(actions)/laravel/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import Client from '@/lib/types/user';
import { AccountData } from '@/lib/types/yodlee';
import { sleep } from '@/lib/utils';
import clsx from 'clsx';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, EllipsisVerticalIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const RenderAccountsSlider = (props: {
  emblaRef: any;
  accountData: AccountData | undefined;
  selectedAccount: any;
  setSelectedAccount: any;
  handleGetTransactions: any;
  clientId: string;
  yodleeStatus: Client['yodlee_status'];
}) => {
  const pathname = usePathname();
  const { accountData, emblaRef, selectedAccount, setSelectedAccount, handleGetTransactions, clientId, yodleeStatus } =
    props;
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSetPrimaryLoanAccount = async (accountId: number) => {
    setIsLoading(true);
    if (yodleeStatus !== 'IMPORT_SUCCESS') {
      await sleep(1);
      toast({
        title: 'Action Not Allowed',
        description: 'Please import the accounts and transactions first.',
        variant: 'destructive',
      });
    }
    await sleep(2);
    const d = await setPrimaryLoanAccount(clientId, accountId);
    console.log(d);
    toast({
      title: 'Success',
      description: 'Primary Loan Account has been updated.',
    });
    setIsLoading(false);
  };

  return (
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
                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="shrink absolute right-0 top-3 z-10">
                      <Button variant="ghost-2">
                        <EllipsisVerticalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        disabled={isLoading}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSetPrimaryLoanAccount(id);
                        }}
                      >
                        <StarIcon className="h-4 w-4 mr-2" />
                        <span>Set as Primary Loan Account</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link
                    href={{
                      pathname,
                      query: { accountId: id },
                    }}
                    passHref
                    shallow
                    replace
                  >
                    <Card
                      key={id}
                      className={clsx(
                        'cursor-pointer min-w-[340px] snap-start select-none hover:border hover:border-accent active:scale-95 transition-transform h-full',
                        {
                          'shadow-xl border border-accent': selectedAccount?.id === id,
                        }
                      )}
                      onClick={(e) => {
                        setSelectedAccount(account);
                        handleGetTransactions({
                          accountId: account.id.toString(),
                        });
                      }}
                    >
                      <CardHeader className="flex flex-row justify-between space-x-3 items-start pr-0">
                        <CardTitle className="text-base">{accountName}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild className="shrink opacity-0">
                            <Button variant="ghost-2">
                              <EllipsisVerticalIcon />
                            </Button>
                          </DropdownMenuTrigger>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          <span className="font-light">{accountType}</span>
                        </CardDescription>
                        <p className="text-2xl">{accountNumber}</p>
                      </CardContent>
                      <CardFooter>
                        <p className="font-semibold text-primary">
                          {currentBalance?.currency} {currentBalance?.amount}
                        </p>
                      </CardFooter>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </>
    )
  );
};

export const RenderAccountsSliderPagination = (props: { emblaApi: any; selectedIndex: any }) => {
  const { emblaApi, selectedIndex } = props;

  return (
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
};
