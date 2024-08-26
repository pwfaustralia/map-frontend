'use server';

import { UserSchema } from '@/lib/schema/user';
import { z } from 'zod';
import { LARAVEL_API_ROUTES } from './laravel-api-routes';
import { fetchLaravel } from '../fetcher/actions';

export async function createUserAndClientProfile(data: z.infer<typeof UserSchema>) {
  const response = await fetchLaravel(LARAVEL_API_ROUTES.createUser, {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      name: data.first_name + ' ' + data.last_name,
      password_confirmation: data.password,
      with_client: true,
    }),
  }).then((resp) => resp.json());
  return response;
}
