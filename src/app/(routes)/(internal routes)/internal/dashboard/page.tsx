'use client';

import { useSession } from 'next-auth/react';

export default function Internal_DashboardPage() {
  const session = useSession();
  return (
    <>
      <>{session.data?.user.name}</>
    </>
  );
}
