'use client';

import MyAccountDropDown from '@/components/custom/my-account-dropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TopbarDefault() {
  return (
    <div className="bg-white min-h-[80px] flex align-center px-[37px] py-[26px] justify-between">
      <Button onClick={() => {}} variant="ghost-2">
        <Input className="cursor-pointer pointer-events-none" placeholder="Search transactions, account, etc." />
      </Button>

      <MyAccountDropDown />
    </div>
  );
}
