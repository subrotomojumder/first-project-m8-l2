import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';

const router = Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidation,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);
router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);

router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration);
router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidation,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
);

router.delete(
  '/:id',
  SemesterRegistrationControllers.deleteSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
