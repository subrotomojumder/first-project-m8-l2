import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { OfferedCourseValidations } from "./offeredCourse.validation";
import { OfferedCourseControllers } from "./offeredCourse.controller";

const router = Router();

router.post(
  '/create-offered-course',
  validateRequest(
    OfferedCourseValidations.createOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.createOfferedCourse,
);
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);

router.get('/', OfferedCourseControllers.getAllOfferedCourse);
router.patch(
  '/:id',
  validateRequest(
    OfferedCourseValidations.updateOfferedCourseValidationSchema
    ),
    OfferedCourseControllers.updateOfferedCourse
);
router.delete('/:id', OfferedCourseControllers.deleteOfferedCourse);


export const OfferedCourseRoutes = router;
