export const fetchAbsolute = (endpoint: string, params: RequestInit) => {
  return fetch(process.env.NEXT_BASE_URL + '/api' + endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...params,
  });
};

export const fetchLaravel = (endpoint: string, params: RequestInit) => {
  return fetch(process.env.LARAVEL_BASE_URL + '/api' + endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...params,
  });
};
