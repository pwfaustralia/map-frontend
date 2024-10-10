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
import { formatCurrency, sleep } from '@/lib/utils';
import clsx from 'clsx';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, EllipsisVerticalIcon, Loader2, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const RenderAccountsSlider = (props: {
  emblaRef: any;
  accountData: AccountData | undefined;
  selectedAccount: any;
  setSelectedAccount: any;
  handleGetTransactions: any;
  clientData: Client | undefined;
  hideMenu?: boolean;
}) => {
  const pathname = usePathname();
  const {
    accountData,
    emblaRef,
    selectedAccount,
    setSelectedAccount,
    handleGetTransactions,
    clientData,
    hideMenu = true,
  } = props;
  const { id: clientId, yodlee_status: yodleeStatus, primary_account } = clientData || {};
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [primaryAccountId, setPrimaryAccountId] = useState(primary_account?.account_id);

  const handleSetPrimaryLoanAccount = async (accountId: number) => {
    if (!clientId) return;
    setIsLoading(true);
    if (yodleeStatus !== 'IMPORT_SUCCESS') {
      await sleep(1);
      toast({
        title: 'Action Not Allowed',
        description: 'Please import the accounts and transactions first.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }
    const request = await setPrimaryLoanAccount(clientId, accountId);
    if (request.success) {
      toast({
        title: 'Success',
        description: request.message,
      });
      setPrimaryAccountId(accountId);
    } else {
      toast({
        title: 'Failed',
        description: request.message,
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  return (
    accountData?.account?.length && (
      <>
        <div ref={emblaRef}>
          <div className="flex space-x-6 ">
            {accountData.account.map((account) => {
              const { id, accountName, accountNumber, originalLoanAmount, accountType, currentBalance, balance } =
                account;
              return (
                <div className="relative" key={id}>
                  {!hideMenu && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="shrink absolute right-0 top-3 z-10">
                        <Button variant="ghost-2">
                          <EllipsisVerticalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          disabled={isLoading}
                          onClick={(e) => {
                            e.preventDefault();
                            handleSetPrimaryLoanAccount(id);
                          }}
                        >
                          {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <StarIcon className="h-4 w-4 mr-2" />
                          )}
                          <span>Set as Primary Loan Account</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
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
                      className={clsx(
                        'relative overflow-hidden cursor-pointer min-w-[340px] snap-start select-none hover:border active:scale-95 transition-transform h-full bg-accent border-gray-30 pb-24',
                        {
                          'text-white': selectedAccount?.id !== id,
                          'bg-grey-3 text-gray-600': selectedAccount?.id === id,
                          'pl-[70px]': primaryAccountId === id,
                        }
                      )}
                      onClick={(e) => {
                        setSelectedAccount(account);
                        handleGetTransactions({
                          accountId: account.id.toString(),
                        });
                      }}
                    >
                      {primaryAccountId === id && (
                        <div className="absolute left-0 top-0 h-16 w-16">
                          <div className="absolute transform rotate-[-45deg] bg-primary text-center text-white font-semibold py-2 left-[-45px] top-[22px] w-[170px]">
                            Primary
                          </div>
                        </div>
                      )}
                      <CardHeader className="flex flex-row justify-between space-x-3 items-start pr-0 ">
                        {/* <div className="w-[70px] block h-full" /> */}
                        <CardTitle className="text-lg font-bold">
                          {accountName}
                          <p className="font-light text-xs">{accountType}</p>
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild className="shrink opacity-0">
                            <Button variant="ghost-2">
                              <EllipsisVerticalIcon />
                            </Button>
                          </DropdownMenuTrigger>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{accountNumber}</p>
                      </CardContent>
                      <CardFooter>
                        <div>
                          {originalLoanAmount && (
                            <p className="font-semibold">
                              Loan Amount:&nbsp;
                              {formatCurrency(originalLoanAmount.amount, originalLoanAmount.currency)}
                            </p>
                          )}
                          {!currentBalance && balance && (
                            <p className="font-semibold">
                              Balance:&nbsp;
                              {formatCurrency(balance.amount, balance.currency)}
                            </p>
                          )}
                          {currentBalance && (
                            <p className="font-semibold">
                              Current Balance:&nbsp;
                              {formatCurrency(currentBalance.amount, currentBalance.currency)}
                            </p>
                          )}
                        </div>
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
