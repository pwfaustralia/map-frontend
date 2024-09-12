export const LARAVEL_API_ROUTES = {
  createUser: '/users',
  getUserDetails: '/users/me',
  getUserDetailsFn: (id: string) => `/users/${id}`,
  getClientDetailsFn: (id: string) => `/clients/${id}`,
  getUserYodleeAccessToken: (id: string) => `/users/${id}/yodlee`,
  getClientYodleeAccessToken: (id: string) => `/clients/${id}/yodlee`,
  updateClient: (id: string) => `/clients/${id}`,
};
