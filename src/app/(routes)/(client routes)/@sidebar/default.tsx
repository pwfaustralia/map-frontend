'use client';

import { Button } from '@/components/ui/button';
import { CLIENT_ROUTES } from '@/lib/routes';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SidebarDefault() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  return (
    <div className="lg:flex hidden flex-col items-center flex-[1_1_250px] min-w-[250px] bg-primary pt-6">
      <div className="mb-7 text-center">
        <img src="/images/cc-logo.png" alt="Credit Connection" className="lg:w-[194px] max-w-[194px] m-[0_auto]" />
      </div>
      <div className="w-full px-[14px] flex gap-1 flex-col">
        {Object.keys(CLIENT_ROUTES).map((label) => {
          const { Icon, path } = (CLIENT_ROUTES as any)[label];
          return (
            <Button
              key={path}
              variant="ghost"
              className={clsx('text-white w-full justify-start gap-1', {
                'bg-white text-primary hover:bg-white hover:text-primary': currentPath === path,
                'hover:bg-transparent hover:text-white hover:opacity-[0.7]': currentPath !== path,
              })}
              onClick={() => setCurrentPath(path)}
              asChild
            >
              <Link href={path}>
                {Icon && <Icon className="w-4 h-4" />} {label}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
