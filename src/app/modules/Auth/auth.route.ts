import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidationSchema } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = Router();
router.post(
  '/login',
  validateRequest(AuthValidationSchema.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
