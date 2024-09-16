export const LARAVEL_API_ROUTES = {
  createUser: '/users',
  getUserDetails: '/users/me',
  getUserDetailsFn: (id: string) => `/users/${id}`,
  getClientDetailsFn: (id: string) => `/clients/${id}`,
  getClientYodleeAccessToken: (id: string) => `/clients/${id}/yodlee`,
  getClientYodleeStatus: (id: string) => `/clients/${id}/yodlee/status`,
  updateClient: (id: string) => `/clients/${id}`,
  importAccountTransactions: '/transactions/import',
};
