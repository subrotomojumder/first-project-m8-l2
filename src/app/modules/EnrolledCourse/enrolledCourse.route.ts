import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { EnrolledCourseValidation } from './enrolledCourse.validation';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidation.createEnrolledCourseValidationSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);
router.patch(
  '/update-enrolled-course-marks',
  auth(USER_ROLE.faculty),
  validateRequest(
    EnrolledCourseValidation.updateEnrolledCourseValidationSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);
router.get(
  '/',
  auth(USER_ROLE.admin),
  EnrolledCourseControllers.getAllEnrolledCourses,
);

export const EnrolledCourseRoutes = router;
