import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const UserSchema = z
  .object({
    email: z.string().email(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    middle_name: z.string().min(1),
    mobile_phone: z.string().refine((v) => isValidPhoneNumber(v), {
      message: 'Invalid phone number',
    }),
    work_phone: z.string().refine((v) => isValidPhoneNumber(v), {
      message: 'Invalid phone number',
    }),
    home_phone: z.string().refine((v) => isValidPhoneNumber(v), {
      message: 'Invalid phone number',
    }),
    preferred_name: z.string().min(1),
    yodlee_username: z.string().min(1),
    address_1: z.string(),
    address_2: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postcode: z.string(),
    password: z
      .string()
      .min(8, { message: 'Password must contain at least 8 characters' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z]).*$/, {
        message: 'Password must contain at least one uppercase and one lowercase letter',
      }),
  })
  .required();

export const EditUserSchema = z
  .object({
    id: z.string(),
    email: z.string().email(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    middle_name: z.string().min(1),
    mobile_phone: z.string().refine((v) => isValidPhoneNumber(v), {
      message: 'Invalid phone number',
    }),
    work_phone: z.string().refine((v) => isValidPhoneNumber(v), {
      message: 'Invalid phone number',
    }),
    home_phone: z.string().refine((v) => isValidPhoneNumber(v), {
      message: 'Invalid phone number',
    }),
    preferred_name: z.string().min(1),
    yodlee_username: z.string().min(1),
    address_1: z.string(),
    address_2: z.string().nullable(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postcode: z.string(),
  })
  .required();
