'use client';

import { getClientDetails } from '@/app/(actions)/laravel/actions';
import {
  renderAccountsSlider,
  renderAccountsSliderPagination,
} from '@/app/(routes)/(client routes)/my-account/_accounts-slider';
import {
  renderTransactionTableFilter,
  transactionTableFilter,
  YODLEE_DATE_FORMAT,
  YODLEE_TABLE_PAGESIZE,
} from '@/app/(routes)/(client routes)/my-account/_transaction-table-filter';
import YodleeTransactionsTable from '@/components/custom/yodlee-transactions-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import useTableFilter from '@/lib/hooks/table-filter-hook';
import useYodlee from '@/lib/hooks/use-yodlee';
import Client, { IUser } from '@/lib/types/user';
import { Account, TransactionFilter } from '@/lib/types/yodlee';
import { formatDate } from '@/lib/utils';
import dayjs from 'dayjs';
import useEmblaCarousel from 'embla-carousel-react';
import { EditIcon, SearchIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import EditClientPage from './_edit/_page';
import TransactionStatus from './_transactions-status';

function Header({
  client,
  setIsEditing,
}: {
  client: Client;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3 my-4">
        <h1 className="font-bold text-2xl">
          {client.first_name} {client.last_name}
        </h1>
        {client.yodlee_username && <h2>({client.yodlee_username})</h2>}
        <Button
          variant="ghost-2"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          <EditIcon />
        </Button>
      </div>

      <div>
        <TransactionStatus client={client} />
      </div>
    </div>
  );
}

export default function ViewClientPage() {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState({ fromDate: false, toDate: false });
  const { 'client-id': clientId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [client, setClient] = useState<Client>();
  const tableRef = useRef<any>();

  const yodlee = useYodlee({
    initialModuleConfig: {
      accounts: true,
      categories: true,
      transactions: {
        keyword: '',
        baseType: '',
        container: '',
        categoryId: '',
        top: YODLEE_TABLE_PAGESIZE,
        skip: 0,
        fromDate: formatDate(dayjs(new Date()).subtract(1, 'year'), YODLEE_DATE_FORMAT),
        toDate: formatDate(dayjs(new Date()), YODLEE_DATE_FORMAT),
      },
    },
    fastLinkConfig: {
      fastLinkURL: process.env.NEXT_PUBLIC_FASTLINK_URL!,
      params: {
        configName: process.env.NEXT_PUBLIC_FASTLINK_CONFIG_NAME,
      },
    },
    clientId: clientId + '',
    manualErrorHandling: true,
    onError: async (error) => {
      if (error?.errorCode === 'Y008') {
        await authenticate(true);
      }
    },
  });
  const {
    closeFastLink,
    getTransactions,
    getModuleConfig,
    initModules,
    authenticate,
    setUsername: setYodleeUsername,
    initialModuleConfig,
    yodleeTags,
    accountData,
    transactionCount,
    transactionData,
    categoryData,
    error,
    isReady: { accountsReady, transactionsReady, categoriesReady },
  } = yodlee;
  const [selectedAccount, setSelectedAccount] = useState<Account>();

  const tableFilter = useTableFilter(transactionTableFilter(yodlee, { isOpenDatePicker, setIsOpenDatePicker }));
  const { resetFilters, searchFilter, getActiveFilters, getFilter } = tableFilter;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'x',
    align: 'start',
    skipSnaps: true,
    containScroll: false,
  });

  const handleGetTransactions = (filter: TransactionFilter) => {
    let params = getModuleConfig()?.transactions || {};
    getTransactions({ ...params, ...filter }, selectedAccount?.id.toString());
  };

  const handleFilterTransactions = () => {
    const filter = initialModuleConfig?.transactions || {};
    filter.fromDate = formatDate(dayjs(filter?.fromDate), YODLEE_DATE_FORMAT);
    filter.toDate = formatDate(dayjs(filter?.toDate), YODLEE_DATE_FORMAT);
    filter.skip = 0;
    tableRef.current?.setPagination?.({
      pageIndex: 1,
      pageSize: YODLEE_TABLE_PAGESIZE,
    });
    handleGetTransactions({
      ...filter,
      ...getActiveFilters().reduce((ac, c) => ({ ...ac, [c.id]: c.formattedValue }), {}),
    });
  };

  const handleResetFilters = () => {
    resetFilters();
    const filter = initialModuleConfig?.transactions || {};
    filter.fromDate = formatDate(dayjs(filter?.fromDate), YODLEE_DATE_FORMAT);
    filter.toDate = formatDate(dayjs(filter?.toDate), YODLEE_DATE_FORMAT);
    handleGetTransactions(filter);
  };

  useEffect(() => {
    if (emblaApi)
      emblaApi?.on('select', () => {
        setSelectedIndex(emblaApi?.selectedScrollSnap());
      });
  }, [emblaApi]);

  useEffect(() => {
    getClientDetails(clientId + '').then((clientData) => {
      setClient(clientData);
      setYodleeUsername(clientData.yodlee_username || 'na');
    });
    return () => {
      closeFastLink();
    };
  }, []);

  useEffect(() => {
    if (!selectedAccount && accountData?.account) {
      setSelectedAccount(accountData?.account[0]);
    }
  }, [accountData]);

  useEffect(() => {
    if (categoriesReady) {
      getFilter('categoryId').setOptions(
        categoryData?.transactionCategory?.map((category: any) => ({
          value: category.id,
          label: category.category,
        })) || []
      );
    }
  }, [categoriesReady]);

  if (!client) {
    return (
      <>
        <h1 className="font-bold text-2xl my-4 mb-7">
          <Skeleton className="w-[330px] h-[30px]" />
        </h1>
        <div className="rounded-3xl w-full bg-white py-10 px-12 overflow-hidden flex space-x-5">
          <Skeleton className="w-[230px] h-[230px]" />
          <Skeleton className="w-[230px] h-[230px]" />
          <Skeleton className="w-[230px] h-[230px]" />
        </div>
      </>
    );
  }

  if (isEditing) {
    return (
      <EditClientPage
        {...{ client, setClient, isEditing, setIsEditing }}
        onEdit={async (data) => {
          await authenticate(true, data.yodlee_username);
        }}
      />
    );
  }

  if (error?.errorCode === '0') {
    return (
      <>
        <Header {...{ isEditing, setIsEditing, client }} />
        <div className="rounded-3xl w-full bg-white py-10 px-12 overflow-hidden">
          <h3 className="text-xl opacity-[0.6] text-center">{error?.errorMessage}</h3>
        </div>
      </>
    );
  }

  if (!accountsReady) {
    return (
      <>
        <Header {...{ isEditing, setIsEditing, client }} />

        <div className="rounded-3xl w-full bg-white py-10 px-12 overflow-hidden flex space-x-5">
          <Skeleton className="w-[230px] h-[230px]" />
          <Skeleton className="w-[230px] h-[230px]" />
          <Skeleton className="w-[230px] h-[230px]" />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col space-y-5">
      {yodleeTags}
      <Header {...{ isEditing, setIsEditing, client }} />
      <div>
        <div className="faded rounded-3xl w-full lg:px-[300px] px-0 py-10 overflow-hidden">
          {!accountData?.account?.length && (
            <>
              <h3 className="text-xl opacity-[0.6] text-center">No account connected.</h3>
            </>
          )}
          {renderAccountsSlider(emblaRef, accountData, { selectedAccount, setSelectedAccount }, handleGetTransactions)}
        </div>
        <div className="flex items-center justify-end space-x-4">
          {renderAccountsSliderPagination(emblaApi, selectedIndex)}
        </div>
      </div>
      <div className="flex items-start lg:space-x-4">
        <div className="sticky top-[20px] lg:block hidden">
          <ScrollArea className="bg-white rounded-[20px] border border-grey-2 min-w-[400px] max-w-[400px] p-5">
            <div className="max-h-[calc(_100vh_-_190px_)]">
              <div className="flex flex-col items-start gap-3 sticky top-0 bg-white z-10 p-5 full">
                <h1 className="text-[20px] font-bold">Filter Transactions By</h1>
                <Input
                  iconLeft={<SearchIcon className="opacity-[0.4]" />}
                  placeholder="Search"
                  full
                  onChange={(e) => {
                    searchFilter(e.target.value);
                  }}
                />
              </div>
              <div className="p-[25px] flex gap-4 flex-col">{renderTransactionTableFilter(tableFilter)}</div>
              <div className="flex items-center gap-3 sticky bottom-0 bg-white z-10 shadow-[0_-5px_4px_rgba(0,0,0,0.05)] p-5">
                <Button className="w-full" onClick={handleFilterTransactions} disabled={!getActiveFilters().length}>
                  Apply Filter
                </Button>
                <Button variant="outline" className="w-full" onClick={handleResetFilters}>
                  Reset
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>

        <div className="w-full">
          <div className="rounded-[20px] overflow-hidden border border-grey-2">
            {selectedAccount && (
              <YodleeTransactionsTable
                tableRef={tableRef}
                initialData={transactionData?.transaction || []}
                isLoading={!transactionsReady}
                totalCount={transactionCount?.transaction?.TOTAL.count || 0}
                onPaginate={({ pageIndex, pageSize }) => {
                  handleGetTransactions({
                    top: pageSize,
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