'use client';

import MyAccountDropDown from '@/components/custom/my-account-dropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import SearchClient from './_search-client';

export default function TopbarInternalDefault() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white min-h-[80px] flex align-center px-[37px] py-[26px] justify-between">
      <Button onClick={() => setIsOpen(true)} variant="ghost-2">
        <Input className="cursor-pointer pointer-events-none" placeholder="Search a client here" />
      </Button>
      <SearchClient open={isOpen} onClose={() => setIsOpen(false)} />

      <MyAccountDropDown />
    </div>
  );
}
