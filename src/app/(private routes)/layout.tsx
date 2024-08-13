'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DashboardIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { Loader2, Users } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const navRoutes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    name: 'My Clients',
    path: '/clients',
    icon: <Users />,
  },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const [isSigningOut, setIsSigningOut] = useState(false);

  return (
    <div className="flex items-stretch">
      <div className="flex flex-col items-center flex-[1_1_250px] min-w-[250px] bg-primary pt-6">
        <div className="mb-7">
          <img src="/images/cc-logo.png" alt="Credit Connection" className="lg:w-[194px] max-w-[194px]" />
        </div>
        <div className="w-full px-[14px] flex gap-1 flex-col">
          {navRoutes.map((route) => (
            <Button
              key={route.name}
              variant="ghost"
              className={clsx('text-white w-full justify-start gap-1', {
                'bg-white text-primary hover:bg-white hover:text-primary': currentPath === route.path,
                'hover:bg-transparent hover:text-white hover:opacity-[0.7]': currentPath !== route.path,
              })}
              onClick={() => setCurrentPath(route.path)}
              asChild
            >
              <Link href={route.path}>
                <Users /> {route.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full h-screen overflow-auto">
        <div className="bg-white min-h-[80px] flex align-center px-[37px] py-[26px] justify-between">
          <Input placeholder="Search a client here" />
          <Button
            onClick={() => {
              signOut();
              setIsSigningOut(true);
            }}
            disabled={isSigningOut}
          >
            {isSigningOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign out
          </Button>
        </div>
        <div className=" py-[25px] px-[36px]">{children}</div>
      </div>
    </div>
  );
}
