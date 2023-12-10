import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from './student.zod.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudent);
router.get('/:id', StudentControllers.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentZodValidationSchema),
  StudentControllers.updateStudent,
);
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
