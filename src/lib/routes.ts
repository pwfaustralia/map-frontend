import { DashboardIcon } from '@radix-ui/react-icons';
import { Banknote, PlusCircleIcon, Users } from 'lucide-react';

export const NEXT_API_ROUTES = {
  laravelLogin: '/auth/credentials',
  checkAuth: '/auth/checkup',
};

export const NEXT_APP_ROUTES = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  internal_dashboard: '/internal/dashboard',
};

export const INTERNAL_ROUTES = {
  Dashboard: {
    path: NEXT_APP_ROUTES.internal_dashboard,
    Icon: DashboardIcon,
  },
  'My Clients': {
    path: '/internal/clients',
    Icon: Users,
  },
  'Add Client': {
    path: '/internal/add-client',
    Icon: PlusCircleIcon,
  },
};

export const CLIENT_ROUTES = {
  Dashboard: {
    path: NEXT_APP_ROUTES.dashboard,
    Icon: DashboardIcon,
  },
  'Connect Bank': {
    path: '/connect-bank',
    Icon: Banknote,
  },
};
