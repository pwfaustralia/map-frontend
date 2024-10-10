'use client';

import { LARAVEL_API_ROUTES } from '@/app/(actions)/laravel/laravel-api-routes';
import {
  RenderAccountsSlider,
  RenderAccountsSliderPagination,
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
import Client from '@/lib/types/user';
import { Account, TransactionFilter } from '@/lib/types/yodlee';
import { formatDate } from '@/lib/utils';
import dayjs from 'dayjs';
import useEmblaCarousel from 'embla-carousel-react';
import { EditIcon, SearchIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import EditClientPage from './_edit/_page';
import TransactionImportStatus from './_transactions-import-status';
import { useClientStore } from '@/store/client-store';

function Header({
  clientData,
  setIsEditing,
}: {
  clientData: Client;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3 my-4">
        <h1 className="font-bold text-2xl">
          {clientData.first_name} {clientData.last_name}
        </h1>
        {clientData.yodlee_username && <h2>({clientData.yodlee_username})</h2>}
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
        <TransactionImportStatus clientData={clientData} />
      </div>
    </div>
  );
}

export default function ViewClientPage({ searchParams }: { searchParams: any }) {
  const { isEditingProfile, toggleEditingProfile } = useClientStore();
  const [isOpenDatePicker, setIsOpenDatePicker] = useState({ fromDate: false, toDate: false });
  const { 'client-id': clientId } = useParams();
  const { data: clientData, mutate: mutateClient } = useSWR<Client>(
    LARAVEL_API_ROUTES.getClientDetailsFn(clientId + '')
  );
  const [isEditing, setIsEditing] = useState(isEditingProfile);
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
        accountId: searchParams.accountId || '',
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
    initEntities,
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
  const [selectedAccount, setSelectedAccount] = useState<Account | { accountName?: any; id?: any }>({
    id: searchParams.accountId,
  });

  const tableFilter = useTableFilter(transactionTableFilter(yodlee, { isOpenDatePicker, setIsOpenDatePicker }));
  const { resetFilters, searchFilter, getActiveFilters, getFilter } = tableFilter;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'x',
    align: 'start',
    skipSnaps: true,
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
    if (clientData) {
      setYodleeUsername(clientData.yodlee_username || 'na');
    }
  }, [clientData]);

  useEffect(() => {
    if (!selectedAccount?.accountName && accountData?.account) {
      let selected = accountData?.account.find((q) => q.id == selectedAccount?.id) || accountData.account[0];
      setSelectedAccount(selected);
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

  useEffect(() => {
    let index = accountData?.account?.findIndex((q) => q.id === selectedAccount?.id);
    if (index) emblaApi?.scrollTo(index);
  }, [selectedAccount, emblaApi]);

  useEffect(() => {
    toggleEditingProfile(isEditing);
  }, [isEditing]);

  useEffect(() => {
    return () => {
      closeFastLink();
    };
  }, []);

  if (!clientData) {
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
        {...{ clientData, setClient: mutateClient, isEditing, setIsEditing }}
        onEdit={async (data) => {
          await authenticate(true, data.yodlee_username);
        }}
      />
    );
  }

  if (error?.errorCode === '0') {
    return (
      <>
        <Header {...{ isEditing, setIsEditing, clientData, mutateClient }} />
        <div className="rounded-3xl w-full bg-white py-10 px-12 overflow-hidden">
          <h3 className="text-xl opacity-[0.6] text-center">{error?.errorMessage}</h3>
        </div>
      </>
    );
  }

  if (!accountsReady) {
    return (
      <>
        <Header {...{ isEditing, setIsEditing, clientData, mutateClient }} />

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
      <Header {...{ isEditing, setIsEditing, clientData }} />
      <div className="flex items-start lg:space-x-4">
        <div className="sticky top-[20px] lg:block hidden">
          <ScrollArea className="bg-white rounded-[20px] border border-grey-2 min-w-[320px] max-w-[320px]">
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
              <div className="p-[25px] pt-0 flex gap-4 flex-col">{renderTransactionTableFilter(tableFilter)}</div>
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

        <div style={{ width: 'calc( 100% - 320px )' }}>
          <div className="!mb-[-100px] space-y-4">
            <div className="flex items-center justify-end space-x-4">
              <RenderAccountsSliderPagination {...{ emblaApi, selectedIndex }} />
            </div>
            <div className="rounded-3xl w-full overflow-hidden">
              {!accountData?.account?.length && (
                <>
                  <h3 className="text-xl opacity-[0.6] text-center">No account connected.</h3>
                </>
              )}
              <RenderAccountsSlider
                {...{
                  emblaRef,
                  accountData,
                  selectedAccount,
                  setSelectedAccount,
                  handleGetTransactions,
                  clientData,
                  hideMenu: false,
                }}
              />
            </div>
          </div>
          <div className="rounded-[20px] overflow-hidden border border-grey-2 z-[2] relative">
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
