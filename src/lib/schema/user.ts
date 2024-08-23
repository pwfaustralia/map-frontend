import { z } from 'zod';

export const UserSchema = z
  .object({
    email: z.string().email(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    middle_name: z.string().min(1),
    preferred_name: z.string().min(1),
    yodlee_username: z.string().min(1),
    password: z
      .string()
      .min(8, { message: 'Password must contain at least 8 characters' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z]).*$/, {
        message: 'Password must contain at least one uppercase and one lowercase letter',
      }),
  })
  .required();
