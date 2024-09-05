import { isClientUser } from '@/app/(actions)/utils/actions';
import { NEXT_APP_ROUTES } from '@/lib/routes';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function MainLayout(props: { children: ReactNode; sidebar: ReactNode; topbar: ReactNode }) {
  if (await isClientUser()) {
    redirect(NEXT_APP_ROUTES.dashboard);
  }
  return (
    <div className="flex items-stretch">
      {props.sidebar}
      <div id="layout-main-content" className="w-full h-screen overflow-auto">
        {props.topbar}
        <div className="py-[25px] px-[36px]">{props.children}</div>
      </div>
    </div>
  );
}
