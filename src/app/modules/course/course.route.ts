import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidationSchema } from './course.validation';
import { CourseControllers } from './course.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';

const router = Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidationSchema.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  CourseControllers.getAllCourse,
);

router.get('/:id',auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), CourseControllers.getSingleCourse);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidationSchema.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.delete('/:id',auth(USER_ROLE.admin), CourseControllers.deleteCourse);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidationSchema.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidationSchema.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);
export const CourseRoutes = router;
