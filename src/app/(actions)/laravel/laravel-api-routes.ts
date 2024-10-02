export const LARAVEL_API_ROUTES = {
  createUser: '/users',
  getUserDetails: '/users/me',
  getUserDetailsFn: (id: string) => `/users/${id}`,
  getClientDetailsFn: (id: string) => `/clients/${id}`,
  getClientYodleeAccessToken: (id: string) => `/clients/${id}/yodlee`,
  getClientYodleeStatus: (id: string) => `/clients/${id}/yodlee/status`,
  updateClient: (id: string) => `/clients/${id}`,
  importAccountTransactions: '/transactions/import',
  listLoanBalances: (scenario: 'normal' | 'offset', accountId: number, by: 'year' | 'month') =>
    `/loanbalances/list?scenario=${scenario}&loan_account_id=${accountId}&by=${by}`,
  getPrimaryLoanAccount: (id: string) => `/clients/${id}/loanaccounts?primary=true`,
  setPrimaryLoanAccount: (clientId: string, accountId: number) => `/clients/${clientId}/setloanprimaryaccount`,
};
