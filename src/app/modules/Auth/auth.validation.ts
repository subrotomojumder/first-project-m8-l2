import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required!' }),
    password: z.string({ required_error: 'Password is required!' }),
  }),
});
const passChangeValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required!' }),
    newPassword: z
      .string({ required_error: 'New password is required!' })
      .min(8, { message: 'Password can not be less then 8 characters!' })
      .max(20, { message: 'Password can not be more then 20 characters!' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required!' }),
  }),
});
export const AuthValidationSchema = {
  loginValidationSchema,
  passChangeValidationSchema,
  refreshTokenValidationSchema,
};
