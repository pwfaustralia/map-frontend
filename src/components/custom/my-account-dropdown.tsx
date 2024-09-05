'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreditCardIcon, Loader2, SettingsIcon, UserIcon, UsersIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export default function MyAccountDropDown() {
  const { data } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex space-x-3 items-center cursor-pointer hover:opacity-100 opacity-70 rounded-lg">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="uppercase font-bold">
              {data?.user?.name?.[0]}
              {data?.user?.name?.[1]}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-lg">{data?.user?.name}</h2>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[230px]" align="end">
        <DropdownMenuLabel className="text-md">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer text-md">
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-md">
            <UsersIcon className="mr-2 h-4 w-4" />
            Users
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-md">
            <CreditCardIcon className="mr-2 h-4 w-4" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-md">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-md"
            onClick={(e) => {
              e.preventDefault();
              signOut();
              setIsSigningOut(true);
            }}
            disabled={isSigningOut}
          >
            {isSigningOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
