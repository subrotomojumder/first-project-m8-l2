import { UserControllers } from './user.controller';
import { studentValidations } from '../Student/student.zod.validation';
import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { userValidations } from './user.zod.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.createStudentZodValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.patch(
  '/change-status/:id',
  auth('admin'),
  validateRequest(userValidations.changeStatusValidationSchema),
  UserControllers.changeStatus,
);
router.get('/me', auth('admin', 'faculty', 'student'), UserControllers.getMe);

export const UserRoutes = router;
