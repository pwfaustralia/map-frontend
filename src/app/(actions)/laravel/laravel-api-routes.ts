export const LARAVEL_API_ROUTES = {
  createUser: '/users',
  getUserDetails: '/users/me',
  getUserDetailsFn: (id: string) => `/users/${id}`,
  getUserYodleeAccessToken: (id: string) => `/users/${id}/yodlee`,
  updateClient: (id: string) => `/clients/${id}`,
};
