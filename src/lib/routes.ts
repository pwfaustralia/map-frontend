import { Banknote, PlusCircleIcon, Users, LayoutDashboardIcon } from 'lucide-react';

export const NEXT_API_ROUTES = {
  laravelLogin: '/auth/credentials',
  checkAuth: '/auth/checkup',
};

export const NEXT_APP_ROUTES = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  internal_dashboard: '/internal/clients',
};

export const INTERNAL_ROUTES = {
  'My Clients': {
    path: '/internal/clients',
    Icon: Users,
  },
  'Dashboard': {
    path: '/internal/dashboard/9d084340-1dff-4079-98a6-79d0e0ba5532',
    Icon: Users,
  },
  'Add Client': {
    path: '/internal/add-client',
    Icon: PlusCircleIcon,
  },
};

export const CLIENT_ROUTES = {
  Dashboard: {
    path: '/dashboard',
    Icon: LayoutDashboardIcon,
  },
  'My Accounts': {
    path: '/my-account',
    Icon: Banknote,
  },
  'Budgeting': {
    path: '/budgeting',
    Icon: Banknote,
  },
};

export const YODLEE_API_ROUTES = {
  transactions: {
    transactions: '/transactions',
    count: '/transactions/count',
    categories: '/transactions/categories',
    accounts: '/accounts',
  },
};
