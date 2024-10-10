'use client';

import MyAccountDropDown from '@/components/custom/my-account-dropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import SearchClient from './_search-client';
import { useLayoutStore } from '@/store/layout-store';

export default function TopbarInternalDefault() {
  const { toggleMenu } = useLayoutStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative pl-14 bg-white min-h-[80px] flex align-center px-[37px] py-[26px] justify-between">
      <Button className="absolute left-0" variant="ghost-2" onClick={() => toggleMenu()}>
        <MenuIcon className="w-5 h-5" />
      </Button>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        variant="ghost-2"
      >
        <Input className="cursor-pointer pointer-events-none" placeholder="Search a client here" />
      </Button>
      <SearchClient open={isOpen} onClose={() => setIsOpen(false)} />

      <MyAccountDropDown />
    </div>
  );
}
