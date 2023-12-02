import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.zod.validation';
import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';

const router = Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentZodValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
