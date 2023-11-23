import Joi from 'joi';

const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .required()
      .max(20)
      .regex(/^[A-Za-z]+$/),
    middleName: Joi.string().trim(),
    lastName: Joi.string()
      .trim()
      .required()
      .regex(/^[A-Za-z]+$/),
  });

  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().trim().required(),
    fatherOccupation: Joi.string().trim().required(),
    fatherContactNo: Joi.string().trim().required(),
    motherName: Joi.string().trim().required(),
    motherOccupation: Joi.string().trim().required(),
    motherContactNo: Joi.string().trim().required(),
  });

  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    occupation: Joi.string().trim().required(),
    contactNo: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
  });
  const studentJoiValidationSchema = Joi.object({
    id: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string().valid('male', 'female', 'others').required(),
    dateOfBirth: Joi.string(),
    email: Joi.string().email().trim().required(),
    contactNo: Joi.string().trim().required(),
    emergencyContactNo: Joi.string().trim().required(),
    bloodGroup: Joi.string().valid(
      'A+',
      'A-',
      'B+',
      'B-',
      'AB+',
      'AB-',
      'O+',
      'O-',
    ),
    presentAddress: Joi.string().trim().required(),
    permanentAddress: Joi.string().trim().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'inactive').default('active'),
    isDeleted: Joi.boolean(),
  });

  export default studentJoiValidationSchema;