import { Provider } from 'next-auth/providers/index';

export const LaravelPassportProvider = ({
  clientId,
  clientSecret,
}: {
  clientId: string;
  clientSecret: string;
}): Provider => ({
  id: 'laravel-passport',
  name: 'Laravel Passport',
  type: 'oauth',
  authorization: {
    url: `${process.env.LARAVEL_BASE_URL}/oauth/authorize`,
    params: { scope: '' },
  },
  token: `${process.env.LARAVEL_BASE_URL}/oauth/token`,
  userinfo: `${process.env.LARAVEL_BASE_URL}/api/user`,
  clientId,
  clientSecret,
  profile: (profile) => {
    return profile;
  },
});
