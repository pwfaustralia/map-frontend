import { SortingState } from '@tanstack/react-table';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CLIENT_ROUTES, INTERNAL_ROUTES, NEXT_APP_ROUTES } from './routes';
import { IUser, UserRoles } from '@/lib/types/user';
import { Dayjs } from 'dayjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSorting(sorting: SortingState) {
  return sorting
    .filter((sort) => sort.desc)
    .map((sort) => sort.id)
    .slice(0, 3)
    .join(',');
}

export function serialize(obj: Record<string, any>) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}

export function isClientUser(role: string) {
  return role === UserRoles.CLIENT;
}

export function getPrivateRoutes() {
  return Object.values(INTERNAL_ROUTES)
    .concat(Object.values(CLIENT_ROUTES))
    .map(({ path }) => path)
    .concat(['/']);
}

export function getUserRedirectPage(user: IUser | undefined, path: string, callback?: (url: string) => void) {
  if (!user) return '';
  let url = '';
  if (path === NEXT_APP_ROUTES.login) url = NEXT_APP_ROUTES.dashboard;
  if (isClientUser(user?.user_role?.role_name)) {
    let hasClientProfile = user.clients.length > 0;
    if (!hasClientProfile) url = '/no-profile';
  }

  if (callback) callback(url);
  return url;
}

export function formatDate(day: Dayjs, format: string) {
  if (!day) return '';
  return day.format(format);
}

export function getUniqueArray<T>(array: T[], comparator: (valueA: any, valueB: any) => boolean) {
  return array.filter((value, index, self) => index === self.findIndex((t) => comparator(t, value)));
}

const currencyToLocaleMap = {
  USD: 'en-US', // US Dollar
  EUR: 'de-DE', // Euro (Germany as default)
  GBP: 'en-GB', // British Pound
  JPY: 'ja-JP', // Japanese Yen
  PHP: 'fil-PH', // Philippine Peso
  AUD: 'en-AU', // Australian Dollar
  CAD: 'en-CA', // Canadian Dollar
  INR: 'hi-IN', // Indian Rupee
  CNY: 'zh-CN', // Chinese Yuan
};

export function formatCurrency(amount: number, currency: keyof typeof currencyToLocaleMap | string = 'AUD') {
  const locale = currencyToLocaleMap[currency as keyof typeof currencyToLocaleMap] || 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2, // To ensure 2 decimal places for most currencies
  }).format(amount);
}

export async function sleep(seconds: number) {
  return await new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, seconds * 1000);
  });
}
