import { z } from 'zod';
import { DaysEnum } from './offeredCourse.constant';
const timeStringValidationSchema = z.string().refine(
  (time) => {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return regex.test(time);
  },
  {
    message: `Invalid time format, expected "HH:MM" in 24 hours format`,
  },
);
const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      section: z.number(),
      maxCapacity: z.number(),
      days: z.array(z.enum(DaysEnum as [string, ...string[]])),
      startTime: timeStringValidationSchema,
      endTime: timeStringValidationSchema,
    })
    .refine(
      (body) => {
        // start date = 1970-01-01T6:30:00
        // end date = 1970-01-01T8:30:00
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return start < end;
      },
      {
        message: 'Start time should be before End time!',
      },
    ),
});
const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum(DaysEnum as [string, ...string[]])),
      startTime: timeStringValidationSchema,
      endTime: timeStringValidationSchema,
    })
    .refine(
      (body) => {
        // start date = 1970-01-01T6:30:00
        // end date = 1970-01-01T8:30:00
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return start < end;
      },
      {
        message: 'Start time should be before End time!',
      },
    ),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
