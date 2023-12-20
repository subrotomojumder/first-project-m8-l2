import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Name must be a string',
    }).min(8, {message: 'Password can not be less then 8 characters!'})
    .max(20, { message: 'Password can not be more then 20 characters!' })
    .optional(),
});

export default userValidationSchema;
