import { z } from 'zod';
import { UserStatus } from './user.constant';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .min(8, { message: 'Password can not be less then 8 characters!' })
    .max(20, { message: 'Password can not be more then 20 characters!' })
    .optional(),
});
const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
export const userValidations = {
  userValidationSchema,
  changeStatusValidationSchema,
};
