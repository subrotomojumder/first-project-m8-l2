import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.zod.validation';
import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';

const router = Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentZodValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
