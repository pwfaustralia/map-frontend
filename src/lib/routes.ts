import { Banknote, PlusCircleIcon, Users, LayoutDashboardIcon, GitGraphIcon } from 'lucide-react';

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
    path: '/internal/dashboard',
    Icon: Users,
    hidden: true,
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
  'Leaderboard': {
    path: '/leaderboard',
    Icon: GitGraphIcon,
  },
};

export const YODLEE_API_ROUTES = {
  transactions: {
    transactions: '/transactions',
    count: '/transactions/count',
    categories: '/transactions/categories',
    accounts: '/accounts',
    summary: '/derived/transactionSummary'
  },
};
