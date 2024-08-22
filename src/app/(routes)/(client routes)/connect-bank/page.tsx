'use client';

import { getYodleeAccessToken } from '@/app/(actions)/(utils)/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useYodlee from '@/lib/hooks/use-yodlee';
import { useEffect } from 'react';

export default function ConnectBankPage() {
  const { yodleeTags, open, setToken, close } = useYodlee({
    fastLinkURL: 'https://fl4.sandbox.yodlee.com.au/authenticate/anzdevexsandbox/fastlink/',
    params: {
      configName: 'Aggregation',
    },
  });
  const handleOpenFastLink = () => {
    open(
      {
        onError: (data) => {
          console.log('err', data);
        },
        onClose: (data) => {
          //   {
          //     "action": "exit",
          //     "fnToCall": "accountStatus",
          //     "sites": [
          //         {
          //             "providerId": 18769,
          //             "providerName": "Dag Site Captcha",
          //             "requestId": "SRFteCWPZ6gcOYmtnaa8uoyGVpM=",
          //             "status": "SUCCESS",
          //             "additionalStatus": "AVAILABLE_DATA_RETRIEVED",
          //             "providerAccountId": 11078612
          //         }
          //     ]
          // }
          console.log('close', data);
        },
        onEvent: (data) => {
          // {
          //     "fnToCall": "renewClientSession"
          // }
          console.log('event', data);
        },
        onSuccess: (data) => {
          //   {
          //     "providerId": 18769,
          //     "providerName": "Dag Site Captcha",
          //     "requestId": "SRFteCWPZ6gcOYmtnaa8uoyGVpM=",
          //     "status": "SUCCESS",
          //     "additionalStatus": "ACCT_SUMMARY_RECEIVED",
          //     "providerAccountId": 11078612,
          //     "fnToCall": "accountStatus"
          // }
          console.log('succ', data);
        },
      },
      'container-fastlink'
    );
  };
  useEffect(() => {
    (async () => {
      let yodleeTokens = await getYodleeAccessToken();
      if (yodleeTokens.length) {
        setToken(yodleeTokens[0].accessToken);
      }
    })();
    return () => {
      close();
    };
  }, []);
  return (
    <>
      {yodleeTags}
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
          <Button>Connect Now</Button>
        </DialogTrigger>
        <DialogContent className={'lg:max-w-screen-md overflow-y-scroll max-h-screen bg-white'}>
          <DialogHeader>
            <DialogTitle>Connect Your Bank</DialogTitle>
          </DialogHeader>
          <div>
            <div id="container-fastlink"></div>
          </div>
          <DialogFooter>
            {/* <DialogClose>
              <Button type="submit">Close</Button>
            </DialogClose> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
