'use client';

import { revalidateUserCookies } from '@/app/(actions)/laravel/actions';
import YodleeTransactionsTable from '@/components/custom/yodlee-transactions-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import useYodlee from '@/lib/hooks/use-yodlee';
import { Account, TransactionFilter } from '@/lib/types/yodlee';
import clsx from 'clsx';
import dayjs from 'dayjs';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ConnectBankPage() {
  const yodlee = useYodlee({
    initialize: {
      accounts: true,
    },
    fastLinkConfig: {
      fastLinkURL: 'https://fl4.sandbox.yodlee.com.au/authenticate/anzdevexsandbox/fastlink/',
      params: {
        configName: 'Aggregation',
      },
    },
    manualErrorHandling: true,
    onError: async (error) => {
      if (error.errorCode === 'Y008') {
        await revalidateUserCookies();
      }
    },
  });
  const {
    openFastLink,
    closeFastLink,
    getAccounts,
    getTransactions,
    getModuleOptions,
    yodleeTags,
    accountData,
    transactionCount,
    transactionData,
    error,
    isReady: { apiReady, accountsReady, transactionsReady },
  } = yodlee;
  const [selectedAccount, setSelectedAccount] = useState<Account>();
  const [transactionDateRange, setTransactionDateRange] = useState<[Date, Date]>([
    dayjs(new Date()).subtract(30, 'days').toDate(),
    new Date(),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'x',
    align: 'start',
    skipSnaps: true,
    containScroll: false,
  });
  const handleOpenFastLink = () => {
    if (!apiReady) return;
    openFastLink(
      {
        onSuccess: () => {
          getAccounts();
        },
      },
      'container-fastlink'
    );
  };

  const handleGetTransactions = (filter: TransactionFilter) => {
    let params = getModuleOptions()?.transactions || {};
    getTransactions({ ...params, ...filter });
  };

  useEffect(() => {
    if (emblaApi)
      emblaApi?.on('select', () => {
        setSelectedIndex(emblaApi?.selectedScrollSnap());
      });
  }, [emblaApi]);

  useEffect(() => {
    return () => {
      closeFastLink();
    };
  }, []);

  useEffect(() => {
    if (!selectedAccount && accountData?.account) {
      setSelectedAccount(accountData?.account[0]);
    }
  }, [accountData]);

  if (error?.errorCode === '0') {
    return (
      <>
        <h1 className="font-bold text-2xl my-4 mb-7">My Account</h1>
        <div className="rounded-3xl w-full bg-white py-10 px-12 overflow-hidden">
          <h3 className="text-xl opacity-[0.6] text-center">{error.errorMessage}</h3>
        </div>
      </>
    );
  }

  if (!accountsReady) {
    return (
      <>
        <h1 className="font-bold text-2xl my-4 mb-7">My Account</h1>
        <div className="rounded-3xl w-full bg-white py-10 px-12 overflow-hidden">
          <Skeleton className="w-[430px] h-[50px]" />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col space-y-5">
      {yodleeTags}
      <div className="flex items-center space-x-7 my-4 mb-7">
        <h1 className="font-bold text-2xl">My Account</h1>
        <Dialog
          onOpenChange={(isOpen) => {
            if (isOpen) {
              setTimeout(() => {
                handleOpenFastLink();
              }, 0);
            } else {
              setTimeout(() => {
                close();
              }, 500);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button disabled={!apiReady}>Connect Account</Button>
          </DialogTrigger>
          <DialogContent className={'lg:max-w-screen-md overflow-y-scroll max-h-screen bg-white'}>
            <DialogHeader>
              <DialogTitle>Connect Your Bank</DialogTitle>
            </DialogHeader>
            <div>
              <div id="container-fastlink"></div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <div className="faded rounded-3xl w-full px-[300px] py-10 overflow-hidden">
          {!accountData?.account?.length && (
            <>
              <h3 className="text-xl opacity-[0.6] text-center">No account connected.</h3>
            </>
          )}
          {accountData?.account?.length && (
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
                        className={clsx('cursor-pointer min-w-[400px] snap-start select-none', {
                          'shadow-xl': selectedAccount?.id === id,
                        })}
                        onClick={() => {
                          setSelectedAccount(account);
                          handleGetTransactions({
                            accountId: account.id.toString(),
                          });
                        }}
                      >
                        <CardHeader>
                          <CardTitle>
                            {accountName} <span className="font-light">{accountType}</span>
                          </CardTitle>
                          <CardDescription>{providerName}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl">{accountNumber}</p>
                        </CardContent>
                        <CardFooter>
                          <p className="font-semibold text-green-800">
                            {currentBalance?.currency} {currentBalance?.amount}
                          </p>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center justify-between">
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
          <div className="flex space-x-1">
            {emblaApi?.scrollSnapList().map((pos, index) => (
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
        </div>
      </div>
      <div className="flex items-start space-x-4">
        <div className="sticky top-[20px]">
          <ScrollArea className="bg-white rounded-[20px] border border-grey-2 min-w-[400px] p-5">
            <div className="max-h-[calc(_100vh_-_190px_)]">
              <div className="flex flex-col items-start gap-3 sticky top-0 bg-white z-10 p-5 full">
                <h1 className="text-[20px] font-bold">Filter Transactions By</h1>
                <Input iconLeft={<SearchIcon className="opacity-[0.4]" />} placeholder="Search" full />
              </div>
              <DateRangePicker
                onUpdate={(values) => {
                  setTransactionDateRange([values.range.from, values.range.to!]);
                  handleGetTransactions({
                    fromDate: dayjs(values.range.from).format('YYYY-MM-DD'),
                    toDate: dayjs(values.range.to).format('YYYY-MM-DD'),
                  });
                }}
                initialDateFrom={dayjs(transactionDateRange[0]).format('YYYY-MM-DD')}
                initialDateTo={dayjs(transactionDateRange[1]).format('YYYY-MM-DD')}
                align="start"
                locale="en-GB"
                showCompare={false}
              />
            </div>
          </ScrollArea>
        </div>
        <div className="w-full">
          <div className="rounded-[20px] overflow-hidden border border-grey-2">
            {selectedAccount && (
              <YodleeTransactionsTable
                initialData={transactionData?.transaction || []}
                isLoading={!transactionsReady}
                totalCount={transactionCount?.transaction?.TOTAL.count || 0}
                onPaginate={({ pageIndex, pageSize }) => {
                  handleGetTransactions({
                    accountId: selectedAccount.id.toString(),
                    top: pageSize,
                    fromDate: dayjs(transactionDateRange[0]).format('YYYY-MM-DD'),
                    toDate: dayjs(transactionDateRange[1]).format('YYYY-MM-DD'),
                    skip: pageIndex > 1 ? pageIndex : 0,
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
