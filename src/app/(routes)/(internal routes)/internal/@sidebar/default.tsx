'use client';

import { Button } from '@/components/ui/button';
import { INTERNAL_ROUTES } from '@/lib/routes';
import { useLayoutStore } from '@/store/layout-store';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SidebarInternalDefault() {
  const pathname = usePathname();
  const { isMenuOpen } = useLayoutStore();
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <div className={clsx("flex-col items-center bg-primary pt-6", {
      'flex-[1_1_250px] min-w-[250px]': isMenuOpen
    })}>
      {isMenuOpen && <div className="mb-7">
        <img src="/images/cc-logo.png" alt="Credit Connection" className="lg:w-[194px] max-w-[194px] m-[0_auto]" />
      </div>}

      {!isMenuOpen && <div className="mb-7 text-center"><a className="text-2xl text-white">CC</a></div>}

      <div className="w-full px-[14px] flex gap-1 flex-col">
        {Object.keys(INTERNAL_ROUTES).map((label, index) => {
          const { Icon, path, hidden } = (INTERNAL_ROUTES as any)[label];
          if (hidden) return <div className="hidden" key={index}></div>;

          return (
            <Button
              key={index}
              variant="ghost"
              className={clsx('text-white w-full justify-start gap-1', {
                'bg-white text-primary hover:bg-white hover:text-primary': currentPath === path,
                'hover:bg-transparent hover:text-white hover:opacity-[0.7]': currentPath !== path,
              })}
              onClick={() => setCurrentPath(path)}
              asChild
            >
              <Link href={path}>
                {Icon && <Icon className="w-4 h-4" />} {isMenuOpen && label}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
