import { NEXT_APP_ROUTES } from '@/lib/routes';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect(process.env.NEXT_BASE_URL + NEXT_APP_ROUTES.dashboard);
}
