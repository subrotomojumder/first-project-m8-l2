import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from './student.zod.validation';
import auth from '../../middleware/auth';

const router = express.Router();

router.get('/', StudentControllers.getAllStudent);
router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  StudentControllers.getSingleStudent,
);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentZodValidationSchema),
  StudentControllers.updateStudent,
);
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
