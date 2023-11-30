import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';

const router = express.Router();

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
    } catch (error) {
      next(error);
    }
  };
};

router.post(
  '/create-student',
  validateRequest(studentZodValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
