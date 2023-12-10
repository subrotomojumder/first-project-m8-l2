import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidationSchema } from './course.validation';
import { CourseControllers } from './course.controller';

const router = Router();

router.post(
  '/create-course',
  validateRequest(CourseValidationSchema.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/', CourseControllers.getAllCourse);

router.get('/:id', CourseControllers.getSingleCourse);

router.patch(
  '/:id',
  validateRequest(CourseValidationSchema.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.delete('/:id', CourseControllers.deleteCourse);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(
    CourseValidationSchema.facultiesWithCourseValidationSchema,
  ),
  CourseControllers.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(
    CourseValidationSchema.facultiesWithCourseValidationSchema,
  ),
  CourseControllers.removeFacultiesFromCourse,
);
export const CourseRoutes = router;
