'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import useYodlee from '@/lib/hooks/use-yodlee';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ConnectBankPage() {
  const {
    yodleeTags,
    accountData,
    open,
    close,
    getAccounts,
    isReady: { apiReady, accountsReady },
  } = useYodlee({
    fastLinkURL: 'https://fl4.sandbox.yodlee.com.au/authenticate/anzdevexsandbox/fastlink/',
    params: {
      configName: 'Aggregation',
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'x',
    align: 'start',
    skipSnaps: true,
    containScroll: false,
  });
  const handleOpenFastLink = () => {
    if (!apiReady) return;
    open(
      {
        onError: (data) => {
          console.log('err', data);
        },
        onClose: (data) => {
          console.log('close', data);
        },
        onEvent: (data) => {
          console.log('event', data);
        },
        onSuccess: () => {
          getAccounts();
        },
      },
      'container-fastlink'
    );
  };

  useEffect(() => {
    if (emblaApi)
      emblaApi?.on('select', () => {
        setSelectedIndex(emblaApi?.selectedScrollSnap());
      });
  }, [emblaApi]);

  useEffect(() => {
    return () => {
      close();
    };
  }, []);

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
    <>
      {yodleeTags}
      <div className="space-y-3 my-4 mb-7">
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
      <div className="rounded-3xl w-full bg-white py-10 px-12 overflow-hidden">
        {!accountData?.account?.length && (
          <>
            <h3 className="text-xl opacity-[0.6] text-center">No account connected.</h3>
          </>
        )}
        {accountData?.account?.length && (
          <>
            <div ref={emblaRef}>
              <div className="flex space-x-6">
                {accountData.account.map(
                  ({
                    id,
                    accountName,
                    accountNumber,
                    accountStatus,
                    accountType,
                    providerName,
                    balance,
                    amountDue,
                    availableBalance,
                  }) => (
                    <Card key={id} className="min-w-[400px] snap-start select-none">
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
                        <p className="font-semibold text-green-800">{accountStatus}</p>
                      </CardFooter>
                    </Card>
                  )
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-5">
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
          </>
        )}
      </div>
    </>
  );
}
